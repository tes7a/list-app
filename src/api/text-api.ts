import axios from 'axios';

// dal
const instance = axios.create({
  baseURL: 'https://baconipsum.com/api/',
});

const textAPI = {
  getList() {
    return instance.get<string[]>('?type=meat-and-filler');
  },
};

export default textAPI;
