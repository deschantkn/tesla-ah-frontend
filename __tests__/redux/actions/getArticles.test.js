/* eslint-disable import/no-named-as-default */
/* eslint-disable no-undef */
import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import Home from '../../../src/components/pages/Home';
import { findByTestAtrr, testStore } from '../../../src/redux/store/index';
import { getArticles, getArticle } from '../../../src/redux/actions/article.actions';
import { getUserProfile } from '../../../src/redux/actions/author/authoruser.action';
import { article } from '../../../__mocks__/data';
import getArticleReducer from '../../../src/redux/reducers/articles.reducer';
import getLoginReducer from '../../../src/redux/reducers/users/login.reducer';
import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR } from '../../../src/redux/actions/types/auth.type';
import {
  GET_ARTICLES,
  CREATE_ARTICLE,
  GET_ARTICLE,
} from '../../../src/redux/actions/types/article.type';
import {
  IS_LOADING,
  IS_LOADED,
} from '../../../src/redux/actions/types/ui.type';
import { GET_USER_PROFILE } from '../../../src/redux/actions/types/authorprofile.type';
import getauthorreducer from '../../../src/redux/reducers/authorprofile.reducer';
import getUiReducer from '../../../src/redux/reducers/ui.reducer';

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
  test('should get articles', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: { foundArticles: [], count: 1 },
        },
      });
    });
    return store.dispatch(getArticles(1)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});
describe('Should get article', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('should get article', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          articles: {},
        },
      });
    });
    return store.dispatch(getArticle('ddffd')).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});
describe('Should get profile', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('should get user profile', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          articles: {},
        },
      });
    });
    return store.dispatch(getUserProfile('ddffd')).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});
const setup = (initialState = {}) => {
  const store2 = testStore(initialState);
  const wrapper = shallow(<Home store={store2} />)
    .childAt(0)
    .dive();
  return wrapper;
};
describe('Should not throw error', () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {
      articles: article,
    };
    wrapper = setup(initialState);
  });

  it('Should render without errors', () => {
    const component = findByTestAtrr(wrapper, 'homeComponent');
    expect(component.length).toBe(1);
  });
});

describe('Reducer test', () => {
  const initialState1 = {
    articles: [],
    currentArticle: {},
  };
  const initialState2 = {
    loading: false,
  };
  const initialState3 = {
    authorprofile: {},
  };
  it('Should return an object', () => {
    const articles = getArticleReducer(initialState1, {
      type: GET_ARTICLES,
      payload: article,
    });
    expect(typeof articles).toBe('object');
  });
  it('Should return an object', () => {
    const articles = getArticleReducer(initialState1, {
      type: CREATE_ARTICLE,
      payload: article[0],
    });
    expect(typeof articles).toBe('object');
  });
  it('Should return an object', () => {
    const articles = getArticleReducer(initialState1, {
      type: GET_ARTICLE,
      payload: article[0],
    });
    expect(typeof articles).toBe('object');
  });
  it('Should return an object', () => {
    const ui = getUiReducer(initialState2, { type: IS_LOADED, payload: {} });
    expect(typeof ui).toBe('object');
  });
  it('Should return an object', () => {
    const ui = getUiReducer(initialState2, { type: IS_LOADING, payload: {} });
    expect(typeof ui).toBe('object');
  });
  it('Should return an object', () => {
    const ui = getauthorreducer(initialState3, { type: GET_USER_PROFILE, payload: {} });
    expect(typeof ui).toBe('object');
  });
  const initialState4 = {
    loggedIn: false,
    message: null,
    error: null,
    loginRedirectPath: '/',
    isAuthenticated: false,
    isAdmin: false,
    isLogging: false,
    user: JSON.parse(localStorage.user || '{}'),
  };
  it('Should return an object', () => {
    const login = getLoginReducer(initialState4, { type: LOGIN_ERROR, payload: {} });
    expect(typeof (login)).toBe('object');
  });
  it('Should return an object', () => {
    const login = getLoginReducer(initialState4, { type: LOGIN_PENDING, payload: {} });
    expect(typeof (login)).toBe('object');
  });
  it('Should return an object', () => {
    const login = getLoginReducer(initialState4, { type: LOGIN_SUCCESS, payload: {} });
    expect(typeof (login)).toBe('object');
  });
});
