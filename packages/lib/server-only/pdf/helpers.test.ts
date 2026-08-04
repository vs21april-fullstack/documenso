import path from 'node:path';
import { describe, expect, it } from 'vitest';

import { resolvePdfFontPath } from './helpers';

describe('resolvePdfFontPath', () => {
  it('finds Remix public fonts when the server starts from the monorepo root', () => {
    const monorepoRoot = path.resolve(process.cwd(), '../..');

    expect(resolvePdfFontPath(monorepoRoot)).toBe(path.join(monorepoRoot, 'apps/remix/public/fonts'));
  });

  it('finds public fonts when the server starts from the Remix workspace', () => {
    const remixDirectory = path.resolve(process.cwd(), '../../apps/remix');

    expect(resolvePdfFontPath(remixDirectory)).toBe(path.join(remixDirectory, 'public/fonts'));
  });
});
