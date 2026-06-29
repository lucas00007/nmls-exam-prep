import fs from "fs";
import path from "path";
import crypto from "crypto";

const DB_PATH = path.join(process.cwd(), "data", "users.json");

export interface User {
  id: string;
  email: string;
  passwordHash: string | null;
  setupToken: string | null;
  setupTokenExpiry: number | null;
  createdAt: number;
  paid: boolean;
  plan: string;
}

const ADMIN_USER_ID = "admin-env-user";

function getAdminEnvUser(): User | null {
  const email = process.env.ADMIN_EMAIL;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  if (!email || !passwordHash) return null;
  return {
    id: ADMIN_USER_ID,
    email: email.trim().toLowerCase(),
    passwordHash,
    setupToken: null,
    setupTokenExpiry: null,
    createdAt: 0,
    paid: true,
    plan: "paid",
  };
}

function readDB(): { users: User[] } {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
      fs.writeFileSync(DB_PATH, JSON.stringify({ users: [] }, null, 2));
      return { users: [] };
    }
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  } catch {
    return { users: [] };
  }
}

function writeDB(data: { users: User[] }): void {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export function getUserByEmail(email: string): User | null {
  const normalized = email.trim().toLowerCase();
  const db = readDB();
  const found = db.users.find((u) => u.email === normalized) ?? null;
  if (found) return found;
  const admin = getAdminEnvUser();
  if (admin && admin.email === normalized) return admin;
  return null;
}

export function getUserById(id: string): User | null {
  const db = readDB();
  const found = db.users.find((u) => u.id === id) ?? null;
  if (found) return found;
  const admin = getAdminEnvUser();
  if (admin && admin.id === id) return admin;
  return null;
}

export function getUserByToken(token: string): User | null {
  const db = readDB();
  return db.users.find((u) => u.setupToken === token) ?? null;
}

export function createUser(email: string): { user: User; setupToken: string } {
  const db = readDB();
  const setupToken = crypto.randomBytes(32).toString("hex");
  const user: User = {
    id: crypto.randomUUID(),
    email,
    passwordHash: null,
    setupToken,
    setupTokenExpiry: Date.now() + 24 * 60 * 60 * 1000,
    createdAt: Date.now(),
    paid: true,
    plan: "paid",
  };
  db.users.push(user);
  writeDB(db);
  return { user, setupToken };
}

export function updateUserPassword(id: string, passwordHash: string): void {
  const db = readDB();
  const user = db.users.find((u) => u.id === id);
  if (user) {
    user.passwordHash = passwordHash;
    user.setupToken = null;
    user.setupTokenExpiry = null;
    writeDB(db);
  }
}
