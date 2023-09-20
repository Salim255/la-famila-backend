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

# Just some test

# Just one more test
