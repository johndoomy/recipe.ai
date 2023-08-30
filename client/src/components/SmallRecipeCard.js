import {
  useAddFavoriteRecipeMutation,
  useRemoveFavoriteRecipeMutation,
} from '../store';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Grid from '@mui/material/Grid';
// import Rating from '@mui/material/Rating';

export default function SmallRecipeCard({
  recipe,
  multiple,
  removeHandler,
  favorited,
  featured,
  ...rest
}) {
  // const [value, setValue] = useState(recipe.rating);

  const [addFavoriteRecipe] = useAddFavoriteRecipeMutation();

  const [removeFavoriteRecipe] = useRemoveFavoriteRecipeMutation();

  const handleFavoriteClick = () => {
    if (favorited) {
      removeFavoriteRecipe(recipe._id);
    } else {
      addFavoriteRecipe(recipe._id);
    }
  };

  const handleRemoveClick = () => {
    if (featured) {
    }

    removeHandler(recipe._id);
  };

  return (
    <Grow
      in={true}
      onEnter={() => setTimeout(undefined, 8000)}
      style={{ transformOrigin: '0 0 0' }}
      {...{ timeout: multiple * 150 }}
    >
      <Box
        sx={{
          boxShadow: 3,
          paddingX: '12px',
          py: '6px',
          borderRadius: 1.5,
          bgcolor: 'white',
        }}
      >
        <Grid container justifyContent={'space-between'} alignItems={'center'}>
          <Grid>
            <Typography variant="subtitle1" component="div">
              {recipe.recipeName}
            </Typography>
          </Grid>
          <Grid>
            <IconButton onClick={handleRemoveClick}>
              {featured ? null : <ClearIcon />}
            </IconButton>
          </Grid>
        </Grid>

        <Typography sx={{ ml: '10px' }} color="text.secondary">
          Tags:
          {recipe.tags.length === 0
            ? ' N/A'
            : recipe.tags.map((tag, index) => (
                <span key={index}>{` ${tag} | `}</span>
              ))}
          {/* <Rating
            name="simple-controlled"
            defaultValue={value | 0}
            precision={0.5}
          /> */}
        </Typography>
        <Typography variant="body2" sx={{ ml: '10px' }}>
          Ingredients: {recipe.ingredients?.length}
        </Typography>
        <Grid container justifyContent={'space-between'}>
          <Grid>
            <IconButton
              onClick={handleFavoriteClick}
              aria-label="add to favorites"
            >
              {favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Grid>
          <Grid>
            <Button {...rest}>Select</Button>
          </Grid>
        </Grid>
      </Box>
    </Grow>
  );
}
