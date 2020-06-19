require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;
const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);
app.use(errorHandler);
app.listen(PORT,()=>{
  console.log(`app run on port: ${PORT}`);
})