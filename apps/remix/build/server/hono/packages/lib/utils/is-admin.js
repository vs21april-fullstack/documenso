const isAdmin = user => Array.isArray(user.roles) && user.roles.includes('ADMIN');

export { isAdmin };
//# sourceMappingURL=is-admin.js.map
