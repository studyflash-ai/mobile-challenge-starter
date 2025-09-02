import { Text, TextProps } from 'react-native';
import { TYPOGRAPHY } from '@/theme/typography';

export type ThemedTextProps = TextProps & {
  variant?: keyof typeof TYPOGRAPHY;
};

export function ThemedText({
  variant = 'default',
  style,
  ...props
}: ThemedTextProps) {
  return <Text style={[TYPOGRAPHY[variant], style]} {...props} />;
}
