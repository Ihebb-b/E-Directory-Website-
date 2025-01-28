import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Header2 from '../Components/Header2';
import Footer2 from '../Components/Footer2';
import { NavLink, useLocation } from 'react-router-dom';
import { useFilterRestaurantsQuery } from '../slices/userApiSlice';
import MapWithCountries from '../Components/MapWithCountries';
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";
import RestaurantMap from '../Components/RestaurantMap';


function RestaurantList() {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const queryParams = new URLSearchParams(location.search);
    const country = queryParams.get('country') || '';
    const diet = queryParams.get('diet') || '';

    const [filters, setFilters] = useState({
        location: '',
        priceRange: '',
        stars: '',
        diet: [],
        reviewScore: '',
        facilities: [],
    });
    const itemsPerPage = 5;
    const [isMapVisible, setIsMapVisible] = useState(true);

    const { data, isLoading, isError, error, refetch } = useFilterRestaurantsQuery({
        ...filters,
        diet: filters.diet.join(","), // Convert diet array to comma-separated string
        page: currentPage,
        limit: itemsPerPage,
    });

    const restaurants = data?.restaurants || [];
    const totalPages = data?.totalPages || 1;

    const toggleMap = () => {
        setIsMapVisible((prev) => !prev); // Toggle the visibility
    };
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // const handleFilterChange = (key, value) => {
    //     console.log("Filter changed:", key, value);
    //     if (key === "diet" || key === "facilities") {
    //         setFilters((prev) => {
    //             const updatedArray = prev[key].includes(value)
    //                 ? prev[key].filter((item) => item !== value)
    //                 : [...prev[key], value];
    //             return { ...prev, [key]: updatedArray };
    //         });
    //     } else {
    //         setFilters((prev) => ({ ...prev, [key]: value }));
    //     }
    //     setCurrentPage(1);
    // };

    const handleFilterChange = (key, value) => {
        console.log("Filter changed:", key, value);

        // Handle array-based filters like "diet" and "facilities"
        if (key === "diet" || key === "facilities") {
            setFilters((prev) => {
                const updatedArray = prev[key].includes(value)
                    ? prev[key].filter((item) => item !== value) // Remove value if it already exists
                    : [...prev[key], value]; // Add value if it doesn't exist
                return { ...prev, [key]: updatedArray };
            });
        }
        // Handle other single-value filters
        else {
            setFilters((prev) => ({ ...prev, [key]: value }));
        }

        // Reset the current page to the first page
        setCurrentPage(1);
    };

    const countries = [
        {
            name: "Tunisia",
            coordinates: [
                // { lat: 37.3428, lng: 10.0304 },
                { lat: 33.8869, lng: 9.5375 },
                // { lat: 32.0000, lng: 10.0000 },
                // { lat: 34.0000, lng: 8.0000 },
            ],
        },
        {
            name: "Algeria",
            coordinates: [
                 { lat: 36.7529, lng: 3.0420 },
                // { lat: 28.0339, lng: 1.6596 },
                // { lat: 24.0000, lng: 5.0000 },
                //  { lat: 34.0000, lng: -1.0000 },
            ],
        },
        {
            name: "France",
            coordinates: [
                { lat: 46.6034, lng: 1.8883 },
                // { lat: 48.8566, lng: 2.3522 },
                // { lat: 43.6047, lng: 1.4442 },
                // { lat: 45.7640, lng: 4.8357 },
            ],
        },
        {
            name: "Italy",
            coordinates: [
                { lat: 41.8719, lng: 12.5674 },
                // { lat: 45.4384, lng: 10.9916 },
                // { lat: 40.8518, lng: 14.2681 },
                // { lat: 43.7696, lng: 11.2558 },
            ],
        },
        {
            name: "Spain",
            coordinates: [
                { lat: 40.4168, lng: -3.7038 },
                // { lat: 41.3879, lng: 2.1699 },
                // { lat: 37.3886, lng: -5.9823 },
                // { lat: 39.4699, lng: -0.3763 },
            ],
        },
        {
            name: "Albania",
            coordinates: [
                { lat: 41.3275, lng: 19.8189 },
                // { lat: 40.6401, lng: 19.6498 },
                // { lat: 42.0667, lng: 20.5167 },
                // { lat: 40.9000, lng: 19.7500 },
            ],
        },
        {
            name: "Herzegovina",
            coordinates: [
                { lat: 43.9159, lng: 17.6791 },
                // { lat: 44.7833, lng: 17.2000 },
                // { lat: 43.5000, lng: 17.7000 },
                // { lat: 43.3000, lng: 18.1167 },
            ],
        },
        {
            name: "Croatia",
            coordinates: [
                { lat: 45.8150, lng: 15.9819 },
                // { lat: 44.1194, lng: 15.2314 },
                // { lat: 43.5081, lng: 16.4402 },
                // { lat: 45.3271, lng: 14.4422 },
            ],
        },
        {
            name: "Cyprus",
            coordinates: [
                { lat: 35.1264, lng: 33.4299 },
                // { lat: 34.9167, lng: 33.6367 },
                // { lat: 35.1667, lng: 33.3667 },
                // { lat: 35.0419, lng: 32.8326 },
            ],
        },
        {
            name: "Greece",
            coordinates: [
                { lat: 37.9838, lng: 23.7275 },
                // { lat: 40.6401, lng: 22.9444 },
                // { lat: 35.3387, lng: 25.1442 },
                // { lat: 39.0742, lng: 21.8243 },
            ],
        },
        {
            name: "Lebanon",
            coordinates: [
                { lat: 33.8547, lng: 35.8623 },
                // { lat: 34.0000, lng: 36.0000 },
                // { lat: 33.3000, lng: 35.2000 },
                // { lat: 34.2500, lng: 36.2500 },
            ],
        },
        {
            name: "Syria",
            coordinates: [
                { lat: 34.8021, lng: 38.9968 },
                // { lat: 36.2000, lng: 37.1500 },
                // { lat: 35.0000, lng: 38.5000 },
                // { lat: 33.5000, lng: 36.3000 },
            ],
        },
        {
            name: "Morocco",
            coordinates: [
                { lat: 31.7917, lng: -7.0926 },
                // { lat: 33.9716, lng: -6.8498 },
                // { lat: 35.7595, lng: -5.8339 },
                // { lat: 34.0209, lng: -6.8416 },
            ],
        },
        {
            name: "Egypt",
            coordinates: [
                { lat: 26.8206, lng: 30.8025 },
                // { lat: 30.0444, lng: 31.2357 },
                // { lat: 31.2001, lng: 29.9187 },
                // { lat: 25.6872, lng: 32.6396 },
            ],
        },
        {
            name: "Libya",
            coordinates: [
                //{ lat: 32.8872, lng: 13.1913 },
                { lat: 30.0333, lng: 19.2000 },
                // { lat: 24.0000, lng: 20.0000 },
                // { lat: 32.0000, lng: 14.3000 },
            ],
        },
        {
            name: "Palestine",
            coordinates: [
                { lat: 31.9522, lng: 35.2332 },
                // { lat: 32.2211, lng: 35.2629 },
                // { lat: 31.7000, lng: 34.8000 },
                // { lat: 32.0833, lng: 35.1833 },
            ],
        },
    ];


    const handleMapClick = (countryName) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            location: countryName,
        }));
        setCurrentPage(1); // Reset to the first page when a new location is selected
    };

    const handleRefreshFilters = () => {
        setFilters({
            location: "",
            priceRange: "",
            stars: "",
            diet: [],
            reviewScore: "",
            facilities: [],
        });
        setCurrentPage(1); // Reset to the first page
        refetch(); // Re-fetch data to show the original list
    };


    useEffect(() => {
        console.log("Filters updated:", filters);
        refetch();
    }, [filters, refetch]);

    useEffect(() => {
        console.log("Page changed:", currentPage);
        refetch(); // Re-fetch data when page changes
    }, [currentPage, refetch]);


    return (
        <>
            <div className="body-inner">
                <Header2 />
                <section
                    id="page-title"
                    data-bg-parallax="homepages/restaurant/images/main-1.jpg"
                    style={{
                        marginTop: "80px",
                        backgroundImage: "url('homepages/restaurant/images/main-1.jpg')",
                        backgroundPosition: "50% 70%",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="container">
                        <div className="page-title">
                            <h1 className="text-uppercase text-medium">RESTAURANTS</h1>
                            <span>Good and Healthy meals are the norm in the Mediterranean!</span>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="border">
                        {isMapVisible && <RestaurantMap countries={countries} handleMapClick={handleMapClick} />}
                    </div>
                </section>


                <section className="no-padding-section">
                    <div className="row">
                        <div className="hide-content col-lg-6">
                            <button onClick={toggleMap} className="btn btn-outline btn-dark mt-3">
                                {isMapVisible ? "Hide Map" : "View on Map"}
                            </button>

                            <button
                                    className="btn btn-secondary d-flex align-items-center gap-2"
                                    onClick={handleRefreshFilters}
                                    style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "20px",
                                        zIndex: "1000",
                                    }}
                                >
                                    <i className="icon-refresh-cw"></i> {/* Custom Icon */}
                                  
                                </button>
                        </div>
                    </div>
                </section>
                <section id="page-content" className="sidebar-left">
                    <div className="container">
                        <div className="row">
                            <div className="content col-lg-9">
                                <div className="page-title">
                                    <div className="breadcrumb float-left">
                                        <ul>
                                            <li><NavLink to="/">Home</NavLink></li>
                                            <li className="active"><NavLink to="/rntlist">Restaurants</NavLink></li>
                                        </ul>
                                    </div>
                                </div>

                                <div id="blog" className="post-thumbnails">
                                    {isLoading ? (
                                        <p>Loading...</p>
                                    ) : isError ? (
                                        <p>An error occurred: {error.message}</p>
                                    ) : !restaurants.length ? (
                                        <p>No restaurants available.</p>
                                    ) : (
                                        restaurants.map((restaurant) => (
                                            <div className="post-item" key={restaurant._id}>
                                                <div className="post-item-wrap">
                                                    <div className="post-image">
                                                        <a href="#">
                                                            <img
                                                                alt={restaurant.name}
                                                                src={restaurant.image || "/homepages/restaurant/images/envt.jpg"}
                                                                onError={(e) => {
                                                                    e.target.src = "/homepages/restaurant/images/envt.jpg";
                                                                }}
                                                            />
                                                        </a>
                                                    </div>
                                                    <div className="post-item-description">
                                                        <h2>
                                                            <NavLink to={`/restaurant/${restaurant?._id}`}>{restaurant.name}</NavLink>
                                                        </h2>
                                                        <p style={{ textAlign: "justify" }}>{restaurant.description}</p>
                                                        <NavLink
                                                            to={`/restaurant/${restaurant?._id}`}
                                                            className="item-link"
                                                        >
                                                            Read More <i className="icon-chevron-right"></i>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <a
                                            className="page-link"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePageChange(currentPage - 1);
                                            }}
                                        >
                                            <i className="fa fa-angle-left"></i>
                                        </a>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                            <a
                                                className="page-link"
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handlePageChange(i + 1);
                                                }}
                                            >
                                                {i + 1}
                                            </a>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <a
                                            className="page-link"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePageChange(currentPage + 1);
                                            }}
                                        >
                                            <i className="fa fa-angle-right"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="sidebar sticky-sidebar col-lg-3">
                                <div className="widget-sidebar">
                                    <h4 className="widget-title text-uppercase font-weight-bold">Filter Restaurants</h4>

                                    {/* Star Category Filter */}
                                    <div className="filter_type mt-4">
                                        <h6 className="text">Star Category</h6>
                                        <ul className="list-unstyled">
                                            {["5 Stars", "4 Stars", "3 Stars"].map((category, index) => (
                                                <li className="d-flex align-items-center mb-2" key={index}>
                                                    <span className="flex-grow-1">{category}</span>
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            onChange={(e) => handleFilterChange("stars", category)}
                                                            checked={filters.stars === category}

                                                        />
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Price Range Filter */}
                                    <div className="filter_type mt-4">
                                        <h6 className="text">Price Range</h6>
                                        <ul className="list-unstyled">
                                            {[
                                                { label: "Budget-friendly (€0-€20)", value: "budget" },
                                                { label: "Mid-range (€20-€50)", value: "midrange" },
                                                { label: "High-end (€50+)", value: "highend" },
                                            ].map((range, index) => (
                                                <li className="d-flex align-items-center mb-2" key={index}>
                                                    <span className="flex-grow-1">{range.label}</span>
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            onChange={(e) =>
                                                                handleFilterChange("priceRange", range.value)
                                                            }
                                                            checked={filters.priceRange === range.value}

                                                        />
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Review Score Filter */}
                                    <div className="filter_type mt-4">
                                        <h6 className="text">Review Score</h6>
                                        <ul className="list-unstyled">
                                            {[
                                                { label: "Superb: 9+", value: "9" },
                                                { label: "Very Good: 8+", value: "8" },
                                                { label: "Good: 7+", value: "7" },
                                            ].map((score, index) => (
                                                <li className="d-flex align-items-center mb-2" key={index}>
                                                    <span className="flex-grow-1">{score.label}</span>
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            onChange={(e) =>
                                                                handleFilterChange("reviewScore", score.value)
                                                            }
                                                            checked={filters.reviewScore === score.value}
                                                        />
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Facility Filter */}
                                    <div className="filter_type mt-4">
                                        <h6 className="text">Facility</h6>
                                        <ul className="list-unstyled">
                                            {["Pet Allowed", "Wifi", "Parking"].map((facility, index) => (
                                                <li className="d-flex align-items-center mb-2" key={index}>
                                                    <span className="flex-grow-1">{facility}</span>
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            onChange={(e) =>
                                                                handleFilterChange("facilities", facility.toLowerCase())
                                                            }
                                                            checked={filters.facilities.includes(facility.toLowerCase())}
                                                        />
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tags */}
                                    <div className="filter_type mt-4">
                                        <h6 className="text">Tags</h6>
                                        <div className="tags">
                                            {["Vegan", "Dairyfree", "Vegetarian", "Flexterian", "Norestriction"].map(
                                                (tag, index) => (
                                                    <a
                                                        key={index}
                                                        className={`tag-link ${filters.diet.includes(tag.toLowerCase()) ? 'active' : ''}`}
                                                        onClick={() => handleFilterChange("diet", tag.toLowerCase())}
                                                    >
                                                        {tag}
                                                    </a>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer2 />
            </div>
            <a id="scrollTop"><i className="icon-chevron-up"></i><i className="icon-chevron-up"></i></a>
        </>
    );
}

export default RestaurantList;