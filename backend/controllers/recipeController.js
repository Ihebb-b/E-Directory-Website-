const { get } = require("https");
const Recipe = require("../models/recipeModel");

// Route to Add a Recipe
const addRecipe = async (req, res) => {
    try {

        if (!req.user) {
            return res.status(401).send("User not authenticated");
          }

      const { name, ingredients, instructions } = req.body;
      if (!req.file) return res.status(400).send('Image is required');
  
      const userId = req.user._id;
      
      const recipe = new Recipe({
        name,
        image: `/uploads/${req.file.filename}`,
        ingredients: JSON.parse(ingredients), // Convert from JSON string
        instructions: JSON.parse(instructions),
        user: userId,
      });
  
      await recipe.save();
      res.status(201).json(recipe);
    } catch (error) {
        console.error("Error in addRecipe:", error.message);
        res.status(500).send({ error: error.message });    }
  };

  // Route to Get All Recipes
  const getRecipes = async (req, res) => {
    try {
      const recipes = await Recipe.find();
      res.send(recipes);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

  const getRecipeList = async (req, res) => {
    try {
        const recipe = await Recipe.find({ user: req.user._id }); 
        res.status(200).json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the menu list.', error: error.message });
    }
};

const modifyRecipe = async (req, res) => {
    try {
        const { id } = req.params; // Recipe ID from request parameters
        const { name, ingredients, instructions } = req.body; // Updated data from request body
        const newImageFile = req.file; // New image if uploaded

        // Validate required fields
        if (!name || !ingredients || !instructions) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        let parsedIngredients, parsedInstructions;
        try {
            parsedIngredients = typeof ingredients === 'string' ? JSON.parse(ingredients) : ingredients;
            parsedInstructions = typeof instructions === 'string' ? JSON.parse(instructions) : instructions;
        } catch (error) {
            return res.status(400).json({ message: 'Invalid ingredients or instructions format.' });
        }

        const existingRecipe = await Recipe.findById(id);
        if (!existingRecipe) {
            return res.status(404).json({ message: 'Recipe not found.' });
        }

        // Determine the image to use
        const imageToUse = newImageFile
            ? `/uploads/${newImageFile.filename}` // Use new uploaded image
            : existingRecipe.image; // Retain existing image if no new image is uploaded

        // Update the recipe
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            {
                name,
                image: imageToUse,
                ingredients: parsedIngredients,
                instructions: parsedInstructions,
            },
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!updatedRecipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        res.status(200).json({ message: 'Recipe updated successfully.', recipe: updatedRecipe });
    } catch (error) {
        console.error("Error in modifyRecipe:", error.message);
        res.status(500).json({ message: 'An error occurred while updating the recipe.', error: error.message });
    }
};

const deleteRecipe = async (req, res) => {
    const { id } = req.params; // Get the menu ID from the request parameters
  
    // Find the menu by ID and delete it
    const deleteRecipe = await Recipe.findByIdAndDelete(id);
  
    if (!deleteRecipe) {
        return res.status(404).json({ error: "Recipe not found" });
    }
  
    // Return a success message
    res.status(200).json({ message: "Menu recipe successfully" });
  } 

  const getRecipeById = async (req, res) => {
    const recipeId = req.params.id; // Get the menu ID from the request parameters
  
    // Find the menu by ID
    const recipe = await Recipe.findById(recipeId);
  
    if (!recipe) {
      return res.status(404).json({ error: "Menu not found" });
    }
  
    // Return the found menu
    res.status(200).json(recipe);
  };

  const getAllRecipePagi = async (req, res) => {
    try {
      const { page = 1, limit = 5 } = req.query; // Default to page 1 and 5 items per page
  
      // Calculate the start index
      const startIndex = (page - 1) * limit;
  
      // Fetch restaurants with pagination
      const recipes = await Recipe.find({})
        .select("name ingredients image")
        .skip(startIndex)
        .limit(parseInt(limit));
  
      // Count total restaurants for pagination metadata
      const totalRecipes= await Recipe.countDocuments({});
  
      res.status(200).json({
        recipes,
        totalPages: Math.ceil(totalRecipes / limit),
        currentPage: parseInt(page),
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getRecipesByUserId = async (req, res) => { 
    try {
        const { id: userId } = req.params; // Extract the user ID from the request parameters
        const recipes = await Recipe.find({ user: userId }); // Find recipes by user ID

        if (!recipes || recipes.length === 0) {
            // If no recipes are found, send a 404 response
            return res.status(404).send({ error: "No recipes found for this user" });
        }

        res.status(200).send(recipes); // Send the found recipes as a response
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message }); // Handle server errors
    }
};



  

module.exports = 
{   addRecipe,
    getRecipes,
    getRecipeList,
    modifyRecipe,
    deleteRecipe,
    getRecipeById,
    getAllRecipePagi,
    getRecipesByUserId
  };
