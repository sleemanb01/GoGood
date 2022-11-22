import React from 'react';
import {Image} from 'react-native';
import {imageStyles} from '../../constants/STYLES';
import {USTATUS} from '../../types/enum';

export function UStatusImage({status}: {status: USTATUS}) {
  if (status === 0) {
    return <React.Fragment></React.Fragment>;
  }

  switch (status) {
    case 1: {
      return (
        <Image
          style={imageStyles.tinytinyResizedLogo}
          source={require('../../images/spinner.png')}
        />
      );
    }
    case 2: {
      return (
        <Image
          style={imageStyles.tinytinyResizedLogo}
          source={require('../../images/valid.png')}
        />
      );
    }
    default: {
      return (
        <Image
          style={imageStyles.tinytinyResizedLogo}
          source={require('../../images/invalid.png')}
        />
      );
    }
  }
}
