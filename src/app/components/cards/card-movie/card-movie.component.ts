import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Movies, MoviesResponse } from 'src/app/interfaces/movies.interface';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { MovieDetailsResponse } from 'src/app/interfaces/moviesDetails.interface';
import { MovieVideo, MovieVideoResponse } from 'src/app/interfaces/movie-videos';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
})
export class CardMovieComponent implements OnInit {
  dataMovieDetails : MovieDetailsResponse= {} as MovieDetailsResponse;
  dataMovie : Movies = {} as Movies;
  video : MovieVideo = {} as MovieVideo;

  id = '';

  constructor(private moviesService : MoviesService, private route : ActivatedRoute, private sanitizer : DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.getMovieDetails(this.id);
    this.getMovies(this.id);
    this.getMovieVideo();
  }

  getMovieDetails(id: string){
    this.moviesService.getMovieDetails(id).subscribe(resp=>{
      this.dataMovieDetails = resp;
    });
  }

  getMovies(id :string) {
    this.moviesService.getMovies().subscribe((resp) => {
      this.dataMovie = resp.results.find(x => x.id.toString() === id);
    });
    
  }


  getMovieImage(movies : MovieDetailsResponse) {
  return `https://image.tmdb.org/t/p/w500${movies.poster_path}`;
    
  /*
    if (movies.poster_path != null) {
    url = `https://image.tmdb.org/t/p/w500/${movies.poster_path}`;
    }*/
  }

  getMovieVideo (){
    this.moviesService.getMovieVideo(this.id).subscribe(resp=> {
      this.video = resp.results[0];
    })
  }

  getVideoUrl(){
    let url;
    url = `http://www.youtube.com/embed/${this.video.key}`
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

}
