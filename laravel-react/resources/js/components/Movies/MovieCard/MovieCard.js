import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getOneMovie } from '../../../store/actions/movies';
import Header from '../../Header/Header';
import MovieRateForm from '../MovieRateForm/MovieRateForm';
import parse from 'html-react-parser';
import { descriptionMapper } from '../../../helpers/mappers/movie-description-mapper';
import './MovieCard.css';

export default function MovieCard() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const movieId = Number(params.movieId);
  const userId = useSelector((state) => state.currentUserReducer.user.id);
  const movieRate = useSelector((state) => state.currentUserReducer.user).userMovies.find((movie) => movie.movies_id === movieId)?.grade;
  
  
  const {
    ru_title,
    title,
    big_image: image,
    year,
    description,
  } = useSelector((state) => state.moviesReducer.currentMovie);

  useEffect(() => {
    if (!userId) {
      history.push('/');
    }
  }, [userId]);

  useEffect(() => {
    if (params ?? params.movieId) {
      dispatch(getOneMovie(params.movieId));
    }
  }, []);

  return (
    <div className="content">
      <Header />
      <div className="movie-card">
        <img className="movie-poster" src={image}></img>        
        <h4>
          {ru_title} ({title})
        </h4>
        <p>{year}</p>
        <div className="lead text-white text-break">
          {description ? parse(descriptionMapper(description)) : ''}
        </div>
        <MovieRateForm movieId={movieId} userId={userId} userRate={movieRate}/>
        {/* <button
          id="to-bookmarks-btn"
          type="button"
          className="btn to-bookmarks-btn"
        >
          В закладки
        </button> */}
      </div>
    </div>
  );
}
