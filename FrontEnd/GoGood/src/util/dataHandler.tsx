import {IDPerson} from '../interfaces/Download/IDPerson';
import {IDPost} from '../interfaces/Download/IDPost';
import {IPostWData} from '../interfaces/Download/IPostWData';
import {IDisplayPost} from '../interfaces/IDisplayPost';
import {IPost} from '../interfaces/Upload/IPost';
import {IPostPropose} from '../interfaces/Upload/IPostPropose';

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

export const adjustPostData = (dataArr: IPostWData): IDisplayPost[] => {
  let finalData: IDisplayPost[] = [];

  if (dataArr) {
    dataArr.dPosts.map((curr: IDPost) => {
      let postProposes: IPostPropose[] = dataArr.postProposes
        ? dataArr.postProposes.filter(
            propose => (propose.postId = curr.id as number),
          )
        : [];
      let professionalProposers: IDPerson[] = dataArr.professionalProposers
        ? getProfessionals(postProposes, dataArr.professionalProposers)
        : [];

      let postGallery = dataArr.postGallery
        ? dataArr.postGallery.filter(gallery => gallery.postId == curr.id)
        : [];

      let post: IDisplayPost = {
        dPost: curr,
        postGallery: postGallery,
        professionalProposers: professionalProposers,
        postProposes: postProposes,
      };
      finalData.push(post);
    });
  }

  return finalData;
};

export const DToUPost = (dPost: IDPost): IPost => {
  return {
    id: dPost.id,
    postTitle: dPost.postTitle,
    postDescription: dPost.postDescription,
    postDate: dPost.postDate,
    personId: dPost.personId,
    fieldId: dPost.field.id,
    postLat: dPost.postLat,
    postLng: dPost.postLng,
    proffessionalId: dPost.professionalId,
    postStatus: dPost.postStatus,
  };
};
