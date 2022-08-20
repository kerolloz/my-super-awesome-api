# TS Express Template ~ tiny _core_ framework

This is a template for a simple Express server with TypeScript. It is a very small framework, and is intended to be a starting point for a larger project. It is not intended to be a full framework.

## Features ✨

- TypeScript
- Express
- Prettier
- ESLint
- Docker
- MongoDB with Mongoose & Typegoose
- Custom `endpoint` decorator for Express handlers

## Usage 💻

- Clone the repo or click "Use this template"
- `npm install`
- `cp .env.example .env` and fill in the values
- `npm run dev` to start the server in development mode

## Documentation 📌

### `endpoint`

You can use the wrapper `endpoint` method handler. It wraps the normal Express handler, and adds a few features:

- You can return a value from the handler, and it will be sent as JSON.
  - Your value will be wrapped in a `{ message: your_value }` object with a default 200 status code.

    ```ts
    // here's a full example 

    import { Router } from 'express';
    import { endpoint } from '../core';

    const router = Router();

    router.get('/ping', endpoint(() => 'pong 🏓'));
    ```

    ```sh
    $ curl -i http://localhost:5000/ping
  
    HTTP/1.1 200 OK
    ...
    {"message":"pong 🏓"}
    ```

  - You can return an object with the desired success 2XX status code with the `status` property and your desired value with `content` property.

    ```ts
    router.post(
      '/cats',
      endpoint((req) => {
        const { name, age } = req.body;
        return {
          status: 201,
          content: { name, age },
        };
      }),
    );
    ```

    ```sh
    $ curl -i --header "Content-Type: application/json" \
      --data '{"name":"Mittens","age":3}' \
      http://localhost:5000/cats


    HTTP/1.1 201 Created
    ...
    {"name":"Mittens","age":3}
    ```

- You can throw an error from the handler, and it will be sent as JSON.
  - You can find the available HTTP errors in `src/core/exceptions/consts.ts`

    ```ts
    router.use('*', () => {
      throw new HttpException(NOT_FOUND, { message: 'Are you lost? 🤔' });
    });
    ```

    ```sh
    $ curl -i http://localhost:5000/does-not-exist

    HTTP/1.1 404 Not Found
    ...
    {"message":"Are you lost? 🤔"}
    ```

  - Unhandled errors will result in a 500 status code

    ```ts
    router.get('/unhandled-error', endpoint(() => {
      throw new Error('Something went wrong');
    }));
    ```

    ```sh
    $ curl -i http://localhost:5000/error
  
    HTTP/1.1 500 Internal Server Error
    ...
    {"message":"Internal server error"}
    ```

    > **Note**
    > The returned error message is always the generic `Internal Server Error` message. It doesn't expose any information about the error.
