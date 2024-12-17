import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddItem() {
	const [product, setProduct] = useState({
		id: '',
		title: '',
		price: '',
		category: '',
		image: null,
		rating: { rate: 0, count: 0 },
	});
	const [preview, setPreview] = useState(null);
	const [productCount, setProductCount] = useState(0);

	useEffect(() => {
		const fetchProductCount = async () => {
			try {
				const response = await fetch('http://localhost:8081/products/count');
				const data = await response.json();
				setProductCount(data.count); // Store the current number of products
			} catch (err) {
				console.error('Error fetching product count:', err);
			}
		};
		fetchProductCount();
	}, []);

	const generateId = () => {
		return parseFloat(productCount) + 1; // The new product will have an ID of one more than the current count
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const priceNumber = parseFloat(product.price);
		const newProduct = {
			...product,
			id: generateId(),
			price: priceNumber,
		};
		// const product = location.state?.product || {
		// 	rating: { rate: 0, count: 0 },
		// };
		// Call this function to fetch backend with method POST
		const formData = new FormData();
		formData.append('id', newProduct.id);
		formData.append('image', newProduct.image); // Add the file to the form data
		formData.append('title', newProduct.title);
		formData.append('category', newProduct.category);
		formData.append('price', newProduct.price);
		formData.append('rating', JSON.stringify(newProduct.rating));
		try {
			const response = await fetch('http://localhost:8081/add-item', {
				method: 'POST',
				body: formData, // No need to set Content-Type; fetch will handle it
				// body: JSON.stringify(product),
			});
			if (response.ok) {
				alert('Product added successfully');
				setProduct({
					id: '',
					title: '',
					price: '',
					category: '',
					image: null,
					rating: { rate: 0, count: 0 },
				});
				setPreview(null);
			} else {
				// Status code 201 indicates success
				const successMessage = await response.text(); // Handle plain text response
				alert('Error: ' + successMessage);
			}
		} catch (err) {
			alert('An error occurred :' + err);
		}
	};
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setProduct({ ...product, image: file });
		if (file) {	
			setPreview(URL.createObjectURL(file)); // Show preview
		}
	};

	return (
		<div className="container mt-4">
			<h2 className="text-center">Add New Product</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label className="form-label">Product Title</label>
					<input
						type="text"
						className="form-control"
						value={product.title}
						onChange={(e) => setProduct({ ...product, title: e.target.value })}
						required
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Price</label>
					<input
						type="text"
						className="form-control"
						value={product.price}
						onChange={(e) => setProduct({ ...product, price: e.target.value })}
						required
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Category</label>
					<textarea
						className="form-control"
						value={product.category}
						onChange={(e) =>
							setProduct({ ...product, category: e.target.value })
						}
					></textarea>
				</div>
				<div className="mb-3">
					<label className="form-label">Product Image</label>
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
				</div>
				<button type="submit" className="btn btn-primary">
					Add Product
				</button>
			</form>
		</div>
	);
}

export default AddItem;
