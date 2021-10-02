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

#### Deep Checking

If `isObject` is used, girgir will check deep params.

```js
const routes = {
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
      isObject: true,
      slug: { type: "string" },
    },
  },
};
```

#### Collection Checking

If `isCollection` is used, girgir will check object list (a.k.a collection).

```js
const routes = {
  adres: {
    isObject: true,
     names:{
      isCollection:true,
      slug:{
        type:'string'
      }
    },
  },
};
```

#### Array Checking

If `isArray` is used, girgir will check array.

```js
const routes = {
  adres: {
    isObject: true,
    arr:{
      isArray:true,
      type:"string"
    },
  },
};
```

#### Disable Deep Check Or Route

If `isDisabled` is used, girgir will ignore results for these section.

```js
const routes = {
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
      slug: { type: "string" },
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
