import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from 'dotenv';

const app= express();
const port= 2000;

dotenv.config();

const { Pool } = pg;

const db = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: 5432,
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


// db.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error('Database connection error', err);
//   } else {
//     console.log('Database connected:', res.rows);
//   }
// });

app.get('/', (req,res) => {
  res.render('index.ejs');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
