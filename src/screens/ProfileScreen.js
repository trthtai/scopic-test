import React, {Component} from 'react';
import {View, SafeAreaView, Text, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

import {NavigationBar, BasicButton} from 'components';
import {NavigationService} from 'services';
import colors from 'res/colors';

class ProfileScreen extends Component {
  onBackPress = () => {
    NavigationService.goBack();
  };

  onLogOutPress = () => {
    auth()
      .signOut()
      .then(() => {})
      .catch(error => {});
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <NavigationBar
          title="Profile"
          leftButtonShown
          leftButtonTitle="Back"
          leftButtonPress={this.onBackPress}
        />
        <View style={styles.contentView}>
          <Text style={styles.email}>{auth().currentUser.email}</Text>
        </View>
        <BasicButton
          style={styles.logOutButton}
          title="Log Out"
          onPress={this.onLogOutPress}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  email: {
    color: colors.text.subTitle,
    fontSize: 26,
    fontWeight: 'bold',
  },
  logOutButton: {
    alignSelf: 'center',
    width: '90%',
    height: 44,
    borderRadius: 4,
  },
});

export default ProfileScreen;
