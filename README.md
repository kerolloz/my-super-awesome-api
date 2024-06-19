# My Super Awesome API <a target="_blank" href="https://kounter.kerolloz.dev"><img align="right" src="https://kounter.kerolloz.dev/badge/kerolloz.my-super-awesome-api?style=for-the-badge&color=567890&label=Views" /></a>

> **Warning**  
> This app is used for demonstration purposes only.

This is the backend repository for _my super awesome app_. It's built using NodeJS and ExpressJS. I mainly created it to demonstrate a full-stack app deployment. Here's the tutorial [link](https://blog.kerolloz.dev/free-deployment-for-your-full-stack-web-application).

<sup>Frontend repo 👉 [kerolloz/my-super-awesome-app](https://github.com/kerolloz/my-super-awesome-app)</sup>

## Usage

```bash
cp .env.example .env  # create a new .env file and fill in the required variables
npm i                 # install required dependencies
npm run dev           # start development server
npm run build         # build for production
```

## Docker

Before building the image, you need to create a `.env` file with the same variables as above.

```bash
docker build -t my-super-awesome-api .
docker run -p 5000:5000 my-super-awesome-api
```
