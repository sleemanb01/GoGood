import React, {useLayoutEffect, useState} from 'react';
import {Alert, Image, Modal, Pressable, View} from 'react-native';
import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {imagePickerModalStyles} from '../../styles/STYLES';
import {_BUTTONS} from '../../styles/_BUTTONS';
import {
  requestCameraPermission,
  requestStoragePermission,
} from '../../util/requestPermission';
import {CloseButton} from '../Buttons/CloseButton';

export function ImagePickerModal({
  setUri,
  visibility,
  setVisibility,
}: {
  setUri: Function;
  visibility: boolean;
  setVisibility: Function;
}) {
  const [isCameraPermitted, setIsCameraPermitted] = useState(false);
  const [isStoragePermitted, setIsstoragePermitted] = useState(false);

  const sizeLimit = 2097152;

  useLayoutEffect(() => {
    requestCameraPermission(setIsCameraPermitted);
    requestStoragePermission(setIsstoragePermitted);
  }, []);

  const openCamera = () => {
    let options: CameraOptions = {
      mediaType: 'photo',
      cameraType: 'back',
      includeBase64: true,
    };
    if (!isCameraPermitted) {
      return;
    }
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets) {
        if (!response.assets) {
          return;
        }

        if (((response.assets[0] as Asset).fileSize as number) > sizeLimit) {
          Alert.alert(
            'Maximum size exceeded',
            'please choose image under 2MB',
            [{text: 'ok'}],
          );
        } else {
          setUri((prev: Asset[]) => [...prev, response.assets?.[0]]);
          closeModal();
        }
      }
    });
  };

  const openGallery = () => {
    const options: ImageLibraryOptions = {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'mixed',
      includeBase64: true,
    };
    if (!isStoragePermitted) {
      return;
    }
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets) {
        if (!response.assets) {
          return;
        }
        if (((response.assets[0] as Asset).fileSize as number) > sizeLimit) {
          Alert.alert(
            'Maximum size exceeded',
            'please choose image under 2MB',
            [{text: 'ok'}],
          );
        } else {
          setUri((prev: Asset[]) => [...prev, response.assets?.[0]]);
          closeModal();
        }
      }
    });
  };

  const closeModal = () => {
    setVisibility(false);
  };

  return (
    <Modal animationType={'fade'} transparent={true} visible={visibility}>
      <View style={imagePickerModalStyles.modal}>
        <Pressable style={_BUTTONS.unActiveBtn} onPress={() => openCamera()}>
          <Image
            style={imagePickerModalStyles.image}
            source={require('../../images/camera.png')}
          />
        </Pressable>
        <Pressable style={_BUTTONS.unActiveBtn} onPress={() => openGallery()}>
          <Image
            style={imagePickerModalStyles.image}
            source={require('../../images/gallery.png')}
          />
        </Pressable>
        <CloseButton onPress={closeModal} />
      </View>
    </Modal>
  );
}
