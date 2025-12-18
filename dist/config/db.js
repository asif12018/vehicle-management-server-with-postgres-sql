"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const index_1 = __importDefault(require("./index"));
exports.pool = new pg_1.Pool({
    connectionString: `${index_1.default.connectionStr}`,
});
const initDB = async () => {
    await exports.pool.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL CHECK(email = lower(email)),
        password TEXT NOT NULL CHECK (length(password) >=6),
        phone VARCHAR(20) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'customer')),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);
    await exports.pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles(
    id SERIAL PRIMARY KEY,
    vehicle_name VARCHAR(200) NOT NULL,
    type VARCHAR(100) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
    registration_number VARCHAR(300) UNIQUE NOT NULL,
    daily_rent_price NUMERIC(10, 2)  NOT NULL CHECK(daily_rent_price > 0),
    availability_status VARCHAR(100) NOT NULL CHECK (availability_status IN ('available', 'booked')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    `);
    await exports.pool.query(`
      CREATE TABLE IF NOT EXISTS bookings(
      id SERIAL PRIMARY KEY,
      customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      vehicle_id INT NOT NULL REFERENCES vehicles(id),
      rent_start_date DATE NOT NULL,
      rent_end_date DATE NOT NULL CHECK(rent_end_date > rent_start_date),
      total_price NUMERIC(10,2) NOT NULL CHECK(total_price > 0),
      status VARCHAR(100) NOT NULL CHECK(status IN ('active', 'cancelled', 'returned')),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )
      `);
};
exports.default = initDB;
