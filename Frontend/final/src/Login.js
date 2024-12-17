import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Authentication = ({ setUserRole }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		const response = await fetch('/adminAccount.json');
		const accounts = await response.json();
		// 	{
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify({ username, password }),
		// });

		if (!response.ok) {
			const errorData = await response.json();
			setError(errorData.error);
			return;
		}

		const user = accounts.find(
			(account) =>
				account.username === username && account.password === password
		);
		if (user) {
			// const { role } = await response.json();
			setUserRole(user.role);
			alert('User is an: ' + user.role);
			navigate('/');
		} else {
			setError('Invalid username or password.');
		}
	};
	return (
		<div className="container mt-4">
			<h2 className="text-center">Admin Login</h2>
			<form onSubmit={handleLogin}>
				<div className="mb-3">
					<label className="form-label">Username</label>
					<input
						type="text"
						className="form-control"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Password</label>
					<input
						type="password"
						className="form-control"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				{error && <p className="text-danger">{error}</p>}
				<button type="submit" className="btn btn-primary">
					Login
				</button>
			</form>
		</div>
	);
};
export default Authentication;
