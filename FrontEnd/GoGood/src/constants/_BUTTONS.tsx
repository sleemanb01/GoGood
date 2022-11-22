import {StyleSheet} from 'react-native';
import {_COLORS} from './_COLORS';

export const _BUTTONS = StyleSheet.create({
  activeBtn: {
    opacity: 0.7,
    borderRadius: 27.5,
    padding: 16,
    margin: 18,
    backgroundColor: _COLORS.green,
    height: '20%',
  },
  activeBtn2: {
    opacity: 0.7,
    borderRadius: 27.5,
    padding: 5,
    paddingHorizontal: 10,
    // margin: 18,
    backgroundColor: _COLORS.green,
    // height: '20%',
  },
  unActiveBtn: {
    opacity: 0.7,
    borderRadius: 27.5,
    padding: 16,
    margin: 18,
    backgroundColor: _COLORS.white,
    height: '20%',
  },
  mainBtn: {
    borderRadius: 27.5,
    padding: 16,
    margin: 18,
    backgroundColor: _COLORS.yellow,
    opacity: 1,
  },
  closeBtn: {
    padding: 10,
  },
  whiteU: {
    borderBottomWidth: 0.7,
    paddingBottom: 20,
    borderColor: _COLORS.gray,
  },
});
