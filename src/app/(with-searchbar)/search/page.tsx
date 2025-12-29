import { Grid, MovieItem } from "@/components";
import { MovieData } from "@/types";

interface PageProps {
  searchParams: Promise<{ q: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { q } = await searchParams;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
    { next: { revalidate: 60 * 60 * 24 } }
  );

  if (!response.ok) return <div>오류 발생</div>;

  const movies: MovieData[] = await response.json();

  return (
    <Grid>
      {movies.map((item) => (
        <MovieItem key={item.id} {...item} />
      ))}
    </Grid>
  );
}
