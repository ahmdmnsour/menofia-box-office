import { Component } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  movies: any = [];

  posterBaseUrl = '';
  noRes = false;

  constructor(private service: MovieService) {
    this.posterBaseUrl = service.poseterUrl;
  }

  ngOnInit() {
    this.getPopularMovies();
  }

  getPopularMovies() {
    this.service.getMovies()
      .subscribe(response => {
        this.movies = response;
        this.movies = this.movies['results'];
      });
  }

  filter(searchValue: string) {
    this.noRes = false;
    if (!searchValue) {
      this.getPopularMovies();
    } else {
      this.service.searchForMovies(searchValue)
        .subscribe(response => {
          this.movies = response;
          this.movies = this.movies['results'];
          if(this.movies.length === 0) {
            console.log('dd');
            this.noRes = true;
          }
        });
    }
  }
}
