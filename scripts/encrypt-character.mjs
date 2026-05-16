#!/usr/bin/env node
/**
 * Encrypt a new character.glb for the portfolio.
 * Usage: node scripts/encrypt-character.mjs path/to/avatar.glb
 * Output: public/models/character.enc (password must match decrypt in character.ts)
 */
import crypto from "crypto";
import fs from "fs";
import path from "path";

const password = process.env.CHARACTER_PASSWORD || "MyCharacter12";
const input = process.argv[2] || "character.glb";
const output =
  process.argv[3] ||
  path.join("public", "models", "character.enc");

if (!fs.existsSync(input)) {
  console.error(`Input not found: ${input}`);
  process.exit(1);
}

const key = crypto.createHash("sha256").update(password).digest();
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
const plain = fs.readFileSync(input);
const encrypted = Buffer.concat([cipher.update(plain), cipher.final()]);
fs.writeFileSync(output, Buffer.concat([iv, encrypted]));

console.log(`Encrypted ${input} → ${output} (${encrypted.length} bytes)`);
