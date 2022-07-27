import axios from 'axios';
import { uid } from 'uid';
import listAPI from '../../api/text-api';
import { saveState } from '../../uitls/local-sotrage';
import { AppRootType, AppThunkType } from '../store';

// actions

export const getListAC = (text: string[]) => ({ type: 'GET-LIST', text } as const);
export const deleteLastPostAC = () => ({ type: 'DELETE-LAST-POST' } as const);
export const deletePostAC = (id: string) => ({ type: 'DELETE-POST', id } as const);
export const selectPostAC = (id: string) => ({ type: 'SELECT-POST', id } as const);

// types

export type InitialStateType = {
  posts: {
    text: string[],
    id: string
  }[],
  modalData: string[] | null,
}

type ActionTypes =
  | ReturnType<typeof getListAC>
  | ReturnType<typeof deletePostAC>
  | ReturnType<typeof selectPostAC>
  | ReturnType<typeof deleteLastPostAC>

// bll
const initialState: InitialStateType = {
  posts: [],
  modalData: null,
};

export const listReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case 'GET-LIST':
      return {
        ...state,
        posts: [...state.posts, { text: action.text, id: uid() }],
      };
    case 'DELETE-POST':
      return { ...state, posts: state.posts.filter((el) => el.id !== action.id) };
    case 'DELETE-LAST-POST':
      return { ...state, posts: state.posts.slice(0, -1) };
    case 'SELECT-POST': {
      const arr = state.posts.filter((el) => el.id === action.id);
      const { text } = arr[0];
      return { ...state, modalData: text || null };
    }
    default: return state;
  }
};

// thunks

export const getListTC = () => (dispatch: AppThunkType, getState: () => AppRootType) => {
  listAPI.getList()
    .then((res) => {
      dispatch(getListAC(res.data));
      saveState(getState().list.posts || {});
    })
    .catch((e) => {
      console.log(e.response.data.message);
      if (axios.isAxiosError(e)) {
        console.log(e.message);
      }
    });
};

export const deletePostTC = (id: string) => (
  dispatch: AppThunkType,
  getState: () => AppRootType,
) => {
  dispatch(deletePostAC(id));
  saveState(getState().list.posts || []);
};

export const deleteLastPostTC = () => (
  dispatch: AppThunkType,
  getState: () => AppRootType,
) => {
  dispatch(deleteLastPostAC());
  saveState(getState().list.posts || []);
};
