import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  GestureResponderEvent,
  Image,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {imageStyles, profileStyles} from '../../styles/STYLES';
import {CustGradient} from '../../components/util/CustGradient';
import {_FONTS} from '../../styles/_FONTS';
import axios from 'axios';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {ICtx} from '../../interfaces/ICtx';
import {_BUTTONS} from '../../styles/_BUTTONS';
import {IPerson} from '../../interfaces/Upload/IPerson';
import {AuthContext} from '../../hooks/userCtx';
import {RootStackParamList} from '../../types/RootStackParamList';
import {useTranslation} from 'react-i18next';
import {getReviews, signInUp} from '../../util/axios';
import {nonEmpty, phoneValidate} from '../../util/validation';
import {IDPerson} from '../../interfaces/Download/IDPerson';
import {MediumProfile} from '../../components/Profile/MediumProfile';
import {IProfessionalReviews} from '../../interfaces/Upload/IPofessionalReviews';
import {IPersonReviewWithProfile} from '../../interfaces/Download/IPersonReviewWithProfile';
import {MiniProfile} from '../../components/Profile/MiniProfile';
import {IPersonWFields} from '../../interfaces/Download/IPersonWFields';

export function Profile() {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const authCtx = useContext(AuthContext);
  const user = authCtx.userWField.dPerson as IDPerson;

  const [reviews, setReviews] = useState<IPersonReviewWithProfile[]>([]);
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
        {reviews.map((curr, i) => (
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
              {curr.personImage1 ? (
                <Image
                  style={{width: 50, height: 50, borderRadius: 30}}
                  source={{uri: 'data:image/png;base64,' + curr.personImage1}}
                />
              ) : (
                <Image
                  style={{width: 50, height: 50, borderRadius: 30}}
                  source={require('../../images/defaultUser.png')}
                />
              )}
              <View>
                <Text style={_FONTS.btnBlackText}>{curr.uname}</Text>
                <Text>לפני 5 ימים</Text>
              </View>
            </View>
            <Text style={_FONTS.btnBlackText}>{curr.review}</Text>
          </View>
        ))}
      </View>
    </KeyboardAvoidingView>
  );
}
// function openGallery(
//   authCtx: ICtx,
//   setUri:Function
// ){
//   const options:ImageLibraryOptions={
//       maxHeight:200,
//       maxWidth:200,
//       selectionLimit: 0,
//       mediaType:'photo',
//       includeBase64: true,
// }
//       const images =launchImageLibrary(options,(response)=>{
//           let strArr:string[]=[];
//           response.assets?.map((curr, i) => (strArr.push(curr.base64?curr.base64:'')));
//           authCtx.setImage(strArr[0]);
//           setUri(strArr);
//       })

// }

// async function getReviews(authCtx: ICtx, setReviews: Function) {
//   try {
//     const url = 'http://10.0.2.2:7070/api/';
//     const controller = 'Persons/GetPersonReviews/';
//     const result = await axios.get(
//       url + controller + authCtx.userWField.dPerson?.person.id,
//     );
//     let data = result.data;
//     console.log(data);

//     setReviews(data);
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function updateProfile(
//     uname: string | undefined,
//     phone: string | undefined,
//     navigation: NativeStackNavigationProp<RootStackParamList>,
//     authCtx: ICtx,) {
//         let personWImage:IPersonImage={
//             personId:authCtx.userWField.person?.id,
//             personImage1:authCtx.userWField.person?.image
//         };
//         try {
//             const url = 'http://10.0.2.2:7070/api/';
//             const controller = 'Persons/postPersonImage/';
//             const result  = await axios.post(url + controller,personWImage);
//             let data = result.data;
//           } catch (err) {
//             console.log(err);
//         }
//         const person: IPerson = {
//             id:authCtx.userWField.person?.id,
//             uname: uname?uname:authCtx.userWField.person?.uname,
//             phone: phone?phone:authCtx.userWField.person?.phone,
//         };
//     try {
//         const url = 'http://10.0.2.2:7070/api/';
//         const controller = 'Persons/updateProfile/';
//         const result  = await axios.put(url + controller,person);
//         let data = result.data;
//         navigation.navigate('ProfileSettings')
//       } catch (err) {
//         console.log(err);
//   }
// }
