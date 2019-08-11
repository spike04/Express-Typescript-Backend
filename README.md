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
- __IMS__
  - [README.md](IMS/README.md)
  - [node_modules](IMS/node_modules)
  - __src__
    - [app.ts](IMS/src/app.ts)
    - __products__
      - [products.interface.ts](IMS/src/products/products.interface.ts)
      - [products.controller.ts](IMS/src/products/products.controller.ts)
      - [products.model.ts](IMS/src/products/products.model.ts)
    - __categories__
      - [category.model.ts](IMS/src/categories/category.model.ts)
      - [category.interface.ts](IMS/src/categories/category.interface.ts)
      - [categories.controller.ts](IMS/src/categories/categories.controller.ts)
    - [server.ts](IMS/src/server.ts)
    - __utils__
      - [validateEnv.ts](IMS/src/utils/validateEnv.ts)
  - [package.json](IMS/package.json)
  - [tsconfig.json](IMS/tsconfig.json)

## TODOS
- Authentication using bcrypt and jsonwebtoken
- Authorization for Role Based Access
- File Handling
etc ...
