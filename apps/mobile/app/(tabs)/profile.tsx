import { AppScreen } from '@/components/ui/AppScreen';
import { EmptyState } from '@/components/ui/EmptyState';

export default function ProfileRoute() {
  return (
    <AppScreen centered>
      <EmptyState
        eyebrow="마이"
        title="로그인과 설정이 들어갈 자리예요."
        description="이후 소셜 로그인, 출근지 설정, 알림 설정을 이 화면에서 연결합니다."
      />
    </AppScreen>
  );
}
