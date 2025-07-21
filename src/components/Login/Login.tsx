import React, { useState } from 'react';
import FormInput from '../FormInput/FormInput';
import type { FormEvent, ChangeEvent } from 'react';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Form submitted:", formData);
    };

    return (
        <main className='flex items-center justify-center min-h-screen bg-gray-100'>
            <section className='w-full max-w-md bg-white rounded-xl shadow-md p-8'>
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <FormInput
                        label="Username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <FormInput
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </form>
            </section>
        </main>
    );
};

export default Login;
