import { createReviewAction } from "@/actions/create-review.action";
import styles from "./review-editor.module.css";

export default async function ReviewEditor({ movieId }: { movieId: string }) {
  return (
    <section>
      <form action={createReviewAction} className={styles.formContainer}>
        <input type="hidden" name="movieId" value={movieId} readOnly />
        <textarea name="content" required placeholder="리뷰 작성" />
        <div className={styles.submitContainer}>
          <input type="text" name="author" placeholder="작성자" />
          <button type="submit">작성</button>
        </div>
      </form>
    </section>
  );
}
