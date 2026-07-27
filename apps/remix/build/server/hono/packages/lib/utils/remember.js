function remember(name, getValue) {
  const thusly = globalThis;
  if (!thusly.__documenso_util_remember) {
    thusly.__documenso_util_remember = new Map();
  }
  if (!thusly.__documenso_util_remember.has(name)) {
    thusly.__documenso_util_remember.set(name, getValue());
  }
  return thusly.__documenso_util_remember.get(name);
}

export { remember };
//# sourceMappingURL=remember.js.map
