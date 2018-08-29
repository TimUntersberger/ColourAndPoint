import * as Mysql from "mysql";

interface queryResult{
  error: Mysql.MysqlError,
  results?: any,
  fields: Mysql.FieldInfo[]
}

export default class Base{
  static getConnection(): Promise<Mysql.Connection>{
    const connection = Mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root"
    });

    return new Promise<Mysql.Connection>((resolve, reject) => {
      connection.connect((err, args) => {
        if(err)
          reject(err);
        else
          resolve(connection);
      })
    });
  }

  static async executeQuery(query: string): Promise<queryResult>{
    const connection = await this.getConnection();
    return new Promise<queryResult>((resolve, reject) => {
      connection.query(query, (error, results, fields) => {
        connection.end();
        resolve({
          error,
          results,
          fields
        });
      });
    });
  }
}