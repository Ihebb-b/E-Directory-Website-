import Footer2 from '../Components/Footer2'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation, useRegisterMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';


function SignIn() {
    const backgroundImage = "url('homepages/restaurant/images/main-1.jpg')";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [login, { isLoading: isLoggingIn }] = useLoginMutation();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [register] = useRegisterMutation();
    const dispatch = useDispatch();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await login({ email, password }).unwrap();
            dispatch(setCredentials(user));
            setError("");
            navigate("/"); // Redirect to dashboard
        } catch (err) {
            setError(err?.data?.message || "Failed to log in.");
        }
    };

    return (

        <>
            <header id="header" className="dark" data-fullwidth="true">
                <div className="header-inner">
                    <div className="container">
                        <div id="logo">
                            {/* <NavLink to="/">
                                <span className="logo-default">E-Directory</span>
                                <span className="logo-dark">E-Directory</span>
                            </NavLink> */}
                              <img
                                src="images/moremeddietlogo.png"
                                alt="E-Directory Logo"
                                style={{ width: "100px", height: "70px", marginLeft: "2px" }} // Adjust width, height, and spacing as needed

                                className="logo-image" // Optional: Add a class for styling
                            />

                             </div>
                    </div>
                </div>
            </header>
            <div className="body-inner">

                <section
                    className="pt-5 pb-5"
                    style={{ backgroundImage: backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <div className="container-fluid d-flex flex-column">
                        <div className="row align-items-center min-vh-100">
                            <div className="col-md-6 col-lg-4 col-xl-3 mx-auto">
                                <div className="card">
                                    <div className="card-body py-5 px-sm-5">
                                        <div className="mb-5 text-center">
                                            <h6 className="h3 mb-1 ">Login</h6>
                                            <p className="text-muted mb-0">Sign in to your account to continue.</p>
                                        </div><span className="clearfix"></span>
                                        <form className="form-validate" onSubmit={handleLogin}>
                                            <div className="form-group ">
                                                <label htmlFor="email" >Email address</label>
                                                <div className="input-group">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        name="email"
                                                        placeholder="Enter your email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required />
                                                    <span className="input-group-text"><i className="icon-user"></i></span>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <div className="input-group show-hide-password">
                                                    <input
                                                        className="form-control"
                                                        name="password"
                                                        placeholder="Enter password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required />
                                                    <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                                        <i className={showPassword ? "icon-eye" : "icon-eye-off"} aria-hidden="true"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-4"><button type="submit" className="btn btn-primary btn-block btn-primary">Sign in</button></div>
                                        </form>
                                        <div className="mt-4 text-center">
                                            <small>Not registered?</small> <NavLink to="/signup" className="small fw-bold">Create account</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer2 />
            </div>

        </>

    )
}

export default SignIn
