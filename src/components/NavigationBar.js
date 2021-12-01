import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import colors from 'res/colors';

const NavigationBar = ({
  leftButtonShown,
  rightButtonShown,
  leftButtonTitle,
  rightButtonTitle,
  leftButtonPress,
  rightButtonPress,
  title,
}) => {
  return (
    <View style={styles.bar}>
      {leftButtonShown ? (
        <TouchableOpacity
          style={styles.leftTouchView}
          onPress={leftButtonPress}>
          <Text style={styles.leftButton}>{leftButtonTitle}</Text>
        </TouchableOpacity>
      ) : null}
      <Text style={styles.title}>{title}</Text>
      {rightButtonShown ? (
        <TouchableOpacity onPress={rightButtonPress}>
          <Text style={styles.rightButton}>{rightButtonTitle}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    height: 44,
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    color: colors.text.title,
    textAlign: 'center',
  },
  leftTouchView: {
    zIndex: 1,
  },
  leftButton: {
    position: 'absolute',
    left: 0,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.mainTheme,
  },
  rightButton: {
    position: 'absolute',
    right: 0,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.mainTheme,
  },
});

export default NavigationBar;
