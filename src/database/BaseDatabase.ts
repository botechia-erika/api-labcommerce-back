import knex from 'knex'
export  abstract class BaseDatabase {
    protected static connection = knex({
        client: "sqlite3",
        connection: {
            filename: "src/database/dbdata.db"
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
}

// Abstract ->Impede de instanciar classe -> nao deixa new BaseDatabase
// Protected -> Classe so e acessada por classes filhas
// Static  -> Posso usar connection diretamente sem instanciar `variavel global da classe`

