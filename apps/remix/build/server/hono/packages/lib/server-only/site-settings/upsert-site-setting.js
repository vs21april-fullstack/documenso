import { prisma as prismaWithReplicas } from '../../../prisma/index.js';

const upsertSiteSetting = async ({
  id,
  enabled,
  data,
  userId
}) => {
  return await prismaWithReplicas.siteSettings.upsert({
    where: {
      id
    },
    create: {
      id,
      enabled,
      data,
      lastModifiedByUserId: userId,
      lastModifiedAt: new Date()
    },
    update: {
      enabled,
      data,
      lastModifiedByUserId: userId,
      lastModifiedAt: new Date()
    }
  });
};

export { upsertSiteSetting };
//# sourceMappingURL=upsert-site-setting.js.map
