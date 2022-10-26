import React from 'react';
import {Image, Pressable} from 'react-native';

export function NotificationButton() {
  return (
    <Pressable
      onPress={async () => {
        console.log('notification pressed');
      }}>
      <Image source={require('../../images/Combined_Shape.png')} />
    </Pressable>
  );
}
