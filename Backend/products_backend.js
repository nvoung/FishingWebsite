const { MongoClient } = require('mongodb');
// MongoDB
const multer = require('multer');
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/'); // Save images in the 'uploads' folder
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + path.extname(file.originalname)); // Unique filename
	},
});
const upload = multer({ storage : storage });
// const image = multer({
// 	dest: 'uploads/', // Directory to save uploaded files
// 	limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10MB
// 	fileFilter(req, file, cb) {
// 		if (!file.originalname.match(`\.(jpg|jpeg|png|gif|avif)$`)) {
// 			return cb(new Error('Please upload an image file.'));
// 		}
// 		cb(null, true);
// 	},
// });
// Create "uploads" folder if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
	fs.mkdirSync('uploads');
}
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'secoms319';
const client = new MongoClient(url);
// Server
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
const { default: cluster } = require('cluster');
const { title } = require('process');
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = '8081';
const host = 'localhost';
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads')); // Serve images statically

// async function startServer() {
// await client.connect();
const db = client.db(dbName);
console.log('Connected to MongoDB');

// app.listen(port, () => {
// 	console.log('App listening at http://%s:%s', host, port);
// });
//  }
//  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.post();

//  startServer();
//GET all products
app.get('/listproducts', async (req, res) => {
	console.log('Node connected successfully to GET MongoDB');

	const query = {};
	const results = await db.collection('Final').find(query).limit(100).toArray();
	console.log(results);

	res.status(200).send(results);
});
//Get All Categories
app.get('/listcategories', async (req, res) => {
	console.log('Node connected successfully to GET MongoDB');

	try {
		const categories = await db.collection('Final').distinct('category');
		console.log(categories);

		res.status(200).send(categories);
	} catch (error) {
		console.error('Error retrieving categories:', error);
		res.status(500).send('Internal Server Error');
	}
});
//Get Item by Id
app.get('/item/:id', async (req, res) => {
	const itemId = Number(req.params.id);
	console.log('Robot to find: ', itemId);
	try {
		await client.connect();
		console.log('Node connected successfully to GET-id MongoDB');
		const query = { id: itemId };
		const result = await db.collection('Final').findOne(query);
		console.log('Results: ', result);
		if (!result) res.send('Not Found').status(404);
		else res.send(result).status(200);
	} catch (err) {
		console.log('Error retreiving data');
		res.status(500);
		res.send({ error: 'An internal server error occurred' });
	}
});
// //Count of ID
app.get('/products/count', async (req, res) => {
	try {
		const count = await db.collection('Final').countDocuments();
		res.status(200).send({ count });
	} catch (err) {
		res.status(500).send({ error: 'Failed to fetch product count' });
	}
});

//POST a new item
app.post('/add-item', upload.single('image'), async (req, res) => {
	const { title, price, category, id } = req.body;
	const image = req.file ? req.file.path : null;
	try {
		await client.connect();
		const newDocument = {
			id: parseFloat(id),
			title,
			price: parseFloat(price),
			category,
			image,
		};
		console.log(newDocument);
		//post to MongoDB
		const result = await db.collection('Final').insertOne(newDocument);
		res.status(200);
		res.send(result);
	} catch (err) {
		// Handle synchronous errors
		console.error('Error in POST /contact:', err);
		res
			.status(500)
			.json({ error: 'An unexpected error occurred: ' + err.message });
	}
});
//login
app.post('/login', (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res
			.status(400)
			.send({ error: 'Username and password are required.' });
	}
	const adminAccountsPath = path.join(__dirname, 'adminAccount.json');
	fs.readFile(adminAccountsPath, 'utf8', (err, data) => {
		if (err) {
			return res
				.status(500)
				.send({ error: 'An error occured accessing admin account' });
		}
		const adminAccounts = JSON.parse(data);
		const account = adminAccounts.find(
			(account) =>
				account.username === username && account.password === password
		);
		if (!account) {
			return res.status(401).send({ error: 'Invalid username or password' });
		}
		res.status(200).send({ role: account.role });
	});
});
//UPDATE an item info
app.put('/update-item/:id', upload.single('image'), async (req, res) => {
	const productId = req.params.id;
	const { title, price, category } = req.body;
	const image = req.file ? req.file.path : null;

	try {
		await client.connect();
		const query = { id: productId };

		const updateData = {
			$set: {
				title,
				price,
				category,
				image,
			},
		};
		const rodUpdated = await db
			.collection('Final')
			.updateOne(query, updateData);
		if (rodUpdated.matchedCount > 0) {
			res.status(200).json({ message: 'product updated' });
		} else {
			res.status(404).json({ error: 'Product not found' });
		}

		// res.send(rodUpdated);
		// // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
		// const options = {};
		// const results = await db
		// 	.collection('Final')
		// 	.updateOne(query, updateData, options);
		// res.status(200); // Response to Client
		// res.send(results);
	} catch {
		// Handle synchronous errors
		console.error('Error in UPDATE /contact:', err);
		res.status(500).send({
			error: 'An unexpected error occurred in UPDATE: ' + err.message,
		});
	}
});
//DELETE a specific item by id
app.delete('/delete-item/:id', async (req, res) => {
	try {
		const id = Number(req.params.id);
		console.log('Robot to delete: ', id);
		await client.connect();
		const query = { id };
		//check to see if available
		const itemDeleted = await db.collection('Final').findOne(query);
		res.status(200);
		res.send(itemDeleted);
		// Delete
		const results = await db.collection('Final').deleteOne(query);
		console.log(results);
		// Response to Client
		res.status(200);
		res.send(results);
	} catch (err) {
		// Handle synchronous errors
		console.error('Error in DELETE /contact:', err);
		res.status(500).send({
			error: 'An unexpected error occurred in DELETE: ' + err.message,
		});
	}
});

app.listen(port, () => {
	console.log('App listening at http://%s:%s', host, port);
});
