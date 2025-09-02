import Messages from '@/components/Messages';
import Navigation from '@/components/Navigation';
import SearchInput from '@/components/SearchInput';
import SuggestedMessages from '@/components/SuggestedMessages';
import { ThemedText } from '@/components/ThemedText';
import { COLORS } from '@/theme/colors';

import { generateAPIUrl } from '@/utils';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { fetch as expoFetch } from 'expo/fetch';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

const NAV_BAR_HEIGHT = 60;

export default function HomeScreen() {
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  const scrollViewRef = useRef<ScrollView>(null);

  const lastUserMessageRef = useRef<View>(null);
  const lastAssistantMessageRef = useRef<View>(null);

  const [lastUserMessageHeight, setLastUserMessageHeight] = useState<number>(0);
  const [lastAssistantMessageHeight, setLastAssistantMessageHeight] =
    useState<number>(0);

  const handleUserMessageLayout = useCallback((event: any) => {
    const { height } = event.nativeEvent.layout;
    setLastUserMessageHeight(height);
  }, []);

  const handleAssistantMessageLayout = useCallback((event: any) => {
    const { height } = event.nativeEvent.layout;
    setLastAssistantMessageHeight(height);
  }, []);

  const { messages, error, sendMessage, status, regenerate } = useChat({
    transport: new DefaultChatTransport({
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api: generateAPIUrl('/api/chat'),
    }),
    onError: error => console.error(error, 'ERROR'),
  });

  const isChatStarted = messages.length > 0;

  // Auto-scroll to bottom when new message is added
  useEffect(() => {
    if (status === 'submitted') {
      // Small delay to ensure the message is rendered
      const timeout = setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [messages.length, status]);

  if (error) {
    return <ThemedText variant="body1">{error.message}</ThemedText>;
  }

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: COLORS.white }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Navigation isChatStarted={isChatStarted} />

          <ScrollView
            ref={scrollViewRef}
            onLayout={e => {
              if (scrollViewHeight <= e.nativeEvent.layout.height) {
                setScrollViewHeight(e.nativeEvent.layout.height);
              }
            }}
            contentContainerStyle={{
              paddingBottom: isChatStarted
                ? scrollViewHeight -
                  NAV_BAR_HEIGHT -
                  lastUserMessageHeight
                : 0,
              paddingTop: 24,
            }}
            style={{ paddingHorizontal: 16, backgroundColor: COLORS.white }}
          >
            <Messages
              messages={messages}
              regenerate={msgId => regenerate({ messageId: msgId })}
              status={status}
              lastUserMessageRef={lastUserMessageRef}
              lastAssistantMessageRef={lastAssistantMessageRef}
              handleUserMessageLayout={handleUserMessageLayout}
              handleAssistantMessageLayout={handleAssistantMessageLayout}
            />
          </ScrollView>

          {!isChatStarted && (
            <Animated.View
              entering={FadeInDown.duration(300)}
              exiting={FadeOutUp.duration(300)}
            >
              <SuggestedMessages
                sendMessage={message => sendMessage({ text: message.trim() })}
              />
            </Animated.View>
          )}

          <SearchInput
            sendMessage={message => sendMessage({ text: message.trim() })}
            status={status}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
