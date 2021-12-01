import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import colors from 'res/colors';

const TitleInputView = ({
  title,
  keyboardType,
  style,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}) => {
  return (
    <View style={{...style}}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        style={styles.input}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.subTitle}
      />
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.mainTheme,
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    marginTop: 12,
    fontSize: 14,
    color: colors.text.title,
  },
  separator: {
    marginTop: 12,
    width: '100%',
    height: 1,
    backgroundColor: colors.separator,
  },
});

export default TitleInputView;
