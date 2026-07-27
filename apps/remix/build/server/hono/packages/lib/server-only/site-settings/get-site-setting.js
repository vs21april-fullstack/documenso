import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { ZSiteSettingSchema } from './schema.js';

const getSiteSetting = async options => {
  const {
    id
  } = options;
  const setting = await prismaWithReplicas.siteSettings.findFirstOrThrow({
    where: {
      id
    }
  });
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return ZSiteSettingSchema.parse(setting);
};

export { getSiteSetting };
//# sourceMappingURL=get-site-setting.js.map
