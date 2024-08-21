import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import {
	checkAuthStatus,
	loginUser,
	logoutUser,
	signupUser,
} from '../helpers/api-communicator';
import { useNavigate } from 'react-router-dom';

type User = {
	name: string;
	email: string;
};

type UserAuth = {
	isLoggedIn: boolean;
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	signup: (name: string, email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true); // Loading state for async operations
	const navigate = useNavigate();

	useEffect(() => {
		async function checkStatus() {
			try {
				const data = await checkAuthStatus();
				if (data) {
					setUser({ email: data.email, name: data.name });
					setIsLoggedIn(true);
				}
			} catch (error) {
				console.error('Error checking auth status:', error);
			} finally {
				setLoading(false); // Stop loading once check is complete
			}
		}
		checkStatus();
	}, []);

	const setUserData = (data: { name: string; email: string }) => {
		setUser({ email: data.email, name: data.name });
		setIsLoggedIn(true);
	};

	const login = async (email: string, password: string) => {
		try {
			const data = await loginUser(email, password);
			if (data) {
				setUserData(data);
				navigate('/chat'); // Redirect to chat on successful login
			}
		} catch (error) {
			console.error('Error logging in:', error);
		}
	};

	const signup = async (name: string, email: string, password: string) => {
		try {
			const data = await signupUser(name, email, password);
			if (data) {
				setUserData(data);
				navigate('/chat'); // Redirect to chat on successful signup
			}
		} catch (error) {
			console.error('Error signing up:', error);
		}
	};

	const logout = async () => {
		try {
			await logoutUser();
			setIsLoggedIn(false);
			setUser(null);
			navigate('/'); // Redirect to home on logout
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};

	if (loading) {
		return <div>Loading...</div>; // Show loading while checking auth status
	}

	const value = {
		user,
		isLoggedIn,
		login,
		logout,
		signup,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
