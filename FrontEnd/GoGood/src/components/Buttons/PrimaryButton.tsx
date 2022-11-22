import React from 'react';
import {Pressable, Text} from 'react-native';
import {_BUTTONS} from '../../constants/_BUTTONS';
import {_FONTS} from '../../constants/_FONTS';

export function PrimaryButton({
  text,
  onPress,
}: {
  text: string;
  onPress: Function;
}) {
  return (
    <Pressable style={_BUTTONS.mainBtn} onPress={event => onPress(event)}>
      <Text style={_FONTS.btnBlackText}>{text}</Text>
    </Pressable>
  );
}
