import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {IDPerson} from '../../interfaces/download';
import {imageStyles} from '../../styles/STYLES';

export function RoundedProfiles({users}: {users: IDPerson[]}) {
  const maxImages = 3;
  const pressHandler = () => {
    //show mini profile
  };

  if (users.length === 0) {
    return;
  } else {
    const overTheLimit = users.length - maxImages;
    const limitedArr = overTheLimit > 0 ? users.slice(0, maxImages) : users;

    return (
      <Pressable onPress={pressHandler}>
        <View style={roundedProfilesStyles.container}>
          {limitedArr.map((curr, i) => (
            <Image
              style={[imageStyles.tinyProfileImage, {zIndex: i}]}
              source={{uri: 'data:image/png;base64,' + curr.pImage}}
            />
          ))}
          {overTheLimit > 0 && <Text> + {overTheLimit}</Text>}
        </View>
      </Pressable>
    );
  }
}

const roundedProfilesStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
  },
});
