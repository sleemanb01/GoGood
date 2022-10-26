import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {IDisplayPost} from '../interfaces/IDisplayPost';
import {_FONTS} from '../styles/_FONTS';
import {postStyles} from '../styles/STYLES';
import {timeAgo} from '../util/timeAgo';
import {getDistanceInMeter} from '../util/location';
import {ILocation} from '../interfaces/ILocation';
import {ImageView} from './ImageView';
import {_BUTTONS} from '../styles/_BUTTONS';
import {PStatusButtons} from './util/PStatusButtons';
import {PSTATUS} from '../types/enum';
import {IPersonWFields} from '../interfaces/Download/IPersonWFields';
import {ReadMoreLess} from './util/ReadMoreLess';

export function Post({
  post,
  position,
  user,
}: {
  post: IDisplayPost;
  position: ILocation | null | undefined;
  user: IPersonWFields;
}) {
  const myPost = user.dPerson?.person.id === post.dPost.personId;

  let dist = '';
  if (position && post.dPost.postLat && post.dPost.postLng && !myPost) {
    dist = getDistanceInMeter(post.dPost.postLat, post.dPost.postLng, position);
  }

  const isAngel = user.professionalFields.length > 1;

  const calcStatus = (): PSTATUS => {
    switch (post.dPost.postStatus) {
      case 2: {
        if (isAngel) {
          return 2;
        } else {
          return 4;
        }
      }
      case 3: {
        if (isAngel) {
          return 3;
        } else {
          return 5;
        }
      }
      case 5: {
        return 5;
      }
      default: {
        return 0;
      }
    }
  };

  const status = calcStatus();

  const pressHandler = (index: number) => {
    //show post details
  };

  return (
    <View style={postStyles.container}>
      <View style={postStyles.headerContainer}>
        <View style={postStyles.headerRightSide}>
          <Text style={_FONTS.sideInfoBold}>{post.dPost.field.fieldName}</Text>
          <Text style={_FONTS.sideInfo}>
            {timeAgo(new Date(post.dPost.postDate))}
          </Text>
        </View>
        <View style={postStyles.headerLeftSide}>
          <Text>{dist}</Text>
        </View>
      </View>
      <View style={postStyles.mainContainer}>
        <Text style={_FONTS.title}>{post.dPost.postTitle}</Text>
        <ReadMoreLess Description={post.dPost.postDescription} />
        <ScrollView>
          <ImageView gallery={post.postGallery} />
        </ScrollView>
      </View>
      {(!myPost || (status !== 0 && status !== 3)) && (
        <PStatusButtons status={status} post={post} />
      )}
    </View>
  );
}
