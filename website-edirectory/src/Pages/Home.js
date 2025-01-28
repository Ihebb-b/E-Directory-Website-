import Footer from '../Components/Footer';
import Footer2 from '../Components/Footer2';
import Header from '../Components/Header';
import RevolutionSlider from '../Components/RevolutionSlider';
import Slider from '../Components/Slider';
import logo from '../logo.svg';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, NavLink } from "react-router-dom";
import { useGetAllMenuListQuery, useGetMenuListQuery } from '../slices/restaurantSlice';
import { useGetAllRestaurantsQuery, useGetCountriesQuery, useGetDietQuery } from '../slices/userApiSlice';
import { useDispatch } from 'react-redux';
import { useGetRecipeListQuery, useGetRecipesQuery } from '../slices/recipeSlice';



export default function Home() {

    const [filters, setFilters] = useState({
        country: "",
        diet: "",
        averageBill: "",
    });
    const [expandedDescriptions, setExpandedDescriptions] = useState({});

    const toggleDescription = (id) => {
        setExpandedDescriptions((prev) => ({
            ...prev,
            [id]: !prev[id], // Toggle the expansion state for the specific restaurant
        }));
    };
    const [expandedIngredients, setExpandedIngredients] = useState({});

    const toggleIngredients = (id) => {
        setExpandedIngredients((prev) => ({
            ...prev,
            [id]: !prev[id], // Toggle the expansion state for the specific recipe
        }));
    };





    const navigate = useNavigate();

    const { data: countries = [], isLoading: isLoadingCountries } = useGetCountriesQuery();
    const { data: diets = [], isLoading: isLoadingDiets } = useGetDietQuery();
    console.log("Diets:", diets); // Debug the diets data



    //const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const { data: restaurants = [], isLoadingResto, errorResto } = useGetAllRestaurantsQuery();

    const { data: menus = [], isLoading, error } = useGetAllMenuListQuery();

    const { data: recipes = [], isLoadingRecipes, errorRecipes } = useGetRecipesQuery();

    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        if (!isLoadingResto && !isLoading) {
            setShowSpinner(false); // Hide spinner when data is loaded
        }
    }, [isLoadingResto, isLoading]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [id]: value,
        }));
    };
    const handleSearch = () => {
        const params = new URLSearchParams(filters).toString();
        navigate(`/rlist?${params}`);
    };

    // const handleSearch = () => {
    //         const country = document.getElementById("country-select").value;
    //         const diet = document.getElementById("diet-select").value;
    //         const averageBill = document.getElementById("average-bill").value;

    //         onSearch({
    //             country,
    //             diet,
    //             averageBill: parseInt(averageBill, 10) || 0,
    //         });
    //     };




    if (isLoading) return <p>Loading menus...</p>;
    if (error) return <p>Error loading menus: {error.message}</p>;

    // Get the last 4 menus
    const lastFourMenus = menus.slice(-4);


    return (

        <>
            <div className="body-inner">
                {showSpinner && (
                    <div className="backdrop-overlay">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}

                <Header />

                <Slider />

                <section className="pb-0">
                    <div className="container">
                        <div className="card mt-n10">
                            <div className="card-body">
                                <form>
                                    <div className="row justify-content-center">

                                        <div className="col-lg-3 col-6">
                                            <div className="form-group">
                                                <label className="font-size-lg">Country</label>
                                                <select
                                                    id="country"
                                                    className="form-select"
                                                    value={filters.country}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="" disabled hidden>
                                                        Select a country
                                                    </option>
                                                    {countries.map((country) => (
                                                        <option key={country} value={country}>
                                                            {country}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-6">
                                            <div className="form-group">
                                                <label className="font-size-lg">Diet</label>
                                                <select
                                                    id="diet-select"
                                                    className="form-select"
                                                    value={filters.diet}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="" disabled hidden>Select a diet</option>
                                                    {diets.map((diet) => (
                                                        <option key={diet} value={diet}>
                                                            {diet}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-6">
                                            <div className="form-group">
                                                <label className="font-size-lg">Average Bill (Max)</label>
                                                <input
                                                    id="average-bill"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Enter max bill"
                                                    value={filters.averageBill}
                                                    onChange={handleInputChange}
                                                    min="0" />
                                            </div>
                                        </div>

                                        <div className="col-lg-3 align-self-end">
                                            <button
                                                type="button"
                                                id="search-button"
                                                className="btn btn-primary mb-3"
                                                onClick={handleSearch}
                                            >Check restaurant</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </section>

                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h2 className="text-medium m-t-0">Welcome to the mediterranians</h2>
                                <div className="seperator"><i className="fa fa-dot-circle-o"></i></div>
                                <p className="lead">The Mediterranean cuisine is celebrated for its vibrant menus and wholesome recipes,
                                    featuring fresh vegetables, fruits, whole grains, legumes, nuts, and heart-healthy olive oil.
                                    Dishes often include lean proteins like fish and poultry, flavored with aromatic herbs and spices
                                    that enhance both taste and nutritional value.</p>
                            </div>

                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="room">
                                        <div className="room-image">
                                            <img src="homepages/restaurant/images/restaurant1.jpg" alt="#" />
                                            <div className="room-title">Restaurants</div>
                                        </div>
                                        <div className="room-details">
                                            <p>Mediterranean restaurants exude a warm and inviting atmosphere,
                                                reflecting the region's rich cultural heritage.
                                                They are characterized by rustic decor, earthy tones, and a cozy ambiance.
                                            </p>

                                            <div className="flex justify-center items-center h-full">
                                                <NavLink to="/rlist">
                                                    <button class="btn btn-roundeded btn-outline">Show all</button>
                                                </NavLink>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-3">
                                    <div className="room">
                                        <div className="room-image">
                                            <img src="homepages/restaurant/images/chefs.jpg" alt="#" />
                                            <div className="room-title">Chefs</div>
                                        </div>
                                        <div className="room-details">
                                            <p>Mediterranean traditions promotes a sense of community.
                                                Our expert chefs, inspired by these authentic traditions,
                                                craft each dish with passion and precision, ensuring a delightful culinary experience.</p>

                                            <div className="flex justify-center items-center h-full">
                                                <a href="#" className="btn btn-roundeded btn-outline">Show all</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-3">
                                    <div className="room">
                                        <div className="room-image">
                                            <img src="homepages/restaurant/images/menu1.jpg" alt="#" />
                                            <div className="room-title">Menus</div>
                                        </div>
                                        <div className="room-details">
                                            <p>Menus at Mediterranean restaurants are a flavorful journey through the region,
                                                offering a wide variety of dishes to suit all tastes.
                                                with an emphasis on fresh,
                                                seasonal ingredients.  </p>

                                            <div className="flex justify-center items-center h-full">
                                                <a href="/menulist" className="btn btn-roundeded btn-outline">Show all</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-lg-3">
                                    <div className="room">
                                        <div className="room-image">
                                            <img src="homepages/restaurant/images/recipe2.jpg" alt="#" />
                                            <div className="room-title">Recipes</div>
                                        </div>
                                        <div className="room-details">
                                            <p>Mediterranean recipes are rooted in simplicity and tradition,
                                                focusing on letting the natural flavors of the ingredients shine.
                                                Olive oil, garlic, lemon, and herbs are staples in most
                                                preparations. </p>

                                            <div className="flex justify-center items-center h-full">
                                                <NavLink to="/recipelist" className="btn btn-roundeded btn-outline">Show all</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>


                            {/* <div class="carousel" data-items="3" data-dots="false" data-lightbox="gallery">
                          
                            <div class="portfolio-item img-zoom ct-photography ct-media ct-branding ct-Media">
                                <div class="portfolio-item-wrap">
                                    <div class="portfolio-image">
                                        <a href="#"><img src="homepages/hotel/images/rooms/1.jpg" alt=""/></a>
                                    </div>
                                    <div class="portfolio-description">
                                        <a title="Paper Pouch!" data-lightbox="gallery-image" href="images/portfolio/63.jpg" class="btn btn-light btn-roundeded">Zoom</a>
                                    </div>
                                </div>
                            </div>
                           
                            <div class="portfolio-item img-zoom ct-photography ct-media ct-branding ct-Media">
                                <div class="portfolio-item-wrap">
                                    <div class="portfolio-image">
                                        <a href="#"><img src="homepages/hotel/images/rooms/1.jpg" alt=""/></a>
                                    </div>
                                    <div class="portfolio-description">
                                        <a title="Paper Pouch!" data-lightbox="gallery-image" href="images/portfolio/64.jpg" class="btn btn-light btn-roundeded">Zoom</a>
                                    </div>
                                </div>
                            </div>
                           
                            <div class="portfolio-item img-zoom ct-photography ct-media ct-branding ct-Media">
                                <div class="portfolio-item-wrap">
                                    <div class="portfolio-image">
                                        <a href="#"><img src="homepages/hotel/images/rooms/1.jpg" alt=""/></a>
                                    </div>
                                    <div class="portfolio-description">
                                        <a title="Paper Pouch!" data-lightbox="gallery-image" href="images/portfolio/65.jpg" class="btn btn-light btn-roundeded">Zoom</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="portfolio-item img-zoom ct-photography ct-media ct-branding ct-Media">
                                <div class="portfolio-item-wrap">
                                    <div class="portfolio-image">
                                        <a href="#"><img src="homepages/hotel/images/rooms/1.jpg" alt=""/></a>
                                    </div>
                                    <div class="portfolio-description">
                                        <a title="Paper Pouch!" data-lightbox="gallery-image" href="images/portfolio/66.jpg" class="btn btn-light btn-roundeded">Zoom</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="portfolio-item img-zoom ct-photography ct-media ct-branding ct-Media">
                                <div class="portfolio-item-wrap">
                                    <div class="portfolio-image">
                                        <a href="#"><img src="homepages/hotel/images/rooms/1.jpg" alt=""/></a>
                                    </div>
                                    <div class="portfolio-description">
                                        <a title="Paper Pouch!" data-lightbox="gallery-image" href="images/portfolio/67.jpg" class="btn btn-light btn-roundeded">Zoom</a>
                                    </div>
                                </div>
                            </div>
                           
                            <div class="portfolio-item img-zoom ct-photography ct-media ct-branding ct-Media">
                                <div class="portfolio-item-wrap">
                                    <div class="portfolio-image">
                                        <a href="#"><img src="homepages/hotel/images/rooms/1.jpg" alt=""/></a>
                                    </div>
                                    <div class="portfolio-description">
                                        <a title="Paper Pouch!" data-lightbox="gallery-image" href="images/portfolio/68.jpg" class="btn btn-light btn-roundeded">Zoom</a>
                                    </div>
                                </div>
                            </div>
                           
                        </div> */}
                            {/* <div className="col-lg-8">
                                <div className="rooms carousel" data-items="2" data-margin="20" data-dots="false">
                                    <div className="room">
                                        <div className="room-image">
                                            <img src="homepages/hotel/images/rooms/1.jpg" alt="#" />
                                            <div className="room-title">Luxury Room</div>
                                            <span className="room-badge">save 60%</span>
                                        </div>
                                        <div className="room-details">
                                            <p>Vestibulum id ligula porta felis euismod semper. Aenean eu leo quam. Pellentesque
                                                ornare sem lacinia quam venenatis vestibulum.</p>
                                            <div className="float-left">
                                                <h4>89$<small>/ Day</small></h4>
                                            </div>
                                            <div className="float-right">
                                                <a href="#" className="btn btn-primary">Book</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="room">
                                        <div className="room-image">
                                            <img src="homepages/hotel/images/rooms/2.jpg" alt="#" />
                                            <div className="room-title">Deluxe Room</div>
                                        </div>
                                        <div className="room-details">
                                            <p>Vestibulum id ligula porta felis euismod semper. Aenean eu leo quam. Pellentesque
                                                ornare sem lacinia quam venenatis vestibulum.</p>
                                            <div className="float-left">
                                                <h4>89$<small>/ Day</small></h4>
                                            </div>
                                            <div className="float-right">
                                                <a href="#" className="btn btn-primary">Book</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="room">
                                        <div className="room-image">
                                            <img src="homepages/hotel/images/rooms/3.jpg" alt="#" />
                                            <div className="room-title">Standard Room</div>
                                            <span className="room-badge">save 60%</span>
                                        </div>
                                        <div className="room-details">
                                            <p>Vestibulum id ligula porta felis euismod semper. Aenean eu leo quam. Pellentesque
                                                ornare sem lacinia quam venenatis vestibulum.</p>
                                            <div className="float-left">
                                                <h4>89$<small>/ Day</small></h4>
                                            </div>
                                            <div className="float-right">
                                                <a href="#" className="btn btn-primary">Book</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="seperator"><i className="fa fa-check-circle"></i></div>
                        <div className="row m-t-60">
                            <div className="col-lg-3">
                                <i className="fa fa-heartbeat fa-2x"></i>
                                <h4>Health</h4>
                                <p>Olive oil, a staple of the Mediterranean diet, supports heart health and reduces bad cholesterol levels. Other sources include nuts, seeds, and avocados.</p>
                            </div>
                            <div className="col-lg-3">
                                <i className="fas fa-fish fa-2x"></i>
                                <h4>Fish and Seafood</h4>
                                <p>Fish such as salmon, sardines, and mackerel are consumed at least twice a week. They are rich in omega-3 fatty acids,
                                    which are essential for heart and brain health.</p>
                            </div>
                            <div className="col-lg-3">
                                <i className="fa fa-tree fa-2x"></i>
                                <h4>Herbs and Spices</h4>
                                <p>Herbs and spices like oregano, basil, rosemary, and garlic enhance flavor without adding salt,
                                    helping to lower sodium intake and improve blood pressure.</p>
                            </div>
                            <div className="col-lg-3">
                                <i className="fa fa-users fa-2x"></i>
                                <h4>Strong Community</h4>
                                <p>Meals are often enjoyed in a communal setting, fostering social connections. Eating mindfully and savoring food promotes
                                    better digestion and a healthier relationship with food.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section className="section-video text-light" data-bg-video="homepages/restaurant/video/restaurant.mp4">
                    <div className="container container-fullscreen">
                        <div className="text-middle text-center text-light">
                            <h1 className="text-uppercase text-lg">E-Directory</h1>
                            <p className="lead">Don't waste any more time and energy, dive in and enjoy our menus and recipes</p>


                        </div>

                    </div>
                    
                </section> */}

                <section className="section-video text-light">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="bg-video"
                    >
                        <source src="homepages/restaurant/video/restaurant.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="container container-fullscreen">
                        <div className="text-middle text-center text-light">
                            <h1 className="text-uppercase text-lg">E-Directory</h1>
                            <p className="lead">
                                Don't waste any more time and energy, dive in and enjoy our menus and recipes
                            </p>
                        </div>
                    </div>
                </section>
                <div className="seperator"><i className="fa fa-building"></i></div>


                {/* <section className="red-bg">
                    <div className="container">
                        <div className="text-center m-b-40">
                            <div className="d-flex align-items-center justify-content-between mb-3">

                                <h2 className="text-medium m-t-0 mb-0">Popular Restaurants</h2>


                                <button type="button" className="btn btn-outline btn-dark">Explore More</button>
                            </div>
                            <div className="seperator"><i className="fa fa-dot-circle-o"></i></div>
                            <p className="lead mb-0">
                                Mediterranean restaurants offer a culinary experience inspired by the diverse and vibrant
                                flavors of countries bordering the Mediterranean Sea, such as Greece, Italy, Spain, Turkey,
                                Morocco, and Lebanon. These establishments typically focus on fresh, wholesome ingredients,
                                including olive oil, fresh vegetables, herbs, legumes, lean proteins like fish and chicken,
                                and whole grains.
                            </p>

                        </div>  const tagOptions = ["Vegetarian", "Vegan", "Dairy Free", "Flexterian", "No Restriction"];

                        <div className="row">
                            <div className="col-lg-3">
                                <div className="room">
                                    <div className="room-image">
                                        <img src="homepages/restaurant/images/restaurantmed1.jpg" alt="#" />
                                        <div className="room-title">Dar Belhadj</div>
                                    </div>
                                    <div className="room-details">
                                        <h5 >Tunisian</h5>
                                        <p>An upscale restaurant in a typical Tunisian setting,
                                            located in the medina between the two souks
                                            “El Attarine “ and “El Balgagia”,
                                            with a view over the Great Mosque “Ezzitouna”.</p>
                                        <h6 >€29 average price</h6>
                                        <div className="float-center">
                                            <a href="#" className="btn btn-outline btn-dark ">details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="room">
                                    <div className="room-image">
                                        <img src="homepages/restaurant/images/restaurantmed4.jpg" alt="#" />
                                        <div className="room-title">Le Petit Verre</div>
                                        <span className="room-badge">save 60%</span>
                                    </div>
                                    <div className="room-details">
                                        <h5 >French</h5>

                                        <p>“The Little Glass,” this name evokes a cozy, intimate dining
                                            experience. it suggests a time of elegance and refinement, also it conveys a sophisticated and chic atmosphere.</p>
                                        <h6 >€89 average price</h6>

                                        <div className="float-center">
                                            <a href="#" className="btn btn-outline btn-dark ">details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="room">
                                    <div className="room-image">
                                        <img src="homepages/restaurant/images/restaurantmed2.jpg" alt="#" />
                                        <div className="room-title">La Festa in Cucina</div>
                                    </div>
                                    <div className="room-details">
                                        <h5 >Italian</h5>

                                        <p>Meaning “The Kitchen Party,” this name evokes a lively and festive atmosphere.
                                            it also implies satisfaction and joy from the food. this restaurant  brings to mind hearty, comforting meals.
                                        </p>
                                        <h6 >€69 average price</h6>

                                        <div className="float-center">
                                            <a href="#" className="btn btn-outline btn-dark ">details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="room">
                                    <div className="room-image">
                                        <img src="homepages/restaurant/images/restaurantmed3.jpg" alt="#" />
                                        <div className="room-title">Taj Mahal</div>
                                    </div>
                                    <div className="room-details">
                                        <h5 >Algerian</h5>

                                        <p>A highly-recommended restaurant in Algiers, known for serving excellent food.
                                            It provides a nice environment and good service, with a staff that treats customers kindly.

                                        </p>
                                        <h6 >€39 average price</h6>

                                        <div className="float-center">
                                            <a href="#" className="btn btn-outline btn-dark ">details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section> */}

                <section className="red-bg">
                    <div className="container">
                        <div className="text-center m-b-40">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h2 className="text-medium m-t-0 mb-0">Popular Restaurants</h2>
                                <NavLink to="/rlist" className="btn btn-outline btn-dark">
                                    Explore More
                                </NavLink>
                            </div>
                            <div className="seperator">
                                <i className="fa fa-dot-circle"></i>
                            </div>
                            <p className="lead mb-0">
                                Mediterranean restaurants offer a culinary experience inspired by
                                the diverse and vibrant flavors of countries bordering the
                                Mediterranean Sea, such as Greece, Italy, Spain, Turkey, Morocco,
                                and Lebanon.
                            </p>
                        </div>
                        <div className="row">
                            {Array.isArray(restaurants) && restaurants.slice(0, 4).map((restaurant, index) => (
                                <div className="col-lg-3" key={restaurant._id}>
                                    <div className="room">
                                        <div className="room-image">
                                            <img
                                                src={restaurant.image || "/homepages/restaurant/images/envt.jpg"}
                                                alt={restaurant.name}
                                                className="img-fluid"
                                                style={{
                                                    width: "100%", // Full width relative to its container
                                                    height: "200px", // Fixed height
                                                    objectFit: "cover", // Maintain aspect ratio and avoid stretching
                                                    borderRadius: "8px", // Optional: Rounded corners
                                                }}
                                            />
                                            <div className="room-title" style={{ color: "black", fontSize: "1.2rem", fontWeight: "bold" }}>{restaurant.name}</div>
                                        </div>
                                        <div className="room-details">
                                            <h5>{restaurant.localisation}</h5>
                                            <p
                                                style={{
                                                    overflow: "hidden",
                                                    display: expandedDescriptions[restaurant._id]
                                                        ? "block"
                                                        : "-webkit-box",
                                                    WebkitBoxOrient: "vertical",
                                                    WebkitLineClamp: 2,
                                                }}
                                            >
                                                {restaurant.description}
                                            </p>
                                            {restaurant.description.length > 100 && (
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        toggleDescription(restaurant._id);
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
                                            <h6>average price: €{restaurant.averageBill}</h6>
                                            <div className="float-center">
                                                <NavLink to={`/restaurant/${restaurant?._id}`} className="btn btn-outline btn-dark">
                                                    Details
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <div className="seperator"><i className=" icon-menu"></i></div>




                <section className="gray-bg">
                    <div className="container">
                        <div className="text-center m-b-40">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h2 className="text-medium m-t-0 mb-0">Popular Menus</h2>
                                <NavLink to="/menulist" className="btn btn-outline btn-dark">
                                    Explore More
                                </NavLink>
                            </div>
                            <div className="seperator">
                                <i className="fa fa-dot-circle"></i>
                            </div>
                            <p className="lead mb-0">
                                Menus at Mediterranean restaurants are a vibrant celebration of the
                                rich culinary traditions of countries bordering the Mediterranean
                                Sea, such as Greece, Italy, Spain, Turkey, Morocco, and Lebanon.
                                They typically feature a diverse range of dishes that emphasize
                                fresh, wholesome ingredients.
                            </p>
                        </div>
                        <div className="row">
                            {lastFourMenus.map((menu, index) => (
                                <div className="col-lg-3" key={menu.id}>
                                    <div className="room">
                                        <div className="room-image">
                                            <img
                                                className="img-fluid"
                                                src={menu.image}
                                                alt={menu.name}

                                                style={{

                                                    width: "100%", // Full width relative to its container
                                                    height: "200px", // Fixed height
                                                    objectFit: "cover", // Maintain aspect ratio and avoid stretching
                                                    borderRadius: "8px", // Optional: Rounded corners
                                                }} />
                                            <div className="room-title" style={{ color: "black", fontSize: "1.2rem", fontWeight: "bold" }}>{menu.name}</div>
                                        </div>
                                        <div className="room-details">
                                            <p 
                                             style={{
                                                overflow: "hidden",
                                                display: expandedDescriptions[menu._id]
                                                    ? "block"
                                                    : "-webkit-box",
                                                WebkitBoxOrient: "vertical",
                                                WebkitLineClamp: 2,
                                            }}
                                            >{menu.description}</p>
                                             {menu.description.length > 100 && (
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        toggleDescription(menu._id);
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
                                            <div className="float-center">
                                                <NavLink to={`/getMenu/${menu?._id}`} className="btn btn-outline btn-dark">
                                                    Details
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <div className="seperator"><i className="fa fa-file"></i></div>


                <section className='yellow-bg'>
                    <div className="container">
                        <div className="text-center m-b-40">
                            <div className="d-flex align-items-center justify-content-between mb-3">

                                <h2 className="text-medium m-t-0 mb-0">Popular Recipes</h2>


                                <NavLink to="/recipelist" className="btn btn-outline btn-dark">Explore More
                                </NavLink>
                            </div>
                            <div className="seperator"><i className="fa fa-dot-circle"></i></div>
                            <p className="lead mb-0">
                                Mediterranean restaurants offer a culinary experience inspired by the diverse and vibrant
                                flavors of countries bordering the Mediterranean Sea, such as Greece, Italy, Spain, Turkey,
                                Morocco, and Lebanon. These establishments typically focus on fresh, wholesome ingredients,
                                including olive oil, fresh vegetables, herbs, legumes, lean proteins like fish and chicken,
                                and whole grains.
                            </p>

                        </div>
                        <div className="row">

                            {Array.isArray(recipes) && recipes.slice(0, 4).map((recipe, index) => (
                                <div className="col-lg-3" key={recipe._id}>
                                    <div className="room">
                                        <div className="room-image">
                                            <img
                                                src={recipe.image || "/homepages/restaurant/images/envt.jpg"}
                                                alt={recipe.name}
                                                className="img-fluid"
                                                style={{
                                                    width: "100%", // Full width relative to its container
                                                    height: "200px", // Fixed height
                                                    objectFit: "cover", // Maintain aspect ratio and avoid stretching
                                                    borderRadius: "8px", // Optional: Rounded corners
                                                }}
                                            />
                                            <div className="room-title" style={{ color: "black", fontSize: "1.2rem", fontWeight: "bold" }}>{recipe.name}</div>
                                        </div>
                                        <div className="room-details">
                                            <h5><b>Ingredients:</b></h5>
                                            {/* <h5>{recipe.ingredients?.join(', ')}</h5> */}
                                            <p
                                                style={{
                                                    overflow: "hidden",
                                                    display: expandedIngredients[recipe._id]
                                                        ? "block"
                                                        : "-webkit-box",
                                                    WebkitBoxOrient: "vertical",
                                                    WebkitLineClamp: 2,
                                                }}
                                            >
                                                {recipe.ingredients?.join(", ")}
                                            </p>
                                            {recipe.ingredients?.length > 5 && ( // Show "Read More" only if there are many ingredients
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        toggleIngredients(recipe._id);
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
                                            <div className="float-center">
                                                <NavLink to={`/recipeDetail/${recipe?._id}`} className="btn btn-outline btn-dark">
                                                    Details
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}


                            {/* <div className="col-lg-3">
                                <div className="room">
                                    <div className="room-image">
                                        <img src="homepages/restaurant/images/recipemed1.jpg" alt="#" />
                                        <div className="room-title">Baked Cod Recipe with Lemon and Garlic</div>
                                    </div>
                                    <div className="room-details">
                                        <p>This easy baked cod recipe comes together in just over 20 minutes,
                                            but there is a reason it is a big fan favorite! Tender, perfectly flaky cod,
                                            tossed in bold Mediterranean spices and baked with a tasty garlic and lemon
                                            sauce.</p>

                                        <div className="float-center">
                                            <NavLink to="/recipedetail" className="btn btn-outline btn-dark ">details</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="room">
                                    <div className="room-image">
                                        <img src="homepages/restaurant/images/recipemed2.jpg" alt="#" />
                                        <div className="room-title">Authentic Falafel Recipe Step-by-Step</div>
                                    </div>
                                    <div className="room-details">
                                        <p>Falafel is a popular Middle Eastern
                                            “fast food” made of a mixture of chickpeas,
                                            fresh herbs, and spices that are formed into a small patties or balls.
                                            It's thought that falafel originated in Egypt as Coptic Christians
                                            looked for a hearty replacement for meat.
                                        </p>

                                        <div className="float-center">
                                            <a href="#" className="btn btn-outline btn-dark ">details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="room">
                                    <div className="room-image">
                                        <img src="homepages/restaurant/images/recipemed3.jpg" alt="#" />
                                        <div className="room-title">Homemade Pita Bread Recipe</div>
                                    </div>
                                    <div className="room-details">
                                        <p>This homemade pita bread recipe is easy to make and requires
                                            a few ingredients you may already have on hand!  Mix up the
                                            very simple dough, let it rise, and experience the magic of fresh,
                                            warm, perfectly puffy homemade pita bread. </p>

                                        <div className="float-center">
                                            <a href="#" className="btn btn-outline btn-dark ">details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="room">
                                    <div className="room-image">
                                        <img src="homepages/restaurant/images/recipemed4.jpg" alt="#" />
                                        <div className="room-title">Greek Avgolemono Soup Recipe</div>
                                    </div>
                                    <div className="room-details">
                                        <p>Chicken soup is one of those nostalgic dishes known as a home remedy
                                            to comfort the sick or relief the cold chill in the air.
                                            It's also one of those universal foods every culture, and every household,
                                            has some version of noodles or not.</p>

                                        <div className="float-center">
                                            <NavLink to="/recipelist" className="btn btn-outline btn-dark ">details</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                        </div>
                    </div>
                </section>








                <Footer2 />


            </div>



            <a id="scrollTop"><i className="icon-chevron-up"></i><i className="icon-chevron-up"></i></a>



        </>


    );
}


