'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { EditSightReviewFormContainer } from '@/components/features/sight/form/EditSightReviewFormContainer';
import { Modal } from '@/components/common/Modal';
import type { ApiReview } from '@/types/sightReviews';
import { getReview } from '@/lib/api/sightReview';
import { useSightReviewStore } from '@/store/useSightReviewStore';

export default function EditSightReviewPage() {
  const router = useRouter();
  const params = useParams();
  const reviewId = Number(params.reviewId);
  const [initialData, setInitialData] = useState<ApiReview | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  useEffect(() => {
    useSightReviewStore.getState().reset();
  }, []);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const apiReview = await getReview(reviewId);
        setInitialData(apiReview);
        setError(null);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : '알 수 없는 에러가 발생했습니다.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (reviewId) {
      fetchReviewData();
    }
  }, [reviewId]);

  const handleSubmitComplete = () => {
    setIsCompleteModalOpen(true);
  };

  const handleModalClose = () => {
    setIsCompleteModalOpen(false);
    router.replace('/mypage/sight'); // 내 리뷰 목록 페이지로 이동
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!initialData) {
    return <div>리뷰를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <EditSightReviewFormContainer
        reviewId={reviewId}
        initialData={initialData}
        className="min-h-screen"
        onSubmitComplete={handleSubmitComplete}
      />
      <Modal
        isOpen={isCompleteModalOpen}
        onClose={handleModalClose}
        title="수정이 완료되었습니다"
        type="alert"
        variant="primary"
      />
    </>
  );
}
