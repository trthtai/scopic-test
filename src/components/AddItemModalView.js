import React from 'react';
import {Modal, View, Text, TextInput, Alert, StyleSheet} from 'react-native';

import {BasicButton} from 'components';
import colors from 'res/colors';

const AddItemModalView = ({
  visible,
  title,
  value,
  onChangeText,
  onCancel,
  onSubmit,
  placeholder,
}) => {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.modal}>
        <View style={styles.contentView}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.separator} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={value}
              style={styles.input}
              placeholder={placeholder}
              onChangeText={onChangeText}
            />
            <View style={styles.separator} />
          </View>
          <Text style={styles.textCount}>{`${value.length}/40`}</Text>
          <View style={styles.buttonContainer}>
            <BasicButton
              style={styles.cancelButton}
              title={'Cancel'}
              onPress={onCancel}
            />
            <BasicButton
              style={styles.addButton}
              title={'Add'}
              onPress={onSubmit}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentView: {
    padding: 10,
    width: '90%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: colors.text.title,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 0},
  },
  header: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.title,
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 1,
    backgroundColor: colors.separator,
  },
  inputContainer: {
    paddingVertical: 16,
  },
  input: {
    fontSize: 16,
    color: colors.text.title,
  },
  textCount: {
    marginTop: 10,
    textAlign: 'right',
    color: colors.text.title,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addButton: {
    marginLeft: 10,
    width: 120,
    height: 44,
    borderRadius: 6,
  },
  cancelButton: {
    width: 120,
    height: 44,
    borderRadius: 6,
  },
});

export default AddItemModalView;
