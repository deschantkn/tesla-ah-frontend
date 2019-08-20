/* eslint-disable no-unreachable */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-undef */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { getBoomarks, bookmark } from '../../../src/redux/actions/article.actions';
import { bookmarkk } from '../../../__mocks__/data';
import getArticleReducer from '../../../src/redux/reducers/articles.reducer';
import { GET_BOOKMARK, BOOKMARK } from '../../../src/redux/actions/types/article.type';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

describe('Should get articles', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('should get bookmarks', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: { Bookmark: [], count: 1 },
        },
      });
    });
    return store.dispatch(getBoomarks(1)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('should create bookmark', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: { bookmark: {}, count: 1 },
        },
      });
    });
    return store.dispatch(bookmark(1)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});
describe('Reducer test bookmarking', () => {
  const initialState5 = {
    Bookmarks: [],
    bookmark: {},
  };
  it('should return an object', () => {
    const getbookmarks = getArticleReducer(initialState5, {
      type: GET_BOOKMARK,
      payload: bookmarkk[0],
    });
    expect(typeof getbookmarks).toBe('object');
  });
  it('should return an object', () => {
    const bookmarkArticle = getArticleReducer(initialState5, {
      type: BOOKMARK,
      payload: bookmarkk[0],
    });
    expect(typeof bookmarkArticle).toBe('object');
  });
});
