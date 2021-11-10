import React from "react";

const Newsitem = (props) => {
  let { title, description, urlToImage, newsUrl, publishedAt } = props;
  return (
    <div>
      <div className="card my-3">
        <img
          src={
            !urlToImage
              ? "https://lh4.googleusercontent.com/x6I5hPqRlOE2toimyUvhA5iub6mTyWxeaz7FpGXIz-5u4IoBevgKIpYoEein0ortFTCSbFxStaT__1hCo5p8jmA9D-78Hdf5eDPzT1TIzvJvlD79nYJPY2mx9_eoEw=s0"
              : urlToImage
          }
          className="card-img-top"
          alt="Nothing to show"
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-dark"
          >
            Read More
          </a>
          <p className="card-text">
            <small className="text-muted">
              {new Date(publishedAt).toDateString()}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsitem;
