import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View, Pressable, Image} from 'react-native';
import {IPostPropose} from '../../interfaces/upload';
import {IDisplayPost} from '../../interfaces/view';
import {imageStyles, postStyles} from '../../styles/STYLES';
import {_BUTTONS} from '../../styles/_BUTTONS';
import {_FONTS} from '../../styles/_FONTS';
import {PSTATUS, USTATUS} from '../../types/enum';
import {DatePickerModal} from '../util/DatePickerModal';
import {
  cancelProposer,
  postReview,
  showProposers,
  acceptProposer,
  share,
  propseHelp,
  confirmDate,
  postHandled,
  getReview,
  proposeDate,
} from './PostBtnsFuncs';

export const statusElements = (
  index: number,
  post: IDisplayPost,
  userId: number,
  proposeId: number | undefined,
) => {
  const [success, setSuccess] = useState<USTATUS>(USTATUS.UNINIT);
  const {t} = useTranslation();
  const postId = post.post.id as number;

  // const proposeId = (
  //   post.postProposes.find(p => p.proffessionalId === userId) as IPostPropose
  // ).id as number;

  // const proposer =
  //   post.professionalProposers.length > 0
  //     ? post.professionalProposers.find(e => e.person.id === userId)
  //     : undefined;
  // const proposeId = proposer ? proposer.person.id : undefined;

  /* ****************************************************************************** */

  function Handled() {
    return <Text style={_FONTS.btnBlackTextSmall}>{t('handled')}</Text>;
  }

  /* ****************************************************************************** */

  function SayThanks() {
    return (
      <View style={postStyles.footerContainer}>
        <Pressable
          onPress={() => cancelProposer(proposeId as number, setSuccess)}>
          <Text style={_FONTS.btnBlackTextWithU}>{t('cancel')}</Text>
        </Pressable>
        <Pressable
          onPress={() => postReview(postId, userId)}
          style={_BUTTONS.activeBtn2}>
          <Text style={_FONTS.btnBlackTextSmall}>{t('sayThanks')}</Text>
        </Pressable>
      </View>
    );
  }

  /* ****************************************************************************** */

  function Pending() {
    return (
      <View style={postStyles.footerContainer}>
        <Pressable onPress={() => showProposers(post.professionalProposers)}>
          {/* Circuled profile picture */}
        </Pressable>
      </View>
    );
  }

  /* ****************************************************************************** */

  function AcceptHelp() {
    return (
      <View style={postStyles.footerContainer}>
        <Pressable onPress={() => showProposers(post.professionalProposers)}>
          {/* Circuled profile picture */}
        </Pressable>
        <Pressable
          onPress={() => cancelProposer(proposeId as number, setSuccess)}>
          <Text style={_FONTS.btnBlackTextWithU}>{t('cancel')}</Text>
        </Pressable>
        <Pressable
          onPress={() => acceptProposer(postId, userId)}
          style={_BUTTONS.activeBtn2}>
          <Text style={_FONTS.btnBlackTextSmall}>{t('acceptProposer')}</Text>
        </Pressable>
      </View>
    );
  }

  /* ****************************************************************************** */

  function WaitingForDate() {
    return (
      <View style={postStyles.footerContainer}>
        <Pressable onPress={() => showProposers(post.professionalProposers)}>
          {/* Circuled profile picture */}
        </Pressable>
        <Pressable
          onPress={() => cancelProposer(proposeId as number, setSuccess)}
          style={_BUTTONS.activeBtn2}>
          <Text style={_FONTS.btnBlackTextSmall}>{t('cancel')}</Text>
        </Pressable>
        <Text>{t('waitingForDate')}</Text>
      </View>
    );
  }

  /* ****************************************************************************** */

  function IsDateOk() {
    return (
      <View style={postStyles.footerContainer}>
        <Pressable onPress={() => showProposers(post.professionalProposers)}>
          {/* Circuled profile picture */}
        </Pressable>
        <Pressable
          onPress={() => cancelProposer(proposeId as number, setSuccess)}
          style={_BUTTONS.activeBtn2}>
          <Text style={_FONTS.btnBlackTextSmall}>{t('cancel')}</Text>
        </Pressable>
        <Pressable onPress={() => confirmDate(postId)}>
          <Text>{t('confirmDate')}</Text>
        </Pressable>
      </View>
    );
  }

  /* ****************************************************************************** */

  function InHandle() {
    return (
      <View style={postStyles.footerContainer}>
        <Pressable
          onPress={() => cancelProposer(proposeId as number, setSuccess)}>
          <Text style={_FONTS.btnBlackTextWithU}>{t('cancel')}</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            postHandled(postId, post.post.proffessionalId as number)
          }
          style={_BUTTONS.activeBtn2}>
          <Text style={_FONTS.btnBlackTextSmall}>{t('handled')}</Text>
        </Pressable>
      </View>
    );
  }

  /* ****************************************************************************** */

  function ReadComment() {
    return (
      <View style={postStyles.footerContainer}>
        <Pressable onPress={() => getReview(postId, userId)}>
          <Text style={_FONTS.btnBlackTextWithU}>{t('readComment')}</Text>
        </Pressable>
        <Text style={_FONTS.btnBlackTextSmall}>{t('handled')}</Text>
      </View>
    );
  }

  /* ****************************************************************************** */

  function ProposeHelp() {
    // if (success === USTATUS.SUCCESS) {
    //   return WaitingForAccept();
    // }

    return (
      <View style={postStyles.footerContainer}>
        <Pressable onPress={() => share(post.post.id as number)}>
          <Text style={_FONTS.btnBlackTextWithU}>{t('shareRequest')}</Text>
        </Pressable>
        {success !== USTATUS.PENDING ? (
          <Pressable
            onPress={() =>
              propseHelp(post.post.id as number, userId, setSuccess)
            }
            style={_BUTTONS.activeBtn2}>
            <Text style={_FONTS.btnBlackTextSmall}>{t('propseHelp')}</Text>
          </Pressable>
        ) : (
          <Image
            style={imageStyles.tinytinyResizedLogo}
            source={require('../../images/spinner.png')}
          />
        )}
      </View>
    );
  }

  /* ****************************************************************************** */

  function WaitingForAccept() {
    return (
      <View style={postStyles.footerContainer}>
        <Pressable
          onPress={() => cancelProposer(proposeId as number, setSuccess)}>
          <Text style={_FONTS.btnBlackTextWithU}>{t('cancel')}</Text>
        </Pressable>
        <Text style={_FONTS.btnBlackTextSmall}>{t('waitingForAccept')}</Text>
      </View>
    );
  }

  /* ****************************************************************************** */

  function SetDate() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [date, setDate] = useState<Date | null>(null);

    React.useEffect(() => {
      if (date !== null) {
        proposeDate(postId, date);
      }
    }, [date]);

    const pressHandler = () => {
      setIsModalVisible(true);
    };

    return (
      <View style={postStyles.footerContainer}>
        <Pressable
          onPress={() => cancelProposer(proposeId as number, setSuccess)}>
          <Text style={_FONTS.btnBlackTextWithU}>{t('cancel')}</Text>
        </Pressable>
        <Pressable onPress={pressHandler} style={_BUTTONS.activeBtn2}>
          <Text style={_FONTS.btnBlackTextSmall}>{t('setDate')}</Text>
        </Pressable>
        {isModalVisible && (
          <DatePickerModal
            setIsModalVisible={setIsModalVisible}
            setDate={setDate}
          />
        )}
      </View>
    );
  }

  /* ****************************************************************************** */

  function WaitingForDateAccept() {
    return (
      <View style={postStyles.footerContainer}>
        <Pressable
          onPress={() => cancelProposer(proposeId as number, setSuccess)}>
          <Text style={_FONTS.btnBlackTextWithU}>{t('cancel')}</Text>
        </Pressable>
        <Text style={_FONTS.btnBlackTextSmall}>
          {t('waitingForDateAccept')}
        </Text>
      </View>
    );
  }

  /* ****************************************************************************** */

  function AngelHandling() {
    return (
      <View style={postStyles.footerContainer}>
        <Pressable
          onPress={() => cancelProposer(proposeId as number, setSuccess)}>
          <Text style={_FONTS.btnBlackTextWithU}>{t('cancel')}</Text>
        </Pressable>
        <Text style={_FONTS.btnBlackTextSmall}>{t('handling')}</Text>
      </View>
    );
  }

  /* ****************************************************************************** */

  const elementsArr: JSX.Element[] = [
    Handled(),
    SayThanks(),
    Pending(),
    AcceptHelp(),
    WaitingForDate(),
    IsDateOk(),
    InHandle(),
    ReadComment(),
    ProposeHelp(),
    WaitingForAccept(),
    SetDate(),
    WaitingForDateAccept(),
    AngelHandling(),
  ];

  return elementsArr[index];
};
