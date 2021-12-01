import React, {Component} from 'react';
import {View, SafeAreaView, Text, StyleSheet} from 'react-native';

import {checkAuth, BasicButton} from 'components';
import {NavigationService} from 'services';
import colors from 'res/colors';

class WelcomeScreen extends Component {
  onListPress = () => {
    console.log('PRessed');
    NavigationService.navigate('List');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.screenTitle}>Welcome</Text>
        <View style={styles.contentView}>
          <Text style={styles.welcome}>Hi there! Nice to see you.</Text>
        </View>
        <BasicButton
          style={styles.listButton}
          title="List"
          onPress={this.onListPress}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenTitle: {
    marginTop: 30,
    color: colors.text.title,
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  contentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    color: colors.text.subTitle,
    fontSize: 26,
    fontWeight: 'bold',
  },
  listButton: {
    alignSelf: 'center',
    width: '90%',
    height: 44,
    borderRadius: 4,
  },
});

export default checkAuth(WelcomeScreen);
