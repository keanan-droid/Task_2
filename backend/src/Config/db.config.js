import { Pool } from 'pg';
require('dotenv').config({path:'./src/.env'});

export class DbConfig {
    constructor() {
        this.pool = new Pool({
            connectionString: "postgres://vvfzzjue:dVEpoUAvnIWTtDk9D-xgQbqXnqjJ6YiA@tiny.db.elephantsql.com/vvfzzjue",
        });
    }

    getPool() {
        return this.pool;
    }
}