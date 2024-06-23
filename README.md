# My Super Awesome API <a target="_blank" href="https://kounter.kerolloz.dev"><img align="right" src="https://kounter.kerolloz.dev/badge/kerolloz.my-super-awesome-api?style=for-the-badge&color=567890&label=Views" /></a>

[![Build and Lint](https://github.com/kerolloz/my-super-awesome-api/actions/workflows/test.yml/badge.svg)](https://github.com/kerolloz/my-super-awesome-api/actions/workflows/test.yml)

> **Warning**  
> This app is used for demonstration purposes only.

This is the backend repository for _my super awesome app_. It's built using _**Bun**_ and _**Fastify**_. It uses _**MongoDB**_ for the database.  
I mainly created it to demonstrate a full-stack app deployment. Here's the tutorial [link](https://blog.kerolloz.dev/free-deployment-for-your-full-stack-web-application).

<sup>Frontend repo 👉 [kerolloz/my-super-awesome-app](https://github.com/kerolloz/my-super-awesome-app)</sup>

## Usage

```bash
cp .env.example .env  # Create a new .env file and fill in the required variables
bun i                 # Install required dependencies
bun dev               # Start the development server with reload on changes
bun run build         # Ensure TypeScript is happy :)
```

## Services Used

| Service             | URL                            | Source Code                                                                                      |
|---------------------|--------------------------------|--------------------------------------------------------------------------------------------------|
| Image uploads       | [imghippo.com](https://imghippo.com) | [src/services/ImageUploader.ts](https://github.com/kerolloz/my-super-awesome-api/blob/master/src/services/ImageUploader.ts) |
| Email sending       | [mailersend.com](https://mailersend.com) | [src/mailer/base.mailer.ts](https://github.com/kerolloz/my-super-awesome-api/blob/master/src/mailer/base.mailer.ts)       |

## Docker

Before running the image, you must create a `.env` file with the same variables as above.

```bash
docker build -t my-super-awesome-api .
docker run -p 5000:5000 --env-file=.env -it --init --network=host my-super-awesome-api # use --network=host for local development
```
