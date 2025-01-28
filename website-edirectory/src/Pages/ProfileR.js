import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Footer2 from '../Components/Footer2';
import Header2 from '../Components/Header2';
import $ from 'jquery';
import { useDeleteMenuMutation, useGetMenuListQuery } from '../slices/restaurantSlice';
import { useDeleteRecipeMutation, useGetRecipeListQuery } from '../slices/recipeSlice';
import { useNavigate } from 'react-router-dom';
// import { useGetUserProfileQuery } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';



function ProfileR() {

    useEffect(() => {

        if (window.jQuery && window.jQuery.fn.rateit) {
            const rateitElements = document.querySelectorAll(".rateit");

            rateitElements.forEach((element) => {
                const $element = window.jQuery(element);
                if ($element.data("rateit")) {
                    $element.rateit("destroy"); // Destroy previous instance if it exists
                }
                $element.rateit(); // Reinitialize RateIt
            });
        } else {
            console.error("RateIt plugin is not loaded.");
        }
    }, []);


    const plates = [
        { name: "Falafel", price: "$5.00" },
        { name: "Hummus", price: "$4.50" },
        { name: "Tabbouleh", price: "$6.00" },
        { name: "Baba Ganoush", price: "$5.50" },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Number of slides visible
        slidesToScroll: 1, // Number of slides to scroll
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const [showModal, setShowModal] = useState(false);

    const [showModalRecipe, setShowModalRecipe] = useState(false);
    const [selectedMenuId, setSelectedMenuId] = useState(null);
    const [showSpinner, setShowSpinner] = useState(false);
    const [deleteMenu] = useDeleteMenuMutation();
    const [deleteRecipe] = useDeleteRecipeMutation();

    const creativeParagraphs = [
        "Step into a world of culinary art, where every dish tells a story crafted with passion and precision.",
        "Experience the fusion of tradition and innovation, served on a plate that delights the senses.",
        "Each bite takes you on a journey through flavors, textures, and aromas that leave a lasting impression.",
        "Indulge in the perfect symphony of ingredients, meticulously combined to create unforgettable moments.",
        "Let your taste buds explore the magic of fresh, locally sourced ingredients turned into culinary masterpieces."
    ];

    const getRandomParagraph = () => {
        const randomIndex = Math.floor(Math.random() * creativeParagraphs.length);
        return creativeParagraphs[randomIndex];
    };



    const navigate = useNavigate();


    const { data: menus, isLoading, isError, error, refetch: refetchMenu } = useGetMenuListQuery();
    const { data: recipes, isLoadingRec, isErrorRec, errorRec, refetch: refetchRecipe } = useGetRecipeListQuery();
    // const { data: profile, isLoadingProfile, isErrorProfile, errorProfile } = useGetUserProfileQuery();


    const handleModify = (id) => {
        navigate(`/modifyMenu/${id}`); // Redirect to the modification page
    };

    const handleShow = (id) => {
        navigate(`/getMenu/${id}`); // Redirect to the modification page
    };

    const handleModifyRecipe = (id) => {
        navigate(`/modifyRecipe/${id}`); // Redirect to the modification page
    };

    const handleShowRecipe = (id) => {
        navigate(`/recipeDetail/${id}`); // Redirect to the modification page
    };

    const handleDeleteMenu = async (menuId) => {
        setShowModal(false); // Close the modal
        setShowSpinner(true); // Show spinner while deleting

        const token = localStorage.getItem('token');
        try {
            await deleteMenu({ token, id: menuId }).unwrap();
            setShowSpinner(false); // Hide spinner after deletion
            // Optionally, refresh or update the UI

            refetchMenu();

        } catch (error) {
            console.error("Error deleting menu:", error);
            setShowSpinner(false); // Hide spinner on error
        }
    };

    const handleDeleteRecipe = async (recipeId) => {
        setShowModalRecipe(false); // Close the modal
        setShowSpinner(true); // Show spinner while deleting

        const token = localStorage.getItem('token');
        try {
            await deleteRecipe({ token, id: recipeId }).unwrap();
            setShowSpinner(false); // Hide spinner after deletion
            // Optionally, refresh or update the UI

            refetchRecipe();

        } catch (error) {
            console.error("Error deleting menu:", error);
            setShowSpinner(false); // Hide spinner on error
        }
    };

    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);


    const { userInfo } = useSelector((state) => state.auth);
    console.log(userInfo); // Ensure it contains the expected fields


    const backgroundImage = "url('homepages/restaurant/images/darkish.jpg')"; // Ensure correct path to the image
    const imageResto = userInfo?.image
        ? `http://localhost:5000${userInfo.image}` : "homepages/restaurant/images/darkish.jpg";


    // Adjust with your backend host


    // const { data: profileData, isSuccess } = useGetUserProfileQuery(undefined, {
    //     skip: !!userInfo, // Skip query if userInfo already exists
    // });

    const restaurantImages = [

        "/homepages/restaurant/images/restaurant1.jpg",
        "/homepages/restaurant/images/restaurant2.jpg",
        "/homepages/restaurant/images/restaurant3.jpg",
        "/homepages/restaurant/images/restaurant4.jpg",
    ];

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * restaurantImages.length);
        return restaurantImages[randomIndex];
    };

    const randomImage = getRandomImage();

    // useEffect(() => {
    //     if (isSuccess && profileData?.user) {
    //         dispatch(setCredentials(profileData.user));
    //     }
    // }, [isSuccess, profileData, dispatch]);

    // Fallback for userInfo if not loaded
    // const user = userInfo || profileData?.user || { name: "Guest", role: "Chef" };

    if (isLoading || isLoadingRec) return <p>Loading ...</p>;
    if (isError || isErrorRec) return <p>Error fetching data: {error?.data?.message || error.message}</p>;



    return (

        <>
            <div className="body-inner">

                <Header2 />


                <section
                    className="parallax text-light halfscreen"
                    style={{
                        backgroundImage: `url(${imageResto})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative', // Required for the overlay
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust opacity (0.4 = 40% darkness)
                        }}
                    ></div>

                    <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>


                        <div className="container"
                            style={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <div className="container-fullscreen">
                                <div className="text-middle text-center text-end">
                                    <h1 className="text-uppercase text-medium">
                                        {userInfo.name || "Guest"}
                                    </h1>
                                    <p className="lead" >{userInfo.role || "Chef"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="p-b-10">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="heading-text heading-section">
                                    <h2>SUMMARY</h2>
                                    <span >{userInfo.description}</span>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div >
                                    <h5>Food Quality</h5>
                                    <div className="rateit" data-rateit-mode="font" data-rateit-value="5" data-rateit-ispreset="true" data-rateit-readonly="true"></div>
                                </div>
                                <div >
                                    <h5>Service Standards</h5>
                                    <div className="rateit" data-rateit-mode="font" data-rateit-value="4.7" data-rateit-ispreset="true" data-rateit-readonly="true"></div>
                                </div>
                                <div >
                                    <h5>Customer Experience</h5>
                                    <div className="rateit" data-rateit-mode="font" data-rateit-value="4.0" data-rateit-ispreset="true" data-rateit-readonly="true"></div>
                                </div>
                                <div>
                                    <h5>Quality Control</h5>
                                    <div className="rateit" data-rateit-mode="font" data-rateit-value="3.5" data-rateit-ispreset="true" data-rateit-readonly="true"></div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="col-md-6">

                                    <h4>Supported Diets</h4>

                                    <ul>
                                        {userInfo.diet && userInfo.diet.length > 0 ? (
                                            userInfo.diet.map((diet, index) => (
                                                <li key={index}><h5>{diet}</h5></li> // Use index as key if diet values are unique
                                            ))
                                        ) : (
                                            <li>No supported diets available.</li> // Fallback message if no diets are present
                                        )}
                                    </ul>

                                </div>
                            </div>



                        </div>
                    </div>
                </section>

                {/* <section className="red-bg">
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-center mt-3" style={{ padding: '0 15px' }}>
                            <div className="heading-text" style={{ flex: '1' }}>
                                <h2 style={{ margin: 0 }}>My Menus</h2>
                            </div>
                            <a href="/addmenu" style={{ flex: '1' }}>
                                <button type="button" className="btn btn-rounded btn-outline">Add Menu</button>
                            </a>
                        </div>

                        <div className="row mt-4">
                            {Array.isArray(menus) && menus.length === 0 ? (
                                <p className="col-12 text-center">No menus found for your account.</p>
                            ) : (
                                menus?.map((menu) => (
                                    <div className="col-lg-4 col-md-4 col-sm-6 mb-4" key={menu._id}>
                                        <div className="room card " 
                                            style={{
                                                backgroundColor: '#FFF6F4',
                                                height: '45vh',
                                            }}>
                                            <div className="room-image card-img-top">
                                                <img
                                                    src={`http://localhost:3000${menu.image}`}
                                                    alt={menu.name || "Menu Image"}
                                                    className="img-fluid"
                                                    style={{
                                                        width: '100%',
                                                        height: '30vh',
                                                        objectFit: 'cover',
                                                        borderRadius: '8px',
                                                    }}
                                                />
                                                <div className="room-title card-body">
                                                    <h4 className="card-title" style={{ color: "white" }}>{menu.name}</h4>
                                                </div>
                                            </div>
                                            <div className="room-title card-body">
                                                <h5 className="card-title" style={{ color: "black" }}>{menu.description}</h5>
                                            </div>
                                           

                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section> */}

                <section className="red-bg">
                    <div className="container">
                        <div
                            className="d-flex justify-content-between align-items-center mt-3"
                            style={{ padding: "0 15px" }}
                        >
                            <div className="heading-text" style={{ flex: "1" }}>
                                <h2 style={{ margin: 0 }}>My Menus</h2>
                            </div>
                            <a href="/addmenu" style={{ flex: "1" }}>
                                <button type="button" className="btn btn-rounded btn-outline">
                                    Add Menu
                                </button>
                            </a>
                        </div>

                        <div className="row mt-4">
                            {Array.isArray(menus) && menus.length === 0 ? (
                                <p className="col-12 text-center">No menus found for your account.</p>
                            ) : (
                                menus?.map((menu) => (
                                    <div
                                        className="col-lg-4 col-md-4 col-sm-6 mb-4"
                                        key={menu._id}
                                    >
                                        <div
                                            className="room card position-relative"
                                            style={{
                                                backgroundColor: "#FFF6F4",
                                                height: "40vh",
                                                position: "relative",
                                                overflow: "hidden", // Ensure icons don't overflow the card
                                            }}
                                            onMouseEnter={(e) => {
                                                const hoverIcons = e.currentTarget.querySelector(".hover-icons");
                                                hoverIcons.style.opacity = "1";
                                                hoverIcons.style.pointerEvents = "auto";
                                            }}
                                            onMouseLeave={(e) => {
                                                const hoverIcons = e.currentTarget.querySelector(".hover-icons");
                                                hoverIcons.style.opacity = "0";
                                                hoverIcons.style.pointerEvents = "none";
                                            }}
                                        >
                                            {/* Hoverable Icons */}


                                            <div
                                                className="hover-icons d-flex align-items-center justify-content-center position-absolute w-100 h-100"
                                                style={{
                                                    top: 0,
                                                    left: 0,
                                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                                    opacity: "0", // Start hidden
                                                    transition: "opacity 0.3s",
                                                    zIndex: "10",
                                                    borderRadius: "8px",
                                                    pointerEvents: "none", // Disable interactions when hidden
                                                }}
                                            >
                                                <button
                                                    type="button"
                                                    className="btn btn-light m-2"
                                                    onClick={() => handleModify(menu._id)}
                                                >
                                                    <i className="icon-edit-2"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-light m-2"
                                                    onClick={() => handleShow(menu._id)}
                                                >
                                                    <i className="icon-eye"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger m-2"
                                                    onClick={() => setShowModal(true)}
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                            {showSpinner && (
                                                <div className="backdrop-overlay">
                                                    <div className="spinner-border" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                </div>
                                            )}

                                            {showModal && (
                                                <div className="alert-modal-overlay">
                                                    <div className="alert-modal">
                                                        <p>Are you sure you want to delete this menu?</p>
                                                        <div className="alert-modal-actions">
                                                            <button
                                                                className="btn alert-cancel-btn"
                                                                onClick={() => setShowModal(false)}
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                className="btn alert-logout-btn"
                                                                onClick={() => handleDeleteMenu(menu._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}


                                            {/* Menu Image */}
                                            <div
                                                className="room-image card-img-top"
                                                style={{ position: "relative" }}
                                            >
                                                <img
                                                    src={`http://localhost:3000${menu.image}`}
                                                    alt={menu.name || "Menu Image"}
                                                    className="img-fluid"
                                                    style={{
                                                        width: "100%",
                                                        height: "25vh",
                                                        objectFit: "cover",
                                                        borderRadius: "5px",
                                                    }}
                                                />
                                                <div className="room-title card-body">
                                                    <h4 className="card-title" style={{ color: "gray-100" }}>
                                                        {menu.name}
                                                    </h4>
                                                </div>
                                            </div>

                                            {/* Menu Description */}
                                            <div className="room-title card-body no-padding">
                                                {/* <h5 className="card-title" style={{ color: "black", padding: "0" }}>
                                                    {menu.description}
                                                </h5> */}

                                                <h5
                                                    className="card-title menu-description"
                                                    style={{
                                                        color: "black",
                                                        padding: "0",
                                                        overflow: "hidden",
                                                        display: isExpanded ? "block" : "-webkit-box",
                                                        WebkitBoxOrient: "vertical",
                                                        WebkitLineClamp: 2,
                                                    }}
                                                >
                                                    {menu.description}
                                                </h5>
                                                {menu.description.length > 100 && (
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setIsExpanded(!isExpanded);
                                                        }}
                                                        style={{
                                                            display: "block",
                                                            color: "#007bff",
                                                            textDecoration: "none",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}


                        </div>
                    </div>
                </section >




                {/* <div className="room-title card-body">
                                                <h5 className="card-title" >
                                                    {Array.isArray(menu.plates) && menu.plates.length > 0 ? (
                                                        menu.plates.map((plate, index) => (
                                                            <div key={plate._id}>
                                                                <p>{`Plate ${index + 1}: ${plate.name}, Price: $${plate.price}`}</p>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p>No plates available.</p>
                                                    )}
                                                </h5>
                                            </div> */}


                < section >
                    <div className="container">
                        <div className="heading-text text-center">
                            <h2>What people are saying!</h2>
                            <p className="lead text-center">{getRandomParagraph()}</p>
                        </div>

                        <div className="testimonial-container" data-items="1">
                            {/* Dynamic background image */}
                            <div
                                className="testimonial-item"
                                style={{
                                    backgroundImage: `url('${randomImage}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '400px', // Adjust height as needed
                                    borderRadius: '10px', // Optional for styling
                                }}
                            >
                                {/* Additional content can go here if needed */}
                            </div>
                        </div>
                    </div>
                </section >


                <section className="red-bg">
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-center mt-3" style={{ padding: '0 15px' }}>
                            <div className="heading-text" style={{ flex: '1' }} >
                                <h2 style={{ margin: 0 }}>My Recipes</h2>
                            </div>
                            <a href="/addrecipe" style={{ flex: '1' }}>
                                <button type="button" className="btn btn-rounded btn-outline">Add recipe</button>
                            </a>
                        </div>

                        <div className="row">

                            {Array.isArray(recipes) && recipes.length === 0 ? (
                                <p className="col-12 text-center">No recipes found for your account.</p>
                            ) : (
                                recipes?.map((recipe) => (
                                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={recipe._id}>
                                        <div className="room card  shadow position-relative"
                                            style={{
                                                backgroundColor: "#FFF6F4",
                                                height: "40vh",
                                                position: "relative",
                                                borderRadius: "10px",
                                                padding: "0.75rem 1rem",
                                                overflow: "hidden", // Ensure icons don't overflow the card
                                            }}
                                            onMouseEnter={(e) => {
                                                const hoverIcons = e.currentTarget.querySelector(".hover-icons");
                                                hoverIcons.style.opacity = "1";
                                                hoverIcons.style.pointerEvents = "auto";
                                            }}
                                            onMouseLeave={(e) => {
                                                const hoverIcons = e.currentTarget.querySelector(".hover-icons");
                                                hoverIcons.style.opacity = "0";
                                                hoverIcons.style.pointerEvents = "none";
                                            }}
                                        >

                                            <div
                                                className="hover-icons d-flex align-items-center justify-content-center position-absolute w-100 h-100"
                                                style={{
                                                    top: 0,
                                                    left: 0,
                                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                                    opacity: "0", // Start hidden
                                                    transition: "opacity 0.3s",
                                                    zIndex: "10",
                                                    borderRadius: "8px",
                                                    pointerEvents: "none", // Disable interactions when hidden
                                                }}
                                            >
                                                <button
                                                    type="button"
                                                    className="btn btn-light m-2"
                                                    onClick={() => handleModifyRecipe(recipe._id)}
                                                >
                                                    <i className="icon-edit-2"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-light m-2"
                                                    onClick={() => handleShowRecipe(recipe._id)}
                                                >
                                                    <i className="icon-eye"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger m-2"
                                                    onClick={() => setShowModalRecipe(true)}
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                            {showSpinner && (
                                                <div className="backdrop-overlay">
                                                    <div className="spinner-border" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                </div>
                                            )}

                                            {showModalRecipe && (
                                                <div className="alert-modal-overlay">
                                                    <div className="alert-modal">
                                                        <p>Are you sure you want to delete this recipe?</p>
                                                        <div className="alert-modal-actions">
                                                            <button
                                                                className="btn alert-cancel-btn"
                                                                onClick={() => setShowModalRecipe(false)}
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                className="btn alert-logout-btn"
                                                                onClick={() => handleDeleteRecipe(recipe._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}


                                            <div className="room-image card-img-top "
                                                style={{ position: "relative" }}>
                                                <img
                                                    src={`http://localhost:3000${recipe.image}`}
                                                    alt={recipe.name || "Recipe Image"}
                                                    className="img-fluid"
                                                    style={{
                                                        width: '100%',
                                                        height: '30vh',
                                                        objectFit: 'cover',
                                                        borderRadius: '4px',
                                                        backgroundSize: "cover", // Use 'cover' to fill the container while maintaining aspect ratio
                                                        backgroundPosition: "center", // Center the image

                                                    }}
                                                />
                                                <div className="room-title card-body">
                                                    <h5 className="card-title" style={{ color: "gray-400" }}>{recipe.name}</h5>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>
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

            </div >
        </>
    )
}

export default ProfileR