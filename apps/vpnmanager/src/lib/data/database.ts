import betterSqlite3 from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "data", "database.sqlite");
const db = betterSqlite3(dbPath);

class Record {
  ID?: number;
  userId: string;
  usage: number;
  date: string;
  cumulativeData: number;
  email: string;
  accessUrl?: string;
  createdAt: string;

  constructor(
    userId: string,
    usage: number,
    date: string,
    cumulativeData: number,
    email: string,
    accessUrl?: string,
    createdAt?: string,
    ID?: number,
  ) {
    this.ID = ID;
    this.userId = userId;
    this.usage = usage;
    this.date = date;
    this.cumulativeData = cumulativeData;
    this.email = email;
    this.accessUrl = accessUrl;
    this.createdAt = createdAt || new Date().toISOString();
  }
}

export interface Filters {
  email?: string;
  date?: string;
  dateBetween?: { start: string; end: string };
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
        createdAt TEXT NOT NULL
      )
    `;
    db.exec(createTable);
  }

  static create(record: Record) {
    const insertData = db.prepare(`
      INSERT INTO records (userId, usage, date, cumulativeData, email, accessUrl, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
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
      if (filters.groupBy === "email") {
        query +=
          " email, userId, accessUrl, SUM(usage) as totalUsage FROM records WHERE 1=1";
      }
      if (filters.groupBy === "date") {
        query += " date, SUM(usage) as totalUsage FROM records WHERE 1=1";
      }
    } else {
      query += " * FROM records WHERE 1=1";
    }
    if (filters.email) {
      query += " AND email = ?";
      params.push(filters.email);
    }
    if (filters.date) {
      query += " AND date = ?";
      params.push(filters.date);
    }
    if (filters.dateBetween && !filters.date) {
      query += " AND date BETWEEN ? AND ?";
      params.push(filters.dateBetween.start, filters.dateBetween.end);
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

export { Model, Record };
