import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Home.css'; // Import the CSS file for animations
import Footer from './footer';
import Logo from './logo.png';

const Home = ({ catalog }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (searchTerm.trim() !== '') {
			const results = catalog.filter((product) =>
				product.title.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setSearchResults(results);
		} else {
			setSearchResults([]);
		}
	}, [searchTerm, catalog]);

	const handleSearch = () => {
		if (searchTerm.trim() !== '') {
			navigate(`/product?search=${encodeURIComponent(searchTerm)}`);
		}
	};

	const handleSelectProduct = (productId) => {
		navigate(`/product/${productId}`);
	};

	const handleCategoryClick = (category) => {
		navigate(`/product?category=${encodeURIComponent(category)}`);
	};

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<Link to="/">
					<img
						src={Logo}
						alt="Logo"
						className="d-inline-block align-top"
						style={{ height: '40px', marginRight: '20px', marginLeft: '20px' }}
					/>
				</Link>
				<a className="navbar-brand" href="#">
					NVDC Fishing
				</a>
			</nav>

			<div style={{ backgroundColor: '#D3D3D3', paddingTop: '0px' }}>
				<Row className="position-relative" style={{ marginTop: 0 }}>
					<Col>
						<Image
							src="/photos/FishingHomeIMG.jpg"
							alt="Top Half View"
							fluid
							className="w-100"
						/>
						{/* Welcome text and button with fade-in effect */}
						<div className="welcome-text">
							<h1>Welcome to the NVDC Store</h1>
							<p>Check out our Products Here</p>
							<Button variant="primary" onClick={() => navigate('/product')}>
								Goto
							</Button>
						</div>
						{/* Search bar for products positioned within the image */}
						<div
							style={{
								position: 'absolute',
								top: '10%',
								left: '50%',
								transform: 'translateX(-50%)',
								width: '80%',
							}}
						>
							<Form className="d-flex">
								<Form.Control
									type="text"
									placeholder="Search for products..."
									className="mr-sm-2 flex-grow-1"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
								<Button variant="primary" type="button" onClick={handleSearch}>
									Search
								</Button>
							</Form>
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
						</div>
					</Col>
				</Row>

				{/* Bar separator */}
				<div className="bar-separator"></div>

				{/* Bottom half with two containers */}
				<Row className="justify-content-center mt-5">
					<Col md={5}>
						<Card className="mb-3 text-center">
							<Card.Body>
								<Card.Title>Get to know us more</Card.Title>
								<Card.Text>
									Here at NVDC Fishing we value our customers. We have taken it
									upon ourselves to only provide the best of the best quality
									products on the market today. To Learn more about our company,
									our values, and our mission click on the button below.
								</Card.Text>
								<Button variant="primary" onClick={() => navigate('/about')}>
									Goto
								</Button>
							</Card.Body>
						</Card>
					</Col>
					<Col md={5}>
						<Card className="mb-3 text-center">
							<Card.Body>
								<Card.Title>Email Us</Card.Title>
								<Card.Text>
									Have more questions or intrested to learn even more about us
									as a company? Feel free to email us any questions or problems
									that you may be having and we will be sure to get back to you
									with a response that satisfies your needs!
								</Card.Text>
								<Button variant="primary" href="mailto:support@nvdcfishing.com">
									Email Us
								</Button>
							</Card.Body>
						</Card>
					</Col>
				</Row>

				{/* Five additional containers */}
				<div className="additional-containers">
					<div
						className="additional-container"
						style={{ backgroundImage: "url('/photos/FishingPoleStore.jpg')" }}
						onClick={() => handleCategoryClick('Fishing Rods')}
					>
						<span>Fishing Rods</span>
					</div>
					<div
						className="additional-container"
						style={{ backgroundImage: "url('/photos/FishingReelStore.jpg')" }}
						onClick={() => handleCategoryClick('Fishing Reels')}
					>
						<span>Fishing Reels</span>
					</div>
					<div
						className="additional-container"
						style={{ backgroundImage: "url('/photos/FishingLureStore.avif')" }}
						onClick={() => handleCategoryClick('Fishing Lures')}
					>
						<span>Fishing Lures</span>
					</div>
					<div
						className="additional-container"
						style={{ backgroundImage: "url('/photos/BoatStore.avif')" }}
						onClick={() => handleCategoryClick('Boats')}
					>
						<span>Boats</span>
					</div>
					<div
						className="additional-container"
						style={{ backgroundImage: "url('/photos/JetStore.jpg')" }}
						onClick={() => handleCategoryClick('Jetskis')}
					>
						<span>Jetskis</span>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
