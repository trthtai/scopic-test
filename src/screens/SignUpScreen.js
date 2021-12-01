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

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }

  onEmailChangeText = text => {
    this.setState({
      email: text,
    });
  };

  onPasswordChangeText = text => {
    this.setState({
      password: text,
    });
  };

  onSignUpPress = () => {
    const {email, password} = this.state;
    if (email === '' || password === '') {
      Alert.alert('Error', 'The email or password is empty. Please try again!');
    } else {
      this.setState({
        loading: true,
      });
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({
            loading: false,
          });
          console.log('User account created & signed in!');
        })
        .catch(error => {
          this.setState({
            loading: false,
          });

          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    }
  };

  onSignInPress = () => {
    NavigationService.navigate('SignIn');
  };

  render() {
    const {email, password, loading} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <KeyboardAvoidingView style={styles.contentView} behavior="height">
            <Text style={styles.screenTitle}>Sign Up</Text>
            <TitleInputView
              title={'Email'}
              value={email}
              placeholder="Your email address"
              onChangeText={this.onEmailChangeText}
            />
            <TitleInputView
              secureTextEntry
              style={styles.passwordInput}
              title={'Password'}
              value={password}
              placeholder="Your password"
              onChangeText={this.onPasswordChangeText}
            />
            <BasicButton
              style={styles.signUpButton}
              title={'Sign Up'}
              onPress={this.onSignUpPress}
            />
            <View style={styles.signInContainer}>
              <Text style={styles.signInTitle}>Have an Account?</Text>
              <TouchableOpacity onPress={this.onSignInPress}>
                <Text style={styles.signInButton}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        {loading ? (
          <LoadingView
            animating={loading}
            color={colors.mainTheme}
            size={'large'}
          />
        ) : null}
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
    paddingHorizontal: 20,
  },
  screenTitle: {
    color: colors.text.title,
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 50,
  },
  passwordInput: {
    marginTop: 20,
  },
  signUpButton: {
    width: '100%',
    height: 44,
    borderRadius: 4,
    marginTop: 90,
  },
  signUpButtonTitle: {
    color: colors.mainTheme,
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInContainer: {
    justifyContent: 'center',
    marginTop: 25,
    flexDirection: 'row',
  },
  signInTitle: {
    fontSize: 16,
  },
  signInButton: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.mainTheme,
  },
});

export default SignUpScreen;
