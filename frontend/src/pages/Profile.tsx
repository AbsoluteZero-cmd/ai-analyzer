import { useEffect, useState } from 'react';
import { logout, me } from '../api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const res = await me();
			setUser(res);
			console.log(res);
		};

		fetchData();
	}, []);

	function handleLogout(): void {
		console.log('logout start');
		const asyncFunc = async () => {
			await logout();
			navigate('/');
		};

		asyncFunc();
	}

	return (
		<div>
			<h1>Profile</h1>
			<p>{user.username}</p>
			<button className='shadow p-3' type='submit' onClick={handleLogout}>
				Logout
			</button>
		</div>
	);
};

export default Profile;
