import type { User } from '@prisma/client';

export const isAdmin = (user: Pick<User, 'roles'>) => Array.isArray(user.roles) && user.roles.includes('ADMIN');
