import React from 'react';
import { useSelector } from 'react-redux';
import {
  deleteLastPostTC,
  deletePostTC, getListTC, selectPostAC,
} from '../../bll/reducers/list-reducers';
import { AppRootType, useAppDispatch } from '../../bll/store';
import s from './PostList.module.scss';

type PostListType= {
  // eslint-disable-next-line no-unused-vars
  setShow: (value: boolean) => void,
}

function PostList({ setShow }: PostListType) {
  const dispatch = useAppDispatch();
  const list = useSelector<AppRootType, { text: string[], id: string}[]>(
    (state) => state.list.posts,
  );

  const addPost = () => {
    dispatch(getListTC());
  };

  const removeLastPost = () => {
    dispatch(deleteLastPostTC());
  };

  const deletePost = (id: string) => {
    dispatch(deletePostTC(id));
  };

  const selectPost = (id: string) => {
    dispatch(selectPostAC(id));
    setShow(true);
  };

  return (
    <div className={s.posts_wrapper}>
      <div className={s.posts_list}>
        {list.map((l) => (
          <div key={l.id} className={s.posts_post}>
            <div>
              {l.text[0]}
            </div>

            <div className={s.posts_post_btn_grp}>
              <button className={s.posts_post_btn} type="button" onClick={() => selectPost(l.id)}>Select</button>
              <button className={s.posts_post_btn} type="button" onClick={() => deletePost(l.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className={s.posts_btn_grp}>
        <button className={s.posts_btn} onClick={removeLastPost} type="button">Remove Last Post</button>
        <button className={s.posts_btn} onClick={addPost} type="button">Add Post</button>
      </div>

    </div>
  );
}

export default PostList;
