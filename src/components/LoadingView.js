import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

const LoadingView = ({color, size, animating}) => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator animating={animating} color={color} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingView;
