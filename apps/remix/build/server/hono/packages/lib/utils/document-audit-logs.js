import { RecipientRole } from '@prisma/client';
import { isDeepEqual } from 'remeda';
import { match } from 'ts-pattern';
import { ZDocumentAuditLogSchema, DOCUMENT_AUDIT_LOG_TYPE, FIELD_DIFF_TYPE, RECIPIENT_DIFF_TYPE, DOCUMENT_META_DIFF_TYPE } from '../types/document-audit-logs.js';
import { ZRecipientAuthOptionsSchema } from '../types/document-auth.js';

const createDocumentAuditLogData = ({
  envelopeId,
  type,
  data,
  user,
  requestMetadata,
  metadata
}) => {
  let userId = metadata?.auditUser?.id || null;
  let email = metadata?.auditUser?.email || null;
  let name = metadata?.auditUser?.name || null;
  // Prioritize explicit user parameter over metadata audit user.
  if (user) {
    userId = user.id || null;
    email = user.email || null;
    name = user.name || null;
  }
  const ipAddress = metadata?.requestMetadata.ipAddress ?? requestMetadata?.ipAddress ?? null;
  const userAgent = metadata?.requestMetadata.userAgent ?? requestMetadata?.userAgent ?? null;
  return {
    type,
    data,
    envelopeId,
    userId,
    email,
    name,
    userAgent,
    ipAddress
  };
};
/**
 * Parse a raw document audit log from Prisma, to a typed audit log.
 *
 * @param auditLog raw audit log from Prisma.
 */
const parseDocumentAuditLogData = auditLog => {
  const data = ZDocumentAuditLogSchema.safeParse(auditLog);
  // Handle any required migrations here.
  if (!data.success) {
    // Todo: Alert us.
    console.error(data.error);
    throw new Error('Migration required');
  }
  return data.data;
};
const diffRecipientChanges = (oldRecipient, newRecipient) => {
  const diffs = [];
  const oldAuthOptions = ZRecipientAuthOptionsSchema.parse(oldRecipient.authOptions);
  const oldAccessAuth = oldAuthOptions.accessAuth;
  const oldActionAuth = oldAuthOptions.actionAuth;
  const newAuthOptions = ZRecipientAuthOptionsSchema.parse(newRecipient.authOptions);
  const newAccessAuth = newAuthOptions?.accessAuth === undefined ? oldAccessAuth : newAuthOptions.accessAuth;
  const newActionAuth = newAuthOptions?.actionAuth === undefined ? oldActionAuth : newAuthOptions.actionAuth;
  if (!isDeepEqual(oldAccessAuth, newAccessAuth)) {
    diffs.push({
      type: RECIPIENT_DIFF_TYPE.ACCESS_AUTH,
      from: oldAccessAuth ?? '',
      to: newAccessAuth ?? ''
    });
  }
  if (!isDeepEqual(oldActionAuth, newActionAuth)) {
    diffs.push({
      type: RECIPIENT_DIFF_TYPE.ACTION_AUTH,
      from: oldActionAuth ?? '',
      to: newActionAuth ?? ''
    });
  }
  if (oldRecipient.email !== newRecipient.email) {
    diffs.push({
      type: RECIPIENT_DIFF_TYPE.EMAIL,
      from: oldRecipient.email,
      to: newRecipient.email
    });
  }
  if (oldRecipient.role !== newRecipient.role) {
    diffs.push({
      type: RECIPIENT_DIFF_TYPE.ROLE,
      from: oldRecipient.role,
      to: newRecipient.role
    });
  }
  if (oldRecipient.name !== newRecipient.name) {
    diffs.push({
      type: RECIPIENT_DIFF_TYPE.NAME,
      from: oldRecipient.name,
      to: newRecipient.name
    });
  }
  return diffs;
};
const diffFieldChanges = (oldField, newField) => {
  const diffs = [];
  if (oldField.page !== newField.page || !oldField.positionX.equals(newField.positionX) || !oldField.positionY.equals(newField.positionY)) {
    diffs.push({
      type: FIELD_DIFF_TYPE.POSITION,
      from: {
        page: oldField.page,
        positionX: oldField.positionX.toNumber(),
        positionY: oldField.positionY.toNumber()
      },
      to: {
        page: newField.page,
        positionX: newField.positionX.toNumber(),
        positionY: newField.positionY.toNumber()
      }
    });
  }
  if (!oldField.width.equals(newField.width) || !oldField.height.equals(newField.height)) {
    diffs.push({
      type: FIELD_DIFF_TYPE.DIMENSION,
      from: {
        width: oldField.width.toNumber(),
        height: oldField.height.toNumber()
      },
      to: {
        width: newField.width.toNumber(),
        height: newField.height.toNumber()
      }
    });
  }
  return diffs;
};
const diffDocumentMetaChanges = (oldData = {}, newData) => {
  const diffs = [];
  const oldDateFormat = oldData?.dateFormat ?? '';
  const oldMessage = oldData?.message ?? '';
  const oldSubject = oldData?.subject ?? '';
  const oldTimezone = oldData?.timezone ?? '';
  const oldRedirectUrl = oldData?.redirectUrl ?? '';
  const oldEmailId = oldData?.emailId || null;
  const oldEmailReplyTo = oldData?.emailReplyTo || null;
  const oldEmailSettings = oldData?.emailSettings || null;
  const newDateFormat = newData?.dateFormat ?? '';
  const newMessage = newData?.message ?? '';
  const newSubject = newData?.subject ?? '';
  const newTimezone = newData?.timezone ?? '';
  const newRedirectUrl = newData?.redirectUrl ?? '';
  const newEmailId = newData?.emailId || null;
  const newEmailReplyTo = newData?.emailReplyTo || null;
  const newEmailSettings = newData?.emailSettings || null;
  if (oldDateFormat !== newDateFormat) {
    diffs.push({
      type: DOCUMENT_META_DIFF_TYPE.DATE_FORMAT,
      from: oldData?.dateFormat ?? '',
      to: newData.dateFormat
    });
  }
  if (oldMessage !== newMessage) {
    diffs.push({
      type: DOCUMENT_META_DIFF_TYPE.MESSAGE,
      from: oldMessage,
      to: newMessage
    });
  }
  if (oldSubject !== newSubject) {
    diffs.push({
      type: DOCUMENT_META_DIFF_TYPE.SUBJECT,
      from: oldSubject,
      to: newSubject
    });
  }
  if (oldTimezone !== newTimezone) {
    diffs.push({
      type: DOCUMENT_META_DIFF_TYPE.TIMEZONE,
      from: oldTimezone,
      to: newTimezone
    });
  }
  if (oldRedirectUrl !== newRedirectUrl) {
    diffs.push({
      type: DOCUMENT_META_DIFF_TYPE.REDIRECT_URL,
      from: oldRedirectUrl,
      to: newRedirectUrl
    });
  }
  if (oldEmailId !== newEmailId) {
    diffs.push({
      type: DOCUMENT_META_DIFF_TYPE.EMAIL_ID,
      from: oldEmailId,
      to: newEmailId
    });
  }
  if (oldEmailReplyTo !== newEmailReplyTo) {
    diffs.push({
      type: DOCUMENT_META_DIFF_TYPE.EMAIL_REPLY_TO,
      from: oldEmailReplyTo,
      to: newEmailReplyTo
    });
  }
  if (!isDeepEqual(oldEmailSettings, newEmailSettings)) {
    diffs.push({
      type: DOCUMENT_META_DIFF_TYPE.EMAIL_SETTINGS,
      from: JSON.stringify(oldEmailSettings),
      to: JSON.stringify(newEmailSettings)
    });
  }
  return diffs;
};
/**
 * Formats the audit log into a description of the action.
 *
 * Provide a userId to prefix the action with the user, example 'X did Y'.
 */
const formatDocumentAuditLogAction = (i18n, auditLog, userId) => {
  const isCurrentUser = userId === auditLog.userId;
  const user = auditLog.name || auditLog.email || '';
  const prefix = isCurrentUser ? i18n._(
  /*i18n*/
  {
    id: "kWJmRL"
  }) : user || '';
  const description = match(auditLog).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.FIELD_CREATED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "nyTApI"
    },
    you:
    /*i18n*/
    {
      id: "KmDIKp"
    },
    user:
    /*i18n*/
    {
      id: "61kwHM",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.FIELD_DELETED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "jOVBPh"
    },
    you:
    /*i18n*/
    {
      id: "HTyKwG"
    },
    user:
    /*i18n*/
    {
      id: "2U3Ttt",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.FIELD_UPDATED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "q9Ot2+"
    },
    you:
    /*i18n*/
    {
      id: "z4M1Kw"
    },
    user:
    /*i18n*/
    {
      id: "a+XNpT",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.RECIPIENT_CREATED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "Ti/ZC7"
    },
    you:
    /*i18n*/
    {
      id: "CLzBLe"
    },
    user:
    /*i18n*/
    {
      id: "FJiX8A",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.RECIPIENT_DELETED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "jWXugJ"
    },
    you:
    /*i18n*/
    {
      id: "pj6JsR"
    },
    user:
    /*i18n*/
    {
      id: "Ed/v/J",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.RECIPIENT_UPDATED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "BMhG+R"
    },
    you:
    /*i18n*/
    {
      id: "1T7/8V"
    },
    user:
    /*i18n*/
    {
      id: "1Xf78o",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_CREATED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "cUn7Xh"
    },
    you:
    /*i18n*/
    {
      id: "Gtwfxk"
    },
    user:
    /*i18n*/
    {
      id: "Wdzo3H",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_DELETED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "of6gSn"
    },
    you:
    /*i18n*/
    {
      id: "VmwT1J"
    },
    user:
    /*i18n*/
    {
      id: "HpoE1S",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_CANCELLED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "lcQ57e"
    },
    you:
    /*i18n*/
    {
      id: "O7RDGB"
    },
    user:
    /*i18n*/
    {
      id: "V7eZUR",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_FIELDS_AUTO_INSERTED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "pSSUkw"
    },
    you:
    /*i18n*/
    {
      id: "pSSUkw"
    },
    user:
    /*i18n*/
    {
      id: "pSSUkw"
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_FIELD_INSERTED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "Eg/oZi"
    },
    you:
    /*i18n*/
    {
      id: "sJNCLi"
    },
    user:
    /*i18n*/
    {
      id: "arzoJ8",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_FIELD_UNINSERTED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "oaw7t4"
    },
    you:
    /*i18n*/
    {
      id: "26GPSi"
    },
    user:
    /*i18n*/
    {
      id: "xcF61e",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_FIELD_PREFILLED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "8tx9py"
    },
    you:
    /*i18n*/
    {
      id: "7XOpaF"
    },
    user:
    /*i18n*/
    {
      id: "MO6ziX",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_VISIBILITY_UPDATED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "VOekGa"
    },
    you:
    /*i18n*/
    {
      id: "mk1Kv+"
    },
    user:
    /*i18n*/
    {
      id: "jZRBn9",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_GLOBAL_AUTH_ACCESS_UPDATED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "uJbHRE"
    },
    you:
    /*i18n*/
    {
      id: "3A11D8"
    },
    user:
    /*i18n*/
    {
      id: "E5NEmk",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_GLOBAL_AUTH_ACTION_UPDATED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "Xus1If"
    },
    you:
    /*i18n*/
    {
      id: "HFJwWJ"
    },
    user:
    /*i18n*/
    {
      id: "2dLX4t",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_META_UPDATED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "plTGCj"
    },
    you:
    /*i18n*/
    {
      id: "ox4sHA"
    },
    user:
    /*i18n*/
    {
      id: "11PO1v",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_OPENED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "4Ldvel"
    },
    you:
    /*i18n*/
    {
      id: "LKGIcQ"
    },
    user:
    /*i18n*/
    {
      id: "Ib/xSm",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_VIEWED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "j/9qS3"
    },
    you:
    /*i18n*/
    {
      id: "0G2cou"
    },
    user:
    /*i18n*/
    {
      id: "UuXmFq",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_TITLE_UPDATED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "2g9lO0"
    },
    you:
    /*i18n*/
    {
      id: "20vrRz"
    },
    user:
    /*i18n*/
    {
      id: "f0Xjln",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_EXTERNAL_ID_UPDATED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "rnD6Pw"
    },
    you:
    /*i18n*/
    {
      id: "fcqfnO"
    },
    user:
    /*i18n*/
    {
      id: "2Yi0sL",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_SENT
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "9LXRK1"
    },
    you:
    /*i18n*/
    {
      id: "1VjGSZ"
    },
    user:
    /*i18n*/
    {
      id: "N6AkPy",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_MOVED_TO_TEAM
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "3aaRuQ"
    },
    you:
    /*i18n*/
    {
      id: "IxxWUP"
    },
    user:
    /*i18n*/
    {
      id: "5OnpGV",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_RECIPIENT_COMPLETED
  }, ({
    data
  }) => {
    return match(data.recipientRole).with(RecipientRole.SIGNER, () => ({
      anonymous:
      /*i18n*/
      {
        id: "1P2uDy"
      },
      you:
      /*i18n*/
      {
        id: "pjoGKk"
      },
      user:
      /*i18n*/
      {
        id: "uYuGGP",
        values: {
          user: user
        }
      }
    })).with(RecipientRole.VIEWER, () => ({
      anonymous:
      /*i18n*/
      {
        id: "WhnNp3"
      },
      you:
      /*i18n*/
      {
        id: "0G2cou"
      },
      user:
      /*i18n*/
      {
        id: "UuXmFq",
        values: {
          user: user
        }
      }
    })).with(RecipientRole.APPROVER, () => ({
      anonymous:
      /*i18n*/
      {
        id: "h+/PIc"
      },
      you:
      /*i18n*/
      {
        id: "UHj460"
      },
      user:
      /*i18n*/
      {
        id: "mjqZPc",
        values: {
          user: user
        }
      }
    })).with(RecipientRole.CC, () => ({
      anonymous:
      /*i18n*/
      {
        id: "lB1ic9"
      },
      you:
      /*i18n*/
      {
        id: "PU7ZHl"
      },
      user:
      /*i18n*/
      {
        id: "3iLYme",
        values: {
          user: user
        }
      }
    })).otherwise(() => ({
      anonymous:
      /*i18n*/
      {
        id: "EPuQuY"
      },
      you:
      /*i18n*/
      {
        id: "YZoKP4"
      },
      user:
      /*i18n*/
      {
        id: "hHSl6h",
        values: {
          user: user
        }
      }
    }));
  }).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_RECIPIENT_REJECTED
  }, ({
    data
  }) => {
    if (data.isExternal) {
      const onBehalfOf = data.onBehalfOfUserName || data.onBehalfOfUserEmail;
      if (onBehalfOf) {
        return {
          anonymous:
          /*i18n*/
          {
            id: "1amHVx",
            values: {
              onBehalfOf: onBehalfOf
            }
          },
          you:
          /*i18n*/
          {
            id: "1amHVx",
            values: {
              onBehalfOf: onBehalfOf
            }
          },
          user:
          /*i18n*/
          {
            id: "FK0Abf",
            values: {
              onBehalfOf: onBehalfOf,
              user: user
            }
          }
        };
      }
      return {
        anonymous:
        /*i18n*/
        {
          id: "TTsxKh"
        },
        you:
        /*i18n*/
        {
          id: "z3TtnE"
        },
        user:
        /*i18n*/
        {
          id: "92q3mz",
          values: {
            user: user
          }
        }
      };
    }
    return {
      anonymous:
      /*i18n*/
      {
        id: "qudos7"
      },
      you:
      /*i18n*/
      {
        id: "eYIXxf"
      },
      user:
      /*i18n*/
      {
        id: "/r3IHF",
        values: {
          user: user
        }
      }
    };
  }).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_ACCESS_AUTH_2FA_REQUESTED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "WOp0JO"
    },
    you:
    /*i18n*/
    {
      id: "D8K22I"
    },
    user:
    /*i18n*/
    {
      id: "992lmO",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_ACCESS_AUTH_2FA_VALIDATED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "7DLRbI"
    },
    you:
    /*i18n*/
    {
      id: "rAxRZH"
    },
    user:
    /*i18n*/
    {
      id: "kba405",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_ACCESS_AUTH_2FA_FAILED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "aBqa7o"
    },
    you:
    /*i18n*/
    {
      id: "gyUeyT"
    },
    user:
    /*i18n*/
    {
      id: "WJnVbp",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.EMAIL_SENT
  }, ({
    data
  }) => {
    if (data.isResending) {
      return {
        anonymous:
        /*i18n*/
        {
          id: "xMteVi"
        },
        you:
        /*i18n*/
        {
          id: "521Q2S",
          values: {
            0: data.recipientEmail
          }
        },
        user:
        /*i18n*/
        {
          id: "4oMw2I",
          values: {
            0: data.recipientEmail,
            user: user
          }
        }
      };
    }
    return {
      anonymous:
      /*i18n*/
      {
        id: "5/gxQY"
      },
      you:
      /*i18n*/
      {
        id: "iKx3nc",
        values: {
          0: data.recipientEmail
        }
      },
      user:
      /*i18n*/
      {
        id: "4lJxUg",
        values: {
          0: data.recipientEmail,
          user: user
        }
      }
    };
  }).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_COMPLETED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "bVYBQ6"
    },
    you:
    /*i18n*/
    {
      id: "bVYBQ6"
    },
    user:
    /*i18n*/
    {
      id: "bVYBQ6"
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.ENVELOPE_ITEM_CREATED
  }, ({
    data
  }) => ({
    anonymous:
    /*i18n*/
    {
      id: "6J8WTa"
    },
    you:
    /*i18n*/
    {
      id: "ZWUAWQ",
      values: {
        0: data.envelopeItemTitle
      }
    },
    user:
    /*i18n*/
    {
      id: "jpMF6o",
      values: {
        0: data.envelopeItemTitle,
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.ENVELOPE_ITEM_DELETED
  }, ({
    data
  }) => ({
    anonymous:
    /*i18n*/
    {
      id: "RLJ+42"
    },
    you:
    /*i18n*/
    {
      id: "3rpjMQ",
      values: {
        0: data.envelopeItemTitle
      }
    },
    user:
    /*i18n*/
    {
      id: "1tNsas",
      values: {
        0: data.envelopeItemTitle,
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.ENVELOPE_ITEM_UPDATED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "5hRaRA"
    },
    you:
    /*i18n*/
    {
      id: "aIWM/M"
    },
    user:
    /*i18n*/
    {
      id: "U9vPdd",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.ENVELOPE_ITEM_PDF_REPLACED
  }, ({
    data
  }) => ({
    anonymous:
    /*i18n*/
    {
      id: "hJMRLA"
    },
    you:
    /*i18n*/
    {
      id: "ihAyuo",
      values: {
        0: data.envelopeItemTitle
      }
    },
    user:
    /*i18n*/
    {
      id: "eI/Bfh",
      values: {
        0: data.envelopeItemTitle,
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_RECIPIENT_EXPIRED
  }, ({
    data
  }) => ({
    anonymous:
    /*i18n*/
    {
      id: "mA16bl"
    },
    you:
    /*i18n*/
    {
      id: "EynufV",
      values: {
        0: data.recipientName || data.recipientEmail
      }
    },
    user:
    /*i18n*/
    {
      id: "EynufV",
      values: {
        0: data.recipientName || data.recipientEmail
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_DELEGATED_OWNER_CREATED
  }, ({
    data
  }) => {
    const message =
    /*i18n*/
    {
      id: "w+xoB0",
      values: {
        0: data.delegatedOwnerName || data.delegatedOwnerEmail,
        1: data.teamName
      }
    };
    return {
      anonymous: message,
      you: message,
      user: message
    };
  }).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_RECIPIENT_CSC_AUTHENTICATED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "wSzd9O"
    },
    you:
    /*i18n*/
    {
      id: "l1+RGZ"
    },
    user:
    /*i18n*/
    {
      id: "oVd0dk",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_RECIPIENT_CSC_AUTHENTICATION_FAILED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "pR0oxF"
    },
    you:
    /*i18n*/
    {
      id: "sevGfu"
    },
    user:
    /*i18n*/
    {
      id: "eSLZGC",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_RECIPIENT_CSC_SIGN_REQUESTED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "WpTlrk"
    },
    you:
    /*i18n*/
    {
      id: "sJFiwM"
    },
    user:
    /*i18n*/
    {
      id: "3iXiHx",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_RECIPIENT_CSC_AUTHORIZED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "PQ3490"
    },
    you:
    /*i18n*/
    {
      id: "UEaac7"
    },
    user:
    /*i18n*/
    {
      id: "YI+vzJ",
      values: {
        user: user
      }
    }
  })).with({
    type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_RECIPIENT_CSC_SIGNED
  }, () => ({
    anonymous:
    /*i18n*/
    {
      id: "DOhhge"
    },
    you:
    /*i18n*/
    {
      id: "WecAEB"
    },
    user:
    /*i18n*/
    {
      id: "9WEo7/",
      values: {
        user: user
      }
    }
  })).exhaustive();
  let selectedDescription = description.anonymous;
  if (isCurrentUser) {
    selectedDescription = description.you;
  } else if (user) {
    selectedDescription = description.user;
  }
  return {
    prefix,
    description: i18n._(selectedDescription)
  };
};

export { createDocumentAuditLogData, diffDocumentMetaChanges, diffFieldChanges, diffRecipientChanges, formatDocumentAuditLogAction, parseDocumentAuditLogData };
//# sourceMappingURL=document-audit-logs.js.map
