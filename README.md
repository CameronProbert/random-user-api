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
Get a user by id: `get /users/:id`  
Get a random (pre-generated) user: `get /users/random`  
Get a random new user: `get /users/new`  
Filter based on firstName: `get /users?firstName=x`  
Filter based on lastName: `get /users?firstName=x`  
Updating a user's details: `post /users/:id`  
Deleting a user: `delete /users/:id`  
Adding a new user: `post /users/new`

## Todo
Swap out repository implementation for a real database (currently using a .json file)  
Fix the currently broken tests  
Fix the approximations used for things like age
