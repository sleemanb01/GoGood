import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {loginStyles, ProfileSettingsStyles} from '../../styles/STYLES';
import {CustGradient} from '../../components/util/CustGradient';
import {_FONTS} from '../../styles/_FONTS';
import {_BUTTONS} from '../../styles/_BUTTONS';
import {AuthContext} from '../../hooks/userCtx';
import {RootStackParamList} from '../../types/RootStackParamList';
import {CloseButton} from '../../components/Buttons/CloseButton';
import {useTranslation} from 'react-i18next';
import {WhiteUButton} from '../../components/Buttons/WhiteUButton';

export function Menu() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {t} = useTranslation();
  const authCtx = useContext(AuthContext);
  const user = authCtx.userWField;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={loginStyles.container}>
      <View style={ProfileSettingsStyles.headerContainer}>
        <CustGradient>
          <React.Fragment>
            <CloseButton onPress={() => navigation.navigate('Main')} />
            <Text style={_FONTS.btnWhiteText}>
              {t('greeting')} {user.dPerson?.person.uname} {':)'}
            </Text>
          </React.Fragment>
        </CustGradient>
      </View>
      <View style={ProfileSettingsStyles.mainContainer}>
        <WhiteUButton
          onPress={() => {
            navigation.navigate('Main');
          }}
          text={t('homePage')}
        />
        <WhiteUButton
          onPress={() => {
            navigation.navigate('Profile');
          }}
          text={t('profile')}
        />
        <WhiteUButton
          onPress={() => {
            navigation.navigate('About');
          }}
          text={t('about')}
        />
        <WhiteUButton
          onPress={() => {
            navigation.navigate('Contact');
          }}
          text={t('contact')}
        />
        <WhiteUButton onPress={authCtx.logout} text={t('logOut')} />
      </View>
    </KeyboardAvoidingView>
  );
}
