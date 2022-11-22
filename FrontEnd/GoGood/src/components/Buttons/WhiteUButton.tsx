import {t} from 'i18next';
import React from 'react';
import {Pressable, Text} from 'react-native';
import {_BUTTONS} from '../../constants/_BUTTONS';
import {_FONTS} from '../../constants/_FONTS';

export function WhiteUButton({
  onPress,
  text,
}: {
  onPress: Function;
  text: string;
}) {
  return (
    <Pressable style={_BUTTONS.whiteU} onPress={() => onPress()}>
      <Text style={_FONTS.btnBlackText}>{text}</Text>
    </Pressable>
  );
}
