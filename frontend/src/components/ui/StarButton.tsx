'use client';
import { StarIcon as StarOutlined } from '@heroicons/react/24/outline';
import { StarIcon as StarFilled } from '@heroicons/react/24/solid';
import { useScrapStore } from '@/store/useScrapStore';

interface StarButtonProps {
  onScrapModeChange?: (isScrap: boolean) => void;
}

export const StarButton = ({ onScrapModeChange }: StarButtonProps) => {
  const { isScrapMode, toggleScrapMode } = useScrapStore();

  const handleClick = () => {
    toggleScrapMode();
    onScrapModeChange?.(!isScrapMode);
  };

  const ButtonContent = isScrapMode ? StarFilled : StarOutlined;

  return (
    <button
      onClick={handleClick}
      className="sm:right-8 md:right-12 lg:right-16 absolute right-4 top-16 z-50 rounded-full bg-white p-3 shadow-lg hover:bg-gray-50"
    >
      <ButtonContent className="mb-3 h-8 w-8" aria-label="Scrap" />
    </button>
  );
};
