import type React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Badge } from '@/components/ui/Badge';
import { theme } from '@/constants/theme';
import type { ImjangPin, ImjangStatus } from '@/features/imjang/domain/entities';

type ImjangPinPreviewCardProps = {
  pin: ImjangPin;
};

const statusLabel: Record<ImjangStatus, string> = {
  planned: '방문 예정',
  visited: '방문 완료',
  hold: '보류',
};

const statusTone: Record<ImjangStatus, React.ComponentProps<typeof Badge>['tone']> = {
  planned: 'primary',
  visited: 'success',
  hold: 'warning',
};

export function ImjangPinPreviewCard({ pin }: ImjangPinPreviewCardProps) {
  return (
    <Pressable style={styles.card}>
      <View style={styles.header}>
        <Badge label={statusLabel[pin.status]} tone={statusTone[pin.status]} />
        <AppText variant="caption" tone="muted">
          관심도 {pin.rating}/5
        </AppText>
      </View>

      <AppText variant="subtitle">{pin.title}</AppText>
      <AppText variant="body" tone="muted">
        {pin.address}
      </AppText>
      <AppText variant="caption" tone="primary">
        {pin.visitDateLabel}
      </AppText>
      <AppText variant="caption" tone="muted">
        {pin.checklistSummary}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.sm,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    ...theme.shadow.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
