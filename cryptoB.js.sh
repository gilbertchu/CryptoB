#!/usr/bin/env node
const process = require('process');
const fs = require('fs');
const CryptoB = require('./CryptoB');

const {CRYPTOB_KEY, CRYPTOB_KEY_PATH = './cryptoB.key'} = process.env;

function doCryptoB(payload) {
  const rawKey = CRYPTOB_KEY ?? getKeyFromFile();
  const cb = new CryptoB(rawKey);
  if (rawKey === true) fs.writeFileSync(CRYPTOB_KEY_PATH, cb.rawKey);
  const res = process.argv.length === 2 ? cb.encryptB(payload) : cb.decryptB(payload);
  return res;
}

function getKeyFromFile() {
  try {
    const rawKey = fs.readFileSync(CRYPTOB_KEY_PATH, {encoding: 'utf8'}).trim();
    return rawKey;
  } catch (e) {
    if (fs.existsSync(CRYPTOB_KEY_PATH)) throw e;
    console.warn('Missing key file, generating new key and saving...');
  }
  return true;
}

if (process.argv.length > 3) throw 'One optional argument "d" only (decrypt)';
if (process.argv.length === 3 && process.argv[2] !== 'd') throw 'Argument value must be "d" (decrypt)';

const chunks = [];
const readable = process.stdin;

readable.on('readable', () => {
  let chunk;
  while (null !== (chunk = readable.read())) {
    chunks.push(chunk);
  }
});

readable.on('end', () => {
  const content = chunks.join('');
  process.stdout.write(doCryptoB(content));
  process.exit(0);
});
