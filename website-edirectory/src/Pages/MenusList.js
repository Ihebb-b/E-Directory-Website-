import React, { useState } from 'react'
import { useGetAllMenuPagiQuery } from '../slices/restaurantSlice';
import Header2 from '../Components/Header2';
import { NavLink } from 'react-router-dom';
import Footer2 from '../Components/Footer2';

function MenusList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data, isLoading, isError } = useGetAllMenuPagiQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  // const menuImages = [
  //   "homepages/restaurant/images/menumed1.jpg",
  //   "homepages/restaurant/images/menumed2.jpg",
  //   "homepages/restaurant/images/menumed3.jpg",
  //   "homepages/restaurant/images/menumed4.jpg",
  // ];

  const menus = data?.menus || [];
  const totalPages = data?.totalPages || 1;

  //const menuImage = data.image; // Assuming the API returns the menu image URL in a property named `image`


  // State to toggle map visibility
  const [isMapVisible, setMapVisible] = useState(false);

  // Function to toggle map visibility
  const toggleMap = () => setMapVisible(!isMapVisible);


  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Error state
  if (isError) {
    return <p>An error occurred while fetching menus.</p>;
  }

  // Empty state
  if (!menus.length) {
    return <p>No menus available.</p>;
  }


  return (

    <>
      <div className="body-inner">

        <Header2 />

        <section id="page-title" data-bg-parallax="homepages/restaurant/images/main-1.jpg"
          style={{
            marginTop: "80px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundImage: "url('homepages/restaurant/images/menu1.jpg')",
            backgroundPosition: "50% 70%",
            backgroundSize: "cover", backgroundRepeat: "no-repeat"
          }}>
            <div style={{
        position: "absolute", // Position the overlay absolutely
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay with 50% opacity
        zIndex: 1 // Ensure the overlay is above the background image
    }} />

          {/* <div className="bg-overlay"></div> */}
          <div className="container">
            <div className="page-title"
             style={{
              position: "relative", // Position content above the overlay
              zIndex: 2 // Ensure content is above the overlay
          }}>
              <h1 className="text-uppercase text-medium">MENUS</h1>
              <span>Explore our wonderfull, healthy and, mediterranean menus !</span>
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
                      <li> <NavLink to="/">Home</NavLink></li>
                      <li className="active"> <NavLink to="/menulist">Menus</NavLink></li>
                    </ul>
                  </div>
                </div>

                <div id="blog" className="post-thumbnails">
                  {menus.map((menu, index) => (
                    <div className="post-item" key={menu._id}>
                      <div className="post-item-wrap">
                        <div className="post-image">
                          <a href="#">
                            <img
                              alt={menu.name}
                              src={menu.image || "/homepages/restaurant/images/default-image.jpg"}
                              onError={(e) => {
                                e.target.src = "/homepages/restaurant/images/default-image.jpg";
                              }}

                              style={{
                                width: "350px", // Set fixed width
                                height: "250px", // Set fixed height
                                objectFit: "cover", // Maintain aspect ratio and avoid stretching
                                borderRadius: "8px", // Optional: Rounded corners
                                margin: "0 auto", // Center the image
                              }}
                              //src={`url('${menuImage}')`}
                              //src={menu.image || "/homepages/restaurant/images/envt.jpg"}
                              //src={`/homepages/restaurant/images/menumed${index % 4 + 1}.jpg`} // Cycle through static images
                            />
                          </a>
                        </div>
                        <div className="post-item-description">
                          <h2>
                          <NavLink to={`/getMenu/${menu?._id}`}>{menu.name}</NavLink>
                          </h2>
                          <p style={{ textAlign: "justify" }}>{menu.description}</p>
                          <NavLink
                            to={`/getMenu/${menu?._id}`} // Dynamically link to restaurant detail page
                            className="item-link"
                          >
                            Read More <i className="icon-chevron-right"></i>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  ))}
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

                  <h4 className="widget-title text-uppercase font-weight-bold">Filter Menus</h4>


                  <div className="filter_type mt-4">
                    <h6 className="text">Star Category</h6>
                    <ul className="list-unstyled">
                      <li className="d-flex align-items-center mb-2">
                        <span className="flex-grow-1">5 Stars</span>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" name="5-stars" id="5-stars" />
                        </div>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <span className="flex-grow-1">4 Stars</span>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" name="4-stars" id="4-stars" />
                        </div>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <span className="flex-grow-1">3 Stars</span>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" name="3-stars" id="3-stars" />
                        </div>
                      </li>
                    </ul>
                  </div>


                  <div className="filter_type mt-4">
                    <h6 className="text">Review Score</h6>
                    <ul className="list-unstyled">
                      <li className="d-flex align-items-center mb-2">
                        <span className="flex-grow-1">Superb: 9+</span>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" name="superb" id="superb" />
                        </div>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <span className="flex-grow-1">Very Good: 8+</span>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" name="very-good" id="very-good" />
                        </div>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <span className="flex-grow-1">Good: 7+</span>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" name="good" id="good" />
                        </div>
                      </li>
                    </ul>
                  </div>


                  <div className="filter_type mt-4">
                    <h6 className="text">Prices</h6>
                    <ul className="list-unstyled">
                      <li className="d-flex align-items-center mb-2">
                        <span className="flex-grow-1">Expensive</span>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" name="pet-allowed" id="pet-allowed" />
                        </div>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <span className="flex-grow-1">Less expensive</span>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" name="wifi" id="wifi" />
                        </div>
                      </li>
                     
                    </ul>
                  </div>


                  <div className="filter_type mt-4">
                    <h6 className="text">Restaurant</h6>
                    <ul className="list-unstyled">
                      <li className="d-flex align-items-center mb-2">
                        <span className="flex-grow-1">Greece</span>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" name="paris-centre" id="paris-centre" />
                        </div>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <span className="flex-grow-1">Tunisia</span>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" name="la-defance" id="la-defance" />
                        </div>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <span className="flex-grow-1">Morocco</span>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" name="latin-quarter" id="latin-quarter" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>





                <div className="widget-sidebar ">
                  <h4 className="widget-title">Tags</h4>
                  <div className="tags">
                    <a href="#">Vegan</a>
                    <a href="#">Fruitarian</a>
                    <a href="#">Vegetarian</a>
                    <a href="#">Flexterian</a>
                    <a href="#">No Diet</a>
                    <a href="#">Religiously Observant</a>
                    <a href="#">Other</a>
                  </div>
                </div>

                <div className="widget ">
                  <div className="box_style_2">
                    <i className="fa fa-headset"></i>
                    <h4>Need <span>Help?</span></h4>
                    <a href="tel://21699445999" className="phone">+216 99 445 999</a>
                    <small>Monday to Friday 9.00am - 7.30pm</small>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        <div className="seperator"><i className="fa fa-dot-circle-o"></i></div>

        <Footer2 />

      </div>


      <a id="scrollTop"><i className="icon-chevron-up"></i><i className="icon-chevron-up"></i></a>


    </>
  )
}

export default MenusList