module.exports = {
  users: {
    public: {
      get: {
        ":user": {
          isPoint: true,
          user: {
            type: "string",
            maxLen: 14,
            minLen: 2,
          },
          id: {
            type: "number",
            max: 14,
            min: 3,
          },
          adres: {
            isObject: true,
            il: {
              isObject: true,
              slug: { type: "string" },
            },
            ilce: {
              isObject: true,
              slug: { type: "string" },
            },
            mahalle: {
              isDisabled: true,
              isObject: true,
              slug: { type: "string" },
            },
          },
        },
        id: {
          isPoint: true,
          id: {
            type: "string",
          },
        },
      },
    },
    del: {
      ":user": {
        isPoint: true,
        user: {
          type: "string",
        },
      },
    },
  },
  posts: {
    get: {
      ":id": {
        isPoint: true,
        id: {
          type: "string",
        },
      },
    },
  },
};
