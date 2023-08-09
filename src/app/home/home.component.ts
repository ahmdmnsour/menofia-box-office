import { Component } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  movies: any = [];
  moviesLength!: number;

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
      .subscribe((response: any) => {
        this.movies = response['results'];
        this.moviesLength = this.movies.length;
      });
  }

  filter(searchValue: string, pageIndex: number) {
    this.noRes = false;
    if (!searchValue) {
      this.getPopularMovies();
    } else {
      this.service.searchForMovies(searchValue, pageIndex)
        .subscribe((response: any) => {
          this.movies = response['results'];
          this.moviesLength = response['total_results'];
          console.log(response);
          if (this.movies.length === 0) {
            this.noRes = true;
          }
        });
    }
    console.log(this.moviesLength);
  }
}
