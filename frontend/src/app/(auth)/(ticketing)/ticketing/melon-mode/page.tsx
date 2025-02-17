import Mode from '@/components/features/ticketing/ModeButtons';

export default function ModeSelect() {
  return (
    <div className="flex h-full flex-col bg-ticketing-bg">
      <div className="flex items-center justify-center px-4 pt-20">
        <span className="font-title-bold text-text-menu">
          연습할 플랫폼을 선택해주세요
        </span>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Mode />
      </div>
    </div>
  );
}
