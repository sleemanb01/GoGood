import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {imageStyles, profileStyles} from '../../styles/STYLES';
import {_FONTS} from '../../styles/_FONTS';
import {_BUTTONS} from '../../styles/_BUTTONS';
import {AuthContext} from '../../hooks/userCtx';
import {RootStackParamList} from '../../types/RootStackParamList';
import {useTranslation} from 'react-i18next';
import {getReviews} from '../../util/axios';
import {MediumProfile} from '../../components/Profile/MediumProfile';
import {IDPerson} from '../../interfaces/download';
import {IDisplayPerson} from '../../interfaces/view';

export function Profile() {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const authCtx = useContext(AuthContext);
  const user = authCtx.userWField.dPerson as IDPerson;

  const [reviews, setReviews] = useState<IDisplayPerson[]>([]);
  useEffect(() => {
    getReviews(authCtx, setReviews);
  }, []);

  const handlePofilePress = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={profileStyles.container}>
      <View style={profileStyles.headerContainer}>
        <TouchableOpacity onPress={handlePofilePress}>
          <MediumProfile user={user} />
        </TouchableOpacity>
      </View>
      <View style={profileStyles.mainContainer}>
        <Image
          source={require('../../images/Filter.png')}
          style={imageStyles.tinytinyResizedLogo}
        />
        <Text style={_FONTS.btnBlackText}>
          {t('howIsItToHelp') + user?.person.uname + ' ?'}
        </Text>
      </View>
      <View style={profileStyles.footerContainer}>
        {/* {reviews.map((curr, i) => (
          <View
            key={i.toString()}
            style={{
              justifyContent: 'space-between',
              backgroundColor: '#FFFFFF',
              marginVertical: 7,
              alignItems: 'flex-end',
              padding: 20,
            }}>
            <View style={{flexDirection: 'row-reverse'}}>
              {curr.dPerson.pImage ? (
                <Image
                  style={{width: 50, height: 50, borderRadius: 30}}
                  source={{uri: 'data:image/png;base64,' + curr.dPerson.pImage}}
                />
              ) : (
                <Image
                  style={{width: 50, height: 50, borderRadius: 30}}
                  source={require('../../images/defaultUser.png')}
                />
              )}
              <View>
                <Text style={_FONTS.btnBlackText}>
                  {curr.dPerson.person.uname}
                </Text>
                <Text>לפני 5 ימים</Text>
              </View>
            </View>
            <Text style={_FONTS.btnBlackText}>{curr.dPerson.person.uname}</Text>
          </View>
        ))} */}
      </View>
    </KeyboardAvoidingView>
  );
}
