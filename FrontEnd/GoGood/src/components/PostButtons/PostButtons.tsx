import {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {AuthContext} from '../../hooks/userCtx';
import {IPostPropose} from '../../interfaces/upload';
import {IDisplayPost} from '../../interfaces/view';
import {_BUTTONS} from '../../styles/_BUTTONS';
import {_FONTS} from '../../styles/_FONTS';
import {PSTATUS} from '../../types/enum';

export function PostButtons({
  post,
  isAngel,
}: {
  post: IDisplayPost;
  isAngel: boolean | null | undefined;
}) {
  const {t} = useTranslation();
  const [success, setSuccess] = useState(false);

  const postId = post.post.id;
  const user = useContext(AuthContext).userWField.dPerson;
  const postProposes: IPostPropose[] = post.postProposes
    ? post.postProposes
    : [];

  function handled() {
    //requiring :
    // 1 - post handle date
    // show handled date
  }

  function sayThanks() {
    //requiring :
    // 1 - proId
    // post review
  }

  function pending() {
    //requiring :
    // 1 - post Id
    // 2 - proposers
    // get postProposers
  }

  function acceptHelp() {
    //requiring :
    // 1 - post Id
    // 2 - pro Id
    // 3 - proposers
    // post status 3 WAITING FOR DATE, cancel proposer, show proposers
  }

  function waitingForDate() {
    //requiring :
    // 1 - pro Id
    // 3 - proposers
    // cancel proposer, show proposers
  }

  function isDateOk() {
    //requiring :
    // 1 - post id
    // 2 - pro Id
    // 3 - proposers
    // put status to 5 INHANDLE ,cancel proposer, show proposers
  }

  function inHandle() {
    //requiring :
    // 1 - post id
    // 2 - pro Id
    // 3 - proposers
    // handled + say thanks + put status to 0 + delete proposers ,cancel proposer, show proposers
  }

  function readComment() {
    //requiring :
    // 1 - post id
    // 2 - Person Id
    // get review ,cancel proposer
  }

  function proposeHelp() {
    //requiring :
    // 1 - post id
    // 2 - Person Id
    // get review ,cancel proposer
  }

  function waitingForAccept() {
    //requiring :
    // 1 - post id
    // cancel proposer
  }

  function setDate() {
    //requiring :
    // 1 - post id
    // put post date, cancel propose
  }

  function waitingForDateAccept() {
    //requiring :
    // 1 - post id
    // cancel proposer
  }

  function angelHandling() {
    //requiring :
    // 1 - post id
    // cancel proposer
  }

  const status =
    post.post.postStatus + (isAngel ? Object.keys(PSTATUS).length : 0);

  const statusElements = [
    handled,
    sayThanks,
    pending,
    acceptHelp,
    waitingForDate,
    isDateOk,
    inHandle,
    readComment,
    proposeHelp,
    waitingForAccept,
    setDate,
    waitingForDateAccept,
    angelHandling,
  ];

  return statusElements[status];
}

// const propseHelp = () => {
//   let propose: IPostPropose = {
//     postId: post.post.id as number,
//     proffessionalId: authCtx.userWField.dPerson?.person.id as number,
//   };
//   postPropose(propose, setSuccess);
// };

// const cancelPropose = () => {
//   let targetId = 0;
//   postProposes.map(curr => {
//     if (curr.proffessionalId === authCtx.userWField.dPerson?.person.id) {
//       targetId = curr.id as number;
//     }
//   });
//   deletePropose(targetId, setSuccess);
// };

// const goToProfile = () => {
//   navigation.navigate('Profile');
// };

// const showProposers = () => {
//   // show proposers
// };

// const share = () => {
//   // share
// };

// const postHandled = () => {
//   putPost(post.post, setSuccess);
// };

// function SayThanks() {
//   return (
//     <View style={postStyles.footerContainer}>
//       <Pressable onPress={() => showProposers()}>
//         <Text style={_FONTS.btnBlackText}>{t('sayThanks')}</Text>
//       </Pressable>
//     </View>
//   );
// }

// function AcceptHelp() {
//   return (
//     <View style={postStyles.footerContainer}>
//       <Pressable onPress={() => showProposers()}>
//         <Text style={_FONTS.btnBlackText}>{t('proposers')}</Text>
//       </Pressable>
//       <Pressable onPress={() => postHandled()} style={_BUTTONS.activeBtn2}>
//         <Text style={_FONTS.btnBlackTextWithU}>{t('done')}</Text>
//       </Pressable>
//     </View>
//   );
// }

// function AngelHandled() {
//   return (
//     <View style={postStyles.footerContainer}>
//       <Text style={_FONTS.btnBlackText}>{t('youBennThanked')}</Text>
//       <Pressable onPress={() => goToProfile()} style={_BUTTONS.activeBtn2}>
//         <Text style={_FONTS.btnBlackTextWithU}>{t('readComment')}</Text>
//       </Pressable>
//     </View>
//   );
// }

// function AngelHelp() {
//   return (
//     <View style={postStyles.footerContainer}>
//       <Pressable onPress={() => share()}>
//         <Text style={_FONTS.btnBlackTextWithU}>{t('shareRequest')}</Text>
//       </Pressable>
//       <Pressable onPress={() => propseHelp()} style={_BUTTONS.activeBtn2}>
//         <Text style={_FONTS.btnBlackTextSmall}>{t('propseHelp')}</Text>
//       </Pressable>
//     </View>
//   );
// }

// function AngelWaiting() {
//   return (
//     <View style={postStyles.footerContainer}>
//       <Image
//         style={imageStyles.tinytinyResizedLogo}
//         source={require('../../images/valid.png')}
//       />
//     </View>
//   );
// }

// function Handled() {
//   return (
//     <Pressable onPress={() => cancelPropose()}>
//       <View style={postStyles.footerContainer}>
//         <Text style={_FONTS.btnBlackText}>{t('cantHelp')}</Text>
//         <Text style={_FONTS.btnBlackTextWithU}>{t('cancel')}</Text>
//       </View>
//     </Pressable>
//   );
// }

// // 0 HANDLED,
// // 1 PENDING,
// // 2 ACCEPT_HELP,
// // 3 WAITING_FOR_DATE,
// // 4 IS_DATE_OK,
// // 5 CHOOSE_ANOTHER_DATE,
// // 6 IN_HANDLE,

// switch (post.post.postStatus) {
//   case PSTATUS.PENDING: {
//     return isAngel ? <propseHelp /> : <AngelWaiting />;
//   }
//   case 2: {
//     return <AngelHandled />;
//   }
//   case 3: {
//     return <AcceptHelp />;
//   }
//   case 4: {
//     return <SayThanks />;
//   }
//   case 5: {
//     return <Handled />;
//   }
//   case 5: {
//     return <Handled />;
//   }
//   default: {
//     return <AngelHelp />;
//   }
// }
// }
