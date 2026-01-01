import NotFound from "@/app/not-found";
import delay from "@/app/util/delay";
import { Grid, MovieItem } from "@/components";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import { MovieData } from "@/types";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ q: string }>;
}

async function SearchResult({ q }: { q: string }) {
  await delay(1500);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    if (response.status === 404) return NotFound();
    return <div>오류 발생</div>;
  }

  const movies: MovieData[] = await response.json();

  return (
    <Grid>
      {movies.map((item) => (
        <MovieItem key={item.id} {...item} />
      ))}
    </Grid>
  );
}

export default async function Page({ searchParams }: PageProps) {
  const { q } = await searchParams;

  return (
    <Suspense key={q || ""} fallback={<MovieListSkeleton count={3} />}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
