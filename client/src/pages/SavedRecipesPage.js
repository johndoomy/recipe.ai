import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
import { useFetchUserRecipesQuery } from '../store';
import { useRemoveFavoriteRecipeMutation } from '../store';
import RecipeCard from '../components/RecipeCard';
import Grid from '@mui/material/Grid';
import SmallSkeletonCard from '../components/SmallSkeletonCard';
import SmallRecipeCard from '../components/SmallRecipeCard';
import NoRecipeCard from '../components/NoRecipeCard';
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";

export default function SavedRecipesPage({ recipes }) {
  const { data, error, isLoading } = useFetchUserRecipesQuery(recipes);

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [removeFavoritRecipe] = useRemoveFavoriteRecipeMutation();

  const handleSelectionClick = (index) => {
    setSelectedRecipe(index);
  };

  const clearSelectedRecipe = () => {
    setSelectedRecipe(null);
  };

  let content;
  if (isLoading) {
    content = [0, 0, 0, 0].map((item, index) => {
      return (
        <Grid key={index} item xs={12} sm={6} md={6}>
          <SmallSkeletonCard />
        </Grid>
      );
    });
  } else if (error) {
    content = <div style={{ marginTop: '60px' }}>An error has occured</div>;
  } else {
    const reversedRecipes = [...data.recipes].reverse();
    if (reversedRecipes.length === 0) {
      content = (
        <Grid item xs={12} sm={6} md={3}>
          <NoRecipeCard />
        </Grid>
      );
    } else {
      content = reversedRecipes.map((recipe, index) => {
        return (
          <Grid key={index} item xs={12} sm={6} md={6}>
            <SmallRecipeCard
              favorited
              removeHandler={removeFavoritRecipe}
              key={index}
              onClick={() => {
                handleSelectionClick(index);
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              }}
              recipe={recipe}
              multiple={index}
            />
          </Grid>
        );
      });
    }
  }

  let currentRecipe;

  if (isLoading) {
    return;
  } else if (error) {
    console.log(error);
  } else {
    const reversedRecipes = [...data.recipes].reverse();
    reversedRecipes.forEach((recipe, index) => {
      if (index === selectedRecipe) {
        currentRecipe = (
          <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
            <RecipeCard clearRecipe={clearSelectedRecipe} recipe={recipe} />
          </Grid>
        );
      }
    });
  }

  return (
    <>
      <Grid
        justifyContent="center"
        container
        spacing={2}
        sx={{ marginTop: '60px' }}
      >
        {currentRecipe}
      </Grid>
      <Grid container justifyContent={'center'} spacing={2} mt={'6px'}>
        {content}
      </Grid>
    </>
  );
}
