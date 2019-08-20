/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  GET_ARTICLES, GET_ARTICLE, BOOKMARK, BOOKMARK_ERROR, GET_BOOKMARK,
} from './types/article.type';
import { BACKEND_URL } from '../../utils/constants';

export const getArticles = page => async (dispatch) => {
  const { data } = await axios.get(`${BACKEND_URL}/api/articles?page=${page}&limit=10`);
  dispatch({
    type: GET_ARTICLES,
    payload: { articles: data.data.foundArticles, count: data.data.count },
  });
};
export const getArticle = slug => async (dispatch) => {
  const { data } = await axios.get(`${BACKEND_URL}/api/articles/${slug}`);
  dispatch({
    type: GET_ARTICLE,
    payload: data,
  });
};

export const getBoomarks = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/api/bookmarks`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        token: sessionStorage.getItem('token'),
      },
    });
    // console.log(data);
    dispatch({
      type: GET_BOOKMARK,
      payload: data.data,
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const bookmark = slug => async (dispatch) => {
  console.log('hELLO THERE');
  try {
    // const token = sessionStorage.getItem('token');
    const { data } = await axios.post(`${BACKEND_URL}/api/articles/${slug}/bookmark`, {}, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        token: sessionStorage.getItem('token'),
      },
    });
    dispatch({
      type: BOOKMARK,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: BOOKMARK_ERROR,
      payload: error.response.data,
    });
  }
};
