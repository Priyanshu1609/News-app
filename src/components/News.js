import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResutls, setTotalResults] = useState(0);

  const capitalizeFirstLetter= (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)}- News Monkey`
    updateNews();
  }, []);

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${
      props.category
    }&apiKey=a05c218b0d8a4ec2b75abf649745c3b7&page=${page }&pagesize=${
      props.pageSize
    }`;

    setLoading(true);

    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResutls);
    setLoading(false);

    document.title = `${capitalizeFirstLetter(props.category)}- News Monkey`
    props.setProgress(100);
  };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${
      props.category
    }&apiKey=a05c218b0d8a4ec2b75abf649745c3b7&page=${page+ 1}&pagesize=${
      props.pageSize
    }`;

    setPage(page + 1);
    setLoading(true);

    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResutls);
    setLoading(false);
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResutls}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    urlToImage={element.urlToImage}
                    newsUrl={element.url}
                    publishedAt={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: "9",
  category: "general",
};

export default News;
