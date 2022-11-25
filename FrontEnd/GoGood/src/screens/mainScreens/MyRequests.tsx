import React from 'react';
import {ILocation} from '../../interfaces/ILocation';
import Posts from '../../components/Posts';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/RootStackParamList';
import {Sort} from '../../components/util/Sort';
import {IPersonWFields} from '../../interfaces/download';

export function MyRequests({
  currPosition,
  user,
}: {
  currPosition: ILocation | null | undefined;
  user: IPersonWFields;
}) {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  let params = '';
  let tmp = user.dPerson;
  if (tmp) {
    params = tmp.person.id ? tmp.person.id.toString() : '';
  }

  const addRequest = () => {
    navigation.navigate('NewPost', {
      user: user,
      position: currPosition,
    });
  };

  // console.log(user);

  return (
    <React.Fragment>
      <Sort />
      <Posts
        params={params}
        position={currPosition}
        controller={'Posts/getPostsByPerson/'}
      />
      <PrimaryButton text={t('addRequest')} onPress={addRequest} />
    </React.Fragment>
  );
}
