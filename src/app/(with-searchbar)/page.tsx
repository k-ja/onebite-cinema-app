import { Grid, MovieItem } from "@/components";
import styles from "./page.module.css";
import movies from "@/dummy.json";

export default function Home() {
  return (
    <div className={styles.conatiner}>
      <section>
        <h2>지금 가장 추천하는 영화</h2>
        <Grid>
          {movies.slice(0, 3).map((movie) => (
            <MovieItem key={`reco-${movie.id}`} {...movie} />
          ))}
        </Grid>
      </section>
      <section>
        <h2>등록된 모든 영화</h2>
        <Grid columns={5}>
          {movies.map((movie) => (
            <MovieItem key={`all-${movie.id}`} {...movie} />
          ))}
        </Grid>
      </section>
    </div>
  );
}
