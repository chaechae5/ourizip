import { Pressable, StyleSheet, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

import { theme } from '@/constants/theme';
import { AppText } from '@/components/ui/AppText';

type AppButtonVariant = 'primary' | 'secondary' | 'ghost';

type AppButtonProps = PressableProps & {
  title: string;
  variant?: AppButtonVariant;
  style?: StyleProp<ViewStyle>;
};

export function AppButton({ title, variant = 'primary', style, disabled, ...props }: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && !disabled ? styles.pressed : undefined,
        disabled ? styles.disabled : undefined,
        style,
      ]}
      {...props}>
      <AppText variant="label" tone={variant === 'primary' ? 'inverse' : 'primary'}>
        {title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  pressed: {
    opacity: 0.82,
  },
  disabled: {
    opacity: 0.45,
  },
});
