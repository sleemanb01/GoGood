import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {View, Image, Text, Pressable, ScrollView} from 'react-native';
import {CustGradient} from '../../components/util/CustGradient';
import {RootStackParamList} from '../../types/RootStackParamList';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {_BUTTONS} from '../../constants/_BUTTONS';
import {_FONTS} from '../../constants/_FONTS';
import {categoriesStyles} from '../../constants/STYLES';
import {AuthContext} from '../../hooks/userCtx';
import {useTranslation} from 'react-i18next';
import {postProfessionalFields} from '../../util/axios';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {LoadingScreen} from '../utilScreens/LoadingScreen';
import {IField, IProfessionalField} from '../../interfaces/upload';
import {useNavigation} from '@react-navigation/native';
import {getFields} from '../../util/localStorage';

interface ISelectField {
  field: IField;
  selected: boolean;
}

export function Categories() {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const authCtx = useContext(AuthContext);
  const [selectedFields, setSelectedFields] = useState<ISelectField[]>([]);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [fields, setFields] = useState<IField[]>([]);

  const personId = authCtx.userWField.dPerson?.person.id;

  useLayoutEffect(() => {
    getFields(setFields);
  }, []);

  if (success) {
    authCtx.updateFields(getChoosenFields(selectedFields));
  } else if (success === false) {
    navigation.navigate('ErrorScreen');
  }

  useEffect(() => {
    setSelectedFields(addSelection(fields as IField[]));
  }, [fields]);

  if (selectedFields.length === 0) {
    return <LoadingScreen />;
  }
  if (success === false) {
    navigation.navigate('ErrorScreen');
  }

  function pressHandler(index: number) {
    setSelectedFields((prev: ISelectField[]) =>
      updateSpecificIndex(index, prev),
    );
  }

  const submitHandler = async () => {
    postProfessionalFields(
      adjustDataForUpload(selectedFields, personId as number),
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

function getChoosenFields(selectedFields: ISelectField[]): IField[] {
  let pf: IField[] = [];
  pf = [
    ...pf,
    {
      id: selectedFields[0].field.id,
      fieldName: selectedFields[0].field.fieldName,
    },
  ];
  for (let i = 1; i < selectedFields.length; i++) {
    if (selectedFields[i].selected) {
      pf = [
        ...pf,
        {
          id: selectedFields[i].field.id,
          fieldName: selectedFields[i].field.fieldName,
        },
      ];
    }
  }

  return pf;
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
  personId: number,
): IProfessionalField[] {
  let arr: IProfessionalField[] = [];

  selectedFields.map(curr => {
    if (curr.selected) {
      arr = [...arr, {fieldId: curr.field.id, personId: personId as number}];
    }
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
