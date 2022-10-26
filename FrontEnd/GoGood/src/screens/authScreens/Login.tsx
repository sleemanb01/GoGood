import React, {useContext, useReducer, useRef, useState} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  GestureResponderEvent,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {CustGradient} from '../../components/util/CustGradient';
import {commonStyles, loginStyles} from '../../styles/STYLES';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {_BUTTONS} from '../../styles/_BUTTONS';
import {_FONTS} from '../../styles/_FONTS';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../hooks/userCtx';
import {useTranslation} from 'react-i18next';
import {signInUp} from '../../util/axios';
import {RootStackParamList} from '../../types/RootStackParamList';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {nonEmpty, phoneValidate} from '../../util/validation';

export function Login() {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const authCtx = useContext(AuthContext);

  const nameInputRef = useRef<TextInput | null>(null);
  const phoneInputRef = useRef<TextInput | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const nameChangeHandler = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setName(event.nativeEvent.text);
  };

  const phoneChangeHandler = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setPhone(event.nativeEvent.text);
  };

  function submitHandler(event: GestureResponderEvent) {
    event.preventDefault();

    if (!nonEmpty(name)) {
      if (nameInputRef != null) {
        (nameInputRef.current as unknown as TextInput).focus();
      }
    } else if (!phoneValidate(phone)) {
      if (phoneInputRef != null) {
        (phoneInputRef.current as unknown as TextInput).focus();
      }
    } else {
      signInUp({uname: name, phone: phone}, navigation, authCtx);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={loginStyles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <CustGradient>
          <React.Fragment>
            <View style={loginStyles.headContainer}>
              <Image
                style={{marginTop: 120}}
                source={require('../../images/Moster_Hi.png')}
              />
              <View style={{width: '84%', alignItems: 'center'}}>
                <Text style={_FONTS.custHebrewBold}>{t('welcome')}</Text>
                <Text style={_FONTS.custHebrew}>{t('welcomeLabel')}</Text>
              </View>
            </View>
            <View style={loginStyles.mainContainer}>
              <TextInput
                value={name}
                ref={nameInputRef}
                onChange={nameChangeHandler}
                style={commonStyles.textInput2}
                placeholder={t('name')}></TextInput>
              <TextInput
                ref={phoneInputRef}
                value={phone}
                onChange={phoneChangeHandler}
                keyboardType={'numeric'}
                style={commonStyles.textInput2}
                placeholder={t('phone')}></TextInput>
            </View>
            <View style={loginStyles.footerContainer}>
              <PrimaryButton text={t('continue')} onPress={submitHandler} />
            </View>
          </React.Fragment>
        </CustGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
