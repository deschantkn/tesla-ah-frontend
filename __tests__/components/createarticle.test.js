import React from 'react';
import { shallow } from 'enzyme';
import { Createarticle, mapStateToProps } from '../../src/components/pages/Createarticle';

let createArticle;
describe('Home Components tests...', () => {
  const props = {
    uploadImage: jest.fn(),
    createArticle: jest.fn(),
    updateArticle: jest.fn(),
  };
  beforeAll(() => {
    createArticle = shallow(<Createarticle {...props} />);
  });

  it('Should render Home component', () => {
    createArticle
      .instance()
      .componentWillReceiveProps({
        NewUploadedImage: { secure_url: undefined },
        NewArticle: { article: undefined },
      });
    createArticle
      .instance()
      .componentWillReceiveProps({
        NewUploadedImage: { secure_url: 'dcdcdcdcdc' },
        NewArticle: { article: { } },
      });
    expect(typeof mapStateToProps({ article: { uploadImage: { } } })).toBe('object');
    expect(createArticle).toMatchSnapshot();
  });
});
