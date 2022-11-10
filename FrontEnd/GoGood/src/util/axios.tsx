import axios from 'axios';
import {IPostWGallery, IDPerson, IPersonWFields} from '../interfaces/download';
import {
  IPerson,
  IPostPropose,
  IPost,
  IProfessionalField,
} from '../interfaces/upload';

const url = 'http://10.0.2.2:7070/api/';

/* *************************** GET *************************** */

/* *************************** */
export const getPosts = async (
  param: string,
  setPosts: Function,
  controller: string,
) => {
  try {
    const result = await axios.get(url + controller + param);
    const status = result.status;
    if (status === 200 || status === 204) {
      setPosts(result.data);
    }
  } catch (err) {
    setPosts(null);
  }
};

/* *************************** */

export const fetchFields = async (setFields: Function) => {
  const controller = 'Fields';
  try {
    const result = await axios.get(url + controller);
    const status = result.status;
    if (status === 200) {
      setFields(result.data);
    } else if (status === 204) {
      setFields([]);
    }
  } catch (err) {
    console.log(err);
  }
};

/* *************************** */
export async function getReviews(personId: number, setReviews: Function) {
  try {
    const controller = 'Persons/GetPersonReviews/';
    const result = await axios.get(url + controller + personId);
    const status = result.status;
    if (status === 200) {
      setReviews(result.data);
    } else if (status === 204) {
      setReviews([]);
    }
  } catch (err) {
    console.log(err);
  }
}

/* *************************** POST *************************** */

/* *************************** */
export const postPost = async (post: IPostWGallery, setSuccess: Function) => {
  try {
    const controller = 'Posts/postPostWGallery';
    const result = await axios.post(url + controller, post);
    if (result.status === 200) {
      setSuccess(true);
    }
  } catch (err) {
    console.log(err);
    setSuccess(false);
  }
};

/* *************************** */
export const postProfessionalFields = async (
  pFields: IProfessionalField[],
  setSuccess: Function,
) => {
  const controller = 'ProfessionalFields/postProfessionalFields';
  try {
    const result = await axios.post(url + controller, pFields);
    if (result.status === 200) {
      setSuccess(true);
    }
  } catch (err) {
    console.log(err);
    setSuccess(false);
  }
};

/* *************************** */
export const signInUp = async (person: IPerson, setUser: Function) => {
  const controller = 'Persons/signInUp/';
  try {
    const result = await axios.post(url + controller, person);

    if (result.status === 200) {
      // console.log(result.data);
      setUser(result.data as IPersonWFields);
    }
  } catch (err) {
    console.log(err);
    setUser(null);
  }
};

/* *************************** */
export async function updatePerson(user: IDPerson, setSuccess: Function) {
  try {
    const controller = 'Persons/putDPerson';
    const result = await axios.post(url + controller, user);

    if (result.status === 200) {
      setSuccess(2);
    }
  } catch (err) {
    console.log(err);
    setSuccess(3);
  }
}

/* *************************** */
export async function postPropose(propose: IPostPropose, setSuccess: Function) {
  try {
    const controller = 'PostProposes';
    const result = await axios.post(url + controller, propose);

    if (result.status === 200) {
      setSuccess(true);
    }
  } catch (err) {
    console.log(err);
    setSuccess(false);
  }
}

/* *************************** DELETE *************************** */

/* *************************** */
export async function deletePropose(id: number, setSuccess: Function) {
  try {
    const controller = 'PostProposes/';
    const result = await axios.delete(url + controller + id);

    if (result.status === 200) {
      setSuccess(true);
    }
  } catch (err) {
    console.log(err);
    setSuccess(false);
  }
}

/* *************************** PUT *************************** */

/* *************************** */
export async function putPost(post: IPost, setSuccess: Function) {
  try {
    const controller = 'Posts';
    const result = await axios.put(url + controller, post);

    if (result.status === 200) {
      setSuccess(true);
    }
  } catch (err) {
    console.log(err);
    setSuccess(false);
  }
}
