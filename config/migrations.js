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




// Create the invoces table
// service_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
//   service_name VARCHAR(255),
//   service_description VARCHAR(255),
//   service_price DECIMAL(10, 2)
db.schema.createTable('Services',(table)=>{
  table.increments('service_id').primary();
  table.string('service_name');
  table.string('service_description');
  table.double('service_price');
  table.double('quantity');
})
.then(()=>{
  // car_id INT PRIMARY KEY NOT NULL,
  // car_size VARCHAR(50),
  // car_description TEXT
  return db.schema.createTable('Cars',(table)=>{
    table.increments('car_id').primary();
    table.string('car_plate').unique();
    table.string('car_size');
    table.string('car_description');
  })
})
.then(()=>{
  return db.schema.createTable('Users',(table)=>{
    table.increments('user_id').primary();
    table.string('userName');
    table.string('password');
  })
})

.then(()=>{
  // invoice_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  // invoice_date DATE,
  // invoice_time TIME,
  // total_amount DECIMAL(10, 2),
  // deducted_amount DECIMAL(10, 2),
  // paid_amount DECIMAL(10, 2)
  return db.schema.createTable('Invoices',(table)=>{
    table.increments('invoice_id').primary();
    table.integer('car_id').unsigned().references('car_id').inTable('Cars');
    table.integer('user_id').unsigned().references('user_id').inTable('Users');
    table.date('invoice_date');
    table.time('invoice_time');
    table.double('total_amount');
    table.double('deducted_amount');
    table.double('paid_amount');
  })
})

.then(()=>{
  // order_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  // invoice_id INT,
  // car_id INT,
  // service_id INT,
  // FOREIGN KEY (invoice_id) REFERENCES Invoices(invoice_id),
  // FOREIGN KEY (car_id) REFERENCES Cars(car_id),
  // FOREIGN KEY (service_id) REFERENCES Services(service_id)
  return db.schema.createTable('Washing_orders',(table)=>{
    table.increments('order_id').primary();
    table.integer('service_id').unsigned().references('service_id').inTable('Services');
    table.integer('invoice_id').unsigned().references('invoice_id').inTable('Invoices');
    
  })
})

.then(()=>{
  db.destroy();
})
.catch((error) => {
  console.error('Error creating tables:', error);
  db.destroy();
});