# la-familia-backend

### Setup and build server using nodejs and express

in order to check if our

#### Install prettier package

- npm install --save-dev --save-exact prettier

#### Use prettier to check code

- npx prettier --check '\*_/_.js'

#### Use prettier to correct code

- npx prettier --write '\*_/_.js', to correct code error

#### Configure commitlint to use conventional config, commit messages follows conventional commits convention or not

- npm install --save-dev @commitlint/{config-conventional,cli}

- npm install husky --save-dev

- npx husky install

- npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'

- echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

#### Setup the repository settings

##### Add rules

- Branch name pattern (master, develop)
- Require pull request reviews before merging
- Dismiss stale pull request approvals when new commit are pushed
- Require review from Code owners
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Do not allow bypassing the above settings

#### Build workflow yml file for develop

- install dependencies
- Check code formation
- Run automated tests
- Upload code coverage as an artifact
- Cache dependencies

#### Build workflow yml file for master

- install dependencies
- Check code formation
- Run automated tests
- Upload code coverage as an artifact
- Build project
- Upload build as an artifact
- Deploy to Staging server
- Cache dependencies

#### Job Artifacts

##### The artifacts is the output generated by a job, and with gitHub action we can upload and save those artifacts. So that a user, as the owner of the repository, we can download them manually, thereafter to then for example, take them and apload them to an app store. But we can also download and use them automatically in other Jobs. if we have subsequent Job that should do something with produced output

#### Install supertest

- npm install supertest --save-dev
- npm install dedent
- npm install express
- npm install jest
- npm install node-pg-migrate
- npm install nodemon
- npm install pg
- npm install pg-format
- npm install cors
- npm install --save-dev vitest
- npm install jsonwebtoken
- npm install validator
- npm install bcrypt
- npm install ndb --save-dev
- npm install morgan

- npm i express-rate-limit
- npm i helmet
- npm i xss-clean
- npm i hpp
- npm run migrate create add users table
- DATABASE_URL=postgres://salimhassanmohamed@localhost:5432/laFamilia npm run migrate up
- node-nats-streaming

### In order to set to declare node env variables

- NODE_ENV=value then then the command to start the server

- NODE_ENV='development' nodemon index.js

- "test": "jest --watchAll --no-cache ",

- npm install socket.io
