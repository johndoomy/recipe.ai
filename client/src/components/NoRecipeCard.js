import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import image from '../images/robot-chef.jpg';

export default function NoRecipeCard() {
  return (
    <Card>
      <CardMedia
        sx={{ height: 280 }}
        image={image}
        title="Chef 5 by heavybear919"
      />
      <CardContent>
        <Typography
          textAlign={'center'}
          gutterBottom
          variant="h5"
          component="div"
        >
          No recipes generated yet
        </Typography>
        <Typography textAlign={'center'} variant="body2" color="text.secondary">
          Generate a recipe or check out the Featured Recipes page for
          inspiration from other creators!
        </Typography>
      </CardContent>
    </Card>
  );
}
