import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {IDisplayPost} from '../interfaces/view';
import {_FONTS} from '../styles/_FONTS';
import {postStyles} from '../styles/STYLES';
import {timeAgo} from '../util/timeAgo';
import {getDistanceInMeter} from '../util/location';
import {ILocation} from '../interfaces/ILocation';
import {_BUTTONS} from '../styles/_BUTTONS';
import {ReadMoreLess} from './util/ReadMoreLess';
import {IPersonWFields} from '../interfaces/download';
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

  // console.log(post);

  // const calcStatus = (): PSTATUS => {
  //   switch (post.post.postStatus) {
  //     case 2: {
  //       if (isAngel) {
  //         return 2;
  //       } else {
  //         return 4;
  //       }
  //     }
  //     case 3: {
  //       if (isAngel) {
  //         return 3;
  //       } else {
  //         return 5;
  //       }
  //     }
  //     case 5: {
  //       return 5;
  //     }
  //     default: {
  //       return 0;
  //     }
  //   }
  // };

  // const status = calcStatus();

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
      {/* {(!myPost || (status !== 0 && status !== 3)) && ( */}
      <PostButtons post={post} isAngel={isAngel} />
      {/* )} */}
    </View>
  );
}
