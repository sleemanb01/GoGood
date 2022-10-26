import {StyleSheet} from 'react-native';
import {_COLORS} from './_COLORS';

export const _FONTS = StyleSheet.create({
  custHebrew: {
    color: _COLORS.white,
    fontFamily: 'OpenSans-Regular',
    fontSize: 18,
    textAlign: 'center',
    margin: 8,
  },
  custHebrewBold: {
    fontFamily: 'OpenSans-Bold',
    color: _COLORS.white,
    fontSize: 35,
    margin: 8,
  },
  btnBlackText: {
    textAlign: 'center',
    fontSize: 20,
    color: _COLORS.black,
  },
  btnBlackText2: {
    textAlign: 'center',
    fontSize: 15,
    color: _COLORS.black,
  },
  btnBlackTextSmall: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 18,
    color: _COLORS.black,
  },
  blackText: {
    color: _COLORS.black,
    textAlign: 'left',
  },
  blackTextB: {
    color: _COLORS.black,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  btnBlackTextWithU: {
    textAlign: 'left',
    color: _COLORS.black,
    textDecorationLine: 'underline',
  },
  marginTop: {
    marginTop: 20,
  },
  marginTopA: {
    marginTop: 80,
  },
  sideInfo: {
    color: _COLORS.gray,
    marginStart: 10,
  },
  sideInfoBold: {
    color: _COLORS.gray,
    fontWeight: 'bold',
  },
  title: {
    color: _COLORS.black,
    fontWeight: 'bold',
  },
  btnWhiteText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: _COLORS.white,
  },
  btnWhiteTextProfile: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: _COLORS.white,
  },
});
