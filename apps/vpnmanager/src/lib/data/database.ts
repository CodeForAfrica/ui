import betterSqlite3 from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "data", "database.sqlite");
const db = betterSqlite3(dbPath);

export interface Record {
  ID?: number;
  userId: string;
  usage: number;
  date: string;
  cumulativeData: number;
  email: string;
  accessUrl?: string;
  createdAt: string;
}

export interface Filters {
  email?: string;
  date?: string | { start: string; end: string };
  userId?: string;
  ID?: number;
  groupBy?: "email" | "date";
  orderBy?: string;
}

class Model {
  static initialize() {
    const createTable = `
      CREATE TABLE IF NOT EXISTS records (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        usage INTEGER NOT NULL,
        date TEXT NOT NULL,
        cumulativeData INTEGER NOT NULL,
        email TEXT NOT NULL,
        accessUrl TEXT,
        createdAt TEXT NOT NULL,
        UNIQUE (date, userId)
      )
    `;
    db.exec(createTable);
  }

  static createOrUpdate(record: Record) {
    const insertData = db.prepare(`
      INSERT INTO records (userId, usage, date, cumulativeData, email, accessUrl, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(date, userId)
      DO UPDATE SET
        usage = excluded.usage,
        cumulativeData = excluded.cumulativeData,
        email = excluded.email,
        accessUrl = excluded.accessUrl,
        createdAt = excluded.createdAt;
    `);
    const info = insertData.run(
      record.userId,
      record.usage,
      record.date,
      record.cumulativeData,
      record.email,
      record.accessUrl,
      record.createdAt,
    );
    return { ...record, ID: info.lastInsertRowid };
  }

  static update(ID: number, updates: Partial<Record>) {
    const setClause = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(", ");
    const query = `UPDATE records SET ${setClause} WHERE ID = ?`;
    const stmt = db.prepare(query);
    return stmt.run([...Object.values(updates), ID]);
  }

  static delete(ID: number) {
    const stmt = db.prepare("DELETE FROM records WHERE ID = ?");
    return stmt.run(ID);
  }

  static getAll(filters: Filters = {}) {
    let query = "SELECT";
    const params: any[] = [];
    if (filters.groupBy === "email" || filters.groupBy === "date") {
      query +=
        filters.groupBy === "email"
          ? " email, userId, accessUrl, SUM(usage) as totalUsage FROM records"
          : " date, SUM(usage) as totalUsage FROM records";
    } else {
      query += " * FROM records";
    }
    query += " WHERE 1=1";
    if (filters.email) {
      query += " AND email = ?";
      params.push(filters.email);
    }
    if (filters.date) {
      if (typeof filters.date === "string") {
        query += " AND date = ?";
        params.push(filters.date);
      } else {
        query += " AND date BETWEEN ? AND ?";
        params.push(filters.date.start, filters.date.end);
      }
    }
    if (filters.userId) {
      query += " AND userId = ?";
      params.push(filters.userId);
    }
    if (filters.ID) {
      query += " AND ID = ?";
      params.push(filters.ID);
    }

    if (filters.groupBy) {
      if (filters.groupBy === "email") {
        query += " GROUP BY email";
      } else if (filters.groupBy === "date") {
        query += " GROUP BY date";
      }
    }
    if (filters.orderBy) {
      query += ` ORDER BY ${filters.orderBy}`;
    }
    const stmt = db.prepare(query);
    return stmt.all(params);
  }
}

// Initialize the database
Model.initialize();

export { Model };
