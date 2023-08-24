import { useState } from "react";
import { useAddFavoriteRecipeMutation } from "../store";
import { useRemoveFavoriteRecipeMutation } from "../store";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Grow from "@mui/material/Grow";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeCardTest({ recipe, multiple, ...rest }) {
  const [expanded, setExpanded] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleKebabClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [favoriteRecipe] = useAddFavoriteRecipeMutation();

  const [removeFavoritRecipe, results] = useRemoveFavoriteRecipeMutation();
  console.log(results);

  const handleRemoveClick = () => {
    handleMenuClose();
    removeFavoritRecipe(recipe._id);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteClick = () => {
    favoriteRecipe(recipe._id);
  };

  const tagsString = recipe.tags.join(" ");

  return (
    <>
      <Grow
        in={true}
        style={{ transformOrigin: "0 0 0" }}
        {...{ timeout: multiple * 400 || 400 }}
        {...rest}
      >
        <Card>
          <CardHeader
            action={
              <IconButton
                aria-label="settings"
                aria-controls={anchorEl ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={anchorEl ? "true" : undefined}
                onClick={handleKebabClick}
              >
                <MoreVertIcon />
              </IconButton>
            }
            title={recipe.recipeName}
            subheader={tagsString}
          />
          <CardContent>
            {recipe.ingredients.map((ingredient, index) => {
              return (
                <>
                  <Grid
                    container
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Grid item>
                      <Typography
                        key={index}
                        variant="body2"
                        color="text.secondary"
                      >
                        <Checkbox size="small" />
                        {ingredient.ingredientName}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        key={index}
                        variant="body2"
                        color="text.secondary"
                      >
                        {ingredient.ingredientAmount}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              onClick={handleFavoriteClick}
              aria-label="add to favorites"
            >
              <FavoriteIcon />
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
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={anchorEl}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={handleRemoveClick}>Remove</MenuItem>
      </Menu>
    </>
  );
}
