/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DisplayContent from 'Dante2';
import Rater from 'react-rater';
import Moment from 'react-moment';
import {
  getArticle, getBoomarks, bookmark,
} from '../../redux/actions/article.actions';
import { getUserProfile } from '../../redux/actions/author/authoruser.action';
import { DEFAULT_AVATA } from '../../utils/constants';
import Preloader from '../widgets/Preloader';

class ReadArticle extends Component {
  state = {
    Article: {},
    Author: {},
    AllBoomarked: {},
    userId: {},
    isBookmarked: false,
    isProfileRequested: false,
  };

  componentWillMount() {
    const { slug } = this.props.match.params;
    this.props.getArticle(slug);
    this.props.getBoomarks(slug);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.Article) {
      this.setState({ Article: newProps.Article });
      if (!this.state.isProfileRequested) {
        this.props.getUserProfile(newProps.Article.article.author.username);
        this.setState({ isProfileRequested: true });
      }
    }
    if (newProps.Author) {
      this.setState({ Author: newProps.Author });
    }
    // if (newProps.myBookmarks.length > 0) {

    // }
  }

  handleClick = () => {
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      isBookmarked: !this.state.isBookmarked,
    });
    const {
      match: { params: { slug } },
      bookmark: bookmarkArticle,
    } = this.props;
    bookmarkArticle(slug);
    this.props.getBoomarks(slug);
  };

  isThisSlugBookmarked = (slug, bookmarks) => {
    const data = bookmarks.find(item => item.slug === slug);
    if (data) {
      return true;
    }
    return false;
  }

  render() {
    const {
      Article, Author,
    } = this.state;
    let contentBlocks = [];
    const { slug } = this.props.match.params;
    const Bookmarks = this.props.myBookmarks;
    if (Article && Author.profile) {
      console.log(this.isThisSlugBookmarked(slug, Bookmarks), Bookmarks);
      const BookmarkButton = this.isThisSlugBookmarked(slug, Bookmarks) || this.state.isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark';
      console.log(this.isThisSlugBookmarked(slug, Bookmarks), this.state.isBookmarked);
      const content = JSON.parse(Article.article.body);
      const { blocks } = content.article.body;
      contentBlocks = blocks.splice(1, blocks.length);
      const { avatar, firstName, lastName } = Author.profile;
      return (
        <div className="container view-article-content mt-5">
          <section className="editor-main-section">
            <main className="editor-main row mt-6 mb-5">
              <div className="col-lg-9 left-nav">
                <div className="title-content">
                  <p>
                    <strong>{blocks[0].text}</strong>
                  </p>
                </div>
                <div className="row profile-content ml-1">
                  <div className="">
                    <img className="" src={avatar || DEFAULT_AVATA} alt="" />
                  </div>
                  <div className="ml-3">
                    <div>
                      <strong>{`${firstName}  ${lastName}`}</strong>
                    </div>
                    <div>
                      <Moment format="D MMM YYYY">
                        {Article.article.createdAt}
                      </Moment>
                    </div>
                    <Rater total={5} rating={2} />
                  </div>
                </div>
                <div className="mt-3">
                  <DisplayContent
                    content={{ blocks: contentBlocks, entityMap: {} }}
                    read_only
                  />
                </div>
              </div>
              <div className="col-lg-1 rigth-nav text-center">
                <div className="social-buttons">
                  <div className="flauting-buttons mt-3 facebook">
                    <i className="fab fa-facebook-f" />
                  </div>
                  <div className="flauting-buttons mt-3 twitter">
                    <i className="fab fa-twitter" />
                  </div>
                  <div className="flauting-buttons mt-3 email">
                    <i className="fas fa-envelope-open" />
                  </div>
                  <div className="flauting-buttons mt-3 bookmark" onClick={this.handleClick}>
                    <i className={BookmarkButton} />
                  </div>
                  <div className="flauting-buttons mt-3">
                    <i className="fas fa-thumbs-up" />
                  </div>
                  <div className="flauting-buttons mt-3 dislike">
                    <i className="fas fa-thumbs-down" />
                  </div>
                </div>
              </div>
            </main>
          </section>
        </div>
      );
    }
    return (
      <div>
        <Preloader />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Article: state.article.article,
  Author: state.author.authorprofile,
  myBookmarks: state.article.Boomarks,
  bookmark: state.article.bookmark,
});

export default connect(
  mapStateToProps,
  {
    getArticle, getUserProfile, getBoomarks, bookmark,
  },
)(ReadArticle);
