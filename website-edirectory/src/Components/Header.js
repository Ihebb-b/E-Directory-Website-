import React, { useEffect, useState } from 'react'
import './Slider.css'
import { Link, NavLink, useNavigate} from 'react-router-dom'
import { logout, setCredentials } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserProfileQuery } from '../slices/userApiSlice';


function Header() {

    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const navigate = useNavigate();

    const [userImage, setUserImage] = useState(userInfo?.image || "");

    useEffect(() => {
        if (userInfo?.image) {
          setUserImage(userInfo.image);
        }
      }, [userInfo]);
      



    

    const handleLogout = () => {
        dispatch(logout());       
        setShowModal(false);   
        setShowSpinner(true);   
        navigate('/');  

        setTimeout(() => {
            setShowSpinner(false);
            navigate('/');
            // You can redirect the user or perform any other action here
        }, 2000); // 2000 milliseconds = 2 seconds
    };


    return (
        <>
            <div id="topbar" className="topbar-transparent dark submenu-light ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-none d-sm-block">
                            <div className="social-icons social-icons-colored-hover">
                                <ul>
                                    <li className="social-facebook"><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                    <li className="social-twitter"><a href="#"><i className="fab fa-twitter"></i></a></li>
                                    <li className="social-google"><a href="#"><i className="fab fa-google-plus-g"></i></a></li>
                                    <li className="social-pinterest"><a href="#"><i className="fab fa-pinterest"></i></a></li>
                                    <li className="social-vimeo"><a href="#"><i className="fab fa-vimeo"></i></a></li>
                                    <li className="social-linkedin"><a href="#"><i className="fab fa-linkedin"></i></a></li>
                                    <li className="social-dribbble"><a href="#"><i className="fab fa-dribbble"></i></a></li>
                                    <li className="social-youtube"><a href="#"><i className="fab fa-youtube"></i></a></li>
                                    <li className="social-rss"><a href="#"><i className="fa fa-rss"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <header id="header" data-transparent="true" className="dark submenu-light">
                <div className="header-inner">
                    <div className="container">
                        <div id="logo">
                            <a href="/">
                                <img
                                    src="images/moremeddietlogo.png"
                                    alt="E-Directory Logo"
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                        marginLeft: "2px",
                                        display: "inline-block"
                                    }} // Adjust width, height, and spacing as needed

                                // className="logo-image" // Optional: Add a class for styling
                                />
                            </a>

                        </div>

                        <div className="header-extras">
                            <ul>
                                <li>
                                    <div className="p-dropdown"> <a href="#"><i className="icon-globe"></i></a>
                                        <ul className="p-dropdown-content">
                                            <li><a href="#">French</a></li>
                                            <li><a href="#">Spanish</a></li>
                                            <li><a href="#">English</a></li>
                                        </ul>
                                    </div>
                                </li>
                                {/* Sign In Icon */}
                                {/* <li>
                                    <NavLink to="/signin" className="sign-in-link">
                                        <i className="fas fa-sign-in-alt"></i> 
                                        
                                    </NavLink>
                                </li> */}
                                {/* User Authentication Section */}
                                <li>
                                    {userInfo ? (
                                        // Logged-in user dropdown menu
                                        <div className="p-dropdown">
                                            <a className="btn-rounded btn-icon">
                                                <i className="icon-user"></i>
                                            </a>
                                            <div className="p-dropdown-content">
                                                <div className="widget-myaccount">
                                                    <div className="d-block">
                                                        <img
                                                              className="avatar avatar-lg"
                                                              src={userImage || "/homepages/restaurant/images/envt.jpg"}
                                                              alt={`${userInfo.name}'s Avatar`}
                                                        />
                                                    </div>
                                                    <span>{userInfo.name}</span>
                                                    <p className="text-muted">{userInfo.role}</p>
                                                    <ul className="text-center">
                                                        <li>
                                                            <NavLink
                                                                to={userInfo.role === "customer" ? "/profileC" : "/profileR"}
                                                            >
                                                                <i className="icon-user" style={{ color: 'black' }}></i> My Profile
                                                            </NavLink>
                                                        </li>
                                                        <li><a href="#"><i className="icon-clock" style={{ color: 'black' }} > </i>Activity logs</a></li>
                                                        <li>
                                                            <a onClick={() => setShowModal(true)}
                                                                style={{ cursor: "pointer" }}>
                                                                <i className="icon-log-out" style={{ color: 'black' }}></i> Log Out
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        // Sign-in icon for unauthenticated users
                                        <NavLink to="/authpage" className="sign-in-link">
                                            <i className="fas fa-sign-in-alt"></i>
                                        </NavLink>
                                    )}
                                </li>
                            </ul>
                        </div>

                        {/* Logout Modal */}
                        {showModal && (
                            <div className="alert-modal-overlay">
                                <div className="alert-modal">
                                    <p>Are you sure you want to log out?</p>
                                    <div className="alert-modal-actions">
                                        <button
                                            className="btn alert-cancel-btn"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button className="btn alert-logout-btn" onClick={handleLogout}>
                                            Log Out
                                        </button>
                                    </div>
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

                        <div id="mainMenu-trigger"> <a className="lines-button x"><span className="lines"></span></a> </div>

                        <div id="mainMenu">
                            <div className="container">
                                <nav>
                                    <ul>
                                        <li>
                                            <a id="btn-search" href="#"> <i className="icon-search"></i></a>
                                        </li>
                                        <li> <NavLink to="/">Home</NavLink></li>
                                        <li> <NavLink to="/rlist">Restaurants</NavLink></li>
                                        {/* <li className="dropdown"><NavLink to="/rlist">Restaurant</NavLink> */}
                                        {/* <ul className="dropdown-menu">
                                                <li className="dropdown-submenu"><a href="#">categ1</a>
                                                    <ul className="dropdown-menu">
                                                        <li><a href="header-topbar.html">Light</a></li>
                                                        <li><a href="header-topbar-dark.html">Dark</a></li>
                                                        <li><a href="header-topbar-transparent.html">Transparent</a></li>
                                                        <li><a href="header-topbar-colored.html">Colored</a></li>
                                                        <li><a href="header-topbar-fullwidth.html">Fullwidth</a></li>
                                                    </ul>
                                                </li>
                                            </ul> 
                                        </li>*/}
                                        <li> <NavLink to="/menulist">Menus</NavLink></li>
                                        <li> <NavLink to="/recipelist">Recipes</NavLink></li>

                                        {/* <li className="dropdown"><a href="#">Menus</a> */}
                                        {/* <ul className="dropdown-menu">
                                                <li className="dropdown-submenu"><a href="#">categ1</a>
                                                    <ul className="dropdown-menu">
                                                        <li><a href="slider-revolution-slider.html">subcateg1</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul> 
                                        </li>*/}

                                        {/* <li className="dropdown mega-menu-item"><NavLink to="/recipelist">Recipes</NavLink></li> */}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>


        </>
    );

}

export default Header
