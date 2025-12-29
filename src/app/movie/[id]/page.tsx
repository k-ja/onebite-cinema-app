import { MovieData } from "@/types";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${id}`,
    { next: { revalidate: 60 * 60 * 24 } }
  );

  if (!response.ok) return <div>오류 발생</div>;

  const movie: MovieData = await response.json();

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
