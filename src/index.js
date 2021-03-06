// import React, { Component } from "react";
// var React = require("react");
// var Component = React.component;
// export default class Graph extends Component {
const _ = require("lodash");

export default class Tome {
  constructor(props) {
    console.log("Hey from Tome!");

    // this.articles = require(props.articlesPath); // FUCK SAKE https://github.com/webpack/webpack/issues/4921
    // this.articles = require(`${props.articlesPath}`);
    this.articles = require("../../../src/articles/articles-compiled.json");

    this.articles = this.createArticleLinks(this.articles);
  }

  getHeader() {
    return "Testing node_module concept";
  }

  getArticles() {
    return this.articles;
  }

  searchArticlesByTitle(title) {
    if (!title) return this.articles;

    return this.articles.filter(x =>
      _.kebabCase(x.title).includes(_.kebabCase(title))
    );
  }

  createArticleLinks(articles) {
    articles = articles.map(article => {
      article.url = "/" + this.titleToUrl(article.title);
      return article;
    });
    return articles;
  }

  // Satan's Revenge -> "satans-revenge"
  titleToUrl(title) {
    // Satan's Revenge -> "Satan%27s%20Revenge"
    // return encodeURIComponent(str).replace(/[!'()*]/g, escape);

    // Satan's Revenge
    let url = title;

    //   // Satan's-Revenge
    //   .replace(/ /g, "-")
    //   // satan's-revenge
    //   .toLowerCase();

    // // satan's-revenge
    // url = encodeURIComponent(title);
    // console.log(url);

    // // satan%27s-revenge
    // url = title.replace(/[!'()*]/g, escape);

    // satans-revenge
    url = _.kebabCase(url);

    return url;
  }

  getArticleByTitle(title) {
    // return this.articles.filter(_ => _.title === title)[0];
    // Actually, be more vague about it, matching the kebab cases
    return this.articles.filter(
      x => _.kebabCase(x.title) === _.kebabCase(title)
    )[0];
  }

  // Snippet
  // Strip html tags and shorten by given length, but leave a space between tags,or you missing spaces
  snippet(html, length) {
    return (
      html
        .replace(/<\\/gi, " ")
        .replace(/(<([^>]+)>)/gi, "")
        .substring(0, length)
        .trim() + "..."
    );
  }
}

// class Listing extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return <p>Listings by TomeTM</p>;
//   }
// }
