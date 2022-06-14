import express from 'express';
import AuthRoutes from './Routes/Auth'
require('dotenv').config({path:'./src/.env'})

const cors = require('cors');
const server = express();
server.use(cors());
server.use(AuthRoutes);

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`Server started on PORT ${port}`);
});