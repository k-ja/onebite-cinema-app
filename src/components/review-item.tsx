import { ReviewData } from "@/types";
import styles from "./review-item.module.css";
import ReviewItemDeleteButton from "./review-item-delete-button";

export default async function ReviewItem({
  id,
  content,
  author,
  createdAt,
  movieId,
}: ReviewData) {
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.author}>{author}</div>
        <div className={styles.author}>{createdAt}</div>
      </div>
      <div className={styles.content}>{content}</div>
      <div className={styles.btnDelete}>
        <ReviewItemDeleteButton reviewId={id} movieId={movieId} />
      </div>
    </div>
  );
}
