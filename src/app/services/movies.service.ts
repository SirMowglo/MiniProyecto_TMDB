import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FavMoviesResponse } from '../interfaces/fav-movies.interface';
import { MoviesResponse } from '../interfaces/movies.interface';
import { MoviesDetailResponse } from '../interfaces/moviesDetails.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  public getMovies(): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(
      `${environment.base_url}/movie/popular?api_key=${environment.api_key}&language=en-US&page=1`  //ojo que he puesto pagina 1 no la variable
    );
  }
  public getMovieDetails(id: string): Observable<MoviesDetailResponse> {
    return this.http.get<MoviesDetailResponse>(
      `${environment.base_url}/movie/${id}/videos?api_key=${environment.api_key}&language=en-US`
    );
  }

  getFavoriteMovies(): Observable<FavMoviesResponse> {
    let session_id: string = localStorage.getItem("session_id");
    return this.http.get<FavMoviesResponse>(`${environment.base_url}/account/0/favorite/movies?session_id=${session_id}&api_key=${environment.api_key}`);
  }
}
