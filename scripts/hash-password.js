const bcrypt = require("bcryptjs");

const password = process.argv[2] || "NMLSprep2025!";
const hash = bcrypt.hashSync(password, 10);

console.log("\nPassword:", password);
console.log("Hash:    ", hash);
console.log("\nAdd these to your Vercel environment variables:");
console.log("  ADMIN_EMAIL=<your-email>");
console.log("  ADMIN_PASSWORD_HASH=" + hash);
