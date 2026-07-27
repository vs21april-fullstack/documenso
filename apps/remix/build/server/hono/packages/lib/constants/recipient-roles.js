import { RecipientRole } from '@prisma/client';

const RECIPIENT_ROLES_DESCRIPTION = {
  [RecipientRole.APPROVER]: {
    actionVerb:
    /*i18n*/
    {
      id: "sq55mv"
    },
    actioned:
    /*i18n*/
    {
      id: "/lkl6u"
    },
    progressiveVerb:
    /*i18n*/
    {
      id: "0ABZcU"
    },
    roleName:
    /*i18n*/
    {
      id: "P481fm"
    },
    roleNamePlural:
    /*i18n*/
    {
      id: "iHypPB"
    }
  },
  [RecipientRole.CC]: {
    actionVerb:
    /*i18n*/
    {
      id: "V04HNh"
    },
    actioned:
    /*i18n*/
    {
      id: "I+iaY0"
    },
    progressiveVerb:
    /*i18n*/
    {
      id: "rU5u6k"
    },
    roleName:
    /*i18n*/
    {
      id: "6h8Ych"
    },
    roleNamePlural:
    /*i18n*/
    {
      id: "syiIgK"
    }
  },
  [RecipientRole.SIGNER]: {
    actionVerb:
    /*i18n*/
    {
      id: "Lb3SXn"
    },
    actioned:
    /*i18n*/
    {
      id: "YU61bi"
    },
    progressiveVerb:
    /*i18n*/
    {
      id: "6IAXGD"
    },
    roleName:
    /*i18n*/
    {
      id: "rhg/YI"
    },
    roleNamePlural:
    /*i18n*/
    {
      id: "UIA9hX"
    }
  },
  [RecipientRole.VIEWER]: {
    actionVerb:
    /*i18n*/
    {
      id: "E/Ew1m"
    },
    actioned:
    /*i18n*/
    {
      id: "8IR52g"
    },
    progressiveVerb:
    /*i18n*/
    {
      id: "q8SeLd"
    },
    roleName:
    /*i18n*/
    {
      id: "rptuv+"
    },
    roleNamePlural:
    /*i18n*/
    {
      id: "2q/bsj"
    }
  },
  [RecipientRole.ASSISTANT]: {
    actionVerb:
    /*i18n*/
    {
      id: "QWWql9"
    },
    actioned:
    /*i18n*/
    {
      id: "33d42z"
    },
    progressiveVerb:
    /*i18n*/
    {
      id: "tcCpJ3"
    },
    roleName:
    /*i18n*/
    {
      id: "50z2/A"
    },
    roleNamePlural:
    /*i18n*/
    {
      id: "ZKaoSG"
    }
  }
};
({
  [RecipientRole.SIGNER]: `SIGNING_REQUEST`,
  [RecipientRole.VIEWER]: `VIEW_REQUEST`,
  [RecipientRole.APPROVER]: `APPROVE_REQUEST`
});
const RECIPIENT_ROLE_TO_EMAIL_TYPE = {
  [RecipientRole.SIGNER]: `SIGNING_REQUEST`,
  [RecipientRole.VIEWER]: `VIEW_REQUEST`,
  [RecipientRole.APPROVER]: `APPROVE_REQUEST`,
  [RecipientRole.ASSISTANT]: `ASSISTING_REQUEST`
};
const RECIPIENT_ROLE_SIGNING_REASONS = {
  [RecipientRole.SIGNER]:
  /*i18n*/
  {
    id: "uCroPU"
  },
  [RecipientRole.APPROVER]:
  /*i18n*/
  {
    id: "ngj5km"
  },
  [RecipientRole.CC]:
  /*i18n*/
  {
    id: "JUZIGu"
  },
  [RecipientRole.VIEWER]:
  /*i18n*/
  {
    id: "K6KTX2"
  },
  [RecipientRole.ASSISTANT]:
  /*i18n*/
  {
    id: "ahcF5g"
  }
};

export { RECIPIENT_ROLES_DESCRIPTION, RECIPIENT_ROLE_SIGNING_REASONS, RECIPIENT_ROLE_TO_EMAIL_TYPE };
//# sourceMappingURL=recipient-roles.js.map
