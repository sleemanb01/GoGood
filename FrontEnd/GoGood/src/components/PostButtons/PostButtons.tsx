import {useState} from 'react';
import {IDPerson} from '../../interfaces/download';
import {IDisplayPost} from '../../interfaces/view';
import {_BUTTONS} from '../../constants/_BUTTONS';
import {_FONTS} from '../../constants/_FONTS';
import {PSTATUS, USTATUS} from '../../types/enum';
import {statusElements} from './PostBtnsElements';

export function PostButtons({
  post,
  isAngel,
  user,
}: {
  post: IDisplayPost;
  isAngel: boolean | null | undefined;
  user: IDPerson;
}) {
  const [currPost, setCurrPost] = useState(post);

  let status =
    currPost.post.postStatus === undefined
      ? PSTATUS.PENDING
      : currPost.post.postStatus;

  status += isAngel ? Object.keys(PSTATUS).length / 2 - 1 : 0;

  // console.log(status);

  let proposeId: number | undefined =
    currPost.postProposes.length > 0
      ? currPost.postProposes.find(e => e.proffessionalId === user.person.id)
          ?.id
      : undefined;

  if (
    currPost.post.postStatus === PSTATUS.PENDING &&
    isAngel &&
    undefined !== proposeId
  ) {
    status++;
  }

  return statusElements(status, user, proposeId, currPost, setCurrPost);
}
