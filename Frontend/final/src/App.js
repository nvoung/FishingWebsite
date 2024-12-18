import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Button,
	InputGroup,
	FormControl,
	Container,
	Row,
	Col,
	Card,
} from 'react-bootstrap';
import TopNavBar from './TopNavBar';
import Footer from './footer';
import Authentication from './Login';

function ShowProducts({ catalog, cart, setCart, cartTotal, userRole }) {
	const [filteredCatalog, setFilteredCatalog] = useState([]);
	const [categories, setCategories] = useState([]);
	const navigate = useNavigate();
	const location = useLocation();
	const [search, setSearch] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	// const [userRole, setUserRole] = useState(null);

	useEffect(() => {
		const fetchCategories = async () => {
			const responseCategories = await fetch(
				'http://localhost:8081/listcategories'
			);
			const dataCategories = await responseCategories.json();
			setCategories(dataCategories);
		};

		fetchCategories();
	}, []);

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const searchTerm = searchParams.get('search');
		const category = searchParams.get('category');
		let filtered = catalog;

		if (searchTerm) {
			filtered = filtered.filter((product) =>
				product.title.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		if (category) {
			filtered = filtered.filter(
				(product) => product.category.toLowerCase() === category.toLowerCase()
			);
		}

		setFilteredCatalog(filtered);
	}, [location.search, catalog]);

	const addToCart = (product) => {
		setCart([...cart, product]);
	};

	const handleCheckout = () => {
		navigate('/checkout', { state: { cart, cartTotal } });
	};

	const removeFromCart = (product) => {
		let itemFound = false;
		const updatedCart = cart.filter((cartItem) => {
			if (cartItem.id === product.id && !itemFound) {
				itemFound = true;
				return false;
			}
			return true;
		});
		if (itemFound) {
			setCart(updatedCart);
		}
	};

	const howManyofThis = (id) => {
		let hmot = cart.filter((cartItem) => cartItem.id === id);
		return hmot.length;
	};

	const cartItems = cart.map((product, index) => (
		<div key={index} className="d-flex justify-content-between">
			<img
				className="img-fluid"
				src={product.image}
				width={50}
				alt={product.title}
			/>
			<div>{product.title}</div>
			<div>${product.price}</div>
			<Button variant="light" onClick={() => removeFromCart(product)}>
				-
			</Button>
			<Button variant="light" onClick={() => addToCart(product)}>
				+
			</Button>
		</div>
	));

	const deleteProduct = async (id) => {
		try {
			const response = await fetch(`/delete-item/${id}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				alert('Product successfully deleted');
				navigate('/listproducts'); // Redirect to the products list page
			} else {
				alert('Error deleting product');
			}
		} catch (error) {
			alert('An error occurred while deleting the product');
		}
	};

	return (
		<Container
			fluid
			className="d-flex flex-column"
			style={{ height: '100vh', width: '100%' }}
		>
			<TopNavBar
				catalog={catalog}
				setCatalog={() => {}} // Dummy function to prevent errors
				filteredCatalog={filteredCatalog}
				setFilteredCatalog={setFilteredCatalog}
				categories={categories}
				cart={cart}
				cartTotal={cartTotal}
				style={{ width: '100%' }}
			/>
			<div className="flex-grow-1 p-4">
				<Row>
					{filteredCatalog.map((product) => (
						<Col key={product.id} md={4}>
							<Card className="mb-4">
								<Link to={`/product/${product.id}`}>
									<Card.Img
										variant="top"
										src={product.image}
										style={{
											width: '150px',
											margin: 'auto',
											paddingTop: '20px',
										}}
										alt={product.title}
									/>
								</Link>
								<Card.Body>
									<Card.Title>{product.title}</Card.Title>
									<Card.Text>
										<strong>Price:</strong> ${product.price} <br />
										<strong>Category:</strong> {product.category} <br />
										<strong>Rating:</strong>
										{product.rating ? product.rating.rate : 'N/A'} (
										{product.rating ? product.rating.count : '0'} reviews)
									</Card.Text>
									<div className="d-flex justify-content-between align-items-center">
										<Button
											variant="light"
											onClick={() => removeFromCart(product)}
										>
											-
										</Button>
										<span>{howManyofThis(product.id)}</span>
										<Button variant="light" onClick={() => addToCart(product)}>
											+
										</Button>
									</div>
									{/* ADMIN BUTTONS */}
									{userRole === 'admin' && (
										<div className="mt-3 d-flex justify-content-between">
											<Button
												variant="primary"
												onClick={() => navigate(`/add-item`)}
											>
												Add Product
											</Button>
											<Button
												variant="primary"
												onClick={() => navigate(`/update-item/${product.id}`)}
											>
												Update
											</Button>
											<Button
												variant="danger"
												onClick={() => deleteProduct(product.id)}
											>
												Delete
											</Button>
										</div>
									)}
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
				<div className="mt-4">
					<h2>Cart Summary</h2>
					<div>{cartItems}</div>
					<h3>Total: ${cartTotal.toFixed(2)}</h3>
					<Button onClick={handleCheckout}>Proceed to Checkout</Button>
				</div>
			</div>
			<Footer />
			{/* <Authentication
				username={username}
				setUsername={setUsername}
				password={password}
				setPassword={setPassword}
				setUserRole={setUserRole}
			/> */}
		</Container>
	);
}

export default ShowProducts;
