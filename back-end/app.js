import express from "express";
import "dotenv/config";
import cors from 'cors';
import getRoutes from './routes/get-routes.js';
import postRoutes from './routes/post-routes.js';
import patchRoutes from './routes/patch-routes.js';
import deleteRoutes from './routes/delete-routes.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  console.log("Request method: " + req.method + " " + req.url);
  next();
});

app.use(cors({
     origin: 'http://localhost:3000'
 }));

app.use(getRoutes);
app.use(postRoutes);
app.use(patchRoutes);
app.use(deleteRoutes);

app.listen(3005, () => {
  console.log("Server listening on port http://localhost:3005");
});
