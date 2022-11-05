import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FavMoviesResponse } from '../interfaces/fav-movies.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getFavoriteMovies(): Observable<FavMoviesResponse>{
    let session_id: string = localStorage.getItem("session_id");
    return this.http.get<FavMoviesResponse>(`${environment.base_url}/account/0/favorite/movies?session_id=${session_id}&api_key=${environment.api_key}`);
  }
}
