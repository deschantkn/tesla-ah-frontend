import getArticleReducer from '../../../src/redux/reducers/articles.reducer';
import {
  UPLOAD_IMAGE,
  UPDATE_ARTICLE,
  RESET_PROPS,
  GET_MY_ARTICLES,
} from '../../../src/redux/actions/types/article.type';
import { article } from '../../../__mocks__/data';
import { getFromEditor } from '../../../src/utils/getArticleItemData';
import resetPasswordReducer from '../../../src/redux/reducers/resetPassword.reducer';
import applyPasswordReducer from '../../../src/redux/reducers/applyPassword.reducer';
import {
  POST_RESET,
  PATCH_RESET,
} from '../../../src/redux/actions/types/resetPassword.type';
// import Articleitem from '../../../src/components/items/Articleitem';

describe('Article reduccer', () => {
  const initialState1 = {
    articles: [],
    currentArticle: {},
    uploadedImage: {},
    updatedArticle: {},
  };
  it('Should return an object', () => {
    const articles = getArticleReducer(initialState1, {
      type: UPLOAD_IMAGE,
      payload: {},
    });
    expect(typeof articles).toBe('object');
  });
  it('Should return an object', () => {
    const articles = getArticleReducer(initialState1, {
      type: GET_MY_ARTICLES,
      payload: {},
    });
    expect(typeof articles).toBe('object');
  });
  it('Should return an object', () => {
    const articles = getArticleReducer(initialState1, {
      type: UPDATE_ARTICLE,
      payload: {},
    });
    expect(typeof articles).toBe('object');
  });
  it('Should return an object', () => {
    const articles = getArticleReducer(initialState1, {
      type: RESET_PROPS,
      payload: {},
    });
    expect(typeof articles).toBe('object');
  });
  it('Should return an object', () => {
    // const art1 = JSON.parse(article[1].body);
    // const body = JSON.parse(art1.body);
    const articl = JSON.parse(JSON.stringify(article[0]));
    const articl2 = JSON.parse(articl.body);
    const { blocks } = articl2.article.body;
    const finalOb = { article: { body: { blocks } } };
    const art = getFromEditor(finalOb);
    expect(typeof art).toBe('object');
  });
  it('Should return an object', () => {
    // const art1 = JSON.parse(article[1].body);
    // const body = JSON.parse(art1.body);
    const articl = JSON.parse(JSON.stringify(article[3]));
    const articl2 = JSON.parse(articl.body);
    const { blocks } = articl2.article.body;
    const finalOb = { article: { body: { blocks } } };
    const art = getFromEditor(finalOb);
    expect(typeof art).toBe('object');
  });
  const initialStateps = {
    message: '',
    status: '',
  };
  it('Should return an object', () => {
    const obj = resetPasswordReducer(initialStateps, {
      type: POST_RESET,
      payload: { data: { message: '' }, status: 2 },
    });
    expect(typeof obj).toBe('object');
  });
  it('Should return an object', () => {
    const obj = applyPasswordReducer(initialStateps, {
      type: PATCH_RESET,
      payload: { data: { message: '' }, status: 2 },
    });
    expect(typeof obj).toBe('object');
  });
});
