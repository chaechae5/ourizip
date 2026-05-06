import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { theme } from '@/constants/theme';

type BadgeTone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

type BadgeProps = {
  label: string;
  tone?: BadgeTone;
  style?: StyleProp<ViewStyle>;
};

const toneStyle: Record<BadgeTone, { backgroundColor: string; color: string }> = {
  primary: {
    backgroundColor: theme.colors.primarySoft,
    color: theme.colors.primary,
  },
  success: {
    backgroundColor: '#e7f7ed',
    color: theme.colors.success,
  },
  warning: {
    backgroundColor: '#fff7e6',
    color: theme.colors.warning,
  },
  danger: {
    backgroundColor: '#feecec',
    color: theme.colors.danger,
  },
  neutral: {
    backgroundColor: theme.colors.surfaceMuted,
    color: theme.colors.textMuted,
  },
};

export function Badge({ label, tone = 'primary', style }: BadgeProps) {
  const selectedTone = toneStyle[tone];

  return (
    <View style={[styles.badge, { backgroundColor: selectedTone.backgroundColor }, style]}>
      <AppText variant="caption" style={{ color: selectedTone.color }}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: theme.radius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
});
