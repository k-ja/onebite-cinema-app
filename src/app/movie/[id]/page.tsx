import { MovieData, ReviewData } from "@/types";
import styles from "./page.module.css";
import NotFound from "@/app/not-found";
import { ReviewEditor } from "@/components";
import ReviewItem from "@/components/review-item";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

async function MovieDetail({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${movieId}`,
    { next: { revalidate: 60 * 60 * 24 } }
  );

  if (!response.ok) {
    if (response.status === 404) return NotFound();
    return <div>오류 발생</div>;
  }

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

async function ReviewList({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`
  );

  if (!response.ok)
    throw new Error(`Review fetch failed: ${response.statusText}`);

  const reviews: ReviewData[] = await response.json();

  return (
    <>
      {reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </>
  );
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <>
      <MovieDetail movieId={id} />
      <ReviewEditor movieId={id} />
      <ReviewList movieId={id} />
    </>
  );
}
