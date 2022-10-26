import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {memo, useContext, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {AuthContext} from '../hooks/userCtx';
import {IDisplayPost} from '../interfaces/IDisplayPost';
import {ILocation} from '../interfaces/ILocation';
import {LoadingScreen} from '../screens/utilScreens/LoadingScreen';
import {RootStackParamList} from '../types/RootStackParamList';
import {getPosts} from '../util/axios';
import {Post} from './Post';

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
  const authCtx = useContext(AuthContext);

  console.log('posts');

  useEffect(() => {
    getPosts(params, setPosts, navigation, setIsLoading, controller);
    // setPosts(if res is ok )
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
          post={itemData.item}
          position={position}
          user={authCtx.userWField}
        />
      )}
      keyExtractor={item => (item.dPost.id as number).toString()}
    />
  );
}

export default memo(Posts);
