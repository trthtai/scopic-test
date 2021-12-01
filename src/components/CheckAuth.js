import React, {Component} from 'react';
import auth from '@react-native-firebase/auth';

import {LogInScreen} from 'screens';

const checkAuth = OriginalComponent => {
  class CheckAuthComponent extends Component {
    render() {
      if (auth().currentUser !== null) {
        return <OriginalComponent {...this.props} />;
      } else {
        return <LogInScreen />;
      }
    }
  }

  return CheckAuthComponent;
};

export default checkAuth;
