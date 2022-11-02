import {t} from 'i18next';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Image,
  View,
  Pressable,
} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {AuthContext} from '../../hooks/userCtx';
import {IDPerson} from '../../interfaces/download';
import {
  imageStyles,
  commonStyles,
  editProfileStyles,
} from '../../styles/STYLES';
import {USTATUS} from '../../types/enum';
import {updatePerson} from '../../util/axios';
import {base64ToHex, getBytes} from '../../util/dataHandler';
import {nonEmpty, phoneValidate} from '../../util/validation';
import {ImagePickerModal} from '../util/ImagePickerModal';

import {UStatusImage} from '../util/UStatusImage';

export function EditProfile() {
  const authCtx = useContext(AuthContext);
  const user = authCtx.userWField.dPerson as IDPerson;

  const nameInputRef = useRef<TextInput | null>(null);
  const phoneInputRef = useRef<TextInput | null>(null);

  const [name, setName] = useState(user.person.uname);
  const [phone, setPhone] = useState(user.person.phone);
  const [modalisVisible, setmodalisVisible] = useState(false);
  const [urii, setUrii] = useState<Asset[]>([]);

  const [isNameUpdate, setIsNameUpdate] = useState<USTATUS>(0);
  const [isPhoneUpdate, setIsPHoneUpdate] = useState<USTATUS>(0);
  const [isImageUpdate, setIsImageUpdate] = useState<USTATUS>(0);

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

  const updateName = () => {
    if (!nonEmpty(name)) {
      if (nameInputRef != null) {
        (nameInputRef.current as unknown as TextInput).focus();
      }
    } else {
      setIsNameUpdate(1);
      let dPerson: IDPerson = {
        person: {id: user.person.id, uname: name, phone: user.person.phone},
        pImage: user.pImage,
      };
      updatePerson(dPerson, authCtx, setIsNameUpdate);
    }
  };
  const updatePhone = () => {
    if (!phoneValidate(phone)) {
      if (phoneInputRef != null) {
        (phoneInputRef.current as unknown as TextInput).focus();
      }
    } else {
      setIsPHoneUpdate(1);
      let dPerson: IDPerson = {
        person: {id: user.person.id, uname: user.person.uname, phone: phone},
        pImage: user.pImage,
      };
      updatePerson(dPerson, authCtx, setIsPHoneUpdate);
    }
  };

  useEffect(() => {
    if (urii.length) {
      setIsImageUpdate(1);
      let dPerson: IDPerson = {
        person: {
          id: user.person.id,
          uname: user.person.uname,
          phone: user.person.phone,
        },
        pImage: getBytes(urii[0].base64 as string),
      };

      // base64ToHex(urii[0].base64 as string);

      updatePerson(dPerson, authCtx, setIsImageUpdate);
    }
  }, [urii]);

  return (
    <View style={editProfileStyles.container}>
      <View style={editProfileStyles.editWCheck}>
        <Pressable
          onPress={() => {
            setmodalisVisible(true);
          }}>
          <Image
            style={imageStyles.profileImage}
            source={
              user.pImage
                ? {uri: 'data:image/png;base64,' + user.pImage}
                : require('../../images/defaultUser.png')
            }
          />
        </Pressable>
        <UStatusImage status={isImageUpdate} />
        <ImagePickerModal
          setUri={setUrii}
          visibility={modalisVisible}
          setVisibility={setmodalisVisible}
        />
      </View>

      <View style={editProfileStyles.editWCheck}>
        <TextInput
          value={name}
          ref={nameInputRef}
          onChange={nameChangeHandler}
          onBlur={updateName}
          style={commonStyles.textInput}
          placeholder={t('name')}
        />
        <UStatusImage status={isNameUpdate} />
      </View>
      <View style={editProfileStyles.editWCheck}>
        <TextInput
          ref={phoneInputRef}
          value={phone}
          onChange={phoneChangeHandler}
          onBlur={updatePhone}
          keyboardType={'numeric'}
          style={commonStyles.textInput}
          placeholder={t('phone')}
        />
        <UStatusImage status={isPhoneUpdate} />
      </View>
    </View>
  );
}
