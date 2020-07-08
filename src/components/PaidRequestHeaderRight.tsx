import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import Dots from '../assets/icons/dots-icon.svg';
import Phone from '../assets/icons/phone-icon.svg';
import Message from '../assets/icons/message-icon.svg';

interface Props {}

const styles = StyleSheet.create({
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsText: {
    marginLeft: 10,
    fontSize: 16,
    letterSpacing: 0.8,
    lineHeight: 32,
  },
});

const PaidRequestHeaderRight: React.FunctionComponent<Props> = () => {
  return (
    <Menu>
      <MenuTrigger
        customStyles={{
          triggerOuterWrapper: {
            width: 40,
            height: 40,
            borderWidth: 0,
            borderRadius: 20,
          },
          triggerWrapper: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            borderRadius: 20,
          },
        }}>
        <Dots />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            marginLeft: -8,
            width: 218,
          },
          optionsWrapper: {
            paddingVertical: 12,
            paddingRight: 14,
            paddingLeft: 12,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.16,
            shadowRadius: 4.65,

            elevation: 8,
          },
        }}>
        <MenuOption value="phone-call">
          <TouchableOpacity style={styles.optionContainer}>
            <Phone width={12} height={17} />
            <Text style={styles.optionsText}>Позвонить клиенту</Text>
          </TouchableOpacity>
        </MenuOption>
        <MenuOption value="enter-message">
          <TouchableOpacity style={styles.optionContainer}>
            <Message width={14} height={12} />
            <Text style={styles.optionsText}>Написать сообщение</Text>
          </TouchableOpacity>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

export default PaidRequestHeaderRight;
