import { COLORS } from '@/theme/colors';
import {
  Ellipsis,
  MessageCircleDashed,
  Sparkle,
  SquarePen,
} from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';
import MenuIcon from './MenuIcon';
import { ThemedText } from './ThemedText';

type NavigationProps = {
  isChatStarted: boolean;
};

const Navigation = ({ isChatStarted }: NavigationProps) => {
  return !isChatStarted ? (
    <View
      style={{
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        paddingTop: 8,
        backgroundColor: COLORS.white,
        justifyContent: 'space-between',
        paddingHorizontal: 8,
      }}
    >
      <TouchableOpacity style={{ padding: 6, borderRadius: '50%' }}>
        <MenuIcon size={24} color={COLORS.gray} />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 24,
          backgroundColor: COLORS.lightBlue,
          gap: 8,
        }}
      >
        <ThemedText variant="h2" style={{ color: COLORS.purple, fontSize: 14 }}>
          <Sparkle size={12} fill={COLORS.purple} color={COLORS.purple} /> Get
          Plus
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={{ padding: 6, borderRadius: '50%' }}>
        <MessageCircleDashed size={20} color={COLORS.gray} />
      </TouchableOpacity>
    </View>
  ) : (
    <View
      style={{
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        paddingTop: 8,
        justifyContent: 'space-between',
        paddingHorizontal: 8,
      }}
    >
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <TouchableOpacity style={{ padding: 6, borderRadius: '50%' }}>
          <MenuIcon size={24} color={COLORS.gray} />
        </TouchableOpacity>
        <ThemedText variant="button">ChatGPT</ThemedText>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <TouchableOpacity style={{ padding: 6, borderRadius: '50%' }}>
          <SquarePen size={20} color={COLORS.gray} />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 6, borderRadius: '50%' }}>
          <Ellipsis size={20} color={COLORS.gray} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navigation;
