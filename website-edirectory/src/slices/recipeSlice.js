import { apiSlice } from "./apiSlice";

const RECIPE_URL = "/api/recipe";

export const recipeSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({


        addRecipe: builder.mutation({
            query: ({ token, formData }) => ({
                url: `${RECIPE_URL}/addRecipe`,
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`, // Ensure token is sent
                }, // Form data (including the image file) sent in the request body
            }),
        }),

        getRecipeList: builder.query({
            query: () => ({
                url: `${RECIPE_URL}/getRecipeList`,
                method: 'GET',
            }),
        }),

        getRecipes: builder.query({
            query: () => ({
                url: `${RECIPE_URL}/getRecipes`,
                method: 'GET',
            }),
        }),

        modifyRecipe: builder.mutation({
            query: ({ token, id, formData }) => ({
                url: `${RECIPE_URL}/modifyRecipe/${id}`, 
                method: 'PUT', 
                body: formData, 
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

        deleteRecipe: builder.mutation({
            query: ({ token, id }) => ({
                url: `${RECIPE_URL}/deleteRecipe/${id}`, 
                method: 'DELETE', 
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }),
        }),


        getRecipeById: builder.query({

            query: (id) => ({
                url: `${RECIPE_URL}/getRecipe/${id}`,
                method: 'GET',
            }),
        }),

        getRecipessById: builder.query({

            query: (id) => ({
                url: `${RECIPE_URL}/recipes/${id}`,
                method: 'GET',
            }),
        }),

        getAllRecipePagi: builder.query({
            query: ({ page = 1, limit = 5 }) => ({
              url: `${RECIPE_URL}/getAllrecipePagi?page=${page}&limit=${limit}`,
              method: "GET",
            }),
          }),

    }),

});

export const {
    useAddRecipeMutation,
    useGetRecipeListQuery,
    useGetRecipesQuery,
    useModifyRecipeMutation,
    useDeleteRecipeMutation,
    useGetRecipeByIdQuery,
    useGetAllRecipePagiQuery,
    useGetRecipessByIdQuery,

} = recipeSlice;
