import express from "express";
import "dotenv/config";
import cors from 'cors';
import getRoutes from './routes/get-routes.js';
import postRoutes from './routes/post-routes.js';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
     console.clear();
  console.log("Request method: " + req.method + " " + req.url);
  next();
});

app.use(cors({
     origin: 'http://localhost:3000'
 }));

app.use(getRoutes);
app.use(postRoutes);

app.listen(PORT, () => {
  console.log("Server listening on port http://localhost:" + PORT);
});
