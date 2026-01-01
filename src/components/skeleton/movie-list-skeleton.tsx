import Grid from "../grid";

export default function MovieListSkeleton({ count }: { count: number }) {
  return (
    <Grid columns={count !== 3 ? 5 : 3}>
      {new Array(count).fill(0).map((_, idx) => (
        <div
          key={`movie-item-skeleton-${idx}`}
          style={{
            height: `${count !== 3 ? 217 : 373}px`,
            backgroundColor: "rgb(230, 230, 230)",
          }}
        />
      ))}
    </Grid>
  );
}
