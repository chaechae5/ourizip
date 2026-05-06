import { Platform } from 'react-native';

const palette = {
  teal50: '#ecfdf5',
  teal100: '#ccfbf1',
  teal600: '#0d9488',
  teal700: '#0f766e',
  teal800: '#115e59',
  slate50: '#f8fafc',
  slate100: '#f1f5f9',
  slate200: '#e2e8f0',
  slate400: '#94a3b8',
  slate500: '#64748b',
  slate700: '#334155',
  slate900: '#0f172a',
  white: '#ffffff',
  red500: '#ef4444',
  amber500: '#f59e0b',
  green600: '#16a34a',
  blue600: '#2563eb',
};

export const colors = {
  primary: palette.teal700,
  primaryPressed: palette.teal800,
  primarySoft: palette.teal50,
  background: palette.slate50,
  surface: palette.white,
  surfaceMuted: palette.slate100,
  border: palette.slate200,
  text: palette.slate900,
  textMuted: palette.slate500,
  textSubtle: palette.slate400,
  inverseText: palette.white,
  danger: palette.red500,
  warning: palette.amber500,
  success: palette.green600,
  info: palette.blue600,
  mapLand: '#dcefe7',
  mapLine: 'rgba(15, 118, 110, 0.16)',
  mapText: '#064e3b',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
  full: 999,
} as const;

export const typography = {
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '800',
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '800',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
} as const;

export const shadow = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 5,
  },
  floating: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
} as const;

export const layout = {
  screenPadding: spacing.lg,
  tabBarHeight: 56,
} as const;

export const theme = {
  colors,
  spacing,
  radius,
  typography,
  shadow,
  layout,
} as const;

export const Colors = {
  light: {
    text: colors.text,
    background: colors.background,
    tint: colors.primary,
    icon: colors.textMuted,
    tabIconDefault: colors.textMuted,
    tabIconSelected: colors.primary,
  },
  dark: {
    text: '#eceff3',
    background: '#151718',
    tint: colors.primarySoft,
    icon: '#9ba1a6',
    tabIconDefault: '#9ba1a6',
    tabIconSelected: colors.primarySoft,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
