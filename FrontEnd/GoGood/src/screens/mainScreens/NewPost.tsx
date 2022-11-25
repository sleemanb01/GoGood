import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {imageStyles, loginStyles} from '../../constants/STYLES';
import {_FONTS} from '../../constants/_FONTS';
import {postPost} from '../../util/axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {newPostStyles} from '../../constants/STYLES';
import {RootStackParamList} from '../../types/RootStackParamList';
import {Asset} from 'react-native-image-picker';
import {MiniProfile} from '../../components/Profile/MiniProfile';
import {Dropdown} from '../../components/util/DropDown';
import {nonEmpty} from '../../util/validation';
import {
  IPersonWFields,
  IDPerson,
  IPostWGallery,
  IDPostGallery,
} from '../../interfaces/download';
import {IField, IPost} from '../../interfaces/upload';
import {ImagePickerModal} from '../../components/Modals/ImagePicker';
import {getFields} from '../../util/localStorage';
import {LoadingScreen} from '../utilScreens/LoadingScreen';
import {dateToIso} from '../../util/dateConverters';
import {PSTATUS} from '../../types/enum';

type Props = NativeStackScreenProps<RootStackParamList, 'NewPost'>;

export function NewPost({route, navigation}: Props) {
  const {t} = useTranslation();
  const [fields, setFields] = useState<IField[] | null>([]);
  const [modalisVisible, setmodalisVisible] = useState(false);
  const [selected, setSelected] = useState<IField | null>(null);
  const [uriis, setUriis] = useState<Asset[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState<boolean | null>(null);

  const titleRef = useRef<TextInput | null>(null);
  const contentRef = useRef<TextInput | null>(null);

  const user = route.params.user as IPersonWFields;
  const position = route.params.position;

  useLayoutEffect(() => {
    getFields(setFields);
  }, []);

  useEffect(() => {
    if (success) {
      navigation.navigate('App');
    }
  }, [success]);

  if (fields === null) {
    return <LoadingScreen />;
  }
  if (success === false) {
    navigation.navigate('ErrorScreen');
  }

  const titleChangeHandler = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setTitle(event.nativeEvent.text);
  };

  const contentChangeHandler = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setContent(event.nativeEvent.text);
  };

  const submitHandler = () => {
    if (!selected) {
      Alert.alert(t('missingField'), t('chooseField'), [{text: t('ok')}]);
    } else if (!nonEmpty(title)) {
      titleRef.current?.focus();
    } else if (!nonEmpty(content)) {
      contentRef.current?.focus();
    } else {
      // console.log(new Date());

      let postToPost: IPost = {
        postTitle: title,
        postDescription: content,
        postDate: new Date(),
        personId: (user.dPerson as IDPerson).person.id as number,
        postLng: position?.coords.longitude,
        postLat: position?.coords.latitude,
        fieldId: selected.id,
        postStatus: PSTATUS.PENDING,
      };

      let dGallery: IDPostGallery[] = [];
      uriis.map(curr => {
        let tmp: IDPostGallery = {
          dGallery: curr.base64 as string,
        };
        dGallery.push(tmp);
      });
      let pwg: IPostWGallery = {
        post: postToPost,
        dPostGallery: dGallery,
      };
      postPost(pwg, setSuccess);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={loginStyles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <React.Fragment>
          <View style={newPostStyles.headerContainer}>
            <MiniProfile user={user.dPerson as IDPerson} />
          </View>
          <View style={newPostStyles.mainContainer}>
            <Dropdown
              arr={fields as IField[]}
              selected={selected}
              setSelected={setSelected}
            />
            <TextInput
              value={title}
              ref={titleRef}
              onChange={titleChangeHandler}
              style={newPostStyles.textInput}
              placeholder={t('headline')}
            />
            <ScrollView>
              <TextInput
                value={content}
                ref={contentRef}
                onChange={contentChangeHandler}
                multiline={true}
                numberOfLines={5}
                maxLength={200}
                style={newPostStyles.textInput}
                placeholder={t('content')}
              />
              <Pressable
                onPress={() => {
                  setmodalisVisible(true);
                }}>
                <View style={newPostStyles.chooseGalleryContainer}>
                  <Image
                    style={imageStyles.tinyResizedLogo}
                    source={require('../../images/AddImage.png')}
                  />
                  <Text style={_FONTS.btnBlackTextWithU}>{t('gallery')}</Text>
                </View>
              </Pressable>
              <ImagePickerModal
                setUri={setUriis}
                visibility={modalisVisible}
                setVisibility={setmodalisVisible}
              />
              <View style={newPostStyles.imagesContainer}>
                {uriis.map((curr, i) => (
                  <Image
                    key={i.toString()}
                    style={newPostStyles.image}
                    source={{uri: curr.uri}}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
          <View style={newPostStyles.footerContainer}>
            <PrimaryButton text={t('addRequest')} onPress={submitHandler} />
          </View>
        </React.Fragment>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
