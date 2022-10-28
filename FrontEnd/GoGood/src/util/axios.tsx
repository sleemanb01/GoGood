import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import axios from 'axios';
import {RootStackParamList} from '../types/RootStackParamList';
import {IPersonWFields} from '../interfaces/Download/IPersonWFields';
import {IProfessionalFields} from '../interfaces/Download/IProfessionalFields';
import {ICtx} from '../interfaces/ICtx';
import {IPerson} from '../interfaces/Upload/IPerson';
import {adjustPostData} from './dataHandler';
import {IPost} from '../interfaces/Upload/IPost';
import {IDPerson} from '../interfaces/Download/IDPerson';
import {IPostWGallery} from '../interfaces/Upload/IPostWGallery';
import {IPostPropose} from '../interfaces/Upload/IPostPropose';

const url = 'http://10.0.2.2:7070/api/';

export const getPosts = async (
  param: string,
  setPosts: Function,
  navigation: NativeStackNavigationProp<RootStackParamList>,
  setIsLoading: Function,
  controller: string,
) => {
  if (param.length > 0) {
    try {
      const result = await axios.get(url + controller + param);
      const finalData = adjustPostData(result.data);
      setIsLoading(false);
      setPosts(finalData);
    } catch (err) {
      console.log(err);
      navigation.navigate('ErrorScreen');
    }
  }
};

export const postPost = async (
  post: IPostWGallery,
  navigation: NativeStackNavigationProp<RootStackParamList>,
  setSuccess: Function,
) => {
  try {
    const controller = 'Posts/postPostWGallery';
    const result = await axios.post(url + controller, post);
    if (result.status === 204) {
      setSuccess(true);
    }
  } catch (err) {
    console.log(err);
    navigation.navigate('ErrorScreen');
  }
};

export const getFields = async (
  setFields: Function,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  const controller = 'Fields';
  try {
    const result = await axios.get(url + controller);
    let data = result.data;
    if (result.status === 200) {
      await AsyncStorage.setItem('fields', JSON.stringify(data));
      setFields(data);
    }
  } catch (err) {
    console.log(err);
    navigation.navigate('ErrorScreen');
  }
};

export const postProfessionalFields = async (
  pFields: IProfessionalFields[],
  navigation: NativeStackNavigationProp<RootStackParamList>,
  setSuccess: Function,
) => {
  const controller = 'ProfessionalFields/ss';
  try {
    const result = await axios.post(url + controller, pFields);
    if (result.status === 200) {
      setSuccess(true);
    }
  } catch (err) {
    console.log(err);
    navigation.navigate('ErrorScreen');
  }
};

export const signInUp = async (
  person: IPerson,
  navigation: NativeStackNavigationProp<RootStackParamList>,
  authCtx: ICtx,
) => {
  const controller = 'Persons/signInUp/';
  try {
    const result = await axios.post(url + controller, person);

    (async () => {
      authCtx.authenticate(result.data as IPersonWFields);
    })();
  } catch (err) {
    console.log(err);
    navigation.navigate('ErrorScreen');
  }
};

export async function updatePerson(
  user: IDPerson,
  authCtx: ICtx,
  setSuccess: Function,
) {
  try {
    const controller = 'Persons/putDPerson';
    const result = await axios.post(url + controller, user);

    (async () => {
      authCtx.updatePerson(result.data as IDPerson);
    })();

    if (result.status === 200) {
      setSuccess(2);
    }
  } catch (err) {
    console.log(err);
    setSuccess(3);
  }
}

export async function postPropose(propose: IPostPropose, setSuccess: Function) {
  try {
    const controller = 'PostProposes';
    const result = await axios.post(url + controller, propose);

    if (result.status === 200) {
      setSuccess(true);
    }
  } catch (err) {
    console.log(err);
    setSuccess(false);
  }
}

export async function deletePropose(id: number, setSuccess: Function) {
  try {
    const controller = 'PostProposes/';
    const result = await axios.delete(url + controller + id);

    if (result.status === 200) {
      setSuccess(true);
    }
  } catch (err) {
    console.log(err);
    setSuccess(false);
  }
}

export async function putPost(post: IPost, setSuccess: Function) {
  try {
    const controller = 'Posts';
    const result = await axios.put(url + controller, post);

    if (result.status === 200) {
      setSuccess(true);
    }
  } catch (err) {
    console.log(err);
    setSuccess(false);
  }
}

export async function getReviews(authCtx: ICtx, setReviews: Function) {
  try {
    const controller = 'Persons/GetPersonReviews/';
    const result = await axios.get(
      url + controller + authCtx.userWField.dPerson?.person.id,
    );
    let data = result.data;
    console.log(data);

    setReviews(data);
  } catch (err) {
    console.log(err);
  }
}
