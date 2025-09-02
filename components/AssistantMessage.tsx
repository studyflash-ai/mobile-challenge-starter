import { COLORS } from '@/theme/colors';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import {
  Check,
  Copy,
  RefreshCw,
  ThumbsDown,
  ThumbsUp,
  Upload,
  Volume2,
} from 'lucide-react-native';
import React, {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Markdown from 'react-native-markdown-display';

interface AssistantMessageProps extends PropsWithChildren {
  messageId?: string;
  regenerate: (messageId?: string) => void;
  onLayout?: (event: any) => void;
}

// Function to detect if content contains markdown
const containsMarkdown = (content: React.ReactNode): boolean => {
  if (typeof content === 'string') {
    // Check for common markdown patterns
    const markdownPatterns = [
      /^#{1,6}\s/, // Headers
      /\*\*.*\*\*/, // Bold
      /\*.*\*/, // Italic
      /`.*`/, // Inline code
      /```[\s\S]*```/, // Code blocks
      /\[.*\]\(.*\)/, // Links
      /^\s*[-*+]\s/, // Lists
      /^\s*\d+\.\s/, // Numbered lists
      />\s/, // Blockquotes
    ];

    return markdownPatterns.some(pattern => pattern.test(content));
  }

  // If content is not a string, check if it's a React element with text content
  if (React.isValidElement(content)) {
    const childChildren = (content.props as any)?.children;
    if (typeof childChildren === 'string') {
      return containsMarkdown(childChildren);
    }
    if (Array.isArray(childChildren)) {
      return childChildren.some(child => containsMarkdown(child));
    }
  }

  return false;
};

// Function to extract text content from React children
const extractTextContent = (children: React.ReactNode): string => {
  if (typeof children === 'string') {
    return children;
  }

  if (React.isValidElement(children)) {
    const childChildren = (children.props as any)?.children;
    if (typeof childChildren === 'string') {
      return childChildren;
    }
    if (Array.isArray(childChildren)) {
      return childChildren.map(child => extractTextContent(child)).join('');
    }
  }

  if (Array.isArray(children)) {
    return children.map(child => extractTextContent(child)).join('');
  }

  return '';
};

const AssistantMessage = forwardRef<View, AssistantMessageProps>(
  (props, ref) => {
    const { children, messageId, regenerate, onLayout } = props;
    const [isCopied, setIsCopied] = useState(false);
    const [animatedText, setAnimatedText] = useState('');

    // Extract text content and check if it contains markdown
    const textContent = extractTextContent(children);
    const isMarkdown = containsMarkdown(textContent);

    // Typing animation effect - only for regular text
    useEffect(() => {
      if (isMarkdown || !textContent) {
        setAnimatedText(textContent);

        return;
      }

      setAnimatedText('');

      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < textContent.length) {
          setAnimatedText(textContent.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 30);

      return () => clearInterval(interval);
    }, [textContent, isMarkdown]);

    // Function to copy message content to clipboard
    const handleCopyToClipboard = async () => {
      try {
        await Clipboard.setStringAsync(textContent);
        // Provide haptic feedback
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success
        );

        // Show success state
        setIsCopied(true);

        // Show alert notification
        Alert.alert('Success', 'Message copied to clipboard');

        // Reset to copy icon after 2 seconds
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        // Provide error haptic feedback
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert('Error', 'Failed to copy message to clipboard');
      }
    };

    return (
      <View ref={ref} onLayout={onLayout} style={{ marginBottom: 24, gap: 0 }}>
        <View style={{ maxWidth: '80%' }}>
          {isMarkdown ? (
            <Markdown
              style={{
                body: {
                  color: COLORS.black,
                  fontSize: 16,
                  lineHeight: 24,
                },
                heading1: {
                  color: COLORS.black,
                  fontSize: 24,
                  fontWeight: 'bold',
                  marginBottom: 16,
                },
                heading2: {
                  color: COLORS.black,
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 12,
                },
                heading3: {
                  color: COLORS.black,
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginBottom: 8,
                },
                code_block: {
                  backgroundColor: COLORS.lightGray,
                  padding: 12,
                  borderRadius: 8,
                  marginVertical: 8,
                },
                code_inline: {
                  backgroundColor: COLORS.lightGray,
                  padding: 4,
                  borderRadius: 4,
                  fontFamily: 'monospace',
                },
                link: {
                  color: COLORS.black,
                  textDecorationLine: 'underline',
                },
                blockquote: {
                  borderLeftWidth: 4,
                  borderLeftColor: COLORS.gray,
                  paddingLeft: 16,
                  marginVertical: 8,
                  fontStyle: 'italic',
                },
                list_item: {
                  marginVertical: 2,
                },
              }}
            >
              {textContent}
            </Markdown>
          ) : (
            <Text style={{ color: COLORS.black, fontSize: 16, lineHeight: 24 }}>
              {animatedText}
            </Text>
          )}
        </View>

        <View
          style={{
            gap: 12,
            flexDirection: 'row',
            marginTop: 16,
          }}
        >
          <TouchableOpacity onPress={handleCopyToClipboard}>
            {isCopied ? (
              <Check size={16} color={COLORS.purple} />
            ) : (
              <Copy size={16} color={COLORS.gray} />
            )}
          </TouchableOpacity>
          <Volume2 size={16} color={COLORS.gray} />
          <ThumbsUp size={16} color={COLORS.gray} />
          <ThumbsDown size={16} color={COLORS.gray} />
          <TouchableOpacity onPress={() => regenerate(messageId)}>
            <RefreshCw size={16} color={COLORS.gray} />
          </TouchableOpacity>
          <Upload size={16} color={COLORS.gray} />
        </View>
      </View>
    );
  }
);

AssistantMessage.displayName = 'AssistantMessage';

export default AssistantMessage;
