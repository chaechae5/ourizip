import { StyleSheet, Text, type TextProps } from 'react-native';

import { theme } from '@/constants/theme';

type AppTextVariant = 'title' | 'subtitle' | 'body' | 'label' | 'caption';
type AppTextTone = 'default' | 'muted' | 'subtle' | 'primary' | 'danger' | 'inverse';

type AppTextProps = TextProps & {
  variant?: AppTextVariant;
  tone?: AppTextTone;
};

const toneColor: Record<AppTextTone, string> = {
  default: theme.colors.text,
  muted: theme.colors.textMuted,
  subtle: theme.colors.textSubtle,
  primary: theme.colors.primary,
  danger: theme.colors.danger,
  inverse: theme.colors.inverseText,
};

export function AppText({ variant = 'body', tone = 'default', style, ...props }: AppTextProps) {
  return <Text style={[styles.base, styles[variant], { color: toneColor[tone] }, style]} {...props} />;
}

const styles = StyleSheet.create({
  base: {
    letterSpacing: 0,
  },
  title: theme.typography.title,
  subtitle: theme.typography.subtitle,
  body: theme.typography.body,
  label: theme.typography.label,
  caption: theme.typography.caption,
});
