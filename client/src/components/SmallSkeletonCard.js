import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

export default function SmallSkeletonCard() {
  return (
    <Grow in={true} style={{ transformOrigin: "0 0 0" }} {...{ timeout: 0 }}>
      <Box sx={{ boxShadow: 3, px: "12px", py: "6px", borderRadius: 1.5 }}>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid>
            <Skeleton variant="text" width={"120px"} height={"30px"} />
          </Grid>
          <Grid>
            <Skeleton variant="circular" width={40} height={40} />
          </Grid>
        </Grid>

        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid>
            <Skeleton variant="circular" width={40} height={40} />
          </Grid>
          <Grid>
            <Skeleton variant="text" width={"40px"} />
          </Grid>
        </Grid>
      </Box>
    </Grow>
  );
}
