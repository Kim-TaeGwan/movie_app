import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };

  // async componentDidMount() { // axios.get은 느리기떄문에 우리는 기다려야한다. 그래서 async await사용, 방법은 두가지 이다. 이 방법과 아래 방법
  //   const movies = axios.get("https://yts-proxy.now.sh/list_movies.json");
  // }
  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    // this.setState({ movies: movies }); // state의 movies : axios의 movies, 자바스크립트가 이해하는건 똑같아서 movies 이렇게 하나만 단축해서 쓸수있다.
    this.setState({ movies, isLoading: false }); // state의 movies : axios의 movies, 자바스크립트가 이해하는건 똑같아서 movies 이렇게 하나만 단축해서 쓸수있다.
  };
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader_text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => {
              return (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              );
            })}
          </div>
        )}
      </section>
    );
  }
}

export default App;
