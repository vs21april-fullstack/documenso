UPDATE `DocumentMeta`
SET `dateFormat` = 'MM/dd/yyyy hh:mm a'
WHERE `dateFormat` = 'yyyy-MM-dd hh:mm a';

UPDATE `OrganisationGlobalSettings`
SET `documentDateFormat` = 'MM/dd/yyyy hh:mm a'
WHERE `documentDateFormat` = 'yyyy-MM-dd hh:mm a';

ALTER TABLE `DocumentMeta`
MODIFY `dateFormat` VARCHAR(191) NULL DEFAULT 'MM/dd/yyyy hh:mm a';

ALTER TABLE `OrganisationGlobalSettings`
MODIFY `documentDateFormat` VARCHAR(191) NOT NULL DEFAULT 'MM/dd/yyyy hh:mm a';
