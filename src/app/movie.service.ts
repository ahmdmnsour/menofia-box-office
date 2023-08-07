import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private _posterBaseUrl = 'https://image.tmdb.org/t/p/w500/';
  header = new HttpHeaders({ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmM2YWIwM2YxYmIxNTc3ZjU0NzgyZjkwNzk4ZjNlMCIsInN1YiI6IjY0YzhiZjJjODlmNzQ5MDEwN2MwYmQ3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Nvly8B-YGbk5qE9HSYBFtQGaNZYmkzNbsSnya1qyQE8' });

  constructor(private httpClient: HttpClient) { }

  getMovies() {
    return this.httpClient.get('https://api.themoviedb.org/3/movie/popular', {
      headers: this.header
    });
  }

  searchForMovies(movieTitle: string) {
    return this.httpClient.get('https://api.themoviedb.org/3/search/movie?query=' + movieTitle, {
      headers: this.header
    });
  }

  getMovieDetails(movieId: string) {
    return this.httpClient.get('https://api.themoviedb.org/3/movie/' + movieId, {
      headers: this.header
    });
  }

  public get poseterUrl() {
    return this._posterBaseUrl;
  }
}
