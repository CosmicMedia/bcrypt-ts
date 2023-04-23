/// <reference types="node" />
import { HashData, Minor } from "./functions";
export interface Bindings {
    gen_salt_sync(minor: Minor, rounds: number, bytes: Buffer): string;
    encrypt_sync(data: HashData, salt: string): string;
    compare_sync(data: HashData, hash: string): boolean;
    get_rounds(hash: string): number;
}
