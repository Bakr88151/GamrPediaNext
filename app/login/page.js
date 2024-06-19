"use client"
import { useState, useEffect } from 'react'
import '../../components/create'
import Create from '../../components/create'
import Login from '../../components/login'
import "./login.css"

export default function LoginOrCreate() {
    const [loginOrCreate, setLoginOrCreate] = useState(true); // true for login and false for create
    const [showForm, setShowForm] = useState(true); // true for showing the form

    useEffect(() => {
        setShowForm(true);
    }, [loginOrCreate]);

    return (
        <div className="login_page_container">
            {loginOrCreate ? (
                <Login
                    switchToCreate={() => {
                        setShowForm(false);
                        setTimeout(() => setLoginOrCreate(false), 200); // Adjusted to 300ms to match the animation duration
                    }}
                    showForm={showForm}
                />
            ) : (
                <Create
                    switchToLogin={() => {
                        setShowForm(false);
                        setTimeout(() => setLoginOrCreate(true), 200); // Adjusted to 300ms to match the animation duration
                    }}
                    showForm={showForm}
                />
            )}
        </div>
    );
}
