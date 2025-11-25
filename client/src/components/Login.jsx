import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const { login, register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (isLogin) {
            const res = await login(formData.email, formData.password);
            if (res.success) {
                navigate('/');
            } else {
                setError(res.message);
            }
        } else {
            const res = await register(formData.username, formData.email, formData.password);
            if (res.success) {
                setIsLogin(true);
                setError('Registration successful! Please login.');
            } else {
                setError(res.message);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Register'}</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                required
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button className="text-blue-500 underline" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
