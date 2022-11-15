import {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {AuthContext} from '../../hooks/userCtx';
import {IDPerson} from '../../interfaces/download';
import {IPostPropose} from '../../interfaces/upload';
import {IDisplayPost} from '../../interfaces/view';
import {_BUTTONS} from '../../styles/_BUTTONS';
import {_FONTS} from '../../styles/_FONTS';
import {PSTATUS, USTATUS} from '../../types/enum';
import {statusElements} from './PostBtnsElements';

export function PostButtons({
  post,
  isAngel,
}: {
  post: IDisplayPost;
  isAngel: boolean | null | undefined;
}) {
  // const [success, setSuccess] = useState<USTATUS>(USTATUS.UNINIT);

  const user = useContext(AuthContext).userWField.dPerson as IDPerson;

  let status =
    post.post.postStatus + (isAngel ? Object.keys(PSTATUS).length / 2 - 1 : 0);

  let proposer: IDPerson | undefined =
    post.professionalProposers.length > 0
      ? post.professionalProposers.find(e => e.person.id === user.person.id)
      : undefined;

  // console.log(post.professionalProposers);

  // if (isAngel && undefined !== proposer) {
  //   status++;
  // }

  // useLayoutEffect(() => {
  // }, [success]);
  // const IsAlreadyProposed = undefined !== proposer;

  // console.log(proposer);

  // console.log(proposer);

  return statusElements(
    status,
    post,
    user.person.id as number,
    proposer !== undefined ? (proposer as IDPerson).person.id : undefined,
  );
}
