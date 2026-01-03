"use client";

import { createReviewAction } from "@/actions/create-review.action";
import styles from "./review-editor.module.css";
import { useActionState, useEffect } from "react";

export default function ReviewEditor({ movieId }: { movieId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) alert(state.error);
  }, [state]);

  return (
    <section>
      <form action={formAction} className={styles.formContainer}>
        <input type="hidden" name="movieId" value={movieId} readOnly />
        <textarea
          name="content"
          required
          placeholder="리뷰 작성"
          disabled={isPending}
        />
        <div className={styles.submitContainer}>
          <input
            type="text"
            name="author"
            placeholder="작성자"
            disabled={isPending}
          />
          <button type="submit" disabled={isPending}>
            {isPending ? "..." : "작성"}
          </button>
        </div>
      </form>
    </section>
  );
}
