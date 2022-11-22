import React from 'react';
import {Image} from 'react-native';
import {imageStyles} from '../../constants/STYLES';

export function LoadingButton() {
  return (
    <Image
      style={imageStyles.tinytinyResizedLogo}
      source={require('../../images/spinner.png')}
    />
  );
}
