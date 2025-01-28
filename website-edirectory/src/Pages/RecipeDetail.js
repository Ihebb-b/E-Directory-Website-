import React from 'react'
import Header2 from '../Components/Header2'
import Footer2 from '../Components/Footer2'
import { useGetRecipeByIdQuery } from '../slices/recipeSlice';
import { useParams } from 'react-router-dom';

function RecipeDetail() {

    const { id } = useParams();
    const { data: recipe, isLoading, error } = useGetRecipeByIdQuery(id);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading recipe details.</div>;

    return (
        <>
            <div className="body-inner">
                <Header2 />

                <section class="profile-content">
                    <div class="profile-image"
                        style={{
                            backgroundImage: `url(${recipe?.image || '/homepages/restaurant/images/shakshouka.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                         
                        }}
                    >

                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)', // Adjust opacity (0.4 = 40% darkness)
                            }}
                        ></div>


                        <div class="profile-name">
                            <h3>{recipe?.name || 'Recipe Name'}</h3>
                        </div>
                    </div>
                    <div class="profile-bio">
                        <h3>{recipe?.name || 'Recipe Details'}</h3>
                        <br />


                        <p>  Shakshuka is a flavorful and wholesome dish originating from North Africa and
                            popular across the Mediterranean. This recipe serves 4 and is perfect for
                            breakfast, brunch, or even a light dinner.</p>

                        {/* <div class="ingredients-list m-t-60">
                            <h3 class="text-uppercase text-center">Ingredients</h3>
                            <ul class="ingredients">
                                <li>
                                    <span class="ingredient-name">Olive Oil</span>
                                    <span class="ingredient-quantity">2 tbsp</span>
                                </li>
                                <li>
                                    <span class="ingredient-name">Onion</span>
                                    <span class="ingredient-quantity">1 medium</span>
                                </li>
                                <li>
                                    <span class="ingredient-name">Red Bell Pepper</span>
                                    <span class="ingredient-quantity">1 large</span>
                                </li>
                                <li>
                                    <span class="ingredient-name">Garlic Cloves</span>
                                    <span class="ingredient-quantity">3 cloves</span>
                                </li>
                                <li>
                                    <span class="ingredient-name">Tomatoes</span>
                                    <span class="ingredient-quantity">6 ripe</span>
                                </li>
                                <li>
                                    <span class="ingredient-name">Tomato Paste</span>
                                    <span class="ingredient-quantity">2 tbsp</span>
                                </li>
                                <li>
                                    <span class="ingredient-name">Ground Cumin</span>
                                    <span class="ingredient-quantity">1 tsp</span>
                                </li>
                                <li>
                                    <span class="ingredient-name">Red Pepper Flakes</span>
                                    <span class="ingredient-quantity">1/4 tsp</span>
                                </li>
                                <li>
                                    <span class="ingredient-name">Salt and Black Pepper</span>
                                    <span class="ingredient-quantity">To taste</span>
                                </li>
                                <li>
                                    <span class="ingredient-name">Eggs</span>
                                    <span class="ingredient-quantity">6 large</span>
                                </li>
                                <li>
                                    <span class="ingredient-name">Fresh Parsley</span>
                                    <span class="ingredient-quantity">For garnish</span>
                                </li>
                                <li>
                                    <span class="ingredient-name">Crumbled Feta Cheese</span>
                                    <span class="ingredient-quantity">Optional</span>
                                </li>
                                <li>
                                    <span class="ingredient-name">Bread or Pita</span>
                                    <span class="ingredient-quantity">To serve</span>
                                </li>
                            </ul>
                        </div> */}


                        <div className="ingredients-list m-t-60">
                            <h3 className="text-uppercase text-center">Ingredients</h3>
                            <ul className="ingredients">
                                {recipe?.ingredients?.length > 0 ? (
                                    recipe.ingredients.map((ingredient, index) => (
                                        <li key={index}>
                                            {ingredient}
                                            {/* <span className="ingredient-quantity">{ingredient.quantity}</span> */}
                                        </li>
                                    ))
                                ) : (
                                    <li>No ingredients available.</li>
                                )}
                            </ul>
                        </div>


                        {/* <div class="instructions-container m-t-60">
                            <h3 class="text-uppercase">Instructions</h3>
                            <ol class="instruction-list">
                                <li>
                                    Heat 2 tablespoons of olive oil in a large skillet over medium heat.
                                </li>
                                <li>
                                    Sauté the chopped onion and diced red bell pepper until softened, about 5 minutes.
                                </li>
                                <li>
                                    Add the minced garlic and cook until fragrant, about 1 minute.
                                </li>
                                <li>
                                    Stir in the chopped tomatoes, tomato paste, ground cumin, red pepper flakes, and season with salt and black pepper to taste.
                                </li>
                                <li>
                                    Simmer the mixture, stirring occasionally, until it thickens slightly, about 10 minutes.
                                </li>
                                <li>
                                    Make small wells in the sauce and crack the eggs into each well. Cover the skillet and cook until the egg whites are set but the yolks remain runny, about 7–10 minutes.
                                </li>
                                <li>
                                    Garnish with fresh parsley and optional crumbled feta cheese.
                                </li>
                                <li>
                                    Serve hot with crusty bread or pita for dipping.
                                </li>
                            </ol>
                        </div> */}

                        <div className="instructions-container m-t-60">
                            <h3 className="text-uppercase">Instructions</h3>
                            <ol className="instruction-list">
                                {recipe?.instructions?.length > 0 ? (
                                    recipe.instructions.map((instruction, index) => (
                                        <li key={index}>{instruction}</li>
                                    ))
                                ) : (
                                    <li>No instructions provided.</li>
                                )}
                            </ol>
                        </div>




                        <div class="profile-bio-footer">
                            <div class="text-center"> &copy; © 2024 E-Directory - All Rights Reserved.</div>
                        </div>
                    </div>
                </section>






            </div>



            <a id="scrollTop"><i classNameName="icon-chevron-up"></i><i classNameName="icon-chevron-up"></i></a>





        </>




    )
}

export default RecipeDetail