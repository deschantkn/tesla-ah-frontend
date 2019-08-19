import {
  SEARCH_DONE, SEARCH_CLEAR, SEARCH_FAILED, SEARCH_PENDING,
} from '../../actions/types/article.type';

const initialState = {
  results: [],
  failed: false,
  pending: false,
  cleared: true,
  message: '',
  done: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SEARCH_DONE:
      return {
        ...state,
        results: payload,
        cleared: false,
        pending: false,
        done: true,
      };
    case SEARCH_CLEAR:
      return initialState;
    case SEARCH_FAILED:
      return {
        ...state,
        pending: false,
        failed: true,
        message: payload,
      };
    case SEARCH_PENDING:
      return {
        ...state,
        pending: true,
      };
    default:
      return state;
  }
};
