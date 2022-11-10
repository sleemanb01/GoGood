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
import {ILocation} from '../interfaces/ILocation';
import {LoadingScreen} from '../screens/utilScreens/LoadingScreen';
import {RootStackParamList} from '../types/RootStackParamList';
import {getPosts} from '../util/axios';
import {Post} from './Post';
import {IField} from '../interfaces/upload';
import {IPostsWData} from '../interfaces/download';
import {adjustPostData} from '../util/dataHandler';
import {getFields} from '../util/localStorage';
import {ErrorScreen} from '../screens/utilScreens/ErrorScreen';

const initialValue: IPostsWData = {
  posts: [],
  professionalProposers: [],
  postProposes: [],
  dPostGallery: [],
};

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
  const [posts, setPosts] = useState<IPostsWData | null>(initialValue);
  const [fields, setFields] = useState<IField[]>([]);
  const authCtx = useContext(AuthContext);

  useLayoutEffect(() => {
    getFields(setFields);
  }, []);

  useEffect(() => {
    getPosts(params, setPosts, controller);
  }, []);

  if (posts === null || fields === null) {
    // navigation.navigate('ErrorScreen');
    return <ErrorScreen />;
  }
  // } else if (posts.posts.length === 0) {
  //   return <LoadingScreen />;
  // }

  let displayPosts = adjustPostData(posts as IPostsWData);

  //remove my posts

  return (
    <FlatList
      data={displayPosts}
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
