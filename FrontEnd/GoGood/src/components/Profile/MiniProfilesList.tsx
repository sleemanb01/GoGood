import React from 'react';
import {Modal, Pressable, View} from 'react-native';
import {imagePickerModalStyles} from '../../constants/STYLES';
import {IDPerson} from '../../interfaces/download';
import {CloseButton} from '../Buttons/CloseButton';
import {MiniProfile} from './MiniProfile';

export function MiniProfilesList({
  users,
  onPress,
  setIsModalVisible,
  isModalVisible,
}: {
  users: IDPerson[];
  onPress: Function;
  setIsModalVisible: Function;
  isModalVisible: boolean;
}) {
  const closeModal = () => {
    setIsModalVisible((prev: boolean) => !prev);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={closeModal}
      presentationStyle="overFullScreen">
      <View style={imagePickerModalStyles.modal}>
        {users.map((curr, i) => (
          <Pressable
            key={i.toString()}
            onPress={() => {
              closeModal();
              onPress(curr.person.id);
            }}>
            <MiniProfile user={curr} />
          </Pressable>
        ))}
        <CloseButton onPress={closeModal} />
      </View>
    </Modal>
  );
}
