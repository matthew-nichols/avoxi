# Summary

Node.js backend.

Typescript instead of Javascript. `ts-node` is used instead of pretranspiling.

Eslint is used for linting. The configuration is close to default.

Ava is used for unit tests.

Prettier is used for code formatting.

Koa is used as the server framework. It's simple and especially useful for Node APIs.

Nyc/Instanbul (https://istanbul.js.org/) is used for code coverage.

# yarn commands specific to this project

`yarn start`: start the program
`yarn start-watch`: start the program and restart it on source code changes
`yarn fmt`: format the source code
`yarn fmt-check`: check the source code formatting (useful in CI)
`yarn lint`: lint the source code
`yarn test`: test the source code
`yarn coverage`: see what the test suite is testing

# Docker

`docker build -t avoxi .` to build.

`docker run --rm -it -p 3000:3000 avoxi` to run (delete on stop) in the foreground.

There is also a basic docker-compose file.
`docker-compose up -d` to bring it up and build and `docker-compose down` to tear it down.

VS Code's devcontainer is used to provide a development environment (also using Docker).
Those config files are in `/.devcontainer`
