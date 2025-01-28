import React, { useEffect } from 'react'
import Header2 from '../Components/Header2'
import Footer2 from '../Components/Footer2'
import { useParams } from 'react-router-dom';
import { useGetMenuByIdQuery, useGetMenuByUserIdQuery } from '../slices/restaurantSlice';

function MenuDetail() {

    useEffect(() => {
        const elements = document.querySelectorAll('[data-animate]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const animation = element.getAttribute('data-animate');
                        const delay = element.getAttribute('data-animate-delay');
                        element.classList.add('animate__animated', animation);
                        if (delay) {
                            element.style.animationDelay = `${delay}ms`;
                        }
                        observer.unobserve(element); // Stop observing once animated
                    }
                });
            },
            { threshold: 0.1 }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect(); // Clean up observer
    }, []);






    const { id } = useParams();
    const { data: menu, isLoading: isMenuLoading, error: menuError } = useGetMenuByIdQuery(id);


    if (isMenuLoading) return <div>Loading...</div>;
    if (menuError) return <div>Error loading  menu details.</div>;

    // Extract the image URL from the fetched menu data
    const menuImage = menu.image; // Assuming the API returns the menu image URL in a property named `image`


    return (

        <>
            <div className="body-inner">

                <Header2 />

                <div id="slider" className="inspiro-slider dots-creative" data-height-xs="360" style={{ height: "90%" }}>
                    {/* <div
                        className="slide kenburns"
                        style={{ backgroundImage: "url('/homepages/restaurant/images/restaurant1.jpg')" }}
                    > */}

                    <div
                        className="slide kenburns"
                        style={{
                            backgroundImage: `url('${menuImage}')`, // Use the menu image from the API
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '10px', 
                            height: '80vh', // Optional for styling
                          }}
                        
                    >


                        <div className="bg-overlay" ></div>
                        <div className="container">
                            <div className=" text-center text-light">

                                <h1 className="mb-10">Explore Our Delcieous Plates </h1>



                                {menu?.plates?.length > 0 ? (
                                    <>
                                        <div className="col-lg-12">
                                            <div className="menu-item">
                                                <h1 className="font-nothing-you-could-do mb-5">{menu.name}</h1>
                                                <h4 className="mb-5">{menu.description}</h4>
                                                <div className="plates-container">
                                                    {menu.plates.map((plate, index) => (
                                                        <div
                                                            key={plate._id}
                                                            className={`plate-card ${index % 3 === 0 ? 'clear-row' : ''}`}
                                                            style={{
                                                                display: 'inline-block',
                                                                width: '30%',
                                                                margin: '1%',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            <h3 className="font-nothing-you-could-do">{plate.name}</h3>
                                                            <h4>${plate.price.toFixed(2)}</h4>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="col-lg-12">
                                        <p>No menu items available.</p>
                                    </div>
                                )}



                            </div>
                        </div>
                    </div>
                </div>





                <div className="seperator"><i className="fa fa-check-circle"></i></div>




                <section id="section-contact" className="background-grey p-t-40 p-b-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="icon-box effect small clean text-center">
                                    <div className="icon mb-3">
                                        <a href="#"><i className="far fa-clock fa-2x"></i></a>
                                    </div>
                                    <h3>Working Days</h3>
                                    <p><strong>Monday - Friday</strong>
                                        <br />10:00 AM - 11:00 PM</p>
                                    <p><strong>Saturday - Sunday</strong>
                                        <br />10:00 AM - 04:00 PM</p>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="icon-box effect small clean text-center">
                                    <div className="icon mb-3">
                                        <a href="#"><i className="fa fa-map-marker-alt fa-2x"></i></a>
                                    </div>
                                    <h3>Restaurant Location</h3>
                                    <p><strong>Restaurant Address:</strong>
                                        <br /> 795 Folsom Ave, Suite 600
                                        <br /> San Francisco, CA 94107
                                    </p>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="icon-box effect small clean text-center">
                                    <div className="icon mb-3">
                                        <a href="#"><i className="fa fa-phone fa-2x"></i></a>
                                    </div>
                                    <h3>Restaurant Contact</h3>
                                    <p><strong>Phone:</strong>
                                        <br /> (123) 456-7890
                                        <br /> (987) 654-3210
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <Footer2 />


            </div>



            <a id="scrollTop"><i className="icon-chevron-up"></i><i className="icon-chevron-up"></i></a>





        </>

    )
}

export default MenuDetail