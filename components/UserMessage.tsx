import { COLORS } from '@/theme/colors';
import { forwardRef, PropsWithChildren, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface UserMessageProps extends PropsWithChildren {
  onLayout?: (event: any) => void;
}

const UserMessage = forwardRef<View, UserMessageProps>((props, ref) => {
  const { children, onLayout } = props;
  const translateY = useSharedValue(130);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  // Start entrance animation when component mounts
  useEffect(() => {
    // Small delay for staggered effect
    const timer = setTimeout(() => {
      // Animate translateY (slide up from bottom)
      translateY.value = withSpring(0, {
        damping: 15,
        stiffness: 150,
        mass: 0.8,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      ref={ref}
      onLayout={onLayout}
      style={[{ display: 'flex', alignItems: 'flex-end' }, animatedStyle]}
    >
      <View
        style={{
          maxWidth: '80%',
          backgroundColor: COLORS.lightGray,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 24,
          marginBottom: 20,
        }}
      >
        {children}
      </View>
    </Animated.View>
  );
});

UserMessage.displayName = 'UserMessage';

export default UserMessage;
