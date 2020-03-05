# random-user-api
Typescript Node API that returns random users in JSON format

## Build
`yarn` to download packages
`yarn build` to build the package to the dist folder
`yarn start` to run the API server from the built files

## Dev
`yarn dev` to run a server that automatically recompiles on changed
`yarn test` to run tests (some are currently failing - and there are lots more to write!)
`yarn tsc-check` runs typescript compilation without emitting files. Useful for checking your definitions are correct while developing with `yarn tsc-check --watch`

## Implemented features
Get a list of 20 users: `get /users`
Get a list of x users: `get /users?results=x`
Get a user by id: `get /users/id`
Get a random (pre-generated) user: `get /users/random`
Get a random new user: `get /users/new`

## Todo
Filter based on firstName (wip branch)
Filter based on lastName (wip branch)
Updating a user's details
Deleting a user