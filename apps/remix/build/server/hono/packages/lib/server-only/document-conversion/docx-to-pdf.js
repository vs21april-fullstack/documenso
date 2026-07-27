import { AppError } from '../../errors/app-error.js';
import { IS_DOCUMENT_CONVERSION_ENABLED, DOCUMENT_CONVERSION_MIME_TYPE_DOCX } from '../../constants/document-conversion.js';
import { isCircuitOpen, recordSuccess, recordFailure } from './circuit-breaker.js';
import { convertDocxToPdfViaGotenberg } from './gotenberg.js';

const NOT_CONFIGURED_USER_MESSAGE = "Document conversion isn't enabled on this instance. Please upload a PDF.";
const UNAVAILABLE_USER_MESSAGE = 'Document conversion is temporarily unavailable. Please try again shortly or upload a PDF.';
/**
 * Converts a DOCX buffer to a PDF buffer via the configured Gotenberg
 * conversion service. Guards on feature-enabled and circuit-open state,
 * and emits a structured log line for each attempt.
 */
const convertDocxToPdf = async ({
  buffer,
  filename
}, logger) => {
  if (!IS_DOCUMENT_CONVERSION_ENABLED()) {
    throw new AppError('CONVERSION_SERVICE_UNAVAILABLE', {
      message: 'Conversion service not configured',
      userMessage: NOT_CONFIGURED_USER_MESSAGE,
      statusCode: 503
    });
  }
  if (isCircuitOpen()) {
    throw new AppError('CONVERSION_SERVICE_UNAVAILABLE', {
      message: 'Conversion circuit is open; failing fast',
      userMessage: UNAVAILABLE_USER_MESSAGE,
      statusCode: 503
    });
  }
  const startedAt = Date.now();
  try {
    const outputBuffer = await convertDocxToPdfViaGotenberg({
      buffer,
      filename
    });
    recordSuccess();
    logger?.info({
      event: 'document_conversion_attempt',
      filename,
      sourceMimeType: DOCUMENT_CONVERSION_MIME_TYPE_DOCX,
      durationMs: Date.now() - startedAt,
      inputBytes: buffer.byteLength,
      outputBytes: outputBuffer.byteLength
    });
    return outputBuffer;
  } catch (err) {
    recordFailure();
    const errMessage = err instanceof Error ? err.message : String(err);
    const errCode = err instanceof AppError ? err.code : 'UNKNOWN';
    const logData = {
      event: 'document_conversion_attempt',
      filename,
      sourceMimeType: DOCUMENT_CONVERSION_MIME_TYPE_DOCX,
      durationMs: Date.now() - startedAt,
      inputBytes: buffer.byteLength,
      failed: true,
      errorCode: errCode,
      error: errMessage
    };
    // A non-2xx from the conversion service surfaces as CONVERSION_FAILED.
    // We log those at `error` level (status + truncated body live in the
    // AppError message). All other failures stay at `info` to avoid noisy
    // logs from transient network blips that the breaker already handles.
    if (errCode === 'CONVERSION_FAILED') {
      logger?.error(logData);
    } else {
      logger?.info(logData);
    }
    throw err;
  }
};

export { convertDocxToPdf };
//# sourceMappingURL=docx-to-pdf.js.map
