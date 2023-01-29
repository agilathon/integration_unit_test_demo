
# Introduction

A CRUD endpoint implementation using Sequelize in Express. Unit tests and integration tests are written using Jest.


## Built With

- [Express](https://expressjs.com/)
- [Jest](https://jestjs.io/)
- [Postgres](https://www.sqlite.org/index.html)
- [Sequelize ORM](https://sequelize.org/)

Additional packages used in project as dependencies:
 - supertest (for endpoint integration tests)
 - @types/jest (to enable jest autocomplete) 
 - jest-html-reporter (to provide generated test execution html report )

**Note:**
For test report generation it is neccesary to define jest.config in project *root*
with content:

   ```sh
   {
      "reporters": [
         "default",
         ["./node_modules/jest-html-reporter", {
               "pageTitle": "Test Report"
         }]
      ]
      }
   ```

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/agilathon/integration_unit_test_demo.git
   ```
2. Run the docker-compose.yaml to start progres instance 
   ```sh
   docker compose up
   ```

3. Install NPM packages
   ```sh
   npm install
   ```

3. Migrate db models and seed data to postgres:
   ```sh
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```


4. Run server with
   ```sh
   npm start
   ```

### Running Tests

Run unit and integration tests

```sh
npm run test
```
