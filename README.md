# GIRGIR Express Plugin

girgir is a express.js middleware that checks input types.

## Installation

Install it using npm

```bash
npm install --save girgir
```

Install it using yarn

```bash
yarn add girgir
```

## Guide

girgir will uses rest api backend systems

### Using

```js
const express = require("express");
const app = express();

app.use(express.json());
app.use(girgir({}));
```

### Espacing

#### Input

```js
const nickName = {
  type: "string",
  maxLen: 14,
  minLen: 2,
},
```

#### Route

```js
const routes = {
  get: {
    ":user": {
      isPoint: true,
      user: INPUT,
      id: INPUT,
    },
  },
};
```

### Config

Girgir using `.girgirrc.js` from project root path

```
├── /
├── post
└─┬ user
  └── login
```

```js
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
        },
        id: {
          isPoint: true,
          id: {
            type: "number",
            min: 0,
            max: 99,
          },
        },
      },
    },
    del: {
      ":id": {
        isPoint: true,
        id: {
          type: "number",
          min: 0,
          max: 99,
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
```