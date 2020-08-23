const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const port = process.env.PORT || 5000;

app.use(bodyParser.json())

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
	swaggerDefinition: {
		openapi: '3.0.3',
		info: {
			title: 'Customer API',
			description: 'Customer API Information',
			contact: {
				name: "Amazing Developer"
			},
			servers: ["http://localhost:5000"]
		}
	},
	// ['.routes/*.js']
	apis: ["app.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Used to request all customers
 *     responses:
 *       '200':
 *         description: A successful response
 */
app.get('/customers', (req, res) => {
	res.status(200).json({
		"key": "value"
	});
});

/**
 * @swagger
 * /customer:
 *   post:
 *     summary: Used to create a customer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: James
 *     responses:
 *       '201':
 *         description: OK
 */
app.post('/customer', (req, res) => {
	const { name } = req.body || {};
	res.status(201).json({
		greet: `Hello ${name}`
	});
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});