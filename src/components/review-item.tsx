import { ReviewData } from "@/types";
import styles from "./review-item.module.css";

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
      <button type="button" className={styles.btnDelete}>
        리뷰 삭제
      </button>
    </div>
  );
}
