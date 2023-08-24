import SmallSkeletonCard from "../components/SmallSkeletonCard";
import Grid from "@mui/material/Grid";

export default function AboutPage() {
  let content = [0, 0, 0, 0].map((item) => {
    return (
      <Grid item xs={12} sm={6} md={6}>
        <SmallSkeletonCard />
      </Grid>
    );
  });

  return (
    <>
      <Grid container justifyContent="center" spacing={2} mt="80px">
        {content}
      </Grid>
    </>
  );
}
