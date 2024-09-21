import axios from 'axios';

// Helper to configure axios with proper credentials
axios.defaults.withCredentials = true; // Assuming you're using cookies for authentication

export const loginUser = async (email: string, password: string) => {
	try {
		const res = await axios.post('/user/login', { email, password });
		return res.data; // No need for `await` here
	} catch (error) {
		throw new Error('Unable to login');
	}
};

export const signupUser = async (
	name: string,
	email: string,
	password: string
) => {
	try {
		const res = await axios.post('/user/signup', { name, email, password });
		return res.data;
	} catch (error) {
		throw new Error('Unable to signup');
	}
};

export const checkAuthStatus = async () => {
	try {
		const res = await axios.get('/user/auth-status');
		return res.data;
	} catch (error) {
		throw new Error('Unable to authenticate');
	}
};

export const sendChatRequest = async (message: string) => {
	try {
		const res = await axios.post('/chat/new', { message });
		return res.data;
	} catch (error) {
		throw new Error('Unable to send chat');
	}
};

export const getUserChats = async () => {
	try {
		const res = await axios.get('/chat/all-chats');
		return res.data;
	} catch (error) {
		throw new Error('Unable to get chats');
	}
};

export const deleteUserChats = async () => {
	try {
		const res = await axios.delete('/chat/delete');
		return res.data;
	} catch (error) {
		throw new Error('Unable to delete chats');
	}
};

export const logoutUser = async () => {
	try {
		const res = await axios.get('/user/logout');
		return res.data;
	} catch (error) {
		throw new Error('Unable to logout');
	}
};
