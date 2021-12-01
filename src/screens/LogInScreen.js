import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import {TitleInputView, BasicButton, LoadingView} from 'components';
import {NavigationService} from 'services';
import colors from 'res/colors';

class LogInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }

  onEmailChange = text => {
    this.setState({
      email: text,
    });
  };

  onPasswordChange = text => {
    this.setState({
      password: text,
    });
  };

  onSignUpPress = () => {
    NavigationService.navigate('SignUp');
  };

  onSignInpress = () => {
    const {email, password} = this.state;
    if (email === '' || password === '') {
      Alert.alert('Error', 'The email or password is empty. Please try again!');
    } else {
      this.setState({
        loading: true,
      });
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({
            loading: false,
          });
        })
        .catch(error => {
          this.setState({
            loading: false,
          });

          if (error.code === 'auth/wrong-password') {
            Alert.alert(
              'Error',
              'The password you entered is not correct. Please try again!',
            );
          }

          if (error.code === 'auth/user-not-found') {
            Alert.alert(
              'Error',
              'The email address is invalid. Please try again!',
            );
          }
        });
    }
  };

  render() {
    const {email, password, loading} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <KeyboardAvoidingView style={styles.wrapper} behavior="height">
            <Text style={styles.appTitle}> Scopic </Text>
            <View style={styles.contentView}>
              <Text style={styles.screenTitle}>Sign In</Text>
              <TitleInputView
                title={'Email'}
                value={email}
                placeholder="Your email address"
                onChangeText={this.onEmailChange}
              />
              <TitleInputView
                style={styles.passwordInput}
                secureTextEntry
                title={'Password'}
                value={password}
                placeholder="Your password"
                onChangeText={this.onPasswordChange}
              />
              <BasicButton
                style={styles.signInButton}
                title={'Sign In'}
                onPress={this.onSignInpress}
              />
            </View>
            <TouchableOpacity onPress={this.onSignUpPress}>
              <View style={styles.signUpButton}>
                <Text style={styles.signUpButtonTitle}>{'Sign Up'}</Text>
              </View>
            </TouchableOpacity>
            {loading ? (
              <LoadingView
                animating={loading}
                color={colors.mainTheme}
                size={'large'}
              />
            ) : null}
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  appTitle: {
    marginVertical: 70,
    color: colors.text.subTitle,
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  contentView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  screenTitle: {
    color: colors.text.title,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  passwordInput: {
    marginTop: 20,
  },
  signInButton: {
    width: '100%',
    height: 44,
    borderRadius: 4,
    marginTop: 30,
  },
  signUpButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  signUpButtonTitle: {
    color: colors.mainTheme,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogInScreen;
