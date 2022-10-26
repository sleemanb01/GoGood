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
import {imageStyles, loginStyles} from '../../styles/STYLES';
import {_FONTS} from '../../styles/_FONTS';
import {IField} from '../../interfaces/Upload/IField';
import useAsyncStorage from '@react-native-async-storage/async-storage';
import {getFields, postPost} from '../../util/axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {newPostStyles} from '../../styles/STYLES';
import {RootStackParamList} from '../../types/RootStackParamList';
import {ImagePickerModal} from '../../components/ImagePickerModal';
import {Asset} from 'react-native-image-picker';
import {MiniProfile} from '../../components/Profile/MiniProfile';
import {Dropdown} from '../../components/DropDown';
import {IPost} from '../../interfaces/Upload/IPost';
import {nonEmpty} from '../../util/validation';
import {IPersonWFields} from '../../interfaces/Download/IPersonWFields';
import {IDPerson} from '../../interfaces/Download/IDPerson';
import {IPostWGallery} from '../../interfaces/Upload/IPostWGallery';
import {IPostGallery} from '../../interfaces/Upload/IPostGallery';

type Props = NativeStackScreenProps<RootStackParamList, 'NewPost'>;

export function NewPost({route, navigation}: Props) {
  const {t} = useTranslation();
  const [fields, setFields] = useState<IField[]>([]);
  const [modalisVisible, setmodalisVisible] = useState(false);
  const [selected, setSelected] = useState<IField | null>(null);
  const [uriis, setUriis] = useState<Asset[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState(false);

  const titleRef = useRef<TextInput | null>(null);
  const contentRef = useRef<TextInput | null>(null);

  const user = route.params.user as IPersonWFields;
  const position = route.params.position;

  useLayoutEffect(() => {
    (async () => {
      const tmp = await useAsyncStorage.getItem('fields');
      if (tmp) {
        setFields(JSON.parse(tmp));
      } else {
        getFields(setFields, navigation);
      }
    })();
  }, []);

  useEffect(() => {
    if (success) {
      navigation.navigate('App');
    }
  }, [success]);
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

  const submit = () => {
    if (!selected) {
      Alert.alert(t('missingField'), t('chooseField'), [{text: t('ok')}]);
    } else if (!nonEmpty(title)) {
      titleRef.current?.focus();
    } else if (!nonEmpty(content)) {
      contentRef.current?.focus();
    } else {
      console.log('submit');
      let postToPost: IPost = {
        postTitle: title,
        postDescription: content,
        postDate: new Date(),
        personId: (user.dPerson as IDPerson).person.id as number,
        postLng: position?.coords.longitude,
        postLat: position?.coords.latitude,
        fieldId: selected.id,
      };

      let gallery: IPostGallery[] = [];
      uriis.map(curr => {
        let tmp: IPostGallery = {gallery: curr.base64 as string};
        gallery.push(tmp);
      });
      let pwg: IPostWGallery = {
        post: postToPost,
        postGallery: gallery,
      };
      postPost(pwg, navigation, setSuccess);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={loginStyles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <React.Fragment>
          <View style={newPostStyles.headerContainer}>
            <MiniProfile user={user} />
          </View>
          <View style={newPostStyles.mainContainer}>
            <Dropdown
              arr={fields}
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
            <PrimaryButton text={t('addRequest')} onPress={submit} />
          </View>
        </React.Fragment>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
