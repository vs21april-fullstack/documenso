-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerified` DATETIME(3) NULL,
    `password` VARCHAR(191) NULL,
    `source` VARCHAR(191) NULL,
    `signature` LONGTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastSignedIn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `roles` JSON NOT NULL,
    `identityProvider` ENUM('DOCUMENSO', 'GOOGLE', 'OIDC') NOT NULL DEFAULT 'DOCUMENSO',
    `avatarImageId` VARCHAR(191) NULL,
    `disabled` BOOLEAN NOT NULL DEFAULT false,
    `twoFactorSecret` VARCHAR(191) NULL,
    `twoFactorEnabled` BOOLEAN NOT NULL DEFAULT false,
    `twoFactorBackupCodes` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamProfile` (
    `id` VARCHAR(191) NOT NULL,
    `enabled` BOOLEAN NOT NULL DEFAULT false,
    `teamId` INTEGER NOT NULL,
    `bio` VARCHAR(191) NULL,

    UNIQUE INDEX `TeamProfile_teamId_key`(`teamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSecurityAuditLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `type` ENUM('ACCOUNT_PROFILE_UPDATE', 'ACCOUNT_SSO_LINK', 'ACCOUNT_SSO_UNLINK', 'ORGANISATION_SSO_LINK', 'ORGANISATION_SSO_UNLINK', 'AUTH_2FA_DISABLE', 'AUTH_2FA_ENABLE', 'PASSKEY_CREATED', 'PASSKEY_DELETED', 'PASSKEY_UPDATED', 'PASSWORD_RESET', 'PASSWORD_UPDATE', 'SESSION_REVOKED', 'SIGN_OUT', 'SIGN_IN', 'SIGN_IN_FAIL', 'SIGN_IN_2FA_FAIL', 'SIGN_IN_PASSKEY_FAIL') NOT NULL,
    `userAgent` VARCHAR(191) NULL,
    `ipAddress` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PasswordResetToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiry` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `PasswordResetToken_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Passkey` (
    `id` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastUsedAt` DATETIME(3) NULL,
    `credentialId` LONGBLOB NOT NULL,
    `credentialPublicKey` LONGBLOB NOT NULL,
    `counter` BIGINT NOT NULL,
    `credentialDeviceType` VARCHAR(191) NOT NULL,
    `credentialBackedUp` BOOLEAN NOT NULL,
    `transports` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnonymousVerificationToken` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `AnonymousVerificationToken_id_key`(`id`),
    UNIQUE INDEX `AnonymousVerificationToken_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `secondaryId` VARCHAR(191) NOT NULL,
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `completed` BOOLEAN NOT NULL DEFAULT false,
    `expires` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `metadata` JSON NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `VerificationToken_secondaryId_key`(`secondaryId`),
    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Webhook` (
    `id` VARCHAR(191) NOT NULL,
    `webhookUrl` VARCHAR(191) NOT NULL,
    `eventTriggers` JSON NOT NULL,
    `secret` VARCHAR(191) NULL,
    `enabled` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,
    `teamId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WebhookCall` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('SUCCESS', 'FAILED') NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `event` ENUM('DOCUMENT_CREATED', 'DOCUMENT_SENT', 'DOCUMENT_OPENED', 'DOCUMENT_SIGNED', 'DOCUMENT_COMPLETED', 'DOCUMENT_REJECTED', 'DOCUMENT_CANCELLED', 'RECIPIENT_EXPIRED', 'DOCUMENT_RECIPIENT_COMPLETED', 'DOCUMENT_REMINDER_SENT', 'TEMPLATE_CREATED', 'TEMPLATE_UPDATED', 'TEMPLATE_DELETED', 'TEMPLATE_USED') NOT NULL,
    `requestBody` JSON NOT NULL,
    `responseCode` INTEGER NOT NULL,
    `responseHeaders` JSON NULL,
    `responseBody` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `webhookId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ApiToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `algorithm` ENUM('SHA512') NOT NULL DEFAULT 'SHA512',
    `expires` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NULL,
    `teamId` INTEGER NOT NULL,

    UNIQUE INDEX `ApiToken_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subscription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('ACTIVE', 'PAST_DUE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE',
    `planId` VARCHAR(191) NOT NULL,
    `priceId` VARCHAR(191) NOT NULL,
    `periodEnd` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `cancelAtPeriodEnd` BOOLEAN NOT NULL DEFAULT false,
    `customerId` VARCHAR(191) NOT NULL,
    `organisationId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Subscription_planId_key`(`planId`),
    UNIQUE INDEX `Subscription_organisationId_key`(`organisationId`),
    INDEX `Subscription_organisationId_idx`(`organisationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubscriptionClaim` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `locked` BOOLEAN NOT NULL DEFAULT false,
    `teamCount` INTEGER NOT NULL,
    `memberCount` INTEGER NOT NULL,
    `envelopeItemCount` INTEGER NOT NULL,
    `recipientCount` INTEGER NOT NULL,
    `flags` JSON NOT NULL,
    `documentRateLimits` JSON NOT NULL,
    `documentQuota` INTEGER NULL,
    `emailRateLimits` JSON NOT NULL,
    `emailQuota` INTEGER NULL,
    `apiRateLimits` JSON NOT NULL,
    `apiQuota` INTEGER NULL,
    `emailTransportId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrganisationClaim` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `originalSubscriptionClaimId` VARCHAR(191) NULL,
    `teamCount` INTEGER NOT NULL,
    `memberCount` INTEGER NOT NULL,
    `envelopeItemCount` INTEGER NOT NULL,
    `recipientCount` INTEGER NOT NULL,
    `flags` JSON NOT NULL,
    `documentRateLimits` JSON NOT NULL,
    `documentQuota` INTEGER NULL,
    `emailRateLimits` JSON NOT NULL,
    `emailQuota` INTEGER NULL,
    `apiRateLimits` JSON NOT NULL,
    `apiQuota` INTEGER NULL,
    `emailTransportId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrganisationMonthlyStat` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `organisationId` VARCHAR(191) NOT NULL,
    `period` VARCHAR(191) NOT NULL,
    `documentCount` INTEGER NOT NULL DEFAULT 0,
    `emailCount` INTEGER NOT NULL DEFAULT 0,
    `apiCount` INTEGER NOT NULL DEFAULT 0,
    `emailReports` INTEGER NOT NULL DEFAULT 0,

    INDEX `OrganisationMonthlyStat_organisationId_idx`(`organisationId`),
    UNIQUE INDEX `OrganisationMonthlyStat_organisationId_period_key`(`organisationId`, `period`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `created_at` INTEGER NULL,
    `ext_expires_in` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `ipAddress` VARCHAR(191) NULL,
    `userAgent` VARCHAR(191) NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    INDEX `Session_userId_idx`(`userId`),
    INDEX `Session_sessionToken_idx`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Folder` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `teamId` INTEGER NOT NULL,
    `pinned` BOOLEAN NOT NULL DEFAULT false,
    `parentId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `visibility` ENUM('EVERYONE', 'MANAGER_AND_ABOVE', 'ADMIN') NOT NULL DEFAULT 'EVERYONE',
    `type` ENUM('DOCUMENT', 'TEMPLATE') NOT NULL,

    INDEX `Folder_userId_idx`(`userId`),
    INDEX `Folder_teamId_idx`(`teamId`),
    INDEX `Folder_parentId_idx`(`parentId`),
    INDEX `Folder_type_idx`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Envelope` (
    `id` VARCHAR(191) NOT NULL,
    `secondaryId` VARCHAR(191) NOT NULL,
    `externalId` VARCHAR(191) NULL,
    `type` ENUM('DOCUMENT', 'TEMPLATE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `completedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,
    `title` VARCHAR(191) NOT NULL,
    `status` ENUM('DRAFT', 'PENDING', 'COMPLETED', 'REJECTED', 'CANCELLED') NOT NULL DEFAULT 'DRAFT',
    `source` ENUM('DOCUMENT', 'TEMPLATE', 'TEMPLATE_DIRECT_LINK') NOT NULL,
    `qrToken` VARCHAR(191) NULL,
    `signatureLevel` VARCHAR(191) NOT NULL,
    `internalVersion` INTEGER NOT NULL,
    `useLegacyFieldInsertion` BOOLEAN NOT NULL DEFAULT false,
    `authOptions` JSON NULL,
    `formValues` JSON NULL,
    `visibility` ENUM('EVERYONE', 'MANAGER_AND_ABOVE', 'ADMIN') NOT NULL DEFAULT 'EVERYONE',
    `templateType` ENUM('PUBLIC', 'PRIVATE', 'ORGANISATION') NOT NULL DEFAULT 'PRIVATE',
    `publicTitle` VARCHAR(191) NOT NULL DEFAULT '',
    `publicDescription` VARCHAR(191) NOT NULL DEFAULT '',
    `templateId` INTEGER NULL,
    `userId` INTEGER NOT NULL,
    `teamId` INTEGER NOT NULL,
    `folderId` VARCHAR(191) NULL,
    `documentMetaId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Envelope_secondaryId_key`(`secondaryId`),
    UNIQUE INDEX `Envelope_documentMetaId_key`(`documentMetaId`),
    INDEX `Envelope_type_idx`(`type`),
    INDEX `Envelope_status_idx`(`status`),
    INDEX `Envelope_userId_idx`(`userId`),
    INDEX `Envelope_teamId_idx`(`teamId`),
    INDEX `Envelope_folderId_idx`(`folderId`),
    INDEX `Envelope_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnvelopeItem` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,
    `documentDataId` VARCHAR(191) NOT NULL,
    `envelopeId` VARCHAR(191) NOT NULL,

    INDEX `EnvelopeItem_envelopeId_idx`(`envelopeId`),
    UNIQUE INDEX `EnvelopeItem_documentDataId_key`(`documentDataId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocumentAuditLog` (
    `id` VARCHAR(191) NOT NULL,
    `envelopeId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `type` VARCHAR(191) NOT NULL,
    `data` JSON NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `userId` INTEGER NULL,
    `userAgent` VARCHAR(191) NULL,
    `ipAddress` VARCHAR(191) NULL,

    INDEX `DocumentAuditLog_envelopeId_idx`(`envelopeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocumentData` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('S3_PATH', 'BYTES', 'BYTES_64') NOT NULL,
    `data` LONGTEXT NOT NULL,
    `initialData` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocumentMeta` (
    `id` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NULL,
    `message` TEXT NULL,
    `timezone` VARCHAR(191) NULL DEFAULT 'Etc/UTC',
    `dateFormat` VARCHAR(191) NULL DEFAULT 'yyyy-MM-dd hh:mm a',
    `redirectUrl` VARCHAR(191) NULL,
    `signingOrder` ENUM('PARALLEL', 'SEQUENTIAL') NOT NULL DEFAULT 'PARALLEL',
    `allowDictateNextSigner` BOOLEAN NOT NULL DEFAULT false,
    `typedSignatureEnabled` BOOLEAN NOT NULL DEFAULT true,
    `uploadSignatureEnabled` BOOLEAN NOT NULL DEFAULT true,
    `drawSignatureEnabled` BOOLEAN NOT NULL DEFAULT true,
    `language` VARCHAR(191) NOT NULL DEFAULT 'en',
    `distributionMethod` ENUM('EMAIL', 'NONE') NOT NULL DEFAULT 'EMAIL',
    `emailSettings` JSON NULL,
    `emailReplyTo` VARCHAR(191) NULL,
    `emailId` VARCHAR(191) NULL,
    `envelopeExpirationPeriod` JSON NULL,
    `reminderSettings` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnvelopeAttachment` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `data` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `envelopeId` VARCHAR(191) NOT NULL,

    INDEX `EnvelopeAttachment_envelopeId_idx`(`envelopeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recipient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `envelopeId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL DEFAULT '',
    `token` VARCHAR(191) NOT NULL,
    `documentDeletedAt` DATETIME(3) NULL,
    `expired` DATETIME(3) NULL,
    `expiresAt` DATETIME(3) NULL,
    `expirationNotifiedAt` DATETIME(3) NULL,
    `sentAt` DATETIME(3) NULL,
    `signedAt` DATETIME(3) NULL,
    `lastReminderSentAt` DATETIME(3) NULL,
    `nextReminderAt` DATETIME(3) NULL,
    `reminderCount` INTEGER NOT NULL DEFAULT 0,
    `authOptions` JSON NULL,
    `signingOrder` INTEGER NULL,
    `rejectionReason` TEXT NULL,
    `role` ENUM('CC', 'SIGNER', 'VIEWER', 'APPROVER', 'ASSISTANT') NOT NULL DEFAULT 'SIGNER',
    `readStatus` ENUM('NOT_OPENED', 'OPENED') NOT NULL DEFAULT 'NOT_OPENED',
    `signingStatus` ENUM('NOT_SIGNED', 'SIGNED', 'REJECTED') NOT NULL DEFAULT 'NOT_SIGNED',
    `sendStatus` ENUM('NOT_SENT', 'SENT') NOT NULL DEFAULT 'NOT_SENT',

    INDEX `Recipient_token_idx`(`token`),
    INDEX `Recipient_email_idx`(`email`),
    INDEX `Recipient_envelopeId_idx`(`envelopeId`),
    INDEX `Recipient_signedAt_idx`(`signedAt`),
    INDEX `Recipient_expiresAt_idx`(`expiresAt`),
    INDEX `Recipient_email_documentDeletedAt_envelopeId_idx`(`email`, `documentDeletedAt`, `envelopeId`),
    INDEX `Recipient_email_envelopeId_idx`(`email`, `envelopeId`),
    INDEX `Recipient_email_signingStatus_envelopeId_role_idx`(`email`, `signingStatus`, `envelopeId`, `role`),
    INDEX `Recipient_nextReminderAt_idx`(`nextReminderAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Field` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `secondaryId` VARCHAR(191) NOT NULL,
    `envelopeId` VARCHAR(191) NOT NULL,
    `envelopeItemId` VARCHAR(191) NOT NULL,
    `recipientId` INTEGER NOT NULL,
    `type` ENUM('SIGNATURE', 'FREE_SIGNATURE', 'INITIALS', 'NAME', 'EMAIL', 'DATE', 'TEXT', 'NUMBER', 'RADIO', 'CHECKBOX', 'DROPDOWN') NOT NULL,
    `page` INTEGER NOT NULL,
    `positionX` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `positionY` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `width` DECIMAL(65, 30) NOT NULL DEFAULT -1,
    `height` DECIMAL(65, 30) NOT NULL DEFAULT -1,
    `customText` LONGTEXT NOT NULL,
    `inserted` BOOLEAN NOT NULL,
    `fieldMeta` JSON NULL,

    UNIQUE INDEX `Field_secondaryId_key`(`secondaryId`),
    INDEX `Field_envelopeId_idx`(`envelopeId`),
    INDEX `Field_envelopeItemId_idx`(`envelopeItemId`),
    INDEX `Field_recipientId_idx`(`recipientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Signature` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `recipientId` INTEGER NOT NULL,
    `fieldId` INTEGER NOT NULL,
    `signatureImageAsBase64` LONGTEXT NULL,
    `typedSignature` VARCHAR(191) NULL,

    UNIQUE INDEX `Signature_fieldId_key`(`fieldId`),
    INDEX `Signature_recipientId_idx`(`recipientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CscCredential` (
    `id` VARCHAR(191) NOT NULL,
    `providerId` VARCHAR(191) NOT NULL,
    `credentialId` VARCHAR(191) NOT NULL,
    `certCache` LONGBLOB NULL,
    `signatureAlgorithm` VARCHAR(191) NOT NULL,
    `keyType` VARCHAR(191) NOT NULL,
    `digestAlgorithm` VARCHAR(191) NOT NULL,
    `keyLenBits` INTEGER NULL,
    `signAlgoParams` VARCHAR(191) NULL,
    `serviceTokenCiphertext` LONGBLOB NULL,
    `serviceTokenExpiresAt` DATETIME(3) NULL,
    `recipientId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CscCredential_recipientId_key`(`recipientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CscSession` (
    `id` VARCHAR(191) NOT NULL,
    `envelopeId` VARCHAR(191) NOT NULL,
    `signingTime` DATETIME(3) NOT NULL,
    `itemsJson` JSON NOT NULL,
    `encryptedSad` LONGBLOB NULL,
    `sadExpiresAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `recipientId` INTEGER NOT NULL,

    UNIQUE INDEX `CscSession_recipientId_key`(`recipientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocumentShareLink` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `envelopeId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `DocumentShareLink_slug_key`(`slug`),
    UNIQUE INDEX `DocumentShareLink_envelopeId_email_key`(`envelopeId`, `email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Organisation` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `type` ENUM('PERSONAL', 'ORGANISATION') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `avatarImageId` VARCHAR(191) NULL,
    `customerId` VARCHAR(191) NULL,
    `organisationClaimId` VARCHAR(191) NOT NULL,
    `ownerUserId` INTEGER NOT NULL,
    `organisationGlobalSettingsId` VARCHAR(191) NOT NULL,
    `organisationAuthenticationPortalId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Organisation_url_key`(`url`),
    UNIQUE INDEX `Organisation_customerId_key`(`customerId`),
    UNIQUE INDEX `Organisation_organisationClaimId_key`(`organisationClaimId`),
    UNIQUE INDEX `Organisation_organisationGlobalSettingsId_key`(`organisationGlobalSettingsId`),
    UNIQUE INDEX `Organisation_organisationAuthenticationPortalId_key`(`organisationAuthenticationPortalId`),
    INDEX `Organisation_name_idx`(`name`),
    INDEX `Organisation_ownerUserId_idx`(`ownerUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrganisationMember` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,
    `organisationId` VARCHAR(191) NOT NULL,

    INDEX `OrganisationMember_organisationId_idx`(`organisationId`),
    UNIQUE INDEX `OrganisationMember_userId_organisationId_key`(`userId`, `organisationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrganisationMemberInvite` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `status` ENUM('ACCEPTED', 'PENDING', 'DECLINED') NOT NULL DEFAULT 'PENDING',
    `organisationId` VARCHAR(191) NOT NULL,
    `organisationRole` ENUM('ADMIN', 'MANAGER', 'MEMBER') NOT NULL,

    UNIQUE INDEX `OrganisationMemberInvite_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrganisationGroup` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `type` ENUM('INTERNAL_ORGANISATION', 'INTERNAL_TEAM', 'CUSTOM') NOT NULL,
    `organisationRole` ENUM('ADMIN', 'MANAGER', 'MEMBER') NOT NULL,
    `organisationId` VARCHAR(191) NOT NULL,

    INDEX `OrganisationGroup_organisationId_idx`(`organisationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrganisationGroupMember` (
    `id` VARCHAR(191) NOT NULL,
    `groupId` VARCHAR(191) NOT NULL,
    `organisationMemberId` VARCHAR(191) NOT NULL,

    INDEX `OrganisationGroupMember_groupId_idx`(`groupId`),
    INDEX `OrganisationGroupMember_organisationMemberId_idx`(`organisationMemberId`),
    UNIQUE INDEX `OrganisationGroupMember_organisationMemberId_groupId_key`(`organisationMemberId`, `groupId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamGroup` (
    `id` VARCHAR(191) NOT NULL,
    `organisationGroupId` VARCHAR(191) NOT NULL,
    `teamRole` ENUM('ADMIN', 'MANAGER', 'MEMBER') NOT NULL,
    `teamId` INTEGER NOT NULL,

    INDEX `TeamGroup_teamId_idx`(`teamId`),
    INDEX `TeamGroup_organisationGroupId_idx`(`organisationGroupId`),
    UNIQUE INDEX `TeamGroup_teamId_organisationGroupId_key`(`teamId`, `organisationGroupId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrganisationGlobalSettings` (
    `id` VARCHAR(191) NOT NULL,
    `documentVisibility` ENUM('EVERYONE', 'MANAGER_AND_ABOVE', 'ADMIN') NOT NULL DEFAULT 'EVERYONE',
    `documentLanguage` VARCHAR(191) NOT NULL DEFAULT 'en',
    `includeSenderDetails` BOOLEAN NOT NULL DEFAULT true,
    `includeSigningCertificate` BOOLEAN NOT NULL DEFAULT true,
    `includeAuditLog` BOOLEAN NOT NULL DEFAULT false,
    `documentTimezone` VARCHAR(191) NULL,
    `documentDateFormat` VARCHAR(191) NOT NULL DEFAULT 'yyyy-MM-dd hh:mm a',
    `delegateDocumentOwnership` BOOLEAN NOT NULL DEFAULT false,
    `typedSignatureEnabled` BOOLEAN NOT NULL DEFAULT true,
    `uploadSignatureEnabled` BOOLEAN NOT NULL DEFAULT true,
    `drawSignatureEnabled` BOOLEAN NOT NULL DEFAULT true,
    `defaultRecipients` JSON NULL,
    `emailId` VARCHAR(191) NULL,
    `emailReplyTo` VARCHAR(191) NULL,
    `emailDocumentSettings` JSON NOT NULL,
    `brandingEnabled` BOOLEAN NOT NULL DEFAULT false,
    `brandingLogo` VARCHAR(191) NOT NULL DEFAULT '',
    `brandingUrl` VARCHAR(191) NOT NULL DEFAULT '',
    `brandingCompanyDetails` VARCHAR(191) NOT NULL DEFAULT '',
    `brandingColors` JSON NULL,
    `brandingCss` VARCHAR(191) NOT NULL DEFAULT '',
    `envelopeExpirationPeriod` JSON NULL,
    `reminderSettings` JSON NULL,
    `aiFeaturesEnabled` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamGlobalSettings` (
    `id` VARCHAR(191) NOT NULL,
    `documentVisibility` ENUM('EVERYONE', 'MANAGER_AND_ABOVE', 'ADMIN') NULL,
    `documentLanguage` VARCHAR(191) NULL,
    `documentTimezone` VARCHAR(191) NULL,
    `documentDateFormat` VARCHAR(191) NULL,
    `delegateDocumentOwnership` BOOLEAN NULL,
    `includeSenderDetails` BOOLEAN NULL,
    `includeSigningCertificate` BOOLEAN NULL,
    `includeAuditLog` BOOLEAN NULL,
    `typedSignatureEnabled` BOOLEAN NULL,
    `uploadSignatureEnabled` BOOLEAN NULL,
    `drawSignatureEnabled` BOOLEAN NULL,
    `defaultRecipients` JSON NULL,
    `emailId` VARCHAR(191) NULL,
    `emailReplyTo` VARCHAR(191) NULL,
    `emailDocumentSettings` JSON NULL,
    `brandingEnabled` BOOLEAN NULL,
    `brandingLogo` VARCHAR(191) NULL,
    `brandingUrl` VARCHAR(191) NULL,
    `brandingCompanyDetails` VARCHAR(191) NULL,
    `brandingColors` JSON NULL,
    `brandingCss` VARCHAR(191) NULL,
    `envelopeExpirationPeriod` JSON NULL,
    `reminderSettings` JSON NULL,
    `aiFeaturesEnabled` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `avatarImageId` VARCHAR(191) NULL,
    `organisationId` VARCHAR(191) NOT NULL,
    `teamGlobalSettingsId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Team_url_key`(`url`),
    UNIQUE INDEX `Team_teamGlobalSettingsId_key`(`teamGlobalSettingsId`),
    INDEX `Team_name_idx`(`name`),
    INDEX `Team_organisationId_idx`(`organisationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamEmail` (
    `teamId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TeamEmail_teamId_key`(`teamId`),
    UNIQUE INDEX `TeamEmail_email_key`(`email`),
    PRIMARY KEY (`teamId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamEmailVerification` (
    `teamId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `completed` BOOLEAN NOT NULL DEFAULT false,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `TeamEmailVerification_teamId_key`(`teamId`),
    UNIQUE INDEX `TeamEmailVerification_token_key`(`token`),
    PRIMARY KEY (`teamId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TemplateDirectLink` (
    `id` VARCHAR(191) NOT NULL,
    `envelopeId` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `enabled` BOOLEAN NOT NULL,
    `directTemplateRecipientId` INTEGER NOT NULL,

    UNIQUE INDEX `TemplateDirectLink_id_key`(`id`),
    UNIQUE INDEX `TemplateDirectLink_envelopeId_key`(`envelopeId`),
    UNIQUE INDEX `TemplateDirectLink_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteSettings` (
    `id` VARCHAR(191) NOT NULL,
    `enabled` BOOLEAN NOT NULL DEFAULT false,
    `data` JSON NOT NULL,
    `lastModifiedByUserId` INTEGER NULL,
    `lastModifiedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BackgroundJob` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `payload` JSON NULL,
    `retried` INTEGER NOT NULL DEFAULT 0,
    `maxRetries` INTEGER NOT NULL DEFAULT 3,
    `jobId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `version` VARCHAR(191) NOT NULL,
    `submittedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `completedAt` DATETIME(3) NULL,
    `lastRetriedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BackgroundJobTask` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `result` JSON NULL,
    `retried` INTEGER NOT NULL DEFAULT 0,
    `maxRetries` INTEGER NOT NULL DEFAULT 3,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `completedAt` DATETIME(3) NULL,
    `jobId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AvatarImage` (
    `id` VARCHAR(191) NOT NULL,
    `bytes` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmailDomain` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `status` ENUM('PENDING', 'ACTIVE') NOT NULL DEFAULT 'PENDING',
    `selector` VARCHAR(191) NOT NULL,
    `domain` VARCHAR(191) NOT NULL,
    `publicKey` TEXT NOT NULL,
    `privateKey` TEXT NOT NULL,
    `lastVerifiedAt` DATETIME(3) NULL,
    `organisationId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `EmailDomain_selector_key`(`selector`),
    UNIQUE INDEX `EmailDomain_domain_key`(`domain`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrganisationEmail` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailName` VARCHAR(191) NOT NULL,
    `emailDomainId` VARCHAR(191) NOT NULL,
    `organisationId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `OrganisationEmail_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmailTransport` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('SMTP_AUTH', 'SMTP_API', 'RESEND', 'MAILCHANNELS') NOT NULL,
    `fromName` VARCHAR(191) NOT NULL,
    `fromAddress` VARCHAR(191) NOT NULL,
    `config` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrganisationAuthenticationPortal` (
    `id` VARCHAR(191) NOT NULL,
    `enabled` BOOLEAN NOT NULL DEFAULT false,
    `clientId` VARCHAR(191) NOT NULL DEFAULT '',
    `clientSecret` VARCHAR(191) NOT NULL DEFAULT '',
    `wellKnownUrl` VARCHAR(191) NOT NULL DEFAULT '',
    `defaultOrganisationRole` ENUM('ADMIN', 'MANAGER', 'MEMBER') NOT NULL DEFAULT 'MEMBER',
    `autoProvisionUsers` BOOLEAN NOT NULL DEFAULT true,
    `allowedDomains` JSON NOT NULL,
    `allowPersonalOrganisations` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Counter` (
    `id` VARCHAR(191) NOT NULL,
    `value` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RateLimit` (
    `key` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `bucket` DATETIME(3) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `RateLimit_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`key`, `action`, `bucket`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_avatarImageId_fkey` FOREIGN KEY (`avatarImageId`) REFERENCES `AvatarImage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamProfile` ADD CONSTRAINT `TeamProfile_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSecurityAuditLog` ADD CONSTRAINT `UserSecurityAuditLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PasswordResetToken` ADD CONSTRAINT `PasswordResetToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Passkey` ADD CONSTRAINT `Passkey_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VerificationToken` ADD CONSTRAINT `VerificationToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Webhook` ADD CONSTRAINT `Webhook_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Webhook` ADD CONSTRAINT `Webhook_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WebhookCall` ADD CONSTRAINT `WebhookCall_webhookId_fkey` FOREIGN KEY (`webhookId`) REFERENCES `Webhook`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApiToken` ADD CONSTRAINT `ApiToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApiToken` ADD CONSTRAINT `ApiToken_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_organisationId_fkey` FOREIGN KEY (`organisationId`) REFERENCES `Organisation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubscriptionClaim` ADD CONSTRAINT `SubscriptionClaim_emailTransportId_fkey` FOREIGN KEY (`emailTransportId`) REFERENCES `EmailTransport`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrganisationClaim` ADD CONSTRAINT `OrganisationClaim_emailTransportId_fkey` FOREIGN KEY (`emailTransportId`) REFERENCES `EmailTransport`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrganisationMonthlyStat` ADD CONSTRAINT `OrganisationMonthlyStat_organisationId_fkey` FOREIGN KEY (`organisationId`) REFERENCES `Organisation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Folder` ADD CONSTRAINT `Folder_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Folder` ADD CONSTRAINT `Folder_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Folder` ADD CONSTRAINT `Folder_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Folder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Envelope` ADD CONSTRAINT `Envelope_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Envelope` ADD CONSTRAINT `Envelope_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Envelope` ADD CONSTRAINT `Envelope_folderId_fkey` FOREIGN KEY (`folderId`) REFERENCES `Folder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Envelope` ADD CONSTRAINT `Envelope_documentMetaId_fkey` FOREIGN KEY (`documentMetaId`) REFERENCES `DocumentMeta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnvelopeItem` ADD CONSTRAINT `EnvelopeItem_documentDataId_fkey` FOREIGN KEY (`documentDataId`) REFERENCES `DocumentData`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnvelopeItem` ADD CONSTRAINT `EnvelopeItem_envelopeId_fkey` FOREIGN KEY (`envelopeId`) REFERENCES `Envelope`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocumentAuditLog` ADD CONSTRAINT `DocumentAuditLog_envelopeId_fkey` FOREIGN KEY (`envelopeId`) REFERENCES `Envelope`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnvelopeAttachment` ADD CONSTRAINT `EnvelopeAttachment_envelopeId_fkey` FOREIGN KEY (`envelopeId`) REFERENCES `Envelope`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recipient` ADD CONSTRAINT `Recipient_envelopeId_fkey` FOREIGN KEY (`envelopeId`) REFERENCES `Envelope`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Field` ADD CONSTRAINT `Field_envelopeItemId_fkey` FOREIGN KEY (`envelopeItemId`) REFERENCES `EnvelopeItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Field` ADD CONSTRAINT `Field_envelopeId_fkey` FOREIGN KEY (`envelopeId`) REFERENCES `Envelope`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Field` ADD CONSTRAINT `Field_recipientId_fkey` FOREIGN KEY (`recipientId`) REFERENCES `Recipient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Signature` ADD CONSTRAINT `Signature_recipientId_fkey` FOREIGN KEY (`recipientId`) REFERENCES `Recipient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Signature` ADD CONSTRAINT `Signature_fieldId_fkey` FOREIGN KEY (`fieldId`) REFERENCES `Field`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CscCredential` ADD CONSTRAINT `CscCredential_recipientId_fkey` FOREIGN KEY (`recipientId`) REFERENCES `Recipient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CscSession` ADD CONSTRAINT `CscSession_recipientId_fkey` FOREIGN KEY (`recipientId`) REFERENCES `Recipient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocumentShareLink` ADD CONSTRAINT `DocumentShareLink_envelopeId_fkey` FOREIGN KEY (`envelopeId`) REFERENCES `Envelope`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Organisation` ADD CONSTRAINT `Organisation_organisationClaimId_fkey` FOREIGN KEY (`organisationClaimId`) REFERENCES `OrganisationClaim`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Organisation` ADD CONSTRAINT `Organisation_avatarImageId_fkey` FOREIGN KEY (`avatarImageId`) REFERENCES `AvatarImage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Organisation` ADD CONSTRAINT `Organisation_ownerUserId_fkey` FOREIGN KEY (`ownerUserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Organisation` ADD CONSTRAINT `Organisation_organisationGlobalSettingsId_fkey` FOREIGN KEY (`organisationGlobalSettingsId`) REFERENCES `OrganisationGlobalSettings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Organisation` ADD CONSTRAINT `Organisation_organisationAuthenticationPortalId_fkey` FOREIGN KEY (`organisationAuthenticationPortalId`) REFERENCES `OrganisationAuthenticationPortal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrganisationMember` ADD CONSTRAINT `OrganisationMember_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrganisationMember` ADD CONSTRAINT `OrganisationMember_organisationId_fkey` FOREIGN KEY (`organisationId`) REFERENCES `Organisation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrganisationMemberInvite` ADD CONSTRAINT `OrganisationMemberInvite_organisationId_fkey` FOREIGN KEY (`organisationId`) REFERENCES `Organisation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrganisationGroup` ADD CONSTRAINT `OrganisationGroup_organisationId_fkey` FOREIGN KEY (`organisationId`) REFERENCES `Organisation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrganisationGroupMember` ADD CONSTRAINT `OrganisationGroupMember_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `OrganisationGroup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrganisationGroupMember` ADD CONSTRAINT `OrganisationGroupMember_organisationMemberId_fkey` FOREIGN KEY (`organisationMemberId`) REFERENCES `OrganisationMember`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamGroup` ADD CONSTRAINT `TeamGroup_organisationGroupId_fkey` FOREIGN KEY (`organisationGroupId`) REFERENCES `OrganisationGroup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamGroup` ADD CONSTRAINT `TeamGroup_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrganisationGlobalSettings` ADD CONSTRAINT `OrganisationGlobalSettings_emailId_fkey` FOREIGN KEY (`emailId`) REFERENCES `OrganisationEmail`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamGlobalSettings` ADD CONSTRAINT `TeamGlobalSettings_emailId_fkey` FOREIGN KEY (`emailId`) REFERENCES `OrganisationEmail`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_avatarImageId_fkey` FOREIGN KEY (`avatarImageId`) REFERENCES `AvatarImage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_organisationId_fkey` FOREIGN KEY (`organisationId`) REFERENCES `Organisation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_teamGlobalSettingsId_fkey` FOREIGN KEY (`teamGlobalSettingsId`) REFERENCES `TeamGlobalSettings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamEmail` ADD CONSTRAINT `TeamEmail_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamEmailVerification` ADD CONSTRAINT `TeamEmailVerification_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TemplateDirectLink` ADD CONSTRAINT `TemplateDirectLink_envelopeId_fkey` FOREIGN KEY (`envelopeId`) REFERENCES `Envelope`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SiteSettings` ADD CONSTRAINT `SiteSettings_lastModifiedByUserId_fkey` FOREIGN KEY (`lastModifiedByUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BackgroundJobTask` ADD CONSTRAINT `BackgroundJobTask_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `BackgroundJob`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmailDomain` ADD CONSTRAINT `EmailDomain_organisationId_fkey` FOREIGN KEY (`organisationId`) REFERENCES `Organisation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrganisationEmail` ADD CONSTRAINT `OrganisationEmail_emailDomainId_fkey` FOREIGN KEY (`emailDomainId`) REFERENCES `EmailDomain`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrganisationEmail` ADD CONSTRAINT `OrganisationEmail_organisationId_fkey` FOREIGN KEY (`organisationId`) REFERENCES `Organisation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
