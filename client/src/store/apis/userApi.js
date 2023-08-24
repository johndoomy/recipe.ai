import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/user',
  }),
  endpoints(builder) {
    return {
      userLogin: builder.query({
        query: (user) => {
          return {
            url: '/login',
            method: 'POST',
            body: JSON.stringify({
              email: user.email,
              password: user.password,
            }),
          };
        },
      }),
      registerUser: builder.mutation({
        query: (userObject) => {
          return {
            url: '/register',
            method: 'POST',
            body: {
              name: userObject.name,
              email: userObject.email,
              password: userObject.password,
            },
          };
        },
      }),
      validateUser: builder.query({
        providesTags: ['User'],
        query: () => {
          return {
            url: '/validate_user',
            method: 'GET',
            headers: {
              'x-access-token': localStorage.getItem('token'),
            },
          };
        },
      }),
      fetchUserRecipes: builder.query({
        query: (recipes) => {
          return {
            url: '/user_recipes',
            method: 'POST',
            body: {
              recipes: recipes,
            },
          };
        },
      }),
      addFavoriteRecipe: builder.mutation({
        invalidatesTags: ['User'],
        query: (recipeId) => {
          return {
            url: '/favorite_recipe',
            method: 'POST',
            body: {
              recipeId: recipeId,
              token: localStorage.getItem('token'),
            },
          };
        },
      }),
      addRecipeToHistory: builder.mutation({
        invalidatesTags: ['User'],
        query: (recipeId) => {
          return {
            url: '/add_history',
            method: 'POST',
            body: {
              recipeId: recipeId,
              token: localStorage.getItem('token'),
            },
          };
        },
      }),
      removeFavoriteRecipe: builder.mutation({
        invalidatesTags: ['User'],
        query: (recipeId) => {
          return {
            url: `/remove_favorite/${recipeId}`,
            method: 'DELETE',
            headers: { 'x-access-token': localStorage.getItem('token') },
          };
        },
      }),
      removeFromHistory: builder.mutation({
        invalidatesTags: ['User'],
        query: (recipeId) => {
          return {
            url: `/remove_history/${recipeId}`,
            method: 'DELETE',
            headers: { 'x-access-token': localStorage.getItem('token') },
          };
        },
      }),
    };
  },
});

export const {
  useUserLoginQuery,
  useRegisterUserMutation,
  useValidateUserQuery,
  useFetchUserRecipesQuery,
  useAddFavoriteRecipeMutation,
  useAddRecipeToHistoryMutation,
  useRemoveFavoriteRecipeMutation,
  useRemoveFromHistoryMutation,
} = userApi;
export { userApi };
