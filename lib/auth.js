import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const SECRET = process.env.SESSION_SECRET || "a_very_long_and_extremely_secret_session_secret_key_1234567890";
const KEY = crypto.scryptSync(SECRET, "salt", 32);

export function hashPassword(password, salt = null) {
  const activeSalt = salt || crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, activeSalt, 1000, 64, "sha512").toString("hex");
  return { hash, salt: activeSalt };
}

export function verifyPassword(password, salt, hashedPassword) {
  const { hash } = hashPassword(password, salt);
  return hash === hashedPassword;
}

export function encryptSession(payload) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  
  let encrypted = cipher.update(JSON.stringify(payload), "utf8", "hex");
  encrypted += cipher.final("hex");
  
  const tag = cipher.getAuthTag().toString("hex");
  
  return `${iv.toString("hex")}:${encrypted}:${tag}`;
}

export function decryptSession(token) {
  try {
    const [ivHex, encryptedHex, tagHex] = token.split(":");
    if (!ivHex || !encryptedHex || !tagHex) return null;
    
    const iv = Buffer.from(ivHex, "hex");
    const tag = Buffer.from(tagHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    decipher.setAuthTag(tag);
    
    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");
    
    return JSON.parse(decrypted);
  } catch (err) {
    return null;
  }
}
