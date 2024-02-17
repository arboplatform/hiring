<h1 align="center">
  Backend solution for the hiring process of Arbo's challenge built with Nest
</h1>

<!-- <p align="center" style="margin-bottom: 4%">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/farreltobias/hiring.svg">
  <a href="https://app.codacy.com/gh/farreltobias/hiring/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade">
    <img src="https://app.codacy.com/project/badge/Grade/994a07271e7b45ab990485e642ccef20"/>
  </a>
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/farreltobias/hiring.svg">
  <a href="https://github.com/farreltobias/hiring/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/farreltobias/hiring.svg">
  </a>
  <a href="https://github.com/farreltobias/hiring/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/farreltobias/hiring.svg">
  </a>
  <img alt="License" src="https://img.shields.io/github/license/farreltobias/financial-api.svg">
</p> -->

<p align="center">
  <a href="#information_source-about">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <!-- <a href="#muscle-new-features">New Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; -->
  <!-- <a href="#desktop_computer-exemple">Exemple</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; -->
  <a href="#thinking-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

## :information_source: About

The backend hiring project is a solution built with [NestJS](https://nestjs.com/), [Docker](https://www.docker.com/), and [Prisma](https://www.prisma.io/). It follows the Model-View-Controller (MVC) architectural pattern, which promotes a separation of concerns and modular development.

NestJS is a powerful framework for building scalable and maintainable server-side applications. It provides a solid foundation for creating APIs and microservices using [TypeScript](https://www.typescriptlang.org/). With NestJS, you can easily organize your code into modules, controllers, and services, making it easier to manage and test your application.

Prisma is an open-source database toolkit that simplifies database access and management. It provides an ORM-like interface for working with databases, allowing you to define your data models using TypeScript and generate type-safe queries. Prisma also supports migrations, making it easy to evolve your database schema over time.

By combining NestJS, Docker, and Prisma, the backend hiring project offers a robust and scalable solution for handling the hiring process. It leverages the power of NestJS to create a modular and maintainable codebase, while Docker ensures easy deployment and scalability. Prisma simplifies database access and management, making it easier to work with the data layer of the application.

Overall, the backend hiring project is a comprehensive solution that utilizes modern technologies and best practices to deliver a high-quality backend system for the hiring process.

<!-- ## :muscle: New Features

Added :sparkles:TRANSACTIONS:sparkles: from account to account! -->

<!-- ## :desktop_computer: Exemple

Here's a exemple by performing a transaction in Insomnia

<img src="https://i.imgur.com/g5Y7xHK.gif"/> -->

## :thinking: How To Use

To get started with the frontend solution, make sure you have [Git](https://git-scm.com), [Node.js][nodejs] (version 20.11.0 or higher) and [Docker](https://docs.docker.com/engine/install/).  From your command line:

```bash
# Clone this repository
$ git clone https://github.com/farreltobias/hiring hiring

# Go into the repository
$ cd hiring/backend

# Install dependencies
$ npm i

# Start Database with docker-compose
$ docker-compose up -d && npx prisma db push && npx prisma db seed

# Start backed
$ npm run start
```

To run the tests, run the commands from the terminal:

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## :memo: License
This project is licensed under the Apache License. For detailed licensing information, please see the [LICENSE](https://github.com/farreltobias/hiring/blob/main/LICENSE) file.

---

For more information about the project and its components, please refer to the [GitHub repository](https://github.com/farreltobias/hiring).

If you have any questions or need further assistance, feel free to reach out to Guilherme Farrel via [LinkedIn](https://www.linkedin.com/in/farreltobias/).

Made with :yellow_heart: by Guilherme Farrel [Get in touch!](https://www.linkedin.com/in/farreltobias/)

<a align="center" href="https://farrel.tech">
  <img style="margin-top: 4%;" src="https://i.imgur.com/IseCjin.jpg"/>
</a>

[nodejs]: https://nodejs.org/
[pnpm]: https://pnpm.io/

