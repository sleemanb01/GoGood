import {IDPerson} from '../../interfaces/download';
import {IPostPropose} from '../../interfaces/upload';
import {IDisplayPost} from '../../interfaces/view';
import {USTATUS} from '../../types/enum';
import {deletePropose, postPropose} from '../../util/axios';

export const propseHelp = (
  postId: number,
  proId: number,
  setSuccess: Function,
) => {
  setSuccess(USTATUS.PENDING);
  const propose: IPostPropose = {proffessionalId: proId, postId: postId};
  postPropose(propose);
};

export const share = (postId: number) => {
  console.log('share');
};

export const postReview = (postId: number, proId: number) => {
  console.log('post review');
};

export const cancelProposer = (proposeId: number, setSuccess: Function) => {
  console.log('delete');
  setSuccess(USTATUS.PENDING);
  deletePropose(proposeId);

  // console.log('cancel proposer');
};

export const showProposers = (proposers: IDPerson[]) => {
  console.log('show proposer');
};

export const acceptProposer = (postId: number, proId: number) => {
  // post status 3 WAITING FOR DATE
  console.log('cancel proposer');
};

export const confirmDate = (postId: number) => {
  // put status to 5 INHANDLE
  console.log('cancel proposer');
};

export const postHandled = (postId: number, proId: number) => {
  // handled + say thanks + put status to 0 + delete proposers
  console.log('cancel proposer');
};

export const getReview = (postId: number, proId: number) => {
  //get comment
  console.log('cancel proposer');
};

export const proposeDate = (postId: number, date: Date) => {
  //get comment
  console.log(date);
};
