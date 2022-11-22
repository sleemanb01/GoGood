import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {IDisplayPost} from '../interfaces/view';
import {_FONTS} from '../constants/_FONTS';
import {postStyles} from '../constants/STYLES';
import {timeAgo} from '../util/timeAgo';
import {getDistanceInMeter} from '../util/location';
import {ILocation} from '../interfaces/ILocation';
import {_BUTTONS} from '../constants/_BUTTONS';
import {ReadMoreLess} from './util/ReadMoreLess';
import {IDPerson, IPersonWFields} from '../interfaces/download';
import {ImageView} from './util/ImageView';
import {IField} from '../interfaces/upload';
import {PostButtons} from './PostButtons/PostButtons';

export function Post({
  field,
  post,
  position,
  user,
}: {
  field: IField;
  post: IDisplayPost;
  position: ILocation | null | undefined;
  user: IPersonWFields;
}) {
  const myPost = user.dPerson?.person.id === post.post.personId;

  let dist = '';
  if (position && post.post.postLat && post.post.postLng && !myPost) {
    dist = getDistanceInMeter(post.post.postLat, post.post.postLng, position);
  }

  const isAngel = user.dPerson?.person.isAngel;

  const pressHandler = (index: number) => {
    //show post details
  };

  return (
    <View style={postStyles.container}>
      <View style={postStyles.headerContainer}>
        <View style={postStyles.headerRightSide}>
          <Text style={_FONTS.sideInfoBold}>{field.fieldName}</Text>
          <Text style={_FONTS.sideInfo}>
            {timeAgo(new Date(post.post.postDate))}
          </Text>
        </View>
        <View style={postStyles.headerLeftSide}>
          <Text>{dist}</Text>
        </View>
      </View>
      <View style={postStyles.mainContainer}>
        <Text style={_FONTS.title}>{post.post.postTitle}</Text>
        <ReadMoreLess Description={post.post.postDescription} />
        <ScrollView>
          <ImageView gallery={post.postGallery} />
        </ScrollView>
      </View>
      <View style={postStyles.footerContainer}>
        <PostButtons
          post={post}
          isAngel={isAngel}
          user={user.dPerson as IDPerson}
        />
      </View>
    </View>
  );
}
