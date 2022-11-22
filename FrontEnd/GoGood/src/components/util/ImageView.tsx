import React from 'react';
import {View, Image} from 'react-native';
import {IDPostGallery} from '../../interfaces/download';
import {imageStyles} from '../../constants/STYLES';

export function ImageView({gallery}: {gallery: IDPostGallery[] | undefined}) {
  if (gallery === undefined) {
    return <React.Fragment></React.Fragment>;
  }

  function displayImage(stringImage: string, i: number) {
    if (i === 0) {
      return (
        <Image
          key={i.toString()}
          style={imageStyles.main}
          source={{uri: 'data:image/png;base64,' + stringImage}}
        />
      );
    } else {
      return (
        <Image
          key={i.toString()}
          style={imageStyles.second}
          source={{uri: 'data:image/png;base64,' + stringImage}}
        />
      );
    }
  }

  return (
    <View
      style={{
        flexWrap: 'wrap',
        alignItems: 'stretch',
        flexDirection: 'row',
      }}>
      {gallery.map((curr, i) => displayImage(curr.dGallery as string, i))}
    </View>
  );
}
