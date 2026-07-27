import superjson from 'superjson';

const dataTransformer = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serialize: data => {
    if (data instanceof FormData) {
      return data;
    }
    return superjson.serialize(data);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deserialize: data => {
    return superjson.deserialize(data);
  }
};

export { dataTransformer };
//# sourceMappingURL=data-transformer.js.map
