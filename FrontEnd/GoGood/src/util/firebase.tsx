import {Asset} from 'react-native-image-picker';
import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';

const nestedPromise = async (
  dataArr: Asset[],
  dirName: string,
): Promise<any> => {
  return await Promise.all(
    dataArr.map(async item => {
      if (Array.isArray(item) && item.length) {
        return await uploadAFile(dirName, item);
      }
      return 'response-' + item;
    }),
  );
};

const uploadAFile = async (dirName: string, curr: Asset) => {
  const res = await storage()
    .ref(dirName + curr.fileName)
    .putString(curr.base64 as string);

  return res.state;
};

const uploadMultiple = async (dataArr: Asset[], dirName: string) => {
  nestedPromise(dataArr, dirName).then(results => {
    console.log(results);
  });
};

export async function storeGallery(
  dataArr: Asset[],
  postId: number,
  setSuccess: Function,
) {
  const dirName =
    new Date().toISOString().slice(0, 10) + '/' + postId.toString() + '/';
  // const res = await uploadMultiple(dataArr, dirName);
  nestedPromise(dataArr, dirName).then(results => {
    console.log(results);
  });
}

export async function getGallery(date: Date, postId: number) {
  // const url = await storage().ref(date +'/' + postId).getDownloadURL();
  let tmp = date.toISOString().slice(0, 10);
  const dirRef = storage().ref(tmp + '/' + postId.toString() + '/');

  const data: FirebaseStorageTypes.ListResult = await dirRef.list({
    pageToken: '0',
  });
  data.items.map(curr => {
    console.log(curr);
  });
}
