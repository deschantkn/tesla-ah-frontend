import axios from 'axios';
// import { toast } from 'react-toastify';
import {
  SEARCH_PENDING, SEARCH_DONE, SEARCH_FAILED, SEARCH_CLEAR,
} from '../types/article.type';
import { BACKEND_URL } from '../../../utils/constants';

export default (queryText, type) => async (dispatch) => {
  dispatch({
    type: SEARCH_CLEAR,
  });
  dispatch({
    type: SEARCH_PENDING,
  });
  try {
    const { data: response } = await axios.get(`${BACKEND_URL}/api/articles/?${type}=${queryText}`);
    dispatch({
      type: SEARCH_DONE,
      payload: response.data,
    });
  } catch ({ response: { data } }) {
    dispatch({
      type: SEARCH_FAILED,
      payload: data.error,
    });
  }
};
