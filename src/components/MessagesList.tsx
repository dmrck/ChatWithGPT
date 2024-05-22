import React, {useEffect, useRef} from 'react';
import {View, Text, FlatList, StyleSheet, Keyboard} from 'react-native';
import {Message} from '../types';
import TypingAnimation from './TypingAnimation';

interface MessagesListProps {
  messages: Message[];
  isTyping: boolean;
}

const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  isTyping = false,
}) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        flatListRef.current?.scrollToEnd({animated: true});
      },
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const renderItem = ({item}: {item: Message}) =>
    item.id === 'typing' ? (
      <View style={[styles.messageContainer, styles.botMessage]}>
        <TypingAnimation />
      </View>
    ) : (
      <View
        style={[
          styles.messageContainer,
          item.isUser ? styles.userMessage : styles.botMessage,
        ]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    );

  return (
    <FlatList
      ref={flatListRef}
      data={
        isTyping
          ? [
              ...messages,
              {id: 'typing', text: '', isUser: false, timestamp: ''},
            ]
          : messages
      }
      keyExtractor={item => item.id}
      renderItem={renderItem}
      style={styles.messageList}
      contentContainerStyle={styles.messageListContainer}
    />
  );
};

const styles = StyleSheet.create({
  messageList: {
    flex: 1,
  },
  messageListContainer: {
    padding: 10,
  },
  messageContainer: {
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#44475a',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  timestamp: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'right',
  },
});

export default MessagesList;
