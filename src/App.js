import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import EmailConfirmationSent from "./page/EmailConfirmationSent";
import { ToastContainer } from "react-toastify";
import EmailConfirmation from "./page/EmailConfirmation";
import ResetPassword from "./page/ResetPassword";
import ResetPasswordEmail from "./page/ResetPasswordEmail";
import ResetPasswordSent from "./page/ResetPasswordSent";
import PasswordResetSuccess from "./page/PasswordResetSuccess";
import Profile from "./page/Profile";
import { useState } from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        Boolean(localStorage.getItem("user_management_token"))
    );

    const handleLogin = (accessToken, refreshToken, email) => {
        localStorage.setItem("user_management_token", accessToken);
        localStorage.setItem("user_management_refresh_token", refreshToken);
        localStorage.setItem("user_management_token_email", email);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("user_management_token");
        localStorage.removeItem("user_management_token_email");
        localStorage.removeItem("user_management_refresh_token");
        setIsLoggedIn(false);
    };

    return (
        <>
            <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/login"
                        element={<Login handleLogin={handleLogin} />}
                    />
                    <Route path="/sign-up" element={<SignUp />} />

                    <Route
                        path="/email-confirmation-sent"
                        element={<EmailConfirmationSent />}
                    />
                    <Route
                        path="/email-confirmation"
                        element={<EmailConfirmation />}
                    />
                    <Route
                        path="/reset-password-email"
                        element={<ResetPasswordEmail />}
                    />
                    <Route
                        path="/reset-password-sent"
                        element={<ResetPasswordSent />}
                    />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route
                        path="/password-reset-success"
                        element={<PasswordResetSuccess />}
                    />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
                <ToastContainer theme="dark" />
            </div>
        </>
    );
}

export default App;
