import knex from 'knex'
import path from 'path'

export const db = knex({
    client: "sqlite3",
    connection: {
        filename: "database/dbdata.db"
    },

    useNullAsDefault: true,
    pool: {
        min: 0,
        max: 1,
        afterCreate: (conn: any, cb: any) => {
            conn.run("PRAGMA foreign_keys = ON", cb)
        }
    }
})




