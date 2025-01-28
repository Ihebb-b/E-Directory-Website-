import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation, useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import Footer2 from "../Components/Footer2";
import { motion } from "framer-motion";

function AuthPage() {
    const [isSignIn, setIsSignIn] = useState(true); // Toggle between forms
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login] = useLoginMutation();
    const [register] = useRegisterMutation();
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await login({ email, password }).unwrap();
            dispatch(setCredentials(user));
            setAlert({ show: true, type: 'success', message: 'Login successful!' });
            setShowSpinner(true);

            setTimeout(() => {
                navigate("/");
            }, 2000);

            setTimeout(() => {
                setShowSpinner(false);

            }, 2000);


        } catch (err) {
            setAlert({ show: true, type: 'danger', message: err?.data?.message || "Login failed." });
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlert({ show: true, type: 'danger', message: "Passwords do not match!" });
            return;
        }
        try {
            const user = await register({ name, email, password }).unwrap();
            dispatch(setCredentials(user));
            setAlert({ show: true, type: 'success', message: 'Registration successful! Redirecting to role selection.' });
            setShowSpinner(true);
            setTimeout(() => {
                navigate("/role");
            }, 2000);

            setTimeout(() => {
                setShowSpinner(false);

            }, 2000);

        } catch (err) {
            setAlert({ show: true, type: 'danger', message: err?.data?.message || "Registration failed." });
        }
    };

    const toggleForm = () => setIsSignIn(!isSignIn);

    return (
        <div className="body-inner">

            <header id="header" className="dark" data-fullwidth="true">
                <div className="header-inner">
                    <div className="container">
                        <div id="logo">
                            {/* <NavLink to="/">
                                <span className="logo-default">E-Directory</span>
                                <span className="logo-dark">E-Directory</span>
                            </NavLink>  */}

                            <a href='/'>
                                <img
                                    src="images/moremeddietlogo.png"
                                    alt="E-Directory Logo"
                                    style={{
                                        width: "100px",
                                        height: "70px",
                                        marginLeft: "2px",
                                        display: "inline-block"
                                    }}

                                //className="logo-image" 
                                />
                            </a>

                        </div>
                    </div>
                </div >
                {alert.show && (
                    <div className="col-lg-6">
                        <div role="alert" className={`alert alert-${alert.type} alert-dismissible`}>
                            <button type="button" className="btn-close" onClick={() => setAlert({ ...alert, show: false })} aria-label="Close"></button>
                            <strong><i className={`fa ${alert.type === 'success' ? 'fa-check-circle' : 'fa-warning'}`}></i> {alert.type === 'success' ? 'Success!' : 'Error!'}</strong> {alert.message}
                        </div>
                    </div>
                )}


            </header >

            <section
                className="pt-5 pb-5"
                style={{
                    backgroundImage: "url('homepages/restaurant/images/main-1.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="container-fluid d-flex flex-column">
                    <div className="row align-items-center min-vh-100">
                        <div className="col-md-6 col-lg-4 col-xl-3 mx-auto">
                            <motion.div
                                className="card"
                                initial={{ opacity: 0, x: isSignIn ? -50 : 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: isSignIn ? 50 : -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="card-body py-5 px-sm-5">
                                    <div className="mb-5 text-center">
                                        <h6 className="h3 mb-1">{isSignIn ? "Sign In" : "Sign Up"}</h6>
                                        <p className="text-muted mb-0">
                                            {isSignIn
                                                ? "Sign in to your account to continue."
                                                : "Create an account to continue."}
                                        </p>
                                    </div>

                                    <form onSubmit={isSignIn ? handleLogin : handleRegister}>
                                        {!isSignIn && (
                                            <div className="form-group">
                                                <label htmlFor="name">Name</label>
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter your name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        required />
                                                    <span className="input-group-text"><i className="icon-user"></i></span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <div className="input-group">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Enter your email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                                <span className="input-group-text">@</span>
                                            </div>
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <div className="input-group show-hide-password">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    className="form-control"
                                                    placeholder="Enter your password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                                <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                                    <i className={showPassword ? "icon-eye" : "icon-eye-off"} aria-hidden="true"></i>
                                                </span>
                                            </div>
                                        </div>

                                        {!isSignIn && (
                                            <div className="form-group">
                                                <label htmlFor="confirmPassword">Confirm Password</label>
                                                <div className="input-group show-hide-password">

                                                    <input
                                                        type={showConfirmPassword ? 'text' : 'password'}
                                                        className="form-control"
                                                        placeholder="Confirm your password"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        required
                                                    />
                                                    <span
                                                        className="input-group-text"
                                                        onClick={toggleConfirmPasswordVisibility}
                                                        style={{ cursor: 'pointer' }}>
                                                        <i className={showConfirmPassword ? "icon-eye" : "icon-eye-off"} aria-hidden="true"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {showSpinner && (
                                            <div className="backdrop-overlay">
                                                <div className="spinner-border" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-4">
                                            <button type="submit" className="btn btn-primary btn-block"
                                            style={{width:"40%", justifySelf:"center"}}>
                                                {isSignIn ? "Sign In" : "Sign Up"}
                                            </button>
                                        </div>
                                    </form>

                                    <div className="mt-4 text-center">
                                        <small>
                                            {isSignIn
                                                ? "Not registered yet?"
                                                : "Already have an account?"}
                                        </small>{" "}
                                        <a
                                            onClick={toggleForm}
                                            className=" small fw-bold"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {isSignIn ? "Sign Up" : "Sign In"}
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer2 />
        </div >
    );
}

export default AuthPage;
