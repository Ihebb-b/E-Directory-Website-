import { apiSlice } from "./apiSlice";

const RESTAURANTS_URL = "/api/restaurant";

export const restaurantApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addMenu: builder.mutation({
            query: ({ token, formData }) => ({
                url: `${RESTAURANTS_URL}/addMenu`, // The backend endpoint for adding a menu
                method: 'POST',
                body: formData, // The menu data sent in the request body
                headers: {
                    Authorization: `Bearer ${token}`, // Ensure token is sent
                },
            }),
        }),

        getMenuList: builder.query({
            query: () => ({
                url: `${RESTAURANTS_URL}/menus`,
                method: 'GET',
                
            }),
        }),

        // getMenuList: builder.query({
        //     query: () => ({
        //         url: `${RESTAURANTS_URL}/getAllmenus`,
        //         method: 'GET',
        //     }),
        // }),

        getAllMenuPagi: builder.query({
            query: ({ page = 1, limit = 5 }) => ({
              url: `${RESTAURANTS_URL}/getAllmenusPagi?page=${page}&limit=${limit}`,
              method: "GET",
            }),
          }),

        
        getMenuById: builder.query({
        
            query: (id) => ({
                url: `${RESTAURANTS_URL}/getMenu/${id}`,
                method: 'GET',
            }),
        }),

        getMenuByUserId: builder.query({
            query: (userId) => ({
                url: `${RESTAURANTS_URL}/getMenuByUserId/${userId}`,
                method: 'GET',
            }),
        }),

        modifyMenu: builder.mutation({
            query: ({ token, id, formData }) => ({
                url: `${RESTAURANTS_URL}/modifyMenu/${id}`, // The backend endpoint for modifying a menu
                method: 'PUT', // Use PUT to update an existing menu
                body: formData, // The updated menu data to be sent in the request body
                headers: {
                    Authorization: `Bearer ${token}`, // Ensure token is sent
                },
            }),
        }),

        deleteMenu: builder.mutation({
            query: ({ token, id }) => ({
                url: `${RESTAURANTS_URL}/deleteMenu/${id}`, // The backend endpoint for deleting a menu
                method: 'DELETE', // Use DELETE to remove the menu
                headers: {
                    Authorization: `Bearer ${token}`, // Ensure token is sent
                },
            }),
        }),

        getAllMenuList: builder.query({
            query: () => ({
                url: `${RESTAURANTS_URL}/getAllMenus`,
                method: 'GET',
                
            }),
        }),



 

}),

});

export const { 
    useAddMenuMutation,
    useGetMenuListQuery,
    useGetAllMenuPagiQuery,
    useGetMenuByIdQuery,
    useGetMenuByUserIdQuery,
    useModifyMenuMutation,
    useDeleteMenuMutation,
    useGetAllMenuListQuery,

    
 } = restaurantApiSlice;
