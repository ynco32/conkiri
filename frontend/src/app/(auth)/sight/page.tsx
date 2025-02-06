import { WriteButton } from '@/components/common/WriteButton';
import ArenaList from '@/components/features/sight/arena/ArenaList';

export default function SightMainPage() {
  return (
    <main className="bg-sight-bg flex-1">
      <ArenaList />
      <WriteButton path="/sight/write" />
    </main>
  );
}
