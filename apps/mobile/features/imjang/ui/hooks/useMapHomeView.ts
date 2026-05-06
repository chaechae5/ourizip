import type { ImjangPin } from '@/features/imjang/domain/entities';

const mockSelectedPin: ImjangPin = {
  id: 'mock-1',
  title: '래미안 원베일리',
  address: '서울 서초구 반포동',
  status: 'planned',
  rating: 4,
  visitDateLabel: '이번 주 토요일 방문 예정',
  checklistSummary: '교통, 상권, 소음 확인 필요',
  latitude: 37.507,
  longitude: 127.005,
};

export function useMapHomeView() {
  const selectedPin = mockSelectedPin;

  const handlePressCreatePin = () => {
    console.log('새 임장 기록을 시작합니다.');
  };

  const handlePressCurrentLocation = () => {
    console.log('현재 위치로 이동합니다.');
  };

  return {
    selectedPin,
    handlePressCreatePin,
    handlePressCurrentLocation,
  };
}
