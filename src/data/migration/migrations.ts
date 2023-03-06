import { BaseDatabase } from "../BaseDatabase";
import { TablesNames } from "../TablesName";

export class Migrations extends BaseDatabase {
  public migrationExec = async ():Promise<void> => {
    await Migrations.connection.raw(`
      DROP TABLE IF EXISTS ${TablesNames.Table_recipe};
      DROP TABLE IF EXISTS ${TablesNames.Table_following};
      DROP TABLE IF EXISTS ${TablesNames.Table_user};


      CREATE TABLE IF NOT EXISTS ${TablesNames.Table_user}(
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role ENUM("normal","admin") NOT NULL DEFAULT "normal",
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS ${TablesNames.Table_following}(
        id VARCHAR(255) PRIMARY KEY,
        fk_user_follower VARCHAR(255) NOT NULL,
        fk_following_user VARCHAR(255) NOT NULL,
        FOREIGN KEY(fk_user_follower) REFERENCES ${TablesNames.Table_user}(id),
        FOREIGN KEY(fk_following_user) REFERENCES ${TablesNames.Table_user}(id)
      );

      CREATE TABLE IF NOT EXISTS ${TablesNames.Table_recipe}(
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)
    .then(() => {
      console.log(`Tabelas criadas com sucesso :) !`)
    })
    .catch((error: any) => console.log(error.sqlMessage || error.message))
    .finally( async () => await Migrations.connection.destroy())
  }
};
const migration = new Migrations();
migration.migrationExec()