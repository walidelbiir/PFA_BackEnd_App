const express=require('express');
const app=express();
const dotenv=require('dotenv');
const cors=require('cors');
const bodyParser=require('body-parser');
const connectDB=require('./config/connectDB');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger/swagger.json');
const http = require('http')
const client = require('prom-client')

//.env configuration
dotenv.config();

//middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended:false
}))

client.collectDefaultMetrics({
  timeout: 10000,
  gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
  prefix: 'backend_'
})

const metrics_server= http.createServer(async (req,res) => {
  if(req.url === '/metrics') {
    res.setHeader('Content-Type', client.register.contentType);
    res.end(await client.register.metrics())
  }
})
//connect Database
connectDB();

//routes


app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );
app.use('/api/carousel',require('./Routes/carousel.js'));
app.use('/api/accueil',require('./Routes/accueil'));
app.use('/api/services',require('./Routes/services'));
app.use('/api/lieux',require('./Routes/lieux'));
app.use('/api/contact',require('./Routes/contact'));
app.use('/api/social',require('./Routes/social'));

//Run Server
app.listen(process.env.PORT || 6000,(err)=>err?console.log("can't start server"):console.log(`server running on port ${process.env.PORT || 6000}`));

metrics_server.listen(5001 , () => {
  console.log('Metrics Server is running on port 5001')
})