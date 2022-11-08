import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FavMoviesResponse } from '../interfaces/fav-movies.interface';
import { MovieVideoResponse } from '../interfaces/movie-videos';
import { MoviesResponse } from '../interfaces/movies.interface';
import { MovieDetailsResponse } from '../interfaces/moviesDetails.interface';
import { RatedMoviesResponse } from '../interfaces/rated-movies.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  public getMovies(): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(
      `${environment.base_url}/movie/popular?api_key=${environment.api_key}`  //ojo que he puesto pagina 1 no la variable
    );
  }
  public getMovieDetails(id: string): Observable<MovieDetailsResponse> {
    return this.http.get<MovieDetailsResponse>(
      `${environment.base_url}/movie/${id}?api_key=${environment.api_key}`
    );
  }

  public getMovieVideo(id: string): Observable<MovieVideoResponse> {
    return this.http.get<MovieVideoResponse>(
      `${environment.base_url}/movie/${id}/videos?api_key=${environment.api_key}`
    );
  }

  getFavoriteMovies(): Observable<FavMoviesResponse> {
    let session_id: string = localStorage.getItem("session_id");
    return this.http.get<FavMoviesResponse>(`${environment.base_url}/account/0/favorite/movies?session_id=${session_id}&api_key=${environment.api_key}`);
  }

  getRatedMovies(): Observable<RatedMoviesResponse> {  
    let session_id: string = localStorage.getItem("session_id");
    return this.http.get<RatedMoviesResponse>(`${environment.base_url}/account/0/rated/movies?session_id=${session_id}&api_key=${environment.api_key}`); 
  }
}
