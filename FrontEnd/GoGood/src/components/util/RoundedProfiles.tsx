import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {IDPerson} from '../../interfaces/download';
import {imageStyles, roundedProfilesStyles} from '../../constants/STYLES';
import {MiniProfilesList} from '../Profile/MiniProfilesList';
import {IDisplayPost} from '../../interfaces/view';
import {PSTATUS} from '../../types/enum';

export function RoundedProfiles({
  users,
  setProfessionalId,
}: {
  users: IDPerson[];
  setProfessionalId: Function;
}) {
  const maxImages = 3;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const professionalChoosedHandler = (userId: number) => {
    //upload professional handler
    setProfessionalId(userId);
    // console.log(userId);
  };

  const pressHandler = () => {
    //show mini profile
    setIsModalVisible(true);
  };

  if (users.length === 0) {
    return <React.Fragment></React.Fragment>;
  } else {
    const overTheLimit = users.length - maxImages;
    const limitedArr = overTheLimit > 0 ? users.slice(0, maxImages) : users;

    return (
      <React.Fragment>
        <Pressable onPress={pressHandler}>
          <View style={roundedProfilesStyles.container}>
            {limitedArr.map((curr, i) => (
              <Image
                key={i.toString()}
                style={[imageStyles.tinytinyProfileImage, {zIndex: i}]}
                source={
                  curr.pImage
                    ? {uri: 'data:image/png;base64,' + curr.pImage}
                    : require('../../images/defaultUser.png')
                }
              />
            ))}
            {overTheLimit > 0 && <Text> + {overTheLimit}</Text>}
          </View>
        </Pressable>
        <MiniProfilesList
          users={users}
          onPress={professionalChoosedHandler}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
        />
      </React.Fragment>
    );
  }
}
