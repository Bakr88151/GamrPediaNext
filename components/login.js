"use client";
import "../app/login/login.css";
import { useState } from 'react';
import pb from '../lib/pocketbase';
import md5 from 'md5';

export default function Login({ switchToCreate, showForm }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            const hashedPassword = md5(password);
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
            window.location.href = '/';
        } catch (err) {
            alert('Invalid username or password');
            console.error(err);
        }
    };

    return (
        <div className={`login_container ${showForm ? 'show' : 'hide'}`}>
            <h3 className="login_title">Login</h3>
            <span className="login_banner">Don't have an account yet? <span className="switch_login_form" onClick={switchToCreate}>sign up</span></span>
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
            <button className="login_button" id="login_Button" onClick={handleSubmit}>Login</button>
        </div>
    );
}
