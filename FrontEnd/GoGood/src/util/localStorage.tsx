import useAsyncStorage from '@react-native-async-storage/async-storage';
import {fetchFields} from './axios';

export const getFields = (setFields: Function) => {
  (async () => {
    const tmp = await useAsyncStorage.getItem('fields');
    if (tmp) {
      setFields(JSON.parse(tmp));
    } else {
      fetchFields(setFields);
    }
  })();
};
