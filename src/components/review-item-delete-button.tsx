"use client";

import { deleteReviewAction } from "@/actions/delete-review.action";
import { useActionState, useEffect, useRef } from "react";

interface DeleteButtopProps {
  reviewId: number;
  movieId: number;
}

export default function ReviewItemDeleteButton({
  reviewId,
  movieId,
}: DeleteButtopProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) alert(state.error);
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input type="hidden" name="reviewId" value={reviewId} readOnly />
      <input type="hidden" name="movieId" value={movieId} readOnly />
      {isPending ? (
        <div>...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>삭제</div>
      )}
    </form>
  );
}
