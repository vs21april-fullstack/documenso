import { z } from 'zod';
import { getIpAddress } from './get-ip-address.js';

const ZIpSchema = z.string().ip();
const ZRequestMetadataSchema = z.object({
  ipAddress: ZIpSchema.optional(),
  userAgent: z.string().optional()
});
const extractRequestMetadata = req => {
  let ip;
  try {
    ip = getIpAddress(req);
  } catch {
    // Do nothing.
  }
  const parsedIp = ZIpSchema.safeParse(ip);
  const ipAddress = parsedIp.success ? parsedIp.data : undefined;
  const userAgent = req.headers.get('user-agent');
  return {
    ipAddress,
    userAgent: userAgent ?? undefined
  };
};

export { ZRequestMetadataSchema, extractRequestMetadata };
//# sourceMappingURL=extract-request-metadata.js.map
