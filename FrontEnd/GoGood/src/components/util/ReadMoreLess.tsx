// import React, {useState} from 'react';
// import {useTranslation} from 'react-i18next';
// import {View, Text, TouchableOpacity, Pressable} from 'react-native';
// import {_FONTS} from '../../styles/_FONTS';

// export function ReadMoreLess({description}: {description: string}) {
//   const limit = 10;

//   const [readMore, setReadMore] = useState<boolean>(description.length > limit);

//   const {t} = useTranslation();

//   const pressHandler = () => {
//     setReadMore(prev => !prev);
//   };

//   function AboveLimit() {
//     return (
//       <Pressable onPress={pressHandler}>
//         <Text style={_FONTS.blackText}>{description.slice(0, limit)}</Text>
//         <Text style={{textDecorationLine: 'underline'}}>
//           {readMore ? t('readMore') : t('readLess')}
//         </Text>
//       </Pressable>
//     );
//   }
//   function BelowLimit() {
//     return <Text style={_FONTS.blackText}>{description}</Text>;
//   }

//   return (
//     <View style={{alignSelf: 'flex-end'}}>
//       {readMore ? <AboveLimit /> : <BelowLimit />}
//     </View>
//   );
// }

import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text} from 'react-native';
import {_FONTS} from '../../constants/_FONTS';

export function ReadMoreLess({Description}: {Description: string}) {
  const limit = 30;
  const [readMore, setReadMore] = useState<boolean>(false);
  const [isMoreThanMaxChars, setisMoreThanMaxChars] = useState<boolean>(
    Description.length > limit,
  );

  const {t} = useTranslation();
  return (
    <View style={{alignSelf: 'flex-start'}}>
      <Text style={[_FONTS.btnBlackText2]}>
        {readMore || !isMoreThanMaxChars
          ? Description + ' '
          : Description.substring(0, limit) + '..  '}
        {isMoreThanMaxChars ? (
          <Text
            style={{textDecorationLine: 'underline'}}
            onPress={() => {
              setReadMore(!readMore);
            }}>
            {readMore ? t('readLess') : t('readMore')}
          </Text>
        ) : (
          ''
        )}
      </Text>
    </View>
  );
}
