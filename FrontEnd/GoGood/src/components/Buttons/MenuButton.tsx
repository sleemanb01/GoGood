import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable, Image} from 'react-native';
import {RootStackParamList} from '../../types/RootStackParamList';

export function MenuButton() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Menu');
      }}>
      <Image source={require('../../images/menu.png')} />
    </Pressable>
  );
}
