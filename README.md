# app.k3s.rocks

This is a pet project to get some real context to playing around with various frontend tech. It is used as a playground, not a production example.

The goal is provide a simple frontend to test k3s / kubernetes, following the guide at [k3s.rocks](https://k3s.rocks)

Currently using:

- [nextjs](https://nextjs.org/)
- [jotai](https://jotai.org/)
- [typescript](https://www.typescriptlang.org/)
- [playwright](https://playwright.dev/)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testcontainer

Build

```bash
docker build -t ssh . -f sshContainerDockerfile
```

Run

```bash
docker run --rm -it -p 5555:22 ssh
```

## Update yaml files

Copy the yaml file to /lib/apps/yaml.yaml
Run the yaml to Json script
Import the json into /lib/apps/publicApps.js

```
yarn node lib/apps/yamlToJson.mjs
```
