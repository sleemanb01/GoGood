import React from 'react';
import {View, Image, Text} from 'react-native';
import {IDPerson} from '../../interfaces/Download/IDPerson';
import {mediumProfileStyles, imageStyles} from '../../styles/STYLES';
import {_FONTS} from '../../styles/_FONTS';

export function MediumProfile({user}: {user: IDPerson}) {
  return (
    <View style={mediumProfileStyles.container}>
      <Image
        style={imageStyles.profileImage}
        source={
          user.pImage
            ? {uri: 'data:image/png;base64,' + user.pImage}
            : require('../../images/defaultUser.png')
        }
      />
      <Text style={_FONTS.btnWhiteText}>{user.person.uname}</Text>
    </View>
  );
}
