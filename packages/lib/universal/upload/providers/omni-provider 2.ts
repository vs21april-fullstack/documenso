import path from 'node:path';
import { env } from '@documenso/lib/utils/env';
import { AppError, AppErrorCode } from '../../../errors/app-error';
import type { PresignedUrl, StorageProvider, UploadFileInput, UploadFileResult } from './storage-provider';

const getAuthHeader = (): Record<string, string> => {
  const token = env('TENANT_API_TOKEN');
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  return {};
};

const confirmFileWithRetry = async (fileId: string) => {
  const maxAttempts = 15;
  const authHeader = getAuthHeader();

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const confirmResponse = await fetch('https://api.omni00.com/api/tenant/files/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader,
      },
      body: JSON.stringify({ fileId }),
      credentials: 'include',
    });

    if (confirmResponse.status === 200) {
      const data = await confirmResponse.json();

      if (data.scanStatus === 'clean') {
        return;
      }

      if (data.scanStatus === 'infected') {
        throw new AppError(AppErrorCode.INVALID_REQUEST, {
          message: 'The uploaded file was rejected due to a failed virus scan.',
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
      continue;
    }

    if (confirmResponse.status === 202) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      continue;
    }

    if (confirmResponse.status === 422) {
      throw new AppError(AppErrorCode.INVALID_REQUEST, {
        message: 'The uploaded file was rejected or infected.',
      });
    }

    throw new Error(`Omni: Confirm failed with status ${confirmResponse.status}`);
  }

  throw new Error('Omni: Confirm timeout (file scan pending too long)');
};

export class OmniProvider implements StorageProvider {
  async getPresignPostUrl(fileName: string, contentType: string, _userId?: number): Promise<PresignedUrl> {
    const response = await fetch('https://api.omni00.com/api/tenant/files/upload-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({
        filename: fileName,
        contentType,
        size: 104857600, // 100MB max limit
      }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Omni: Failed to get upload-url: ${response.statusText}`);
    }

    const { uploadUrl, fileId } = await response.json();
    return { key: fileId, url: uploadUrl };
  }

  async getAbsolutePresignPostUrl(key: string): Promise<PresignedUrl> {
    const filename = path.basename(key);
    return await this.getPresignPostUrl(filename, 'application/pdf');
  }

  async getPresignGetUrl(key: string): Promise<PresignedUrl> {
    const authHeader = getAuthHeader();
    const downloadResponse = await fetch(`https://api.omni00.com/api/tenant/files/${key}/download-url`, {
      method: 'GET',
      headers: {
        ...authHeader,
      },
      credentials: 'include',
    });

    if (downloadResponse.status === 200) {
      const data = await downloadResponse.json();
      const url = data.url || data.downloadUrl || '';
      return { key, url };
    }

    // Fallback if not confirmed/scanned yet
    await confirmFileWithRetry(key);

    const retryResponse = await fetch(`https://api.omni00.com/api/tenant/files/${key}/download-url`, {
      method: 'GET',
      headers: {
        ...authHeader,
      },
      credentials: 'include',
    });

    if (!retryResponse.ok) {
      throw new Error(`Omni: Failed to get download URL: ${retryResponse.statusText}`);
    }

    const data = await retryResponse.json();
    const url = data.url || data.downloadUrl || '';
    return { key, url };
  }

  async uploadFile(input: UploadFileInput): Promise<UploadFileResult> {
    const size = input.body instanceof ArrayBuffer ? input.body.byteLength : input.body.length;
    const authHeader = getAuthHeader();

    const uploadUrlResponse = await fetch('https://api.omni00.com/api/tenant/files/upload-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader,
      },
      body: JSON.stringify({
        filename: input.name,
        contentType: input.type,
        size,
      }),
      credentials: 'include',
    });

    if (!uploadUrlResponse.ok) {
      throw new Error(`Omni: Failed to get upload-url: ${uploadUrlResponse.statusText}`);
    }

    const { uploadUrl, fileId, requiredHeaders } = await uploadUrlResponse.json();

    const putHeaders: Record<string, string> = {
      ...requiredHeaders,
    };
    if (!putHeaders['Content-Type'] && !putHeaders['content-type']) {
      putHeaders['Content-Type'] = input.type;
    }

    const body = input.body instanceof ArrayBuffer ? new Uint8Array(input.body) : input.body;

    const putResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: putHeaders,
      body,
    });

    if (!putResponse.ok) {
      throw new Error(`Omni: Failed to PUT file: ${putResponse.statusText}`);
    }

    await confirmFileWithRetry(fileId);

    return { key: fileId };
  }

  async deleteFile(key: string): Promise<void> {
    const authHeader = getAuthHeader();
    const response = await fetch(`https://api.omni00.com/api/tenant/files/${key}`, {
      method: 'DELETE',
      headers: {
        ...authHeader,
      },
      credentials: 'include',
    });

    if (!response.ok && response.status !== 404) {
      throw new Error(`Omni: Failed to delete file: ${response.statusText}`);
    }
  }
}
