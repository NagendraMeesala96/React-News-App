import { Fragment, useEffect } from "react";
import "../App.css";
import { useState } from "react";
import axios from "axios";
import { SpinnerCircular } from 'spinners-react';

function NewsApp() {

  const [articles, setArticles] = useState([]);

  const [categories,setCategory] = useState("");

  const [inputSearch,setInputSearch] = useState("");

  const [paginationActive, setPaginationActive] = useState(1);

//TO Load the News function
  const loadNews = (page,category,search) => {

    axios({
      url: "https://newsapi.org/v2/top-headlines",
      method: "GET",
      params: {
        pageSize:"5",
        page:page,
        country: "in",
        category : category,
        q:search,
        apikey: "4352d70d7f244de883919334e9eb34d1"
      }
    })
      .then((res) => {
        if (res.status === 200) {
          setArticles(res.data.articles);

        }
      })
      .catch((err) => {
        console.log(err)
        alert(err.response.data.message)
      });

      
      
  };

  //calling load news function first time
  useEffect(() => {
    loadNews();
  }, []);

  //pagination
  const pagination =(page)=>{

    setPaginationActive(page);

    setArticles([]);

    loadNews(page,categories);

  }

  //category
  const category = (catName) =>{

    const str = catName.toUpperCase();

    setCategory(str);

    setArticles([]);

    loadNews("1",catName);
    
  }

  //Search results
  const searchResult = (event) =>{

    setInputSearch(event.target.value.toLowerCase());

  }

  //Search submit
  const submitHandler = () =>{

    loadNews("1",inputSearch);

    setCategory(inputSearch);

    setInputSearch("");
  }

  return (
    <Fragment>
      <div className="container-fluids">
        <nav className="navbar bg-dark navbar-dark navbar-expand-lg">
          <div className="container">
            <a href="#" className="navbar-brand">
              <h1>Rock Star News For You</h1>
            </a>
            <button
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#links"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="links">
              <ul className="navbar-nav ml">
                <li className="nav-item">
                  <a href="#" className="nav-link" onClick={()=>{category("")}}>
                    All News
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link" onClick={()=>{category("business")}}>
                    Business
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link" onClick={()=>{category("entertainment")}}>
                    Entertainment
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link" onClick={()=>{category("general")}}>
                    General
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link" onClick={()=>{category("technology")}}>
                    Technology
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link" onClick={()=>{category("sports")}}>
                    Sports
                  </a>
                </li>
              </ul>
              &nbsp;
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  value={inputSearch}
                  onChange={searchResult}
                  placeholder="Search with category name"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit" onClick={submitHandler} >
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
        <div className="body">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
              <div className="b">
                <p>{categories} NEWS</p>
              </div>
                {
                articles.length > 0 ?
                articles.map((articles, index) => {
                  return (
                    <Fragment key={index}>
                      <div className="card mb-3 mt-3" style={{ width: 900 }}>
                        <h2 className="card-title">
                          {articles.title}
                        </h2>
                        <div className="details">
                          <p>
                            <i className="fa fa-tag"></i> {articles.author}
                          </p>
                          &nbsp;&nbsp;
                          <p>
                            <i className="fa fa-user"></i> {articles.source.name}
                          </p>
                          &nbsp;&nbsp;
                          <p>
                            <i className="fa fa-user"></i> {articles.publishedAt}
                          </p>
                        </div>
                        <div className="row g-0">
                          <div className="col-md-4 container-fluid imgs">
                            <img
                              src={articles.urlToImage===null ? "https://www.ryadel.com/wp-content/uploads/2020/03/broken-link-url-dead-404-error.jpg" : articles.urlToImage}
                              className="img-fluid"
                              alt="..."
                            />
                          </div>
                          <div className="col-md-7">
                            <p className="card-text">
                              {articles.description}
                            </p>
                            <a className="btn btn-outline-primary read-more" href={articles.url} target={"_blank"}>
                              Read More
                            </a>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  );
                }) : <SpinnerCircular/> } 
              </div>
              <div className="col-lg-3 mt-5 text-center">
                <div className="card border-dark mb-3" style={{ width: 300 }}>
                  <div className="card-header fw-bold border-white">
                    Social Plugin
                  </div>
                  <div className="card-body text-primary">
                    <a className="btn btn-primary icon" href="#!" role="button">
                      <i className="fa fa-facebook-f"></i>
                    </a>
                    <a className="btn btn-danger icon" href="#!" role="button">
                      <i className="fa fa-instagram"></i>
                    </a>
                    <a className="btn btn-success icon" href="#!" role="button">
                      <i className="fa fa-whatsapp"></i>
                    </a>
                    <a className="btn btn-danger icon" href="#!" role="button">
                      <i className="fa fa-youtube"></i>
                    </a>
                    <a className="btn btn-dark icon" href="#!" role="button">
                      <i className="fa fa-github"></i>
                    </a>
                    <a className="btn btn-primary icon" href="#!" role="button">
                      <i className="fa fa-stack-overflow"></i>
                    </a>
                    <a className="btn btn-info icon" href="#!" role="button">
                      <i className="fa fa-dribbble"></i>
                    </a>
                    <a className="btn btn-danger icon" href="#!" role="button">
                      <i className="fa fa-pinterest"></i>
                    </a>
                    <a className="btn btn-secondary icon" href="#!" role="button">
                      <i className="fa fa-vk"></i>
                    </a>
                    <a className="btn btn-danger icon" href="#!" role="button">
                      <i className="fa fa-google"></i>
                    </a>
                  </div>
                </div>
                <div className="card border-dark mb-3" style={{ width: 300 }}>
                  <div className="card-header fw-bold border-white">
                    Most Popular News
                  </div>
                  <div className="card-body text-primary">
                    <div className="row">
                      <div className="col-md-5">
                        <img
                          src="https://1.bp.blogspot.com/-xVILJAJLaLY/YEd_ARcUDDI/AAAAAAAAGtY/igMNjAfbZy8B_2BUxXsR6RAK_153pQGpACLcBGAsYHQ/w231-h154-p-k-no-nu/71%2B%25281%2529.jpg"
                          className="img-fluid most-popular"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-7">
                        <p>Is the Designer Facing Extinction?</p>
                      </div>
                    </div>{" "}
                    &nbsp;
                    <div className="row">
                      <div className="col-md-5">
                        <img
                          src="https://1.bp.blogspot.com/-TsvmPbFLw7k/YEd_Acgu-sI/AAAAAAAAGtc/IwLaIgLvQiQ2VDuybx9JfVT4aqSMZ--LQCLcBGAsYHQ/w231-h154-p-k-no-nu/72%2B%25281%2529.jpg"
                          className="img-fluid most-popular"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-7">
                        <p className="text-left">Guide to WordPress Post Revisions</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card border-dark mb-3" style={{ width: 300 }}>
                  <div className="card-header fw-bold border-white">
                    Subscribe Us
                  </div>
                  <div className="card-body text-primary">
                    <iframe
                      width="250"
                      src="https://www.youtube.com/embed/LlvBzyy-558"
                      title="YouTube video player"
                      
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      
                    ></iframe>
                  </div>
                </div>
                <div className="card border-dark mb-3" style={{ width: 300 }}>
                  <div className="card-header fw-bold border-white">
                    Facebook
                  </div>
                  <div className="card-body text-primary">
                    <iframe
                      src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                      width="250"
                      scrolling="no"
                      n="true"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    ></iframe>
                  </div>
                </div>
                <div className="card border-dark mb-3" style={{ width: 300 }}>
                  <div className="card-header fw-bold border-white">
                    Categories
                  </div>
                  <div className="card-body text-primary">
                    <details className="categories">
                      <summary>News</summary> &nbsp;&nbsp;
                      <div>
                        <p onClick={()=>{category("business")}}>Business News</p>
                        <p onClick={()=>{category("entertainment")}}>Entertainment</p>
                        <p onClick={()=>{category("sports")}}>Sports News</p>
                        <p onClick={()=>{category("technology")}}>Technology News</p>
                        <p onClick={()=>{category("health")}}>Health</p>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="page">
            <div className="pagination">
              <a href="#" onClick={()=>{pagination(1)}} className={paginationActive===1 ? "btn btn-primary text-white active" : "btn btn-primary text-white"}>1</a>
              <a onClick={()=>{pagination(2)}} className={paginationActive===2 ? "btn btn-primary text-white active" : "btn btn-primary text-white"}>2</a>
              <a onClick={()=>{pagination(3)}} className={paginationActive===3 ? "btn btn-primary text-white active" : "btn btn-primary text-white"}>3</a>
              <a onClick={()=>{pagination(4)}} className={paginationActive===4 ? "btn btn-primary text-white active" : "btn btn-primary text-white"}>4</a>
              <a onClick={()=>{pagination(5)}} className={paginationActive===5 ? "btn btn-primary text-white active" : "btn btn-primary text-white"}>5</a>
              <a onClick={()=>{pagination(6)}} className={paginationActive===6 ? "btn btn-primary text-white active" : "btn btn-primary text-white"}>6</a>
              <a onClick={()=>{pagination(7)}} className={paginationActive===7 ? "btn btn-primary text-white active" : "btn btn-primary text-white"}>7</a>
            </div>
           
          </div> &nbsp;
        </div>
        <div className="footer">
          <p className="footer-txt">Developed By Rock~Nagendra @2022</p>
        </div>
      </div>
    </Fragment>
  );
}

export default NewsApp;
