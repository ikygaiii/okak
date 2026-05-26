require("dotenv").config();
const Database = require("better-sqlite3");

const db = new Database(process.env.DB_PATH || "data.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS participants (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

function getCount() {
    return db.prepare("SELECT COUNT(*) AS n FROM participants").get().n;
}

function createParticipant() {
    const result = db.prepare("INSERT INTO participants DEFAULT VALUES").run();
    return result.lastInsertRowid;
}

module.exports = { getCount, createParticipant };
