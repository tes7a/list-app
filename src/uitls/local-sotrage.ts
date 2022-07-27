import { AppRootType } from '../bll/store';

export const loadValue = () => {
  try {
    const value = localStorage.getItem('text');
    if (value === null) {
      return undefined;
    }

    return JSON.parse(value);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (textList: { text: string[], id: string}[]) => {
  try {
    localStorage.setItem('text', JSON.stringify(textList));
  // eslint-disable-next-line no-empty
  } catch {}
};

export const preloadedState: AppRootType = {
  list: {
    posts: loadValue() ? loadValue() : [],
    modalData: null,
  },
};
