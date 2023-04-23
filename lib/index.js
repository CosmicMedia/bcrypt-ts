import crypto from 'crypto';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const bindings = require('../lib/binding/napi-v3/bcrypt_lib.node');
/**
 * Generates a BCrypt salt synchronously.
 *
 * @param rounds how many rounds to run - remember this corresponds to 2^rounds actually computed
 *
 * From @garthk, on a 2GHz core you can roughly expect;
 * rounds=8 : ~40 hashes/sec
 * rounds=9 : ~20 hashes/sec
 * rounds=10: ~10 hashes/sec
 * rounds=11: ~5  hashes/sec
 * rounds=12: 2-3 hashes/sec
 * rounds=13: ~1 sec/hash
 * rounds=14: ~1.5 sec/hash
 * rounds=15: ~3 sec/hash
 * rounds=25: ~1 hour/hash
 * rounds=31: 2-3 days/hash
 *
 * @param minor - the minor version of bcrypt to use. 'b' is recommended
 * @returns salt
 */
export function genSaltSync(rounds = 10, minor = 'b') {
    return bindings.gen_salt_sync(minor, rounds, crypto.randomBytes(16));
}
/**
 * Hashes a Buffer or string.
 *
 * @param data the data to hash
 * @param salt the salt generated from {@link genSaltSync}
 * @returns string representation of the hash
 */
export function hashSync(data, salt) {
    if (typeof salt == 'number') {
        // generate salt with 'salt' number of rounds
        salt = genSaltSync(salt);
    }
    return bindings.encrypt_sync(data, salt);
}
/**
 * Compares a hash and a Buffer or string.
 *
 * @param data the unhashed version of the string
 * @param hash a hash generated from {@link hashSync}
 * @returns parity boolean
 */
export function compareSync(data, hash) {
    return bindings.compare_sync(data, hash);
}
/**
 * Return the number of rounds used to encrypt a given hash
 *
 * @param hash a hash generated from {@link hashSync}
 * @returns the number of rounds used to encrypt a given hash
 */
export function getRounds(hash) {
    return bindings.get_rounds(hash);
}
