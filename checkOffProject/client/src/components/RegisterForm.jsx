import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations.js';

const RegisterForm = () => {
    const [formData, setFormData] = useState({ email: '', username: '', password: '' });
    const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ variables: { ...formData } });
            // Handle successful registration, e.g., display success message
        } catch (err) {
            console.error(err);
        }
    }


return (
    <form onSubmit={handleRegister}>
        <input
            type="text"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value })}
            placeholder="Email"
        />
        <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value })}
            placeholder="Username"
        />
        <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value })}
            placeholder="Password"
        />
        <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p>{error.message}</p>}
        {data && <p>Registration successful!</p>}
    </form>
);

};

export default RegisterForm;
