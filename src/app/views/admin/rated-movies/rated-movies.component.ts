import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/fav-movies.interface';
import { MoviesService } from 'src/app/services/movies.service';


@Component({
  selector: 'app-rated-movies',
  templateUrl: './rated-movies.component.html',

})
export class RatedMoviesComponent implements OnInit {

  movieList: Movie[] = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getRatedMovies();
  }


  getRatedMovies() {
    this.moviesService.getRatedMovies().subscribe(resp => {
      this.movieList = resp.results;
    })
  }


  getMovieImage(movie: Movie) {
    let url = "";
    if (movie.poster_path != null) {
      url = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
    }
    return url;
  }

}
