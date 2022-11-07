import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Movies } from 'src/app/interfaces/movies.interface';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
})
export class CardMovieComponent implements OnInit {

  movieList : Movies[] = [];

  constructor(private moviesService : MoviesService) { }

  ngOnInit(): void {

    this.moviesService.getMovies().subscribe(res => {
      this.movieList = res.results;
    })
  }

  getMovieImage(movies : Movies){
    return `https://image.tmdb.org/t/p/w500/${movies.poster_path}`;

  }

}
