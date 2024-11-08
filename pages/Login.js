import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/userSlice';
import axios from 'axios';
import Link from 'next/link';

import { useRouter } from 'next/navigation';

export default function Login() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();


    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const handleLogin = async (e) => {
        console.log("USER is LOGGING")
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/api/auth/v1/login`, {
                username,
                password,
            });

            if (response.data.success) {
                const token = response.data.token;
                const user = response.data.data; //watch the response in postman 

                localStorage.setItem('token', token);
                dispatch(setUser({ user, token }));
                console.log(user);
                router.push('/');
                setError(null);
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="flex items-center justify-center ">
            <form onSubmit={handleLogin} className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md my-16">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                {error && <p className="text-red-500">{error}</p>}

                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Username"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Login
                </button>
                <div>
                    <p className="text-sm text-gray-600">Don't have an account? <Link href='/Register'>Register</Link></p>
                </div>
            </form>
        </div>
    );
}
