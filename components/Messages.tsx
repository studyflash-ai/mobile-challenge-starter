import { UIMessage } from '@ai-sdk/react';
import { ChatStatus } from 'ai';
import React from 'react';
import { View } from 'react-native';
import AssistantMessage from './AssistantMessage';
import { ThemedText } from './ThemedText';
import Typing from './Typing';
import UserMessage from './UserMessage';

type MessagesProps = {
  messages: UIMessage[];
  regenerate: (messageId?: string) => void;
  status: ChatStatus;
  lastUserMessageRef: React.RefObject<View | null>;
  lastAssistantMessageRef: React.RefObject<View | null>;
  handleUserMessageLayout: (event: any) => void;
  handleAssistantMessageLayout: (event: any) => void;
};

const Messages = ({
  messages,
  regenerate,
  status,
  lastUserMessageRef,
  lastAssistantMessageRef,
  handleUserMessageLayout,
  handleAssistantMessageLayout,
}: MessagesProps) => {
  return (
    <>
      {messages.map((m, index) => {
        const MessageComponent =
          m.role === 'user' ? UserMessage : AssistantMessage;
        const isLastUserMessage =
          m.role === 'user' && index === messages.length - 1;
        const isLastAssistantMessage =
          m.role === 'assistant' && index === messages.length - 1;

        return (
          <MessageComponent
            key={m.id}
            ref={
              isLastUserMessage
                ? lastUserMessageRef
                : isLastAssistantMessage
                  ? lastAssistantMessageRef
                  : undefined
            }
            onLayout={
              isLastUserMessage
                ? handleUserMessageLayout
                : isLastAssistantMessage
                  ? handleAssistantMessageLayout
                  : undefined
            }
            messageId={m.id}
            regenerate={() => regenerate(m.id)}
          >
            {m.parts.map((part, i) => {
              switch (part.type) {
                case 'text':
                  return (
                    <ThemedText key={`${m.id}-${i}`} variant="body1">
                      {part.text.trim()}
                    </ThemedText>
                  );
                case 'tool-weather':
                  return (
                    <ThemedText key={`${m.id}-${i}`} variant="body1">
                      {JSON.stringify(part, null, 2)}
                    </ThemedText>
                  );
              }
            })}
          </MessageComponent>
        );
      })}
      {(status === 'streaming' || status === 'submitted') && (
        <View
          style={{
            marginBottom: 24,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        >
          <Typing />
        </View>
      )}
    </>
  );
};

export default Messages;
