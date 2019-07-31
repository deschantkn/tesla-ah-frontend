import axios from 'axios';
import axioz from '../../utils/axios-ah';
import {
  UPLOAD_IMAGE,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
  GET_ARTICLES,
  GET_ONE_ARTICLES,
  RESET_PROPS,
  DELETE_ARTICLE,
  GET_MY_ARTICLES,
} from './types/article.type';
import {
  STORAGE_BASE_URL,
  IMAGE_STORAGE_PRESENTS,
  BACKEND_URL,
} from '../../utils/constants';

export const createArticle = article => async (dispatch) => {
  const { data } = await axioz.post('/articles', article);
  dispatch({
    type: CREATE_ARTICLE,
    payload: data,
  });
};
export const updateArticle = (article, slug) => async (dispatch) => {
  const { data } = await axioz.put(`/articles/${slug}`, article);
  dispatch({
    type: UPDATE_ARTICLE,
    payload: data,
  });
};
export const uploadImage = e => async (dispatch) => {
  const baseUrl = `${STORAGE_BASE_URL}`;
  const basePreset = `${IMAGE_STORAGE_PRESENTS}`;
  const imageFile = e;
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('upload_preset', basePreset);
  const { data } = await axios.post(baseUrl, formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  dispatch({
    type: UPLOAD_IMAGE,
    payload: data,
  });
};

export const getArticle = slug => async (dispatch) => {
  const { data } = await axios.get(`${BACKEND_URL}/api/articles/${slug}`);
  dispatch({
    type: GET_ONE_ARTICLES,
    payload: data,
  });
};

export const getArticles = page => async (dispatch) => {
  const { data } = await axios.get(`${BACKEND_URL}/api/articles?page=${page}&limit=10`);
  dispatch({
    type: GET_ARTICLES,
    payload: { articles: data.data.foundArticles, count: data.data.count },
  });
};

export const resetProps = () => ({ type: RESET_PROPS });

export const deleteArticle = slug => async (dispatch) => {
  const token = sessionStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      token: `${token}`,
    },
  };
  const res = await axios.delete(`${BACKEND_URL}/api/articles/${slug}`, config);
  dispatch({
    type: DELETE_ARTICLE,
    payload: res.data,
  });
};

export const getMyArticles = page => async (dispatch) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common.token = token;
  } else {
    delete axios.defaults.headers.common.token;
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
      token: `${token}`,
    },
  };
  const res = await axios.get(
    `${BACKEND_URL}/api/articles/user?page=${page}&limit=5`,
    config,
  );
  dispatch({
    type: GET_MY_ARTICLES,
    payload: res.data,
  });
};
