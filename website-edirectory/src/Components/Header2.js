import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout, setCredentials } from '../slices/authSlice';



function Header2() {

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
        navigate('/');
        dispatch(logout());
        
        setShowModal(false);

        
        setShowSpinner(true);
     

        setTimeout(() => {
            setShowSpinner(false);
            // You can redirect the user or perform any other action here
        }, 2000); // 2000 milliseconds = 2 seconds
    };

   



    return (
        <header id="header" class="dark" data-fullwidth="true">
            <div class="header-inner">
                <div class="container">

                    <div id="logo">
                        {/* <NavLink to="/">
                            <span class="logo-default">E-Directory</span>
                            <span class="logo-dark">E-Directory</span>
                        </NavLink> */}


                        <a href='/'>
                            <img
                                src="/images/moremeddietlogo.png"
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

                    <div id="search"><a id="btn-search-close" class="btn-search-close" aria-label="Close search form"><i class="icon-x"></i></a>
                        <form class="search-form" action="search-results-page.html" method="get">
                            <input class="form-control" name="q" type="text" placeholder="Type & Search..." />
                            <span class="text-muted">Start typing & press "Enter" or "ESC" to close</span>
                        </form>
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
                                                <p className="text-muted">{userInfo.role || "Chef"}</p>
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

                    <div id="mainMenu-trigger">
                        <a class="lines-button x"><span class="lines"></span></a>
                    </div>

                    <div id="mainMenu">
                        <div className="container">
                            <nav>
                                <ul>
                                    <li>
                                        <a id="btn-search" href="#"> <i class="icon-search"></i></a>
                                    </li>
                                    <li> <NavLink to="/">Home</NavLink></li>
                                    {/* <li className="dropdown"><NavLink to="/rlist">Restaurants</NavLink>
                                        <ul className="dropdown-menu">
                                            <li className="dropdown-submenu"><a href="#">categ1</a>
                                                <ul className="dropdown-menu">
                                                    <li><a href="header-topbar.html">Light</a></li>
                                                    <li><a href="header-topbar-dark.html">Dark</a></li>
                                                    <li><a href="header-topbar-transparent.html">Transparent</a></li>
                                                    <li><a href="header-topbar-colored.html">Colored</a></li>
                                                    <li><a href="header-topbar-fullwidth.html">Fullwidth</a></li>
                                                </ul>
                                            </li>
                                            <li className="dropdown-submenu"><a href="#">categ2</a>
                                                <ul className="dropdown-menu">
                                                    <li><a href="header.html">Light</a></li>
                                                    <li><a href="header-dark.html">Dark</a></li>
                                                    <li><a href="header-transparent.html">Transparent</a></li>
                                                    <li><a href="header-fullwidth.html">Fullwidth</a></li>
                                                    <li className="dropdown-submenu"><a href="#">Modern</a>
                                                        <ul className="dropdown-menu">
                                                            <li><a href="header-modern.html">Light</a></li>
                                                            <li><a href="header-modern-dark.html">Dark</a></li>
                                                            <li><a href="header-modern-transparent.html">Transparent</a>
                                                            </li>
                                                        </ul>
                                                    </li>

                                                </ul>
                                            </li>
                                        </ul>
                                    </li> */}

                                    {/* <li className="dropdown"><a href="#">Menus</a>
                                        <ul className="dropdown-menu">
                                            <li className="dropdown-submenu"><a href="#">categ1</a>
                                                <ul className="dropdown-menu">
                                                    <li><a href="slider-revolution-slider.html">subcateg1</a>
                                                    </li>
                                                    <li><a href="slider-inspiro-slider.html">subcateg2</a></li>
                                                    <li><a href="slider-static-media-image.html">sybcateg3</a>
                                                    </li>

                                                </ul>
                                            </li>
                                            <li><a href="widgets.html">categ2</a></li>
                                            <li><a href="page-loaders.html">categ3<span
                                                className="badge bg-danger">NEW</span></a></li>



                                        </ul>
                                    </li> */}
                                    {/* <li className="dropdown mega-menu-item"><NavLink to="/recipelist">Recipes</NavLink>
                                        <ul className="dropdown-menu">
                                            <li className="mega-menu-content">
                                                <div className="row">
                                                    <div className="col-lg-2">
                                                        <ul>
                                                            <li><a href="shortcode-according.html">categ1</a></li>
                                                            <li><a href="shortcode-alerts.html">categ2</a></li>
                                                            <li><a href="shortcode-animations.html">categ3</a></li>

                                                        </ul>
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <ul>
                                                            <li><a href="component-charts-chartjs.html">categ1<span
                                                                className="badge bg-danger">NEW</span></a></li>
                                                            <li><a href="component-calendar.html">categ2<span
                                                                className="badge bg-danger">NEW</span></a></li>
                                                            <li><a href="shortcode-client-logo.html">categ3</a>
                                                            </li>


                                                        </ul>
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <ul>
                                                            <li><a href="shortcode-dropcat-highlight.html">categ1</a></li>
                                                            <li><a href="shortcode-dropdowns.html">categ2</a></li>
                                                            <li><a href="shortcode-team-members.html">categ3</a>
                                                            </li>
                                                            <li><a href="shortcode-forms.html">categ4</a></li>

                                                        </ul>
                                                    </div>

                                                    <div className="col-lg-2">
                                                        <ul>
                                                            <li><a href="shortcode-pricing-table.html">categ1</a></li>
                                                            <li><a href="shortcode-progress-bar.html">categ2</a>
                                                            </li>
                                                            <li><a href="shortcode-parallax.html">categ3</a></li>


                                                        </ul>
                                                    </div>

                                                </div>
                                            </li>
                                        </ul>
                                    </li> */}
                                    <li> <NavLink to="/rlist">Restaurants</NavLink></li>
                                    <li> <NavLink to="/menulist">Menus</NavLink></li>
                                    <li> <NavLink to="/recipelist">Recipes</NavLink></li>





                                </ul>
                            </nav>
                        </div>
                    </div>


                </div>
            </div>
        </header>
    )
}

export default Header2