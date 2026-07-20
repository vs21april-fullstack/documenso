import fs from 'node:fs';
import path from 'node:path';

import { prisma } from '.';

const bootstrapSubscriptionClaims = async () => {
  const claims = [
    { id: 'free', name: 'Free', teamCount: 1, memberCount: 1, envelopeItemCount: 5, flags: {} },
    {
      id: 'individual',
      name: 'Individual',
      teamCount: 1,
      memberCount: 1,
      envelopeItemCount: 5,
      flags: { unlimitedDocuments: true },
    },
    {
      id: 'team',
      name: 'Teams',
      teamCount: 1,
      memberCount: 5,
      envelopeItemCount: 5,
      flags: { unlimitedDocuments: true, allowCustomBranding: true, embedSigning: true },
    },
    {
      id: 'platform',
      name: 'Platform',
      teamCount: 1,
      memberCount: 0,
      envelopeItemCount: 10,
      flags: {
        unlimitedDocuments: true,
        allowCustomBranding: true,
        hidePoweredBy: true,
        embedAuthoring: false,
        embedAuthoringWhiteLabel: true,
        embedSigning: false,
        embedSigningWhiteLabel: true,
      },
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      teamCount: 0,
      memberCount: 0,
      envelopeItemCount: 10,
      flags: {
        unlimitedDocuments: true,
        allowCustomBranding: true,
        hidePoweredBy: true,
        embedAuthoring: true,
        embedAuthoringWhiteLabel: true,
        embedSigning: true,
        embedSigningWhiteLabel: true,
        cfr21: true,
      },
    },
    {
      id: 'earlyAdopter',
      name: 'Early Adopter',
      teamCount: 0,
      memberCount: 0,
      envelopeItemCount: 5,
      flags: {
        unlimitedDocuments: true,
        allowCustomBranding: true,
        hidePoweredBy: true,
        embedSigning: true,
        embedSigningWhiteLabel: true,
      },
    },
  ];

  await prisma.subscriptionClaim.createMany({
    data: claims.map((claim) => ({
      ...claim,
      locked: true,
      recipientCount: 0,
      documentRateLimits: [],
      emailRateLimits: [],
      apiRateLimits: [],
    })),
    skipDuplicates: true,
  });

  await prisma.counter.createMany({
    data: [
      { id: 'document', value: 0 },
      { id: 'template', value: 0 },
    ],
    skipDuplicates: true,
  });
};

const seedDatabase = async () => {
  await bootstrapSubscriptionClaims();

  const files = fs.readdirSync(path.join(__dirname, './seed'));

  for (const file of files) {
    const stat = fs.statSync(path.join(__dirname, './seed', file));

    if (stat.isFile()) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const mod = require(path.join(__dirname, './seed', file));

      if ('seedDatabase' in mod && typeof mod.seedDatabase === 'function') {
        console.log(`[SEEDING]: ${file}`);

        try {
          await mod.seedDatabase();
        } catch (e) {
          console.log(`[SEEDING]: Seed failed for ${file}`);
          console.error(e);
        }
      }
    }
  }
};

seedDatabase()
  .then(() => {
    console.log('Database seeded');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
