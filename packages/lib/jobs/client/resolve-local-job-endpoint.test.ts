import { describe, expect, it } from 'vitest';

import { resolveLocalJobEndpoint } from './resolve-local-job-endpoint';

describe('resolveLocalJobEndpoint', () => {
  it('preserves the public mount path when the internal URL uses the same origin root', () => {
    expect(
      resolveLocalJobEndpoint({
        internalWebAppUrl: 'https://api.example.com',
        publicWebAppUrl: 'https://api.example.com/published-apps/17/160/',
        jobDefinitionId: 'internal.seal-document',
        jobId: 'job_123',
      }),
    ).toBe('https://api.example.com/published-apps/17/160/api/jobs/internal.seal-document/job_123');
  });

  it('keeps a dedicated internal service URL at its root', () => {
    expect(
      resolveLocalJobEndpoint({
        internalWebAppUrl: 'http://localhost:10000',
        publicWebAppUrl: 'https://api.example.com/published-apps/17/160/',
        jobDefinitionId: 'internal.seal-document',
        jobId: 'job_123',
      }),
    ).toBe('http://localhost:10000/api/jobs/internal.seal-document/job_123');
  });

  it('keeps an explicitly configured internal mount path', () => {
    expect(
      resolveLocalJobEndpoint({
        internalWebAppUrl: 'https://api.example.com/internal-app/',
        publicWebAppUrl: 'https://api.example.com/published-apps/17/160/',
        jobDefinitionId: 'internal.seal-document',
        jobId: 'job_123',
      }),
    ).toBe('https://api.example.com/internal-app/api/jobs/internal.seal-document/job_123');
  });
});
