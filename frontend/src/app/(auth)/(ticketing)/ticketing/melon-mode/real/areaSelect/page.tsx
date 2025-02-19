'use client';
import SecurityMessagePopup from '@/components/features/ticketing/SecurityMessagePopup';
import { useEffect, useState } from 'react';
import TicketingBottomBar from '@/components/ui/TicketingBottomBar';
import TicketingArea from '@/components/features/ticketing/TicketingArea';
import { useSecurityPopupStore } from '@/store/useSecurityPopupStore';
import { useRouter } from 'next/navigation';

export default function Area() {
  const [isSecurityMessageOpen, setisSecurityMessageOpen] = useState(false);
  const { onSuccess } = useSecurityPopupStore();
  const router = useRouter();

  useEffect(() => {
    // document.referrer가 비어있으면 직접 URL 입력으로 접근한 것
    if (!document.referrer) {
      router.replace('./'); // 메인으로 돌려보내기
    }
  }, [router]);

  useEffect(() => {
    console.log('새로고침 됨');
    if (!onSuccess) {
      // 이미 보안문자를 성공하지 않았다면
      setisSecurityMessageOpen(true);
    }
  }, []);

  const handleOnPostpone = () => {
    setisSecurityMessageOpen(false);
  };

  const handleOnSuccess = () => {
    setisSecurityMessageOpen(false);
  };

  return (
    <div>
      <SecurityMessagePopup
        isOpen={isSecurityMessageOpen}
        onPostpone={handleOnPostpone} // 미루기 기능 활성화 추후 상태 저장 추가
        onSuccess={handleOnSuccess}
      />
      <TicketingArea />
      <TicketingBottomBar isActive={false}>다음 </TicketingBottomBar>
    </div>
  );
}
