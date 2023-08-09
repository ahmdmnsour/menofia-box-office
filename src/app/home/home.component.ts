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
    this.getPopularMovies(1);
  }

  getPopularMovies(pageIndex: number) {
    this.service.getMovies(pageIndex)
      .subscribe((response: any) => {
        this.movies = response['results'];
        this.moviesLength = response['total_results'];
      });
  }

  filter(searchValue: string, pageIndex: number) {
    this.noRes = false;
    if (searchValue === '') {
      this.getPopularMovies(pageIndex);
    } else {
      this.service.searchForMovies(searchValue, pageIndex)
        .subscribe((response: any) => {
          this.movies = response['results'];
          this.moviesLength = response['total_results'];
          if (this.movies.length === 0) {
            this.noRes = true;
          }
        });
    }
  }
}
