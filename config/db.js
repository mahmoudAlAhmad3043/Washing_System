import knex from 'knex';

const db = knex({
  client: 'mysql',
  connection: {
    host: 'sql12.freesqldatabase.com',
    port:'3306',
    user: 'sql12718499',
    password: 'dELwLQ8NSg',
    database: 'sql12718499'
  }
});

export default db;