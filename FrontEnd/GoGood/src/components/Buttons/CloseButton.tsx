import React from 'react';
import {Image, Pressable, Text} from 'react-native';
import {imageStyles} from '../../constants/STYLES';
import {_BUTTONS} from '../../constants/_BUTTONS';

export function CloseButton({onPress}: {onPress: Function}) {
  return (
    <Pressable style={_BUTTONS.closeBtn} onPress={() => onPress()}>
      <Image
        style={imageStyles.tinytinyResizedLogo}
        source={require('../../images/Close_white.png')}
      />
    </Pressable>
  );
}
