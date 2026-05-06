import { Pressable, StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppScreen } from '@/components/ui/AppScreen';
import { AppText } from '@/components/ui/AppText';
import { theme } from '@/constants/theme';
import { ImjangPinPreviewCard } from '@/features/imjang/ui/components/ImjangPinPreviewCard';
import { useMapHomeView } from '@/features/imjang/ui/hooks/useMapHomeView';

export function MapHomeScreen() {
  const { selectedPin, handlePressCreatePin, handlePressCurrentLocation } = useMapHomeView();

  return (
    <AppScreen style={styles.screen}>
      <View style={styles.searchBar}>
        <AppText variant="subtitle" tone="primary" style={styles.searchIcon}>
          ⌕
        </AppText>
        <AppText variant="body" tone="muted" style={styles.searchPlaceholder}>
          지역, 단지, 주소 검색
        </AppText>
      </View>

      <View style={styles.mapMock}>
        <View style={styles.mapGridLineVertical} />
        <View style={styles.mapGridLineHorizontal} />
        <View style={[styles.mapRoad, styles.mapRoadPrimary]} />
        <View style={[styles.mapRoad, styles.mapRoadSecondary]} />

        <Pressable style={styles.currentLocationButton} onPress={handlePressCurrentLocation}>
          <AppText variant="caption" tone="inverse">
            현위치
          </AppText>
        </Pressable>

        <View style={styles.pinMarker}>
          <View style={styles.pinDot} />
        </View>

        <View style={styles.mapLabel}>
          <AppText variant="title" style={styles.mapLabelTitle}>
            지도 영역
          </AppText>
          <AppText variant="caption" tone="primary">
            2일차에 실제 지도 SDK로 교체할 자리
          </AppText>
        </View>
      </View>

      <View style={styles.bottomPanel}>
        <ImjangPinPreviewCard pin={selectedPin} />
        <AppButton title="새 임장 기록" onPress={handlePressCreatePin} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: theme.spacing.lg,
  },
  searchBar: {
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    ...theme.shadow.floating,
  },
  searchIcon: {
    fontSize: 20,
  },
  searchPlaceholder: {
    fontWeight: '600',
  },
  mapMock: {
    position: 'relative',
    flex: 1,
    overflow: 'hidden',
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.mapLand,
  },
  mapGridLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '36%',
    width: 1,
    backgroundColor: theme.colors.mapLine,
  },
  mapGridLineHorizontal: {
    position: 'absolute',
    right: 0,
    bottom: '42%',
    left: 0,
    height: 1,
    backgroundColor: theme.colors.mapLine,
  },
  mapRoad: {
    position: 'absolute',
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surface,
  },
  mapRoadPrimary: {
    top: '32%',
    right: -40,
    left: -20,
    height: 22,
    transform: [{ rotate: '-14deg' }],
  },
  mapRoadSecondary: {
    top: -20,
    bottom: -40,
    left: '58%',
    width: 18,
    transform: [{ rotate: '18deg' }],
  },
  currentLocationButton: {
    position: 'absolute',
    top: theme.spacing.lg,
    right: theme.spacing.lg,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.text,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  pinMarker: {
    position: 'absolute',
    top: '42%',
    left: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    marginLeft: -18,
    marginTop: -18,
    borderRadius: 18,
    backgroundColor: theme.colors.danger,
    ...theme.shadow.card,
  },
  pinDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.surface,
  },
  mapLabel: {
    position: 'absolute',
    right: theme.spacing.lg,
    bottom: 150,
    left: theme.spacing.lg,
    gap: theme.spacing.xs,
  },
  mapLabelTitle: {
    color: theme.colors.mapText,
  },
  bottomPanel: {
    position: 'absolute',
    right: theme.spacing.lg,
    bottom: 18,
    left: theme.spacing.lg,
    gap: theme.spacing.md,
  },
});
