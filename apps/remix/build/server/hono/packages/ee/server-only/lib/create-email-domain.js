import { SESv2Client, CreateEmailIdentityCommand } from '@aws-sdk/client-sesv2';
import { DOCUMENSO_ENCRYPTION_KEY } from '../../../lib/constants/crypto.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { symmetricEncrypt } from '../../../lib/universal/crypto.js';
import { generateDatabaseId } from '../../../lib/universal/id.js';
import { generateEmailDomainRecords } from '../../../lib/utils/email-domains.js';
import { env } from '../../../lib/utils/env.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EmailDomainStatus } from '@prisma/client';
import { generateKeyPair } from 'crypto';
import { promisify } from 'util';

const getSesClient = () => {
  const accessKeyId = env('NEXT_PRIVATE_SES_ACCESS_KEY_ID');
  const secretAccessKey = env('NEXT_PRIVATE_SES_SECRET_ACCESS_KEY');
  const region = env('NEXT_PRIVATE_SES_REGION');
  if (!accessKeyId || !secretAccessKey || !region) {
    throw new AppError(AppErrorCode.UNKNOWN_ERROR, {
      message: 'Missing AWS SES credentials'
    });
  }
  return new SESv2Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  });
};
/**
 * Removes first and last line, then removes all newlines
 */
const flattenKey = key => {
  return key.trim().split('\n').slice(1, -1).join('');
};
async function verifyDomainWithDKIM(domain, selector, privateKey) {
  const command = new CreateEmailIdentityCommand({
    EmailIdentity: domain,
    DkimSigningAttributes: {
      DomainSigningSelector: selector,
      DomainSigningPrivateKey: privateKey
    }
  });
  return await getSesClient().send(command);
}
const createEmailDomain = async ({
  domain,
  organisationId
}) => {
  const encryptionKey = DOCUMENSO_ENCRYPTION_KEY;
  if (!encryptionKey) {
    throw new Error('Missing DOCUMENSO_ENCRYPTION_KEY');
  }
  const selector = `documenso-${organisationId}`.replace(/[_.]/g, '-');
  const recordName = `${selector}._domainkey.${domain}`;
  // Check if domain already exists
  const existingDomain = await prismaWithReplicas.emailDomain.findUnique({
    where: {
      domain
    }
  });
  if (existingDomain) {
    throw new AppError(AppErrorCode.ALREADY_EXISTS, {
      message: 'Domain already exists in database'
    });
  }
  // Generate DKIM key pair
  const generateKeyPairAsync = promisify(generateKeyPair);
  const {
    publicKey,
    privateKey
  } = await generateKeyPairAsync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });
  // Format public key for DNS record
  const publicKeyFlattened = flattenKey(publicKey);
  const privateKeyFlattened = flattenKey(privateKey);
  // Create DNS records
  const records = generateEmailDomainRecords(recordName, publicKeyFlattened);
  const encryptedPrivateKey = symmetricEncrypt({
    key: encryptionKey,
    data: privateKeyFlattened
  });
  // Verify domain with SES outside a transaction to avoid holding a
  // connection open during the external API call.
  await verifyDomainWithDKIM(domain, selector, privateKeyFlattened).catch(err => {
    if (err.name === 'AlreadyExistsException') {
      throw new AppError(AppErrorCode.ALREADY_EXISTS, {
        message: 'Domain already exists in SES'
      });
    }
    throw err;
  });
  const emailDomain = await prismaWithReplicas.emailDomain.create({
    data: {
      id: generateDatabaseId('email_domain'),
      domain,
      status: EmailDomainStatus.PENDING,
      organisationId,
      selector: recordName,
      publicKey: publicKeyFlattened,
      privateKey: encryptedPrivateKey
    },
    select: {
      id: true,
      status: true,
      organisationId: true,
      domain: true,
      selector: true,
      publicKey: true,
      createdAt: true,
      updatedAt: true,
      lastVerifiedAt: true,
      emails: true
    }
  });
  return {
    emailDomain,
    records
  };
};

export { createEmailDomain, getSesClient, verifyDomainWithDKIM };
//# sourceMappingURL=create-email-domain.js.map
