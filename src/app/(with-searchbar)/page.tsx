import { Grid, MovieItem } from "@/components";
import styles from "./page.module.css";
import { MovieData } from "@/types";
import { Suspense } from "react";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import delay from "../util/delay";

async function AllMovies() {
  await delay(2000);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { next: { revalidate: 60 * 60 * 24 } }
  );

  if (!response.ok) return <div>오류 발생</div>;

  const movies: MovieData[] = await response.json();

  return (
    <Grid columns={5}>
      {movies.map((movie) => (
        <MovieItem key={`all-${movie.id}`} {...movie} />
      ))}
    </Grid>
  );
}

async function RecoMovies() {
  await delay(1500);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    { next: { revalidate: 60 * 60 } }
  );

  if (!response.ok) return <div>오류 발생</div>;

  const movies: MovieData[] = await response.json();

  return (
    <Grid>
      {movies.map((movie) => (
        <MovieItem key={`reco-${movie.id}`} {...movie} />
      ))}
    </Grid>
  );
}

export default function Home() {
  return (
    <div className={styles.conatiner}>
      <section>
        <h2>지금 가장 추천하는 영화</h2>
        <Suspense fallback={<MovieListSkeleton count={3} />}>
          <RecoMovies />
        </Suspense>
      </section>
      <section>
        <h2>등록된 모든 영화</h2>
        <Suspense fallback={<MovieListSkeleton count={10} />}>
          <AllMovies />
        </Suspense>
      </section>
    </div>
  );
}
