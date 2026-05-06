import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { theme } from '@/constants/theme';

type ErrorStateProps = {
  title?: string;
  description: string;
  retryLabel?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = '문제가 생겼어요.',
  description,
  retryLabel = '다시 시도',
  onRetry,
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <AppText variant="subtitle">{title}</AppText>
      <AppText variant="body" tone="muted" style={styles.description}>
        {description}
      </AppText>
      {onRetry ? <AppButton title={retryLabel} variant="secondary" onPress={onRetry} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.md,
    padding: theme.spacing.xl,
  },
  description: {
    maxWidth: 320,
  },
});
