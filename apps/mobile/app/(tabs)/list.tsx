import { AppScreen } from '@/components/ui/AppScreen';
import { EmptyState } from '@/components/ui/EmptyState';

export default function ImjangListRoute() {
  return (
    <AppScreen centered>
      <EmptyState
        eyebrow="내 임장"
        title="아직 저장된 임장 기록이 없어요."
        description="지도에서 첫 임장 기록을 만들면 이곳에서 다시 볼 수 있어요."
      />
    </AppScreen>
  );
}
