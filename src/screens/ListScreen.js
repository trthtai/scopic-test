import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Animated,
  Switch,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {NavigationBar, BasicButton, AddItemModalView} from 'components';
import colors from 'res/colors';
import {NavigationService} from 'services';

class ListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      modalVisible: false,
      addingItem: '',
      switchEnabled: true,
      offlineItems: [],
    };
    this.swipables = [];
  }

  itemSubscriber = firestore()
    .collection('items')
    .onSnapshot(
      snapshot => {
        this.swipables = Array(snapshot.docs.length);
        this.setState({
          items: snapshot.docs,
        });
      },
      error => {},
    );

  componentDidMount() {
    AsyncStorage.getItem('items').then(string => {
      this.setState({
        offlineItems: JSON.parse(string) || [],
      });
    });
  }

  componentWillUnmount() {
    this.itemSubscriber();
  }

  onListPress = () => {};

  onBackPress = () => {
    NavigationService.goBack();
  };

  onProfilePress = () => {
    NavigationService.navigate('Profile');
  };

  onAddItemPress = () => {
    this.setState({
      modalVisible: true,
    });
  };

  onModalCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  onModalSubmit = () => {
    const {addingItem} = this.state;

    if (addingItem === '') {
      Alert.alert('Error', 'The item name cannot be empty. Please try again!');
    } else {
      const {switchEnabled} = this.state;
      if (switchEnabled) {
        firestore()
          .collection('items')
          .add({
            name: addingItem,
          })
          .then(() => {
            this.setState({
              addingItem: '',
              modalVisible: false,
            });
          })
          .catch(error => {
            this.setState({
              addingItem: '',
              modalVisible: false,
            });
          });
      } else {
        let {offlineItems} = this.state;
        offlineItems.push(addingItem);
        this.setState({
          offlineItems: offlineItems.slice(),
          modalVisible: false,
          addingItem: '',
        });
        AsyncStorage.setItem('items', JSON.stringify(offlineItems));
      }
    }
  };

  onAddItemChangeText = text => {
    if (text.length <= 40) {
      this.setState({
        addingItem: text,
      });
    }
  };

  renderRightActions = (progress, item, index) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [60, 0],
    });

    return (
      <TouchableOpacity
        onPress={() => {
          this.swipables[index].close();
          this.swipables.splice(index, 1);
          const {switchEnabled} = this.state;

          if (switchEnabled) {
            firestore()
              .collection('items')
              .doc(item.id)
              .delete()
              .then(() => {})
              .catch(error => {});
          } else {
            let {offlineItems} = this.state;
            offlineItems.splice(index, 1);
            this.setState({
              offlineItems: offlineItems.slice(),
            });
            AsyncStorage.setItem('items', JSON.stringify(offlineItems));
          }
        }}>
        <Animated.View
          style={{transform: [{translateX: trans}], ...styles.rightAction}}>
          <Text style={styles.actionText}>Delete</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  renderItem = ({item, index}) => {
    const {switchEnabled} = this.state;
    return (
      <Swipeable
        ref={o => {
          this.swipables[index] = o;
        }}
        renderRightActions={progress => {
          return this.renderRightActions(progress, item, index);
        }}>
        <View style={styles.itemView}>
          <Text>{switchEnabled ? item.get('name') : item}</Text>
          <View style={styles.separator} />
        </View>
      </Swipeable>
    );
  };

  onSwitchValueChange = value => {
    this.setState({
      switchEnabled: value,
    });
  };

  keyExtractor = (item, index) => index + '';

  render() {
    const {modalVisible, items, addingItem, switchEnabled, offlineItems} =
      this.state;
    return (
      <SafeAreaView style={styles.container}>
        <NavigationBar
          title="List"
          leftButtonShown
          leftButtonTitle="Back"
          rightButtonShown
          rightButtonTitle="Profile"
          leftButtonPress={this.onBackPress}
          rightButtonPress={this.onProfilePress}
        />
        <View style={styles.contentView}>
          <Switch
            style={styles.switch}
            value={switchEnabled}
            onValueChange={this.onSwitchValueChange}
          />
          <FlatList
            style={styles.itemList}
            contentContainerStyle={styles.itemListContainer}
            data={switchEnabled ? items : offlineItems}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            ListHeaderComponent={this.renderHeaderComponent}
          />
          <BasicButton
            style={styles.addItemButton}
            textStyle={styles.addItemButtonTitle}
            title="+"
            onPress={this.onAddItemPress}
          />
        </View>
        <AddItemModalView
          title="Add Item"
          visible={modalVisible}
          placeholder={'Your item name'}
          value={addingItem}
          onChangeText={this.onAddItemChangeText}
          onCancel={this.onModalCancel}
          onSubmit={this.onModalSubmit}
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
  },
  itemList: {
    flex: 1,
  },

  itemListContainer: {
    paddingLeft: 20,
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 1,
    backgroundColor: colors.separator,
  },
  itemView: {
    height: 44,
    justifyContent: 'center',
  },
  addItemButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addItemButtonTitle: {
    fontSize: 35,
    color: '#fff',
  },
  rightAction: {
    backgroundColor: 'red',
    height: '100%',
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  switch: {
    marginVertical: 16,
    alignSelf: 'center',
  },
});

export default ListScreen;
