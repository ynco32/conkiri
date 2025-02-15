import { WriteButton } from '@/components/common/WriteButton';
import ArenaList from '@/components/features/sight/arena/ArenaList';

export default function SightMainPage() {
  return (
    <main className="h-full flex-1 bg-sight-main-gra">
      <ArenaList />
      <WriteButton path="/sight/reviews/write" />
    </main>
  );
}
