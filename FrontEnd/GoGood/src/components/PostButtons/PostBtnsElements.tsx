import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View, Pressable, Image} from 'react-native';
import {IPost, IPostPropose} from '../../interfaces/upload';
import {IDisplayPost} from '../../interfaces/view';
import {imageStyles, postStyles} from '../../constants/STYLES';
import {_BUTTONS} from '../../constants/_BUTTONS';
import {_FONTS} from '../../constants/_FONTS';
import {PSTATUS, USTATUS} from '../../types/enum';
import {
  cancelProposer,
  showProposers,
  share,
  postHandled,
  getReview,
} from './PostBtnsFuncs';
import {
  cleanPropose,
  deletePropose,
  postPropose,
  putPost,
} from '../../util/axios';
import {IDPerson} from '../../interfaces/download';
import {LoadingButton} from '../Buttons/LoadingButton';
import {RoundedProfiles} from '../util/RoundedProfiles';
import {DateTimePicker} from '../Modals/DateTimePicker';

export const statusElements = (
  index: number,
  user: IDPerson,
  proposeId: number | undefined,
  currPost: IDisplayPost,
  setCurrPost: Function,
) => {
  const {t} = useTranslation();
  const postId = currPost.post.id as number;
  const userId = user.person.id as number;

  const [isUploadSuccess, setIsUploadSuccess] = useState<USTATUS>(
    USTATUS.UNINIT,
  );

  /* ****************************************************************************** */

  function Handled() {
    return <Text style={_FONTS.btnBlackTextSmall}>{t('handled')}</Text>;
  }

  /* ****************************************************************************** */

  function Pending() {
    const [professionalId, setProfessionalId] = useState(0);

    useEffect(() => {
      const upload = async () => {
        const updatedPost = {
          ...currPost.post,
          proffessionalId: professionalId,
          postStatus: PSTATUS.WAITING_FOR_DATE,
        };
        setIsUploadSuccess(USTATUS.PENDING);
        const result = await putPost(updatedPost);

        if (!result) {
          setIsUploadSuccess(USTATUS.FAILED);
        }

        setCurrPost((prev: IDisplayPost) => ({
          post: updatedPost,
          professionalProposers: prev.professionalProposers,
          postProposes: prev.postProposes,
          postGallery: prev.postGallery,
        }));
        setIsUploadSuccess(USTATUS.UNINIT);
      };

      if (professionalId !== 0) {
        upload();
      }
    }, [professionalId]);

    return (
      <View style={postStyles.footerButtons}>
        {isLoading(isUploadSuccess) || (
          <Pressable
            onPress={() => showProposers(currPost.professionalProposers)}>
            <RoundedProfiles
              users={currPost.professionalProposers}
              setProfessionalId={setProfessionalId}
            />
          </Pressable>
        )}
      </View>
    );
  }

  /* ****************************************************************************** */

  function WaitingForDate() {
    return (
      <View style={postStyles.footerButtons}>
        {isLoading(isUploadSuccess) || (
          <Pressable
            onPress={() =>
              cancelProposerHandler(currPost.post.proffessionalId as number)
            }>
            <Text style={_FONTS.btnBlackTextWithU}>{t('cancel')}</Text>
          </Pressable>
        )}
        <Text>{t('waitingForDate')}</Text>
      </View>
    );
  }

  /* ****************************************************************************** */

  function IsDateOk() {
    const handleDate = currPost.post.handleDate;
    let date = handleDate
      ? new Date(
          (currPost.post.handleDate as Date).toString() + 'Z',
        ).toLocaleString()
      : undefined;

    const onPress = async () => {
      setIsUploadSuccess(USTATUS.PENDING);
      let updatedPost: IPost = {
        ...currPost.post,
        postStatus: PSTATUS.IN_HANDLE,
      };

      const result = await putPost(updatedPost);

      if (!result) {
        setIsUploadSuccess(USTATUS.FAILED);
      }

      setCurrPost((prev: IDisplayPost) => ({
        post: updatedPost,
        professionalProposers: prev.professionalProposers,
        postProposes: prev.postProposes,
        postGallery: prev.postGallery,
      }));
      setIsUploadSuccess(USTATUS.UNINIT);
    };

    return (
      <View style={postStyles.footerButtons}>
        <Pressable
          onPress={() =>
            cancelProposerHandler(currPost.post.proffessionalId as number)
          }>
          <Text style={_FONTS.btnBlackTextWithU}>{t('cancel')}</Text>
        </Pressable>
        <View>
          {isLoading(isUploadSuccess) || (
            <React.Fragment>
              <Text>{date}</Text>
              <Pressable style={_BUTTONS.activeBtn2} onPress={onPress}>
                <Text>{t('confirmDate')}</Text>
              </Pressable>
            </React.Fragment>
          )}
        </View>
      </View>
    );
  }

  /* ****************************************************************************** */

  function InHandle() {
    return (
      <View style={postStyles.footerButtons}>
        <Pressable
          onPress={() =>
            cancelProposerHandler(currPost.post.proffessionalId as number)
          }>
          <Text style={_FONTS.btnBlackTextWithU}>{t('cancel')}</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            postHandled(postId, currPost.post.proffessionalId as number)
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
      <View style={postStyles.footerButtons}>
        <Pressable onPress={() => getReview(postId, userId)}>
          <Text style={_FONTS.btnBlackTextWithU}>{t('readComment')}</Text>
        </Pressable>
        <Text style={_FONTS.btnBlackTextSmall}>{t('handled')}</Text>
      </View>
    );
  }

  /* ****************************************************************************** */

  function ProposeHelp() {
    const onPress = async () => {
      setIsUploadSuccess(USTATUS.PENDING);
      let propose = {
        proffessionalId: userId,
        postId: postId,
      };

      const data = await postPropose(propose);

      if (data === undefined) {
        setIsUploadSuccess(USTATUS.FAILED);
      } else {
        propose = data;

        setCurrPost((prev: IDisplayPost) => ({
          post: prev.post,
          professionalProposers: [...prev.professionalProposers, user],
          postProposes: [...prev.postProposes, propose],
          postGallery: prev.postGallery,
        }));
        setIsUploadSuccess(USTATUS.UNINIT);
      }
    };

    return (
      <View style={postStyles.footerButtons}>
        <Pressable onPress={() => share(currPost.post.id as number)}>
          <Text style={_FONTS.btnBlackTextWithU}>{t('shareRequest')}</Text>
        </Pressable>
        {isLoading(isUploadSuccess) || (
          <Pressable style={_BUTTONS.activeBtn2} onPress={onPress}>
            <Text style={_FONTS.btnBlackTextWithU}>{t('propseHelp')}</Text>
          </Pressable>
        )}
      </View>
    );
  }

  /* ****************************************************************************** */

  function SetDate() {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
      if (date !== null) {
        (async () => {
          setIsUploadSuccess(USTATUS.PENDING);
          let updatedPost: IPost = {
            ...currPost.post,
            handleDate: date,
            postStatus: PSTATUS.IS_DATE_OK,
          };
          const result = await putPost(updatedPost);

          if (!result) {
            setIsUploadSuccess(USTATUS.FAILED);
          }
          setCurrPost((prev: IDisplayPost) => ({
            post: updatedPost,
            professionalProposers: prev.professionalProposers,
            postProposes: prev.postProposes,
            postGallery: prev.postGallery,
          }));
          setIsUploadSuccess(USTATUS.UNINIT);
        })();
      }
    }, [date]);

    const pressHandler = () => {
      setDatePickerVisibility(true);
    };

    return (
      <React.Fragment>
        <View style={postStyles.footerButtons}>
          <Pressable onPress={() => cancelProposerHandler(userId)}>
            <Text style={_FONTS.btnBlackTextWithU}>{t('cancel')}</Text>
          </Pressable>
          {isLoading(isUploadSuccess) || (
            <Pressable onPress={pressHandler} style={_BUTTONS.activeBtn2}>
              <Text style={_FONTS.btnBlackTextSmall}>{t('setDate')}</Text>
            </Pressable>
          )}
        </View>
        <DateTimePicker
          isDatePickerVisible={isDatePickerVisible}
          setDatePickerVisibility={setDatePickerVisibility}
          setDate={setDate}
        />
      </React.Fragment>
    );
  }

  /* ****************************************************************************** */

  function WaitingForAccept(): JSX.Element {
    return (
      <View style={postStyles.footerButtons}>
        {isLoading(isUploadSuccess) || (
          <Pressable onPress={() => cancelProposerHandler(userId)}>
            <Text style={_FONTS.btnBlackTextWithU}>{t('cancel')}</Text>
          </Pressable>
        )}
        <Text style={_FONTS.btnBlackTextSmall}>{t('waitingForAccept')}</Text>
      </View>
    );
  }

  /* ****************************************************************************** */

  function WaitingForDateAccept() {
    return (
      <View style={postStyles.footerButtons}>
        <Pressable onPress={() => cancelProposerHandler(userId)}>
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
      <View style={postStyles.footerButtons}>
        <Pressable onPress={() => cancelProposerHandler(userId)}>
          <Text style={_FONTS.btnBlackTextWithU}>{t('cancel')}</Text>
        </Pressable>
        <Text style={_FONTS.btnBlackTextSmall}>{t('handling')}</Text>
      </View>
    );
  }

  /* ****************************************************************************** */

  const isLoading = (uploadStatus: USTATUS) => {
    if (uploadStatus === USTATUS.PENDING) {
      return <LoadingButton />;
    }
  };

  const cancelProposerHandler = async (proposerId: number) => {
    setIsUploadSuccess(USTATUS.PENDING);
    let updatedPost: IPost = {
      ...currPost.post,
      proffessionalId: undefined,
      postStatus: PSTATUS.PENDING,
    };

    const targetPropose = currPost.postProposes.find(
      e => e.proffessionalId === proposerId,
    );

    const result = await cleanPropose(targetPropose as IPostPropose, postId);

    if (!result) {
      setIsUploadSuccess(USTATUS.FAILED);
      return;
    }

    setCurrPost((prev: IDisplayPost) => ({
      post: updatedPost,
      professionalProposers: prev.professionalProposers.filter(
        e => e.person.id !== proposerId,
      ),
      postProposes: prev.postProposes.filter(e => e.id !== targetPropose?.id),
      postGallery: prev.postGallery,
    }));
    setIsUploadSuccess(USTATUS.UNINIT);
  };

  const elementsArr: JSX.Element[] = [
    Handled(),
    Pending(),
    WaitingForDate(),
    IsDateOk(),
    InHandle(),
    ReadComment(),
    ProposeHelp(),
    SetDate(),
    WaitingForDateAccept(),
    AngelHandling(),
    WaitingForAccept(), //due to multiple proposers, no status in DB
  ];

  return elementsArr[index];
};
