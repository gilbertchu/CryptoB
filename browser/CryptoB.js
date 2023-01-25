class CryptoB {
  static #ALGORITHM = 'AES-GCM';
  #init = false;
  #rawKey;
  #key;

  constructor(rawKey) {
    this.#rawKey = rawKey === true ? CryptoB.generateRawKey() : rawKey;
  }

  async init() {
    if (this.#init) throw 'Already called init';
    this.#init = true;
    const _rawKey = CryptoB.#atob_u8a(this.#rawKey);
    this.#key = await window.crypto.subtle.importKey("raw", _rawKey, CryptoB.#ALGORITHM, true, ["encrypt", "decrypt"]);
    return this;
  }

  async encryptB(message) {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const ciphertext = await window.crypto.subtle.encrypt({name: CryptoB.#ALGORITHM, iv}, this.#_key, (new TextEncoder()).encode(message));
    const data = CryptoB.#btoa_u8a(new Uint8Array(ciphertext)) + CryptoB.#btoa_u8a(iv);
    return data;
  }

  async decryptB(data) {
    const encrypted = CryptoB.#atob_u8a(data.slice(0, data.length - 16))
    const iv = CryptoB.#atob_u8a(data.slice(data.length - 16, data.length))
    const decrypted = await window.crypto.subtle.decrypt({name: CryptoB.#ALGORITHM, iv}, this.#_key, encrypted);
    const msg = (new TextDecoder()).decode(decrypted);
    return msg;
  }

  get #_key() {
    console.assert(typeof this.#key !== 'undefined', 'Missing key (has init finished?)');
    return this.#key;
  }

  get rawKey() {
    return this.#rawKey;
  }

  static #btoa_u8a(u8a) {
    const text = btoa([].map.call(u8a, v => String.fromCharCode(v)).join(''));
    return text;
  }

  static #atob_u8a(text) {
    const u8a = new Uint8Array([].map.call(atob(text), v => v.charCodeAt(0)));
    return u8a;
  }

  static generateRawKey() {
    const rawKey = CryptoB.#btoa_u8a(window.crypto.getRandomValues(new Uint8Array(16)));
    return rawKey;
  }
}
