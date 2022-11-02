import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Image, Pressable, Text} from 'react-native';
import {IPersonWFields} from '../../interfaces/download';
import {commonStyles, imageStyles} from '../../styles/STYLES';
import {_FONTS} from '../../styles/_FONTS';

export function MiniProfile({user}: {user: IPersonWFields | undefined}) {
  const {t} = useTranslation();

  user = user as IPersonWFields;
  const image = user.dPerson?.pImage;

  return (
    <View style={commonStyles.rowSpaceBetween}>
      <View style={commonStyles.centerRowDir}>
        <Image
          style={imageStyles.tinyLogo}
          source={
            image
              ? {uri: 'data:image/png;base64,' + image}
              : require('../../images/defaultUser.png')
          }
        />
        <Pressable>
          <View>
            <Text style={_FONTS.blackTextB}>{user.dPerson?.person.uname}</Text>
            <Text style={_FONTS.btnBlackTextWithU}>{t('profileDetails')}</Text>
          </View>
        </Pressable>
      </View>
      <Pressable>
        <Image
          style={imageStyles.tinytinyResizedLogo}
          source={require('../../images/Trash.png')}
        />
      </Pressable>
    </View>
  );
}
