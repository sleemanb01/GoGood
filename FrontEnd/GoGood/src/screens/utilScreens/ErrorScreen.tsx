import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Pressable, Text, View} from 'react-native';
import {errorScreenStyles} from '../../styles/STYLES';
import {_FONTS} from '../../styles/_FONTS';
import {RootStackParamList} from '../../types/RootStackParamList';

export function ErrorScreen() {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={errorScreenStyles.container}>
      <Image source={require('../../images/404_Monster.png')} />
      <Text style={[_FONTS.btnBlackText, _FONTS.marginTopA]}>{t('error')}</Text>
      <Pressable onPress={navigation.goBack}>
        <Text style={[_FONTS.btnBlackTextWithU, _FONTS.marginTop]}>
          {t('goToHome')}
        </Text>
      </Pressable>
    </View>
  );
}
