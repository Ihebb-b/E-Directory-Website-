import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/user";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
        transformResponse: (response) => {
            localStorage.setItem('authToken', response.token); // Store token in localStorage
            return response;
          },

        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),

        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, 
                  },
            }),
        }),

        // getUserProfile: builder.query({
        //     query: () => ({
        //         url: `${USERS_URL}/profile`, // Endpoint to fetch user profile
        //         method: "GET",
        //         headers: {
        //             Authorization: `Bearer ${localStorage.getItem("token")}`, 
        //           },
        //     }),
        // }),

        assignRole: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/assignRole`,
              method: "POST",
              body: data,
            }),
            invalidatesTags: ["User"], // Invalidate cache if needed
          }),


        getAllRestaurants: builder.query({
            query: () => ({
                url: `${USERS_URL}/getAllRestaurants`,
                method: 'GET',
            }),
          }),

        getAllRestaurantsPagi: builder.query({
            query: ({ page = 1, limit = 5 }) => ({
              url: `${USERS_URL}/getAllRestaurantsPagi?page=${page}&limit=${limit}`,
              method: "GET",
            }),
          }),

          getrestaurantById: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/restaurant/${id}`,
                method: 'GET',
            }),
        }),

        searchRestaurants: builder.query({
            query: ({ localisation, diet, minBill, maxBill }) =>
              `search?localisation=${localisation}&diet=${diet}&minBill=${minBill}&maxBill=${maxBill}`,
          }),

        filterRestaurants: builder.query({
            query: (filters) => {
              const queryParams = new URLSearchParams(filters).toString();
              return `${USERS_URL}/filtered?${queryParams}`;
            },
          }),

          getCountries: builder.query({
            query: () => ({
                url: `${USERS_URL}/countries`,
                method: 'GET',
            }),
          }),

          getDiet: builder.query({
            query: () => ({
                url: `${USERS_URL}/diets`,
                method: 'GET',
            }),
          }),

    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useUpdateUserMutation,
    useGetAllRestaurantsQuery,
    useGetAllRestaurantsPagiQuery,
    useGetrestaurantByIdQuery,
    useSearchRestaurantsQuery,
    useFilterRestaurantsQuery,
    useGetCountriesQuery,
    useGetDietQuery,
 } = userApiSlice;