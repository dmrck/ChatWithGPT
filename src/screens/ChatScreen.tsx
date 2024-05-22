import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';
import {Message} from '../types';
import MessagesList from '../components/MessagesList';
import auth from '@react-native-firebase/auth';

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (inputText.trim() === '') {
      return;
    }

    const timestamp = new Date().toLocaleTimeString();
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp,
    };

    try {
      const messagesToSend = [...messages, userMessage]
        .slice(-10)
        .map(({isUser, text}) => ({
          role: isUser ? 'user' : 'assistant',
          content: text,
        }));

      setMessages(prevMessages => [...prevMessages, userMessage]);
      setIsTyping(true);
      const response = await axios.post('http://localhost:3000/chat', {
        messages: messagesToSend,
      });

      const botMessage: Message = {
        id: Date.now().toString(),
        text: response.data,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error(error);
    }

    setInputText('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}>
      <MessagesList messages={messages} isTyping={isTyping} />
      <View style={styles.inputContainer}>
        <TextInput
          editable={!isTyping}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Message ChatGPT"
          style={styles.input}
        />
        <TouchableOpacity
          disabled={isTyping}
          onPress={sendMessage}
          style={styles.sendButton}>
          <Text style={styles.sendButtonText}>{'->'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343541',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 25,
    borderTopWidth: 1,
    borderColor: '#44475a',
    backgroundColor: '#343541',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#343541',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
