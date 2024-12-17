import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

function UpdateItem() {
	const location = useLocation();
	const navigate = useNavigate();
	const product = location.state?.product || {}; // Get product data from state
	const [title, setTitle] = useState(product.title);
	const [price, setPrice] = useState(product.price);
	const [category, setCategory] = useState(product.category);
	const [image, setImage] = useState(product.image || null);
	const [preview, setPreview] = useState(null);

	useEffect(() => {
		if (product.image) {
			setPreview(`http://localhost:8081/${product.image}`);
		}
	}, [product]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
		if (file) {
			setPreview(URL.createObjectURL(file)); // Show preview
		}
	};

	const handleUpdate = async (e) => {
		// Send updated data to the backend (update the database)

		try {
			const formData = new FormData();
			formData.append('title', product.title);
			formData.append('category', product.category);
			formData.append('price', product.price);
			if (image) {
				formData.append('image', image); // Add the file to the form data
			}
			const response = await fetch(
				`http://localhost:8081/update-item/${product.id}`,
				{
					method: 'PUT',
					// headers: { 'Content-Type': 'application/json' },
					body: formData,
				}
			);
			if (response.ok) {
				navigate('/'); // Redirect to product list or wherever you want
			} else {
				const errorData = await response.json();
				alert('Error: ' + errorData);
			}
		} catch (err) {
			alert('Error: ' + err);
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
				<Form.Group>
					<Form.Label>Product Image</Form.Label>
					<input
						type="file"
						className="form-control"
						onChange={handleImageChange}
					/>
					{preview && (
						<img
							src={preview}
							alt="Preview"
							className="mt-3"
							style={{ width: '100px', height: '100px', objectFit: 'cover' }}
						/>
					)}
				</Form.Group>
				<Button onClick={handleUpdate}>Update Product</Button>
			</Form>
		</div>
	);
}

export default UpdateItem;
