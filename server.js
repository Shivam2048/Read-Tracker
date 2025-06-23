import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from 'dotenv';
import axios from 'axios';

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


function capitalizeName(str) {
  return str
    .trim()
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function findOlid(tit, aut){
  tit = tit.replace(/\s+/g, '+');
  aut = aut.replace(/\s+/g, '+');
  try {
        const response = await axios.get(`https://openlibrary.org/search.json?title=${tit}&author=${aut}`);

        console.log(response.data.docs);
        if (response.data.docs.length != 0) {

          const result = response.data.docs[0].cover_edition_key;
          return result;

        } else {
            console.log("No data found for this book");
            return null;
            // res.status(404).send("No data found for this book"); 
        }

      }catch (error) {
        console.error("Error in /add route:", error.message);
        return null;
        // res.status(500).send("An error occurred while processing your request.");
    }
}


// db.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error('Database connection error', err);
//   } else {
//     console.log('Database connected:', res.rows);
//   }
// });

app.get('/', async (req,res) => {
  let Books = [];
  let By = "date_read";
  let Order= "ASC";

  if(req.query.sort){
    By= req.query.sort;
    if(By == "date_read" || By == "rating"){
      Order = "DESC";
    }
  }

  try {
    let query = `SELECT * FROM books ORDER BY ${By} ${Order}`;
    const result = await db.query(query);
    Books= result.rows;
    res.render('index.ejs',{Books});
  } catch (error) {
    console.log(error);
  } 

});

app.post('/add', async (req,res) => {
  let Title= req.body.title;
  let Author= req.body.author;
  const dateRead= req.body.DOC;
  const Note= req.body.summary.trim();
  const Rating= req.body.rating;

  Title = capitalizeName(Title);
  Author = capitalizeName(Author);

  const olid= await findOlid(Title,Author);
  console.log(olid);

  if(!olid){
    return res.status(404).send("No data found for this book");
  }

  console.log(Title, Author, olid, dateRead, Note, Rating);

  try {
    await db.query("INSERT INTO books (title, author, cover_edition_key, date_read, note, rating) VALUES ($1, $2, $3, $4, $5, $6)", [Title, Author, olid, dateRead, Note, Rating]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error inserting data");
  }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
