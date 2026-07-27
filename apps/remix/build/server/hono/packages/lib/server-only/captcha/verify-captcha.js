import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { logger } from '../../utils/logger.js';

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
/**
 * Verify a captcha token server-side.
 *
 * Currently supports Cloudflare Turnstile. This is a no-op if
 * `NEXT_PRIVATE_TURNSTILE_SECRET_KEY` is not configured, making captcha
 * verification an opt-in feature.
 */
const verifyCaptchaToken = async ({
  token,
  ipAddress
}) => {
  const secretKey = process.env.NEXT_PRIVATE_TURNSTILE_SECRET_KEY;
  // If no secret key is configured, skip verification.
  if (!secretKey) {
    return;
  }
  if (!token) {
    logger.warn({
      msg: 'Captcha verification rejected: missing token',
      ipAddress
    });
    throw new AppError(AppErrorCode.INVALID_CAPTCHA, {
      message: 'Captcha token is required',
      statusCode: 400
    });
  }
  const formData = new URLSearchParams();
  formData.append('secret', secretKey);
  formData.append('response', token);
  if (ipAddress) {
    formData.append('remoteip', ipAddress);
  }
  let response;
  try {
    response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    });
  } catch (err) {
    logger.error({
      msg: 'Captcha verification failed: network error calling siteverify',
      err,
      ipAddress
    });
    throw new AppError(AppErrorCode.INVALID_CAPTCHA, {
      message: 'Captcha verification failed',
      statusCode: 400
    });
  }
  if (!response.ok) {
    logger.error({
      msg: 'Captcha verification failed: non-2xx response from siteverify',
      status: response.status,
      ipAddress
    });
    throw new AppError(AppErrorCode.INVALID_CAPTCHA, {
      message: `Captcha verification request failed with status ${response.status}`,
      statusCode: 400
    });
  }
  const result = await response.json();
  if (!result.success) {
    logger.warn({
      msg: 'Captcha verification rejected by provider',
      errorCodes: result['error-codes'],
      hostname: result.hostname,
      ipAddress
    });
    throw new AppError(AppErrorCode.INVALID_CAPTCHA, {
      message: `Captcha verification failed: ${result['error-codes']?.join(', ') ?? 'unknown'}`,
      statusCode: 400
    });
  }
};

export { verifyCaptchaToken };
//# sourceMappingURL=verify-captcha.js.map
