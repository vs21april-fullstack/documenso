import { JobClient } from './client/client.js';
import { SEND_ADMIN_USER_CREATED_EMAIL_JOB_DEFINITION } from './definitions/emails/send-admin-user-created-email.js';
import { SEND_CONFIRMATION_EMAIL_JOB_DEFINITION } from './definitions/emails/send-confirmation-email.js';
import { SEND_DOCUMENT_CANCELLED_EMAILS_JOB_DEFINITION } from './definitions/emails/send-document-cancelled-emails.js';
import { SEND_DOCUMENT_COMPLETED_EMAILS_JOB_DEFINITION } from './definitions/emails/send-document-completed-emails.js';
import { SEND_DOCUMENT_CREATED_FROM_DIRECT_TEMPLATE_EMAIL_JOB_DEFINITION } from './definitions/emails/send-document-created-from-direct-template-email.js';
import { SEND_DOCUMENT_DELETED_EMAILS_JOB_DEFINITION } from './definitions/emails/send-document-deleted-emails.js';
import { SEND_DOCUMENT_PENDING_EMAIL_JOB_DEFINITION } from './definitions/emails/send-document-pending-email.js';
import { SEND_ORGANISATION_LIMIT_ALERT_EMAIL_JOB_DEFINITION } from './definitions/emails/send-organisation-limit-alert-email.js';
import { SEND_ORGANISATION_MEMBER_JOINED_EMAIL_JOB_DEFINITION } from './definitions/emails/send-organisation-member-joined-email.js';
import { SEND_ORGANISATION_MEMBER_LEFT_EMAIL_JOB_DEFINITION } from './definitions/emails/send-organisation-member-left-email.js';
import { SEND_OWNER_RECIPIENT_EXPIRED_EMAIL_JOB_DEFINITION } from './definitions/emails/send-owner-recipient-expired-email.js';
import { SEND_PASSWORD_RESET_SUCCESS_EMAIL_JOB_DEFINITION } from './definitions/emails/send-password-reset-success-email.js';
import { SEND_RECIPIENT_REMOVED_EMAIL_JOB_DEFINITION } from './definitions/emails/send-recipient-removed-email.js';
import { SEND_RECIPIENT_SIGNED_EMAIL_JOB_DEFINITION } from './definitions/emails/send-recipient-signed-email.js';
import { SEND_SIGNING_REJECTION_EMAILS_JOB_DEFINITION } from './definitions/emails/send-rejection-emails.js';
import { SEND_SIGNING_EMAIL_JOB_DEFINITION } from './definitions/emails/send-signing-email.js';
import { SEND_TEAM_DELETED_EMAIL_JOB_DEFINITION } from './definitions/emails/send-team-deleted-email.js';
import { ADMIN_DELETE_ORGANISATION_JOB_DEFINITION } from './definitions/internal/admin-delete-organisation.js';
import { BACKPORT_SUBSCRIPTION_CLAIM_JOB_DEFINITION } from './definitions/internal/backport-subscription-claims.js';
import { BULK_SEND_TEMPLATE_JOB_DEFINITION } from './definitions/internal/bulk-send-template.js';
import { CANCEL_ORGANISATION_SUBSCRIPTION_JOB_DEFINITION } from './definitions/internal/cancel-organisation-subscription.js';
import { CLEANUP_RATE_LIMITS_JOB_DEFINITION } from './definitions/internal/cleanup-rate-limits.js';
import { EXECUTE_WEBHOOK_JOB_DEFINITION } from './definitions/internal/execute-webhook.js';
import { EXPIRE_RECIPIENTS_SWEEP_JOB_DEFINITION } from './definitions/internal/expire-recipients-sweep.js';
import { PROCESS_RECIPIENT_EXPIRED_JOB_DEFINITION } from './definitions/internal/process-recipient-expired.js';
import { PROCESS_SIGNING_REMINDER_JOB_DEFINITION } from './definitions/internal/process-signing-reminder.js';
import { SEAL_DOCUMENT_JOB_DEFINITION } from './definitions/internal/seal-document.js';
import { SEAL_DOCUMENT_SWEEP_JOB_DEFINITION } from './definitions/internal/seal-document-sweep.js';
import { SEND_SIGNING_REMINDERS_SWEEP_JOB_DEFINITION } from './definitions/internal/send-signing-reminders-sweep.js';
import { SYNC_EMAIL_DOMAINS_JOB_DEFINITION } from './definitions/internal/sync-email-domains.js';

/**
 * The `as const` assertion is load bearing as it provides the correct level of type inference for
 * triggering jobs.
 */
const jobsClient = new JobClient([SEND_ADMIN_USER_CREATED_EMAIL_JOB_DEFINITION, SEND_SIGNING_EMAIL_JOB_DEFINITION, SEND_CONFIRMATION_EMAIL_JOB_DEFINITION, SEND_ORGANISATION_MEMBER_JOINED_EMAIL_JOB_DEFINITION, SEND_ORGANISATION_MEMBER_LEFT_EMAIL_JOB_DEFINITION, SEND_ORGANISATION_LIMIT_ALERT_EMAIL_JOB_DEFINITION, SEND_TEAM_DELETED_EMAIL_JOB_DEFINITION, SEAL_DOCUMENT_JOB_DEFINITION, SEAL_DOCUMENT_SWEEP_JOB_DEFINITION, SEND_PASSWORD_RESET_SUCCESS_EMAIL_JOB_DEFINITION, SEND_SIGNING_REJECTION_EMAILS_JOB_DEFINITION, SEND_RECIPIENT_SIGNED_EMAIL_JOB_DEFINITION, SEND_RECIPIENT_REMOVED_EMAIL_JOB_DEFINITION, SEND_DOCUMENT_COMPLETED_EMAILS_JOB_DEFINITION, SEND_DOCUMENT_DELETED_EMAILS_JOB_DEFINITION, SEND_DOCUMENT_CANCELLED_EMAILS_JOB_DEFINITION, SEND_DOCUMENT_CREATED_FROM_DIRECT_TEMPLATE_EMAIL_JOB_DEFINITION, SEND_DOCUMENT_PENDING_EMAIL_JOB_DEFINITION, SEND_OWNER_RECIPIENT_EXPIRED_EMAIL_JOB_DEFINITION, BACKPORT_SUBSCRIPTION_CLAIM_JOB_DEFINITION, BULK_SEND_TEMPLATE_JOB_DEFINITION, EXECUTE_WEBHOOK_JOB_DEFINITION, EXPIRE_RECIPIENTS_SWEEP_JOB_DEFINITION, PROCESS_RECIPIENT_EXPIRED_JOB_DEFINITION, SEND_SIGNING_REMINDERS_SWEEP_JOB_DEFINITION, PROCESS_SIGNING_REMINDER_JOB_DEFINITION, CLEANUP_RATE_LIMITS_JOB_DEFINITION, SYNC_EMAIL_DOMAINS_JOB_DEFINITION, ADMIN_DELETE_ORGANISATION_JOB_DEFINITION, CANCEL_ORGANISATION_SUBSCRIPTION_JOB_DEFINITION]);
const jobs = jobsClient;

export { jobs, jobsClient };
//# sourceMappingURL=client.js.map
