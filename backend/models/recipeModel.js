const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true },

    image: { 
        type: String, 
        required: true },

    ingredients: [{ 
        type: String, 
        required: true }],

    instructions: [{ 
        type: String, 
        required: true }],
        
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User ', // Reference to the User model
        required: true,
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
