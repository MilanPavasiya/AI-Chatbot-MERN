import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';

const Header = () => {
	const auth = useAuth();

	if (!auth) {
		// Handle case where auth context is not available (null)
		return null;
	}

	const { isLoggedIn, logout } = auth;

	const renderAuthLinks = () => (
		<>
			<NavigationLink
				bg='#00fffc'
				to='/chat'
				text='Go To Chat'
				textColor='black'
			/>
			<NavigationLink
				bg='#51538f'
				textColor='white'
				to='/'
				text='Logout'
				onClick={logout}
			/>
		</>
	);

	const renderGuestLinks = () => (
		<>
			<NavigationLink bg='#00fffc' to='/login' text='Login' textColor='black' />
			<NavigationLink
				bg='#51538f'
				textColor='white'
				to='/signup'
				text='Signup'
			/>
		</>
	);

	return (
		<AppBar
			sx={{ bgcolor: 'transparent', position: 'static', boxShadow: 'none' }}>
			<Toolbar sx={{ display: 'flex' }}>
				<Logo />
				<div>{isLoggedIn ? renderAuthLinks() : renderGuestLinks()}</div>
			</Toolbar>
		</AppBar>
	);
};

export default React.memo(Header);
