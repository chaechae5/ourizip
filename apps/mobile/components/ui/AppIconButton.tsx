import type React from 'react';
import { Pressable, StyleSheet, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { theme } from '@/constants/theme';

type IconName = React.ComponentProps<typeof IconSymbol>['name'];

type AppIconButtonProps = PressableProps & {
  name: IconName;
  label: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function AppIconButton({ name, label, size = 22, style, ...props }: AppIconButtonProps) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      style={({ pressed }) => [styles.button, pressed ? styles.pressed : undefined, style]}
      {...props}>
      <IconSymbol name={name} size={size} color={theme.colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surface,
    ...theme.shadow.floating,
  },
  pressed: {
    opacity: 0.82,
  },
});
