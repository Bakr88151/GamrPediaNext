"use client";
import "../app/login/login.css";
import { useState } from 'react';
import pb from '../lib/pocketbase';
import md5 from 'md5';

export default function Create({ switchToLogin, showForm }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validatePassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
    };

    const handleSubmit = async () => {
        if (!username) {
            alert('Username cannot be empty');
            return;
        }
        if (!validatePassword(password)) {
            alert('Password must be at least 8 characters long, contain capital and small letters, and numbers');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const existingUser = await pb.collection('users').getFirstListItem(`username="${username}"`);
            if (existingUser) {
                alert('Username already exists');
                return;
            }
        } catch (err) {
            // Ignore error if user does not exist
        }

        try {
            const hashedPassword = md5(password);
            await pb.collection('users').create({
                username: username,
                hashedPassword: hashedPassword,
            });
            // Log in the user after creation
            const authData = await pb.collection('users').getFirstListItem(`username="${username}" && hashedPassword="${hashedPassword}"`, {
                expand: 'relField1,relField2.subRelField',
            });
            if (authData != null){
                console.log('Login successful', authData);

                const item = {
                    data: {authData},
                };
            
                localStorage.setItem("user", JSON.stringify(item));
            }
            else{
                console.alert("login failde")
                console.log(authData)
            }
            // Redirect to home page
            window.location.href = '/';
        } catch (err) {
            alert('Error creating account');
            console.error(err);
        }
    };

    return (
        <div className={`create_container ${showForm ? 'show' : 'hide'}`}>
            <h3 className="login_title">Create account</h3>
            <span className="login_banner">You have an account? <span className="switch_create_form" onClick={switchToLogin}>Login</span></span>
            <div className="username_container">
                <span className="input_label">Username</span><br />
                <input
                    type="text"
                    placeholder="username"
                    required
                    autoFocus
                    className="user_name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="password_container">
                <span className="input_label">Password</span><br />
                <input
                    type="password"
                    placeholder="password"
                    required
                    className="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="password_confirm_container">
                <span className="input_label">Confirm Password</span><br />
                <input
                    type="password"
                    placeholder="confirm password"
                    required
                    className="password_confirme"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button className="login_button" id="create_Button" onClick={handleSubmit}>Create Account</button>
        </div>
    );
}
