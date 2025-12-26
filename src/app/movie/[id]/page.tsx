import { MovieData } from "@/types";
import movies from "@/dummy.json";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const movie: MovieData = movies[16];

  if (!movie) return null;

  const {
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movie;

  const { id } = await params;
  console.log("ID >>>", id);

  return (
    <div className={styles.container}>
      <div
        className={styles.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}>
        <img src={posterImgUrl} />
      </div>
      <div className={styles.info_container}>
        <div>
          <h2>{title}</h2>
          <div>
            {releaseDate} / {genres.join(", ")} / {runtime}분
          </div>
          <div>{company}</div>
        </div>
        <div>
          <div className={styles.subTitle}>{subTitle}</div>
          <div className={styles.description}>{description}</div>
        </div>
      </div>
    </div>
  );
}
