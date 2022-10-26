import {IPost} from './IPost';
import {IPostGallery} from './IPostGallery';

export interface IPostWGallery {
  post: IPost;
  postGallery?: IPostGallery[];
}
