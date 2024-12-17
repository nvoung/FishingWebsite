import React, { useState, useEffect } from 'react';
import {
	Routes,
	Route,
	BrowserRouter as Router,
	Redirect,
} from 'react-router-dom';
import ShowProducts from './App';
import CartCheckout from './CartCheckout';
import PurchaseInfo from './PurchaseInfo';
import ProductDetail from './ProductDetail';
import Home from './Home';
import Author from './Author';
import Authentication from './Login';
import DeleteItem from './DeleteItem';
import AddItem from './AddItem';
import UpdateItem from './UpdateItem';

function RoutingApp() {
	const [catalog, setCatalog] = useState([]);
	const [cart, setCart] = useState(
		() => JSON.parse(localStorage.getItem('cart')) || []
	);
	const [cartTotal, setCartTotal] = useState(
		() => JSON.parse(localStorage.getItem('cartTotal')) || 0
	);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [userRole, setUserRole] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('http://localhost:8081/listproducts');
			const data = await response.json();
			setCatalog(data);
		};

		fetchData();
	}, []);

	useEffect(() => {
		const total = () => {
			let totalAmount = 0;
			for (let i = 0; i < cart.length; i++) {
				totalAmount += cart[i].price;
			}
			setCartTotal(totalAmount);
		};
		total();
	}, [cart]);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
		localStorage.setItem('cartTotal', JSON.stringify(cartTotal));
	}, [cart, cartTotal]);

	return (
		<div className="RoutingApp">
			<Routes>
				<Route path="/" element={<Home catalog={catalog} />} />
				<Route path="/about" element={<Author />} />
				<Route
					path="/product"
					element={
						<ShowProducts
							catalog={catalog}
							cart={cart}
							setCart={setCart}
							cartTotal={cartTotal}
							userRole={userRole}
						/>
					}
				/>
				<Route path="/checkout" element={<CartCheckout />} />
				<Route path="/purchase" element={<PurchaseInfo />} />
				<Route
					path="/product/:id"
					element={
						<ProductDetail
							catalog={catalog}
							cart={cart}
							setCart={setCart}
							cartTotal={cartTotal}
						/>
					}
				/>
				<Route
					path="/login"
					element={
						<Authentication
							username={username}
							setUsername={setUsername}
							password={password}
							setPassword={setPassword}
							setUserRole={setUserRole}
						/>
					}
				/>
				<Route
					path="/listproducts"
					element={<ShowProducts userRole={userRole} />}
				/>
				{/* {userRole === 'admin' && ( */}
					{/* <> */}
						<Route path="/add-item" element={<AddItem />} />
						<Route path="/delete-item/:id" element={<DeleteItem />} />
						<Route path="/update-item/:id" element={<UpdateItem />} />
					{/* </> */}
				{/* )} */}
			</Routes>
		</div>
	);
}

export default RoutingApp;
