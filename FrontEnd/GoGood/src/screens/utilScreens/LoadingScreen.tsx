import React from 'react';
import {Image, View} from 'react-native';
import {CustGradient} from '../../components/util/CustGradient';
import {loadingStyles} from '../../constants/STYLES';
import {_BUTTONS} from '../../constants/_BUTTONS';
import {_FONTS} from '../../constants/_FONTS';

export function LoadingScreen() {
  return (
    <CustGradient>
      <React.Fragment>
        <View style={loadingStyles.headerContainer}>
          <Image source={require('../../images/Moster_Hi.png')} />
          <Image source={require('../../images/Group_31.png')} />
        </View>
        <View style={loadingStyles.footerContainer}>
          <Image source={require('../../images/Fill_1.png')} />
        </View>
      </React.Fragment>
    </CustGradient>
  );
}
