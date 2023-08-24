import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

export default function SkeletonCard() {
  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <Skeleton variant="circular" width={35} height={35} />
          </IconButton>
        }
        title={<Skeleton width={200} height={60} />}
        subheader={<Skeleton width={60} />}
      />
      <CardContent>
        {[0, 0, 0, 0, 0, 0].map((item, index) => {
          return (
            <Typography key={index} variant="body2" color="text.secondary">
              <Skeleton />
            </Typography>
          );
        })}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Skeleton variant="circular" width={35} height={35} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
