# Express Typescript Backend

Demo Application Codebase for Backend NodeJS created using Express in Typescript Following the MVC Pattern. The Implementation is done for modularity so that the functionalities can be used easily.

### Dependencies Used:

1. [NodeJS](https://nodejs.org/en/)
2. [Typescript](https://www.typescriptlang.org/)
3. [express](https://www.npmjs.com/package/express)
4. [dotenv](https://www.npmjs.com/package/dotenv)
5. [envalid](https://www.npmjs.com/package/envalid)
6. [cors](https://www.npmjs.com/package/cors)
7. [mongoose](https://www.npmjs.com/package/mongoose)
8. [morgan](https://www.npmjs.com/package/morgan)
9. [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)

with @types for dependencies

---

## Folder Structure

- **IMS**
  - [README.md](IMS/README.md)
  - [package.json](IMS/package.json)
  - **src**
    - **categories**
      - [categories.controller.ts](IMS/src/categories/categories.controller.ts)
      - [category.model.ts](IMS/src/categories/category.model.ts)
    - [server.ts](IMS/src/server.ts)
    - **products**
      - [products.controller.ts](IMS/src/products/products.controller.ts)
      - [products.model.ts](IMS/src/products/products.model.ts)
    - **users**
      - [user.validator.ts](IMS/src/users/user.validator.ts)
      - [users.model.ts](IMS/src/users/users.model.ts)
      - [users.controller.ts](IMS/src/users/users.controller.ts)
    - [app.ts](IMS/src/app.ts)
    - **utils**
      - [helpers.ts](IMS/src/utils/helpers.ts)
      - [passport.ts](IMS/src/utils/passport.ts)
      - [validateEnv.ts](IMS/src/utils/validateEnv.ts)
      - [variables.ts](IMS/src/utils/variables.ts)
  - [tsconfig.json](IMS/tsconfig.json)

## TODOS

- ~~Authentication using bcrypt and jsonwebtoken~~
- Authorization for Role Based Access
- File Handling
  etc ...
