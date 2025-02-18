// src/hooks/useReservationCleanup.ts
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export const useReservationCleanup = () => {
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    // [React] 이전 pathname을 저장
    const currentPrevPathname = prevPathnameRef.current;
    prevPathnameRef.current = pathname;

    // [React] 컴포넌트 언마운트 또는 pathname 변경 시 실행
    return () => {
      console.log('예약 취소 API 호출을 시작합니다.');
      // 좌석 선택 페이지로 이동할 때만 예약 취소 API 호출

      const isMovingToSeatSelection =
        pathname?.includes('/real/A') ||
        pathname?.includes('/real/B') ||
        pathname?.includes('/real/C');

      if (pathname !== currentPrevPathname && isMovingToSeatSelection) {
        const cleanup = async () => {
          try {
            console.log('API 호출 시도');
            const response = await fetch('/api/v1/ticketing/result', {
              method: 'DELETE',
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('예약이 성공적으로 취소되었습니다.');
          } catch (error) {
            console.error('예약 취소 중 오류 발생:', error);
          }
        };

        cleanup();
      } else {
        console.log('조건이 맞지 않아 API를 호출하지 않습니다:', {
          pathnameDiff: pathname !== currentPrevPathname,
          pathname,
          currentPrevPathname,
        });
      }
    };
  }, [pathname]);
};
