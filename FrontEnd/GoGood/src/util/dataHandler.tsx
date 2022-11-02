import useAsyncStorage from '@react-native-async-storage/async-storage';
import {IDPerson, IPostWData} from '../interfaces/download';
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

export const adjustPostData = (dataArr: IPostWData): IDisplayPost[] => {
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

      let postGallery = dataArr.postGallery
        ? dataArr.postGallery.filter(gallery => gallery.postId == curr.id)
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

export const getBytes = (value: string) => {
  let buffer = new ArrayBuffer(value.length * 2);
  let view = new Uint16Array(buffer);

  for (let i = 0; i < value.length; ++i) {
    view[i] = value.charCodeAt(i);
  }

  return buffer;
};

export const bufferToString = (buffer: ArrayBuffer): string => {
  return String.fromCharCode.apply(null, Array.from(new Uint16Array(buffer)));
};

export const base64ToHex = (str: string) => {
  // const raw = atob(str);
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const hex = str.charCodeAt(i).toString(16);
    result += hex.length === 2 ? hex : '0' + hex;
  }
  // return result.toUpperCase();
  console.log(typeof result);
};
