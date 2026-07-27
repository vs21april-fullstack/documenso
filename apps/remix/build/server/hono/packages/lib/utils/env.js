import { AppError, AppErrorCode } from '../errors/app-error.js';

/// <reference types="@documenso/tsconfig/process-env.d.ts" />
const env = variable => {
  if (typeof window !== 'undefined' && typeof window.__ENV__ === 'object') {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return window.__ENV__[variable];
  }
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return typeof process !== 'undefined' ? process?.env?.[variable] : undefined;
};
/**
 * Read an env var and assert it is set and non-empty. Throws `error` when
 * provided, otherwise an `AppError(MISSING_ENV_VAR)` naming the missing
 * variable.
 *
 * Empty-string is treated as unset — a shell-supplied `FOO=` is functionally
 * equivalent to omission.
 */
const requireEnv = (variable, error) => {
  const value = env(variable);
  if (!value) {
    throw new AppError(AppErrorCode.MISSING_ENV_VAR, {
      message: `Required environment variable "${String(variable)}" is unset.`
    });
  }
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return value;
};

export { env, requireEnv };
//# sourceMappingURL=env.js.map
