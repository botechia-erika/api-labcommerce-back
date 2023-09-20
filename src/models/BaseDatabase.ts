import knex from "knex";
export class BaseDatabase {
  protected static connection = knex({
    client: "sqlite3",
    connection: {
      filename: __dirname + "./../../database/dbdata.db",
    },

    useNullAsDefault: true,
    pool: {
      min: 0,
      max: 1,
      afterCreate: (conn: any, cb: any) => {
        conn.run("PRAGMA foreign_keys = ON", cb);
      },
    },
  });
} // abstract = não instanciavel
//const baseDatabase = new BaseDatabase => produz erro
//private nao acessa
// protected
