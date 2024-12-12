import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

function UpdateItem() {
	const location = useLocation();
	const navigate = useNavigate();
	const product = location.state?.product || {}; // Get product data from state

	const [title, setTitle] = useState(product.title);
	const [price, setPrice] = useState(product.price);
	const [category, setCategory] = useState(product.category);

	const handleUpdate = async () => {
		// Send updated data to the backend (update the database)
		const response = await fetch(
			`http://localhost:8081/updateproduct/${product.id}`,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, price, category }),
			}
		);
		if (response.ok) {
			navigate('/'); // Redirect to product list or wherever you want
		}
	};

	return (
		<div>
			<h2>Update Product</h2>
			<Form>
				<Form.Group>
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Price</Form.Label>
					<Form.Control
						type="number"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Category</Form.Label>
					<Form.Control
						type="text"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					/>
				</Form.Group>
				<Button onClick={handleUpdate}>Update</Button>
			</Form>
		</div>
	);
}

export default UpdateItem;
