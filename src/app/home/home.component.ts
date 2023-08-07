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
    this.service.getMovies()
      .subscribe(response => {
        this.movies = response;
        this.movies = this.movies['results'];
      });
  }

  filter(searchValue: string) {
    if (!searchValue) {
      this.service.getMovies()
        .subscribe(response => {
          this.movies = response;
          this.movies = this.movies['results'];
        });
    } else {
      this.service.searchForMovies(searchValue)
        .subscribe(response => {
          this.movies = response;
          this.movies = this.movies['results'];
          if(!this.movies) {
            this.noRes = true;
          } else {
            this.noRes = false;
          }
        });
    }
  }
}
