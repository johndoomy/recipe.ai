import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

export default function IngredientItem({ ingredient, index }) {
  const [selected, setSlected] = useState(false);

  const handleSelect = () => {
    setSlected(!selected);
  };

  return (
    <ListItem
      disablePadding
      // sx={{
      //   backgroundColor: selected && "#c2eafc",
      // }}
    >
      <Grid
        container
        px={'6px'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Grid item>
          <Typography key={index} variant="body2" color="text.secondary">
            <Checkbox onClick={handleSelect} size="small" />
            {ingredient.ingredientName}
          </Typography>
        </Grid>
        <Grid item>
          <Typography key={index} variant="body2" color="text.secondary">
            {ingredient.ingredientAmount}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
}
