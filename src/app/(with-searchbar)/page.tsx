import { Grid, MovieItem } from "@/components";
import styles from "./page.module.css";
import { MovieData } from "@/types";

async function AllMovies() {
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
        <RecoMovies />
      </section>
      <section>
        <h2>등록된 모든 영화</h2>
        <AllMovies />
      </section>
    </div>
  );
}
