import React, {useContext, useEffect, useState} from 'react';
import {View, Image, Text, Pressable, ScrollView} from 'react-native';
import {CustGradient} from '../../components/util/CustGradient';
import {RootStackParamList} from '../../types/RootStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {_BUTTONS} from '../../styles/_BUTTONS';
import {_FONTS} from '../../styles/_FONTS';
import {categoriesStyles} from '../../styles/STYLES';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../hooks/userCtx';
import {IField} from '../../interfaces/Upload/IField';
import {IProfessionalFields} from '../../interfaces/Download/IProfessionalFields';
import {useTranslation} from 'react-i18next';
import {getFields, postProfessionalFields} from '../../util/axios';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {LoadingScreen} from '../utilScreens/LoadingScreen';

interface ISelectField {
  field: IField;
  selected: boolean;
}

export function Categories() {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const authCtx = useContext(AuthContext);
  const [fields, setFields] = useState<IField[]>([]);
  const [selectedFields, setSelectedFields] = useState<ISelectField[]>([]);
  const [success, setSuccess] = useState(false);

  if (success) {
    authCtx.updateFields(getChoosenFields(selectedFields));
  }

  useEffect(() => {
    getFields(setFields, navigation);
  }, []);

  useEffect(() => {
    setSelectedFields(addSelection(fields));
  }, [fields]);

  if (fields.length == 0) {
    return <LoadingScreen />;
  }

  function pressHandler(index: number) {
    setSelectedFields((prev: ISelectField[]) =>
      updateSpecificIndex(index, prev),
    );
  }

  const submitHandler = async () => {
    postProfessionalFields(
      adjustDataForUpload(
        selectedFields,
        authCtx.userWField.dPerson?.person.id,
      ),
      navigation,
      setSuccess,
    );
  };

  return (
    <CustGradient>
      <React.Fragment>
        <View style={categoriesStyles.headerContainer}>
          <Image source={require('../../images/Moster_Hi.png')} />
          <Text style={_FONTS.custHebrewBold}>{t('occupation')}</Text>
          <Text style={_FONTS.custHebrew}>{t('occupationInstructions')}</Text>
        </View>
        <View style={categoriesStyles.mainContainer}>
          <ScrollView>
            <View style={categoriesStyles.scrollableViewContainer}>
              {selectedFields.map((curr, i) => (
                <Pressable
                  onPress={() => pressHandler(i)}
                  style={
                    selectedFields[i].selected
                      ? _BUTTONS.activeBtn
                      : _BUTTONS.unActiveBtn
                  }
                  key={i.toString()}>
                  <Text style={[_FONTS.btnBlackText]}>
                    {curr.field.fieldName}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={categoriesStyles.footerContainer}>
          <PrimaryButton text={t('goToHome')} onPress={submitHandler} />
        </View>
      </React.Fragment>
    </CustGradient>
  );
}

function getChoosenFields(fields: ISelectField[]): IField[] {
  let arr: IField[] = [];

  fields.map(curr => {
    if (curr.selected) {
      arr = [...arr, {id: curr.field.id, fieldName: curr.field.fieldName}];
    }
  });
  return arr;
}

function addSelection(fields: IField[]) {
  let sf = new Array<ISelectField>(fields.length);
  if (fields.length > 0) {
    for (let i = 0; i < fields.length; i++) {
      sf[i] = {
        field: {id: fields[i].id, fieldName: fields[i].fieldName},
        selected: false,
      };
    }
    sf.shift();
  }
  return sf;
}

function adjustDataForUpload(
  selectedFields: ISelectField[],
  personId: number | undefined,
): IProfessionalFields[] {
  let arr: IProfessionalFields[] = [];

  selectedFields.map(curr => {
    arr = [...arr, {fieldId: curr.field.id, personId: personId as number}];
  });

  return arr;
}

function updateSpecificIndex(
  index: number,
  arr: ISelectField[],
): ISelectField[] {
  let newArr = [...arr];
  let element = arr[index];
  element.selected = !element.selected;
  newArr[index] = element;
  return newArr;
}
