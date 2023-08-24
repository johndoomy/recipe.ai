import Grid from '@mui/material/Grid';
import SmallRecipeCard from '../components/SmallRecipeCard';
import { useFetchFeaturedRecipesQuery } from '../store';
import SmallSkeletonCard from '../components/SmallSkeletonCard';
import { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
// import Box from "@mui/material/Box";

export default function FeaturedRecipesPage() {
  // const { data, error, isLoading } = useFetchUserRecipesQuery(recipes);

  const { data, error, isLoading } = useFetchFeaturedRecipesQuery();

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSelectionClick = (index) => {
    console.log('click', index);
    setSelectedRecipe(index);
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
    content = data.featuredRecipes.map((recipe, index) => {
      return (
        <Grid key={index} item xs={12} sm={6} md={6}>
          <SmallRecipeCard
            onClick={() => {
              handleSelectionClick(index);
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }}
            key={index}
            recipe={recipe}
            multiple={index}
            featured
          />
        </Grid>
      );
    });
  }

  let currentRecipe;
  if (isLoading) {
    return;
  } else if (error) {
    console.log(error);
  } else {
    data?.featuredRecipes.forEach((recipe, index) => {
      if (index === selectedRecipe) {
        currentRecipe = (
          <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
            <RecipeCard featured recipe={recipe} />
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
      <Grid container spacing={2} mt={'6px'}>
        {content}
      </Grid>
    </>
  );
}
