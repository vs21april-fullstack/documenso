UPDATE "DocumentMeta"
SET "dateFormat" = 'MM/dd/yyyy hh:mm a'
WHERE "dateFormat" = 'yyyy-MM-dd hh:mm a';

UPDATE "OrganisationGlobalSettings"
SET "documentDateFormat" = 'MM/dd/yyyy hh:mm a'
WHERE "documentDateFormat" = 'yyyy-MM-dd hh:mm a';

ALTER TABLE "DocumentMeta"
ALTER COLUMN "dateFormat" SET DEFAULT 'MM/dd/yyyy hh:mm a';

ALTER TABLE "OrganisationGlobalSettings"
ALTER COLUMN "documentDateFormat" SET DEFAULT 'MM/dd/yyyy hh:mm a';
