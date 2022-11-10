import useAsyncStorage from '@react-native-async-storage/async-storage';
import {IDPerson, IPostsWData} from '../interfaces/download';
import {IPostPropose, IPost, IField} from '../interfaces/upload';
import {IDisplayPost} from '../interfaces/view';

const getProfessionals = (
  dataArr: IPostPropose[],
  pf: IDPerson[],
): IDPerson[] => {
  let professionals: IDPerson[] = [];

  pf.map((curr: IDPerson) => {
    let p = dataArr.find(p => curr.person.id === p.proffessionalId);
    if (p) {
      professionals.push(curr);
    }
  });

  return professionals;
};

export const adjustPostData = (dataArr: IPostsWData): IDisplayPost[] => {
  let finalData: IDisplayPost[] = [];

  if (dataArr) {
    dataArr.posts.map((curr: IPost) => {
      let postProposes: IPostPropose[] = dataArr.postProposes
        ? dataArr.postProposes.filter(
            propose => (propose.postId = curr.id as number),
          )
        : [];
      let professionalProposers: IDPerson[] = dataArr.professionalProposers
        ? getProfessionals(postProposes, dataArr.professionalProposers)
        : [];

      let postGallery = dataArr.dPostGallery
        ? dataArr.dPostGallery.filter(gallery => gallery.postId == curr.id)
        : [];

      let post: IDisplayPost = {
        post: curr,
        postGallery: postGallery,
        professionalProposers: professionalProposers,
        postProposes: postProposes,
      };
      finalData.push(post);
    });
  }

  return finalData;
};
