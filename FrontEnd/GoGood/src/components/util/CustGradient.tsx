import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {_COLORS} from '../../constants/_COLORS';

export const CustGradient = (props: {children: JSX.Element}) => {
  const style = StyleSheet.create({
    gradientStyle: {
      flex: 1,
    },
  });

  const start = {x: 0, y: 0};
  const end = {x: 0, y: 1};
  const colors = [_COLORS.primary, _COLORS.secondary];

  return (
    <LinearGradient
      style={style.gradientStyle}
      start={start}
      end={end}
      colors={colors}>
      {props.children}
    </LinearGradient>
  );
};
