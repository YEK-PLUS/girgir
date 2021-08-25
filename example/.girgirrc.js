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
