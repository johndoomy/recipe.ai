import { useState, useEffect } from 'react';
import {
  useAddRecipeToHistoryMutation,
  useFetchUserRecipesQuery,
  useGenerateRecipeMutation,
  useRemoveFromHistoryMutation,
} from '../store';
import RecipeCard from '../components/RecipeCard';
import SmallRecipeCard from '../components/SmallRecipeCard';
// import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
// import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import SkeletonCard from '../components/SkeletonCard';
import SmallSkeletonCard from '../components/SmallSkeletonCard';
import NoRecipeCard from '../components/NoRecipeCard';

export default function CreateRecipePage({ history, userId, savedRecipes }) {
  const [input, setInput] = useState('');
  const [restrictions, setRestrictions] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const clearSelectedRecipe = () => {
    setSelectedRecipe(null);
  };

  const { data, error, isLoading } = useFetchUserRecipesQuery(history);

  const [addRecipeToHistory] = useAddRecipeToHistoryMutation();

  const [removeFromHistory] = useRemoveFromHistoryMutation();
  const [generateRecipe, results] = useGenerateRecipeMutation();

  const addRestriction = (string) => {
    if (restrictions.includes(string)) {
      let newArray = restrictions.filter((item) => item !== string);
      setRestrictions(newArray);
    } else {
      setRestrictions([...restrictions, string]);
    }
  };

  useEffect(() => {
    if (results.isSuccess) {
      const data = results.data;
      setSelectedRecipe(data.recipe);
      addRecipeToHistory(data.recipe._id);
    }
  }, [results, addRecipeToHistory]);

  const handleClick = async (event) => {
    event.preventDefault();
    if (input === '') {
      return;
    }
    console.log(input);
    generateRecipe({ input: input, tags: restrictions, userId: userId });
    setSelectedRecipe(null);
  };

  const handleSelect = (recipe) => {
    setSelectedRecipe(recipe);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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
    const reversedArray = [...data.recipes].reverse();
    const slicedArray = reversedArray.slice(0, 10);
    if (slicedArray.length === 0) {
      content = (
        <Grid item xs={12} sm={6} md={3}>
          <NoRecipeCard />
        </Grid>
      );
    } else {
      content = slicedArray.map((recipe, index) => {
        return (
          <Grid key={index} item xs={12} sm={12} md={6}>
            <SmallRecipeCard
              removeHandler={removeFromHistory}
              key={index}
              recipe={recipe}
              favorited={savedRecipes?.includes(recipe._id)}
              multiple={index}
              onClick={() => handleSelect(recipe)}
            />
          </Grid>
        );
      });
    }
  }

  return (
    <Box sx={{ mt: 10 }}>
      <Box
        sx={{
          // backgroundColor: "primary.main",
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <form>
          <Grid
            container
            alignContent={'center'}
            justifyContent={'space-between'}
          >
            <Grid>
              <TextField
                size="small"
                value={input}
                id="outlined-basic"
                label="Recipe"
                variant="standard"
                sx={{ width: '200px' }}
                // sx={{ backgroundColor: "white" }}
                onInput={(e) => setInput(e.target.value)}
              />
            </Grid>
            <Grid sx={{ my: 1.5, ml: 2 }}>
              <LoadingButton
                variant="contained"
                size="small"
                type="submit"
                onClick={handleClick}
                loading={results.isLoading}
                disabled={results.isLoading}
              >
                <span>{results.isLoading ? 'Loading' : 'Generate'}</span>
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Grid container justifyContent="center">
        <Grid>
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="vegetarian"
            onClick={() => addRestriction('vegetarian')}
          />
        </Grid>
        <Grid>
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="vegan"
            onClick={() => addRestriction('vegan')}
          />
        </Grid>
        <Grid>
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="dairy-free"
            onClick={() => addRestriction('dairy-free')}
          />
        </Grid>
        <Grid>
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="gluten-free"
            onClick={() => addRestriction('gluten-free')}
          />
        </Grid>
        <Grid>
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="spicy"
            onClick={() => addRestriction('spicy')}
          />
        </Grid>
      </Grid>
      <Grid my={'6px'} justifyContent="center" container spacing={2}>
        {selectedRecipe && (
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <RecipeCard
              clearRecipe={clearSelectedRecipe}
              history
              favorited={savedRecipes?.includes(selectedRecipe._id)}
              recipe={selectedRecipe}
            />
          </Grid>
        )}
        {results.isLoading && (
          <Grid item xs={12} sm={4} md={4}>
            <SkeletonCard />
          </Grid>
        )}
      </Grid>
      <Grid my={'6px'} justifyContent={'center'} container spacing={2}>
        {content}
      </Grid>
    </Box>
  );
}
