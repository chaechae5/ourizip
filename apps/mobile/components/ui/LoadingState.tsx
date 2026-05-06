import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { theme } from '@/constants/theme';

type LoadingStateProps = {
  message?: string;
};

export function LoadingState({ message = '불러오는 중이에요.' }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={theme.colors.primary} />
      <AppText variant="body" tone="muted">
        {message}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.xl,
  },
});
