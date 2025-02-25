import React, { useEffect } from 'react'
import Header2 from '../Components/Header2'
import Footer2 from '../Components/Footer2'
import { useGetRecipeByIdQuery } from '../slices/recipeSlice';
import { useParams } from 'react-router-dom';

function RecipeDetail() {

    const { id } = useParams();
    // const { data: recipe, isLoading, error, refetch } = useGetRecipeByIdQuery(id);


    const { data: recipe, isLoading, error, refetch } = useGetRecipeByIdQuery(id, {
        skip: !id,
        refetchOnMountOrArgChange: true,  // Add this line
    });

    useEffect(() => {
        if (id) {
            refetch(); // Explicitly re-fetch data when the component mounts or the ID changes
        }
    }, [id, refetch]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading recipe details.</div>;

    //  if (error) return <div>Error loading recipe details.</div>;

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


                        <p>{recipe?.description || 'No description available.'}</p>


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



            <a id="scrollTop"><i className="icon-chevron-up"></i><i className="icon-chevron-up"></i></a>





        </>




    )
}

export default RecipeDetail