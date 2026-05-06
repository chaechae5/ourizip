import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { theme } from '@/constants/theme';

type AppTextInputProps = TextInputProps;

export function AppTextInput({ style, placeholderTextColor = theme.colors.textSubtle, ...props }: AppTextInputProps) {
  return (
    <TextInput
      placeholderTextColor={placeholderTextColor}
      style={[styles.input, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    color: theme.colors.text,
    ...theme.typography.body,
  },
});
