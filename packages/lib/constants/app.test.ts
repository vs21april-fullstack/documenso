import { afterEach, describe, expect, it, vi } from 'vitest';

import { NEXT_PRIVATE_DISABLE_PDF_SIGNING } from './app';

describe('NEXT_PRIVATE_DISABLE_PDF_SIGNING', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('is disabled by default', () => {
    vi.stubEnv('NEXT_PRIVATE_DISABLE_PDF_SIGNING', '');

    expect(NEXT_PRIVATE_DISABLE_PDF_SIGNING()).toBe(false);
  });

  it('is enabled only for the exact value true', () => {
    vi.stubEnv('NEXT_PRIVATE_DISABLE_PDF_SIGNING', 'true');

    expect(NEXT_PRIVATE_DISABLE_PDF_SIGNING()).toBe(true);
  });
});
