import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import colors from 'res/colors';

const BasicButton = ({title, style, textStyle, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{...styles.container, ...style}}>
        <Text style={{...styles.title, ...textStyle}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainTheme,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BasicButton;
