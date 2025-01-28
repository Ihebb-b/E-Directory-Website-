import React, { useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Header2 from '../Components/Header2'
import Footer2 from '../Components/Footer2'
import { NavLink } from 'react-router-dom'
import { useGetAllRecipePagiQuery } from '../slices/recipeSlice'

function RecipesList() {

  // State to toggle map visibility
  const [isMapVisible, setMapVisible] = useState(false);

  // Function to toggle map visibility
  const toggleMap = () => setMapVisible(!isMapVisible);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  const { data, isLoading, isError } = useGetAllRecipePagiQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const recipes = data?.recipes || [];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occurred while fetching restaurants.</p>;
  }



  return (
    <>
      <div class="body-inner">

        <Header2 />
        <section id="page-title"
          style={{
            marginTop: "80px",
            backgroundImage: "url('homepages/restaurant/images/recippee.jpg')",
            backgroundPosition: "50% 30%",
            backgroundSize: "cover", backgroundRepeat: "no-repeat",
            color: "white"
          }}>

          <div class="bg-overlay"></div>
          <div class="container">
            <div class="page-title">
              <h1 class="text-uppercase text-medium, text-white">Recipes</h1>
              <span>Delve into the secrets of a prolonged and a healthy life with our recipes!</span>
            </div>
          </div>
        </section>







        <section id="page-content" class="sidebar-left">
          <div class="container">

            <div class="row">
              <div class="content col-lg-9">
                <div class="page-title">
                  <div class="breadcrumb float-left">
                    <ul>
                      <li> <NavLink to="/">Home</NavLink></li>
                      <li class="active"> <NavLink to="/rntlist">Recipes</NavLink></li>
                    </ul>
                  </div>
                </div>
                {/* 
                <div id="blog" class="post-thumbnails">

                  <div class="post-item">
                    <div class="post-item-wrap">
                      <div class="post-image">
                        <a href="#">
                          <img alt="" src="/homepages/restaurant/images/shakshouka.jpg" />
                        </a>
                      </div>
                      <div class="post-item-description">

                        <h2><a href="#">Shakshuka
                        </a></h2>
                        <p style={{ textAlign: "justify" }}>A hearty North African dish of poached eggs
                          in a savory tomato, pepper, and onion sauce, spiced with cumin and paprika.
                          Perfect for breakfast or brunch.</p>
                        <i class="icon-chevron-right"> <NavLink to="/recipedetail" class="item-link">Read More</NavLink></i>

                      </div>
                    </div>
                  </div>

                  <div class="post-item">
                    <div class="post-item-wrap">
                      <div class="post-image">
                        <a href="#">
                          <img alt="" src="/homepages/restaurant/images/spanakopita.jpg" />
                        </a>
                      </div>
                      <div class="post-item-description">

                        <h2><a href="#">Spanakopita
                        </a></h2>
                        <p style={{ textAlign: "justify" }}>A savory Greek pastry made with flaky
                          layers of phyllo dough, filled with a delicious mixture of spinach,
                          feta cheese, and aromatic herbs like dill and parsley.
                          Perfect as a snack or appetizer.</p>
                        <a href="#" class="item-link">Read More <i class="icon-chevron-right"></i></a>
                      </div>
                    </div>
                  </div>

                  <div class="post-item">
                    <div class="post-item-wrap">
                      <div class="post-image">
                        <a href="#">
                          <img alt="" src="/homepages/restaurant/images/moussaka.jpg" />
                        </a>
                      </div>
                      <div class="post-item-description">

                        <h2><a href="#">Moussaka
                        </a></h2>
                        <p style={{ textAlign: "justify" }}>A classic Mediterranean comfort food,
                          this dish combines layers of roasted eggplant, seasoned ground lamb or beef,
                          and a creamy béchamel sauce, baked to golden perfection.</p>
                        <a href="#" class="item-link">Read More <i class="icon-chevron-right"></i></a>
                      </div>
                    </div>
                  </div>

                  <div class="post-item">
                    <div class="post-item-wrap">
                      <div class="post-image">
                        <a href="#">
                          <img alt="" src="/homepages/restaurant/images/tabbouleh.jpg" />
                        </a>
                      </div>
                      <div class="post-item-description">

                        <h2><a href="#">Tabbouleh
                        </a></h2>
                        <p style={{ textAlign: "justify" }}>A refreshing Levantine salad made with finely chopped
                          parsley, fresh mint, bulgur wheat, tomatoes, and cucumbers, tossed with a tangy lemon
                          and olive oil dressing. A light and healthy choice!</p>
                        <a href="#" class="item-link">Read More <i class="icon-chevron-right"></i></a>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div id="blog" className="post-thumbnails">
                  {recipes.map((recipe, index) => (
                    <div className="post-item" key={recipe._id}>
                      <div className="post-item-wrap">
                        <div className="post-image" >
                          <a href="#">
                            <img
                              alt={recipe.name}
                              src={recipe.image || "/homepages/restaurant/images/default-image.jpg"}
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
                            <NavLink to={`/recipeDetail/${recipe?._id}`}>{recipe.name} </NavLink>
                          </h2>
                          <p style={{ textAlign: "justify" }}>{recipe.ingredients}</p>
                          <NavLink
                            to={`/recipeDetail/${recipe?._id}`} // Dynamically link to restaurant detail page
                            className="item-link"
                          >
                            Read More <i className="icon-chevron-right"></i>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>


                {/* <ul class="pagination">
                  <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-left"></i></a></li>
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item active"><a class="page-link" href="#">3</a></li>
                  <li class="page-item"><a class="page-link" href="#">4</a></li>
                  <li class="page-item"><a class="page-link" href="#">5</a></li>
                  <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-right"></i></a></li>
                </ul> */}

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



              <div class="sidebar sticky-sidebar col-lg-3">



                <div class="widget-sidebar">

                  <h4 class="widget-title text-uppercase font-weight-bold">Filter Recipes</h4>


                  <div class="filter_type mt-4">
                    <h6 class="text">Diet Category</h6>
                    <ul class="list-unstyled">
                      <li class="d-flex align-items-center mb-2">
                        <span class="flex-grow-1">Vegan</span>
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" name="5-stars" id="5-stars" />
                        </div>
                      </li>
                      <li class="d-flex align-items-center mb-2">
                        <span class="flex-grow-1">Vegetarian</span>
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" name="4-stars" id="4-stars" />
                        </div>
                      </li>
                      <li class="d-flex align-items-center mb-2">
                        <span class="flex-grow-1">Flexterian</span>
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" name="3-stars" id="3-stars" />
                        </div>
                      </li>
                    </ul>
                  </div>


                  <div class="filter_type mt-4">
                    <h6 class="text">Review Score</h6>
                    <ul class="list-unstyled">
                      <li class="d-flex align-items-center mb-2">
                        <span class="flex-grow-1">Superb: 9+</span>
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" name="superb" id="superb" />
                        </div>
                      </li>
                      <li class="d-flex align-items-center mb-2">
                        <span class="flex-grow-1">Very Good: 8+</span>
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" name="very-good" id="very-good" />
                        </div>
                      </li>
                      <li class="d-flex align-items-center mb-2">
                        <span class="flex-grow-1">Good: 7+</span>
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" name="good" id="good" />
                        </div>
                      </li>
                    </ul>
                  </div>


                  <div class="filter_type mt-4">
                    <h6 class="text">Origin</h6>
                    <ul class="list-unstyled">
                      <li class="d-flex align-items-center mb-2">
                        <span class="flex-grow-1">North Africa</span>
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" name="pet-allowed" id="pet-allowed" />
                        </div>
                      </li>

                      <li class="d-flex align-items-center mb-2">
                        <span class="flex-grow-1">Middle East</span>
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" name="restaurant" id="restaurant" />
                        </div>
                      </li>
                      <li class="d-flex align-items-center mb-2">
                        <span class="flex-grow-1">South Europe</span>
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" name="wifi" id="wifi" />
                        </div>
                      </li>

                    </ul>
                  </div>
                </div>





                <div class="widget-sidebar ">
                  <h4 class="widget-title">Tags</h4>
                  <div class="tags">
                    <a href="#">Vegan</a>
                    <a href="#">Fruitarian</a>
                    <a href="#">Vegetarian</a>
                    <a href="#">Flexterian</a>
                    <a href="#">No Diet</a>
                    <a href="#">Religiously Observant</a>
                    <a href="#">Other</a>
                  </div>
                </div>

                <div class="widget ">
                  <div class="box_style_2">
                    <i class="fa fa-headset"></i>                                        <h4>Need <span>Help?</span></h4>
                    <a href="tel://21699445999" class="phone">+216 99 445 999</a>
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

export default RecipesList