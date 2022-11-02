import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {
  memo,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {FlatList} from 'react-native';
import {AuthContext} from '../hooks/userCtx';
import {IDisplayPost} from '../interfaces/view';
import {ILocation} from '../interfaces/ILocation';
import {LoadingScreen} from '../screens/utilScreens/LoadingScreen';
import {RootStackParamList} from '../types/RootStackParamList';
import {getFields, getPosts} from '../util/axios';
import {Post} from './Post';
import {IField} from '../interfaces/upload';
import useAsyncStorage from '@react-native-async-storage/async-storage';

function Posts({
  params,
  position,
  controller,
}: {
  params: string;
  position: ILocation | null | undefined;
  controller: string;
}) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<IDisplayPost[]>([]);
  const [fields, setFields] = useState<IField[]>([]);
  const authCtx = useContext(AuthContext);

  useLayoutEffect(() => {
    (async () => {
      const tmp = await useAsyncStorage.getItem('fields');
      if (tmp) {
        setFields(JSON.parse(tmp));
      } else {
        getFields(setFields, navigation);
      }
    })();
  }, []);

  useEffect(() => {
    getPosts(params, setPosts, navigation, setIsLoading, controller);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  //remove my posts

  return (
    <FlatList
      data={posts}
      renderItem={itemData => (
        <Post
          field={
            fields.find(e => e.id === itemData.item.post.fieldId) as IField
          }
          post={itemData.item}
          position={position}
          user={authCtx.userWField}
        />
      )}
      keyExtractor={item => (item.post.id as number).toString()}
    />
  );
}

export default memo(Posts);
