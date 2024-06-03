# Blog

You can install the packages with your preferred package manager. `pnpm` should be used as it has a provided lockfile, but even Bun should work.
After installing you can run `dev`, `start` and `test` tasks.

ENV:

- `HASH`: a hashing key for JSON webtokens and passwords. Passwords are hashed with [scrypt](https://en.wikipedia.org/wiki/Scrypt) and compared with timing safe equality comparision (resilient to timing attacks).
The variable should be a random string, preferably over 64 bytes in length. Note that it will not be used in testing.
- `MONGODB_URI`: e.g. mongodb+srv://user:password@droplet.server.mongodb.net/prod?retryWrites=true&w=majority
- `TEST_MONGODB_URI`: e.g. mongodb+srv://user:password@droplet.server.mongodb.net/test?retryWrites=true&w=majority
