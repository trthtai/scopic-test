/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationService} from 'services';
import auth from '@react-native-firebase/auth';

import {
  LogInScreen,
  SignUpScreen,
  WelcomeScreen,
  ListScreen,
  ProfileScreen,
} from 'screens';

const Stack = createStackNavigator();

const AuthenticationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        options={{headerShown: false}}
        component={LogInScreen}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  auth().onAuthStateChanged(user => {
    setAuthenticated(user != null);
  });

  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            name="Root"
            component={RootStack}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Authentication"
            component={AuthenticationStack}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
