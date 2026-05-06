import type React from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '@/constants/theme';

type AppScreenProps = {
  children: React.ReactNode;
  padded?: boolean;
  centered?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function AppScreen({ children, padded = true, centered = false, style }: AppScreenProps) {
  return (
    <SafeAreaView
      style={[
        styles.screen,
        padded ? styles.padded : undefined,
        centered ? styles.centered : undefined,
        style,
      ]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  padded: {
    padding: theme.layout.screenPadding,
  },
  centered: {
    justifyContent: 'center',
  },
});
