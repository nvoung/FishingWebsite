import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Image,
	Card,
	Dropdown,
} from 'react-bootstrap';
function DeleteItem({ catalog }) {
	const [title, setTitle] = useState('');
	const [contactsQuery, setContactsQuery] = useState([]);
	const location = useLocation();
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	// useEffect(() => {
	// 	if (searchTerm.trim() !== '') {
	// 		const results = catalog.filter((product) =>
	// 			product.title.toLowerCase().includes(searchTerm.toLowerCase())
	// 		);
	// 		setSearchResults(results);
	// 	} else {
	// 		setSearchResults([]);
	// 	}
	// }, [searchTerm, catalog]);

	// const handleSearch = () => {
	// 	if (searchTerm.trim() !== '') {
	// 		navigate(`/product?search=${encodeURIComponent(searchTerm)}`);
	// 	}
	// };

	// const handleSelectProduct = (productId) => {
	// 	navigate(`/product/${productId}`);
	// };

	// const handleCategoryClick = (category) => {
	// 	navigate(`/product?category=${encodeURIComponent(category)}`);
	// };

	// Search contacts by name or partial name
	const fetchContacts = async () => {
		if (!searchTerm.trim()) {
			setSearchResults([]);
			return;
		}

		try {
			const response = await fetch(
				`http://localhost:8081/item/name?title=${encodeURIComponent(
					searchTerm
				)}`
			);
			// Http status code 200, 201 is ok
			if (!response.ok) {
				throw new Error('Failed to fetch contacts');
			}
			// If response ok, convert the data javascript
			const data = await response.json();
			setSearchResults(data);
			// setContactsQuery(data);
		} catch (err) {
			alert('There was an Error loading searched contacts ' + err);
		}
	};
	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};
	const handleSearch = () => {
		fetchContacts();
	};
	const handleSelectProduct = (product) => {
		setSelectedProduct(product);
		setSearchTerm(product.title); // Set searchTerm to the selected product title
		setSearchResults([]); // Clear search results after selecting
	};
	// Delete a contact by ID
	const deleteOneContact = async () => {
		if (!selectedProduct) return;
		try {
			const response = await fetch(
				`http://localhost:8081/delete-item/${selectedProduct.id}`,
				{
					method: 'DELETE',
				}
			);
			// Http status code 200, 201 is ok
			if (!response.ok) {
				throw new Error('Failed to delete contact');
			}
			alert('Contact deleted successfully');
			// Refresh the contacts list after deletion
			// setContactsQuery(contactsQuery.filter((item) => item.id !== id));
			setSelectedProduct(null);
		} catch (err) {
			alert('There was an error deleting the contact: ' + err);
		}
	};

	useEffect(() => {
		fetchContacts();
	}, [searchTerm]);
	return (
		<div className="container">
			{/* Input name or partial name for FETCH */}
			<h2 className="text-center mt-4">Delete Item</h2>
			{/* <div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Enter contact name"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<button className="btn btn-primary" onClick={fetchContacts}>
					Search
				</button>
			</div> */}
			<div
				style={{
					position: 'absolute',
					top: '10%',
					left: '50%',
					transform: 'translateX(-50%)',
					width: '80%',
				}}
			>
				<div className="input-group mb-3">
					{/* <Form className="d-flex"> */}
					<Form.Control
						type="text"
						placeholder="Search for products..."
						className="mr-sm-2 flex-grow-1"
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					<Button variant="primary" type="button" onClick={handleSearch}>
						Search
					</Button>
				</div>
				{/* </Form> */}
				{searchResults.length > 0 && (
					<Dropdown.Menu show className="w-100 mt-1">
						{searchResults.map((product) => (
							<Dropdown.Item
								key={product.id}
								onClick={() => handleSelectProduct(product.id)}
							>
								{product.title}
							</Dropdown.Item>
						))}
					</Dropdown.Menu>
				)}

				{loading && <div>Loading...</div>}

				{/* If a product is selected, show delete button */}
				{selectedProduct && (
					<div className="mt-3">
						<h4>Selected Product: {selectedProduct.title}</h4>
						<Button variant="danger" onClick={deleteOneContact}>
							Delete Product
						</Button>
					</div>
				)}
			</div>

			{/* List the result and add Delete button to each */}
			{/* <ul className="list-group">
				{contactsQuery.map((contact) => (
					<li
						key={contact.id}
						className="list-group-item d-flex justify-content-between align-items-center"
					>
						<div className="d-flex align-items-center">
							{contact.image_url && (
								<img
									src={`http://localhost:8081${contact.image_url}`}
									alt={contact.title}
									style={{
										width: '50px',
										height: '50px',
										marginRight: '15px',
										objectFit: 'cover',
									}}
								/>
							)}
							<div>
								<strong>{contact.title}</strong> - {contact.description}
								<p>{contact.message}</p>
							</div>
						</div>
						{/* Delete contact button */}
			{/* <button
							className="btn btn-outline-secondary btn-sm rounded-pill"
							onClick={() => deleteOneContact(contact.id)}
						>
							Delete
						</button> */}
			{/* </li>
				))} */}
			{/*</ul> */}
		</div>
	);
}
export default DeleteItem;
