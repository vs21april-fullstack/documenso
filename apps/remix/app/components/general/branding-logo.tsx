import { cn } from '@documenso/ui/lib/utils';
import type { HTMLAttributes } from 'react';

import { BrandingLogoIcon } from './branding-logo-icon';

export type LogoProps = HTMLAttributes<HTMLSpanElement>;

export const BrandingLogo = ({ className, ...props }: LogoProps) => {
  return (
    <span
      className={cn(
        'inline-flex aspect-[5/1] shrink-0 items-center gap-[0.2em] whitespace-nowrap [container-type:size]',
        className,
      )}
      {...props}
    >
      <BrandingLogoIcon className="h-full w-auto flex-shrink-0" aria-hidden="true" />
      <span className="font-bold leading-none tracking-tight [font-size:70cqh]">Omni Sign</span>
    </span>
  );
};
