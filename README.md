## Movie Search

This project is a movie search application built using:

* React
* OMDB API

This web application features the new React Hooks API.

### Setup

The app needs an [OMDB API key](https://www.omdbapi.com/apikey.aspx). It reads
the key from `src/api/key.js`, which is kept out of the repo, so create that
file with a key of your own:

```js
// src/api/key.js
export default { secret: 'your-omdb-key' }
```

Then install the packages and start the app:

```sh
bun install
bun run start
```

The tooling is Create React App from 2019 (`react-scripts` 2.1.5). It needs
Node 12 to start or build: newer versions of Node stop with
`ERR_OSSL_EVP_UNSUPPORTED`.

### Scripts

| Command         | What it does                                     |
| --------------- | ------------------------------------------------ |
| `bun run start` | Starts the app on http://localhost:3000          |
| `bun run test`  | Runs the tests, which need no key and no network |
| `bun run build` | Writes the production build to `build/`          |
