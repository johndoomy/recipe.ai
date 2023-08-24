import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from './apis/userApi';
import { recipeApi } from './apis/recipeApi';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(recipeApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useUserLoginQuery,
  useRegisterUserMutation,
  useValidateUserQuery,
  useFetchUserRecipesQuery,
  useAddFavoriteRecipeMutation,
  useAddRecipeToHistoryMutation,
  useRemoveFavoriteRecipeMutation,
  useRemoveFromHistoryMutation,
} from './apis/userApi';
export {
  useGenerateRecipeMutation,
  useFetchFeaturedRecipesQuery,
  useRefreshFeaturedRecipeQuery,
} from './apis/recipeApi';
