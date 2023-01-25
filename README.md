# CryptoB

*The "B" stands for Browser.*

The project was created for fun as an example of mirroring web browser's crypto functions in Node.js.

The main class definitions are found in:

- `/cryptoB.js` for Node.js
- `/browser/cryptoB.js` for browser clients

## Usage

### Node.js

```js
const rawKey = CryptoB.generateRawKey();
const cb = new CryptoB(rawKey ?? true); // true = random
const ciphertext = cb.encryptB("This is a super secret message!");
cb.decryptB(ciphertext); // "This is a super secret message!"
```

It's that easy!

### Browser

The underlying SubtleCrypto web api functions are asynchronous:

```js
const rawKey = CryptoB.generateRawKey();
const cb = new CryptoB(rawKey);
await cb.init(); // generate key from raw is async
const ciphertext = await cb.encryptB("This is a super secret message!");
await cb.decrypt(ciphertext);  // "This is a super secret message!"
```

## Shell scripting

Additional `.sh` files are included for executing the Node.js library from bash:

- `/cryptoB.js.sh`
- `/cryptoB.sh` - wrapper for compatibility with older versions of nvm

Reads text from stdin and accepts optional argument `"d"` for decrypt (default is encrypt):

```sh
ciphertext=$(echo -n "This is a super secret message!" | cryptoB)
echo -n $ciphertext | cryptoB d
```

Can set key from environment variable `CRYPTOB_KEY` or read from file `CRYPTOB_KEY_FILE`.
