/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

const Slideritem = (props) => {
  const { article } = props;
  const activeSlide = `carousel-item ${article ? article.clc : ''}`;
  return (
    <div className={activeSlide}>
      <img src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fauthorshaven-cebfb.appspot.com%2Fo%2Fimages%252Fe-commerce-back.jpg%3Falt%3Dmedia%26token%3D44654853-e2bb-4dfd-9b47-fbdac5d952a0" className="img-fluid" alt="..." />
      <div className="container">
        <div className="carousel__text">
          <h3>{article ? article.title : ''}</h3>
          <p>{article ? article.description : ''}</p>
          <Link to={article ? `articles/${article.slug}` : '/'} href="" className="continue-btn">
            Continue Reading
            <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slideritem;
