import { COLORS } from '@/theme/colors';
import { ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';

const suggestionMsg: { title: string; description: string }[] = [
  { title: 'Write a report', description: 'based on my data' },
  { title: 'Write a poem', description: 'about nature' },
  { title: 'Create a workout plan', description: 'for resistance training' },
];

type SuggestedMessagesProps = {
  sendMessage: (message: string) => void;
};

const SuggestedMessages = ({ sendMessage }: SuggestedMessagesProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        flexGrow: 0,
        backgroundColor: COLORS.white,
        flexShrink: 0,
        height: 'auto',
        alignSelf: 'flex-start',
      }}
      contentContainerStyle={{
        gap: 12,
        marginBottom: 20,
        paddingHorizontal: 12,
        backgroundColor: COLORS.white,
        flexShrink: 0,
        height: 'auto',
        alignSelf: 'flex-start',
      }}
    >
      {suggestionMsg.map((msg, index) => (
        <TouchableOpacity
          onPress={() => {
            sendMessage(`${msg.title} ${msg.description}`);
          }}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 16,
            backgroundColor: COLORS.lightGray2,
            borderRadius: 14,
            gap: 0,
          }}
          key={index}
        >
          <ThemedText
            style={{
              fontSize: 14,
              fontWeight: '900',
              color: COLORS.darkBlack,
              lineHeight: 20,
            }}
            variant="h2"
          >
            {msg.title}
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 14,
              color: COLORS.gray2,
            }}
            variant="body1"
          >
            {msg.description}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default SuggestedMessages;
