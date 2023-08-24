import { useState } from 'react';
import { useAddFavoriteRecipeMutation } from '../store';
import {
  useRemoveFavoriteRecipeMutation,
  useRemoveFromHistoryMutation,
} from '../store';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grow from '@mui/material/Grow';
import List from '@mui/material/List';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ClearIcon from '@mui/icons-material/Clear';
import IngredientItem from './IngretientItem';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeCard({
  recipe,
  multiple,
  featured,
  favorited,
  history,
  clearRecipe,
  ...rest
}) {
  const [expanded, setExpanded] = useState(false);

  const [favoriteRecipe] = useAddFavoriteRecipeMutation();

  const [removeFromHistory] = useRemoveFromHistoryMutation();

  const [removeFavoritRecipe, results] = useRemoveFavoriteRecipeMutation();
  console.log(results);

  const handleRemoveClick = () => {
    // handleMenuClose();
    clearRecipe();
    if (history) {
      removeFromHistory(recipe._id);
    } else {
      removeFavoritRecipe(recipe._id);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteClick = () => {
    favoriteRecipe(recipe._id);
  };

  const tagsString = recipe.tags.join(' ');

  return (
    <>
      <Grow
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...{ timeout: multiple * 400 || 400 }}
        {...rest}
      >
        <Card>
          <CardHeader
            action={
              <IconButton onClick={handleRemoveClick}>
                {featured ? null : <ClearIcon />}
              </IconButton>
            }
            title={recipe.recipeName}
            subheader={tagsString}
          />
          <CardContent>
            <List>
              {recipe.ingredients.map((ingredient, index) => {
                return <IngredientItem index={index} ingredient={ingredient} />;
              })}
            </List>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              onClick={handleFavoriteClick}
              aria-label="add to favorites"
            >
              {favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Instructions:</Typography>
              {recipe.instructions.map((instruction, index) => {
                return (
                  <Typography key={index} paragraph>
                    {instruction}
                  </Typography>
                );
              })}
            </CardContent>
          </Collapse>
        </Card>
      </Grow>
    </>
  );
}
