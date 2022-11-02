import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {t} from 'i18next';
import React, {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Pressable, Text, Image, Share} from 'react-native';
import {AuthContext} from '../../hooks/userCtx';
import {IPostPropose} from '../../interfaces/upload';
import {IDisplayPost} from '../../interfaces/view';
import {imageStyles, postStyles} from '../../styles/STYLES';
import {_BUTTONS} from '../../styles/_BUTTONS';
import {_FONTS} from '../../styles/_FONTS';
import {PSTATUS} from '../../types/enum';
import {RootStackParamList} from '../../types/RootStackParamList';
import {deletePropose, postPropose, putPost} from '../../util/axios';
import {DToUPost} from '../../util/dataHandler';

export function PStatusButtons({
  status,
  post,
}: {
  status: PSTATUS;
  post: IDisplayPost;
}) {
  const {t} = useTranslation();
  const [success, setSuccess] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const postProposes: IPostPropose[] = post.postProposes
    ? post.postProposes
    : [];

  const propseHelp = () => {
    let propose: IPostPropose = {
      postId: post.post.id as number,
      proffessionalId: authCtx.userWField.dPerson?.person.id as number,
    };
    postPropose(propose, setSuccess);
  };

  const cancelPropose = () => {
    let targetId = 0;
    postProposes.map(curr => {
      if (curr.proffessionalId === authCtx.userWField.dPerson?.person.id) {
        targetId = curr.id as number;
      }
    });
    deletePropose(targetId, setSuccess);
  };

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  const showProposers = () => {
    // show proposers
  };

  const share = () => {
    // share
  };

  const postHandled = () => {
    putPost(DToUPost(post.post), setSuccess);
  };

  function SayThanks() {
    return (
      <View style={postStyles.footerContainer}>
        <Pressable onPress={() => showProposers()}>
          <Text style={_FONTS.btnBlackText}>{t('sayThanks')}</Text>
        </Pressable>
      </View>
    );
  }

  function AcceptHelp() {
    return (
      <View style={postStyles.footerContainer}>
        <Pressable onPress={() => showProposers()}>
          <Text style={_FONTS.btnBlackText}>{t('proposers')}</Text>
        </Pressable>
        <Pressable onPress={() => postHandled()} style={_BUTTONS.activeBtn2}>
          <Text style={_FONTS.btnBlackTextWithU}>{t('done')}</Text>
        </Pressable>
      </View>
    );
  }

  function AngelHandled() {
    return (
      <View style={postStyles.footerContainer}>
        <Text style={_FONTS.btnBlackText}>{t('youBennThanked')}</Text>
        <Pressable onPress={() => goToProfile()} style={_BUTTONS.activeBtn2}>
          <Text style={_FONTS.btnBlackTextWithU}>{t('readComment')}</Text>
        </Pressable>
      </View>
    );
  }

  function AngelHelp() {
    return (
      <View style={postStyles.footerContainer}>
        <Pressable onPress={() => share()}>
          <Text style={_FONTS.btnBlackTextWithU}>{t('shareRequest')}</Text>
        </Pressable>
        <Pressable onPress={() => propseHelp()} style={_BUTTONS.activeBtn2}>
          <Text style={_FONTS.btnBlackTextSmall}>{t('propseHelp')}</Text>
        </Pressable>
      </View>
    );
  }

  function AngelWaiting() {
    return (
      <View style={postStyles.footerContainer}>
        <Image
          style={imageStyles.tinytinyResizedLogo}
          source={require('../../images/valid.png')}
        />
      </View>
    );
  }

  function Handled() {
    return (
      <Pressable onPress={() => cancelPropose()}>
        <View style={postStyles.footerContainer}>
          <Text style={_FONTS.btnBlackText}>{t('cantHelp')}</Text>
          <Text style={_FONTS.btnBlackTextWithU}>{t('cancel')}</Text>
        </View>
      </Pressable>
    );
  }

  switch (status) {
    case 1: {
      return <AngelWaiting />;
    }
    case 2: {
      return <AngelHandled />;
    }
    case 3: {
      return <AcceptHelp />;
    }
    case 4: {
      return <SayThanks />;
    }
    case 5: {
      return <Handled />;
    }
    default: {
      return <AngelHelp />;
    }
  }
}
