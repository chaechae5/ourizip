import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { theme } from '@/constants/theme';

type EmptyStateProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function EmptyState({ eyebrow, title, description }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {eyebrow ? (
        <AppText variant="label" tone="primary" style={styles.eyebrow}>
          {eyebrow}
        </AppText>
      ) : null}
      <AppText variant="title">{title}</AppText>
      <AppText variant="body" tone="muted" style={styles.description}>
        {description}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  eyebrow: {
    marginBottom: theme.spacing.xs,
  },
  description: {
    maxWidth: 320,
  },
});
