import React, { useEffect, useState } from 'react'
import Header2 from '../Components/Header2'
import { NavLink } from 'react-router-dom'
import { logout, setCredentials } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Footer2 from '../Components/Footer2';


function ProfileC() {

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);
    const backgroundImage = "url('homepages/restaurant/images/darkish.jpg')"; // Ensure correct path to the image


    const handleLogout = () => {
        dispatch(logout());
        setShowModal(false);
    };

    return (

        <>
            <div className="body-inner">

                <Header2 />

                
                <section id="page-title" style={{ backgroundImage: backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="bg-overlay"></div>
                <div className="container">
                    <div className="page-title">
                        <h1 className="text-uppercase text-medium">ABOUT US</h1>
                        <span>Work is easy when you have all tools around you!</span>
                    </div>
                </div>
            </section>


                <section>
                    <div className="container">
                        <div className="row  m-b-50">
                            <div className="col-lg-3">
                                <div className="heading-text heading-section">
                                    <h2>ABOUT ME</h2>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="row">
                                    <div className="col-lg-6">I am from {userInfo.localisation}, I'm a lover of the mediterranean cuisine, drawn to its rich flavors, fresh ingredients, and health benefits. For me, dining is more than just a meal
                                        <br />
                                        <br />  it's an experience that connects me to the vibrant culture and traditions of the Mediterranean. </div>
                                    <div className="col-lg-6"> I appreciate authentic dishes that celebrate simplicity and quality, and I'm always on the lookout for restaurants that capture the true essence of this timeless cuisine
                                        <br />
                                        <br />Oh! I forgot to mention, I am {userInfo.diet}, so I'll be looking for {userInfo.diet} restaurants</div>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-lg-6">
                                <div className="heading-text heading-section m-b-20">
                                    <h2>
                             Latest visited countries
                                    </h2>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="m-t-60">
                                    <div className="p-progress-bar-container title-up small extra-small color">
                                        <div className="p-progress-bar" data-percent="100" data-delay="100" data-type="%">
                                            <div className="progress-title">Paris</div>
                                        </div>
                                    </div>
                                    <div className="p-progress-bar-container title-up small extra-small color">
                                        <div className="p-progress-bar" data-percent="94" data-delay="200" data-type="%">
                                            <div className="progress-title">Italy</div>
                                        </div>
                                    </div>
                                    <div className="p-progress-bar-container title-up small extra-small color">
                                        <div className="p-progress-bar" data-percent="78" data-delay="300" data-type="%">
                                            <div className="progress-title">Moroco</div>
                                        </div>
                                    </div>
                                    <div className="p-progress-bar-container title-up small extra-small color">
                                        <div className="p-progress-bar" data-percent="65" data-delay="400" data-type="%">
                                            <div className="progress-title">Libya</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div >
                </section >

                <section class="background-grey">
            <div class="container">
                <div class="heading-text heading-section text-center">
                    <h2>My Recipes</h2>
                    <span class="lead">These are my favorite recipes so far</span>
                </div>
                <div class="row team-members team-members-shadow m-b-40">
                    <div class="col-lg-3">
                        <div class="team-member">
                            <div class="team-image">
                                <img src="homepages/restaurant/images/recipe2.jpg"/>
                            </div>
                            <div class="team-desc">
                                <h3>Alea Smith</h3>
                                <span>Software Developer</span>
                                <p>The most happiest time of the day!. Praesent tristique hendrerit ex ut laoreet. </p>
                                <div class="align-center">
                                    <a class="btn btn-xs btn-slide btn-light" href="#">
                                        <i class="fab fa-facebook-f"></i>
                                        <span>Facebook</span>
                                    </a>
                                    <a class="btn btn-xs btn-slide btn-light" href="#" data-width="100">
                                        <i class="fab fa-twitter"></i>
                                        <span>Twitter</span>
                                    </a>
                                    <a class="btn btn-xs btn-slide btn-light" href="#" data-width="118">
                                        <i class="fab fa-instagram"></i>
                                        <span>Instagram</span>
                                    </a>
                                    <a class="btn btn-xs btn-slide btn-light" href="mailto:#" data-width="80">
                                        <i class="icon-mail"></i>
                                        <span>Mail</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="team-member">
                            <div class="team-image">
                                <img src="homepages/restaurant/images/recipe2.jpg"/>
                            </div>
                            <div class="team-desc">
                                <h3>Ariol Doe</h3>
                                <span>Software Developer</span>
                                <p>The most happiest time of the day!. Praesent tristique hendrerit ex ut laoreet. </p>
                                <div class="align-center">
                                    <a class="btn btn-xs btn-slide btn-light" href="#">
                                        <i class="fab fa-facebook-f"></i>
                                        <span>Facebook</span>
                                    </a>
                                    <a class="btn btn-xs btn-slide btn-light" href="#" data-width="100">
                                        <i class="fab fa-twitter"></i>
                                        <span>Twitter</span>
                                    </a>
                                    <a class="btn btn-xs btn-slide btn-light" href="#" data-width="118">
                                        <i class="fab fa-instagram"></i>
                                        <span>Instagram</span>
                                    </a>
                                    <a class="btn btn-xs btn-slide btn-light" href="mailto:#" data-width="80">
                                        <i class="icon-mail"></i>
                                        <span>Mail</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="team-member">
                            <div class="team-image">
                                <img src="homepages/restaurant/images/recipe2.jpg"/>
                            </div>
                            <div class="team-desc">
                                <h3>Emma Ross</h3>
                                <span>Software Developer</span>
                                <p>The most happiest time of the day!. Praesent tristique hendrerit ex ut laoreet. </p>
                                <div class="align-center">
                                    <a class="btn btn-xs btn-slide btn-light" href="#">
                                        <i class="fab fa-facebook-f"></i>
                                        <span>Facebook</span>
                                    </a>
                                    <a class="btn btn-xs btn-slide btn-light" href="#" data-width="100">
                                        <i class="fab fa-twitter"></i>
                                        <span>Twitter</span>
                                    </a>
                                    <a class="btn btn-xs btn-slide btn-light" href="#" data-width="118">
                                        <i class="fab fa-instagram"></i>
                                        <span>Instagram</span>
                                    </a>
                                    <a class="btn btn-xs btn-slide btn-light" href="mailto:#" data-width="80">
                                        <i class="icon-mail"></i>
                                        <span>Mail</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="team-member">
                            <div class="team-image">
                                <img src="homepages/restaurant/images/recipe2.jpg"/>
                            </div>
                            <div class="team-desc">
                                <h3>Victor Loda</h3>
                                <span>Software Developer</span>
                                <p>The most happiest time of the day!. Praesent tristique hendrerit ex ut laoreet. </p>
                                <div class="align-center">
                                    <a class="btn btn-xs btn-slide btn-light" href="#">
                                        <i class="fab fa-facebook-f"></i>
                                        <span>Facebook</span>
                                    </a>
                                    <a class="btn btn-xs btn-slide btn-light" href="#" data-width="100">
                                        <i class="fab fa-twitter"></i>
                                        <span>Twitter</span>
                                    </a>
                                    <a class="btn btn-xs btn-slide btn-light" href="#" data-width="118">
                                        <i class="fab fa-instagram"></i>
                                        <span>Instagram</span>
                                    </a>
                                    <a class="btn btn-xs btn-slide btn-light" href="mailto:#" data-width="80">
                                        <i class="icon-mail"></i>
                                        <span>Mail</span>
                                    </a>
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

export default ProfileC