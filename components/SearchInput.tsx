import { COLORS } from '@/theme/colors';
import { TYPOGRAPHY } from '@/theme/typography';
import { ChatStatus } from 'ai';
import { ArrowUp, AudioLines, Mic, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { Keyboard, TextInput, TouchableOpacity, View } from 'react-native';

const INITIAL_INPUT_HEIGHT = 43.666656494140625;

type SearchInputProps = {
  sendMessage: (message: string) => void;
  status: ChatStatus;
};

const SearchInput = ({ sendMessage, status }: SearchInputProps) => {
  const [input, setInput] = useState('');
  const [isMultiline, setIsMultiline] = useState(false);
  return (
    <View
      style={{
        paddingHorizontal: 8,
        marginBottom: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: COLORS.white,
        gap: 8,
      }}
    >
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: COLORS.lightGray,
          borderRadius: '50%',
        }}
      >
        <Plus size={24} color={COLORS.gray} />
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          gap: 8,
          position: 'relative',
          justifyContent: 'flex-end',
        }}
      >
        <TextInput
          onLayout={e => {
            if (e.nativeEvent.layout.height === INITIAL_INPUT_HEIGHT) {
              setIsMultiline(false);
            } else {
              setIsMultiline(true);
            }
          }}
          editable={status !== 'streaming' && status !== 'submitted'}
          style={{
            backgroundColor: COLORS.lightGray,
            paddingVertical: 12,
            paddingLeft: 16,
            paddingRight: !input ? 8 : 48,
            borderRadius: isMultiline ? 20 : 32,
            maxHeight: 200,
            overflow: 'hidden',
            opacity: status === 'streaming' || status === 'submitted' ? 0.5 : 1,
            ...TYPOGRAPHY.input,
          }}
          numberOfLines={4}
          placeholder="Ask anything"
          placeholderTextColor={COLORS.darkGray}
          value={input}
          multiline={true}
          onChange={e => setInput(e.nativeEvent.text)}
          onSubmitEditing={e => {
            e.preventDefault();
            sendMessage(input);
            setInput('');
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            position: 'absolute',
            right: 8,
            bottom: 6,
          }}
        >
          {!input ? (
            <>
              <TouchableOpacity
                disabled={status === 'streaming' || status === 'submitted'}
                style={{
                  padding: 6,
                  borderRadius: '50%',
                  opacity:
                    status === 'streaming' || status === 'submitted' ? 0.5 : 1,
                }}
              >
                <Mic size={20} color={COLORS.gray} />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={status === 'streaming' || status === 'submitted'}
                style={{
                  padding: 6,
                  backgroundColor: COLORS.black,
                  borderRadius: '50%',
                  opacity:
                    status === 'streaming' || status === 'submitted' ? 0.5 : 1,
                }}
              >
                <AudioLines size={20} color={COLORS.white} />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => {
                sendMessage(input);
                setInput('');
                Keyboard.dismiss();
              }}
              style={{
                padding: 6,
                backgroundColor: COLORS.black,
                borderRadius: '50%',
              }}
            >
              <ArrowUp size={20} color={COLORS.white} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default SearchInput;
