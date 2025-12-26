import { Grid, MovieItem } from "@/components";
import movies from "@/dummy.json";

interface PageProps {
  searchParams: Promise<{ q: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { q } = await searchParams;
  console.log("searchParams >>>", q);

  return (
    <Grid>
      {movies.map((item) => (
        <MovieItem key={item.id} {...item} />
      ))}
    </Grid>
  );
}
