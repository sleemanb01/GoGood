import {useState} from 'react';
import {IDPerson} from '../../interfaces/download';
import {IDisplayPost} from '../../interfaces/view';
import {_BUTTONS} from '../../constants/_BUTTONS';
import {_FONTS} from '../../constants/_FONTS';
import {PSTATUS} from '../../types/enum';
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

  const statusesLength = Object.keys(PSTATUS).length / 2;

  status += isAngel ? statusesLength : 0;

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
    status = statusesLength * 2; // this will return a statusless(DB wise) component
  }

  return statusElements(status, user, proposeId, currPost, setCurrPost);
}
