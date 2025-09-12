import express from 'express';
import bodyParser from 'body-parser';
import ProductRouter from './routes/product-route.js';
import { errorHandler } from './middleware/error-handler.js';
import { checkApiKey } from './middleware/auth-handler.js';
import dotenv from 'dotenv';
//import swaggerUi from 'swagger-ui-express';
//import swaggerDocument from './swagger.json' assert {type: 'json'};

dotenv.config(); // Load env vars from .env file

const app = express();
const port = 3000;

// Middleware
/*app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/api-docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});*/



app.use(bodyParser.json());
app.use('/api/products', checkApiKey, ProductRouter);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})