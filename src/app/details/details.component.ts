import { Component } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  movieId: string = '';
  details: any = {};
  imgUrl = '';
  reviews = [];
  casts = [];

  genres: string = '';

  constructor(private service: MovieService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id')!;

    this.service.getMovieDetails(this.movieId!)
      .subscribe(response => {
        this.details = response;
        this.details['genres'].forEach((element: any) => {
          this.genres += element['name'] + ', ';
        });
        this.genres = this.genres.slice(0, -2);
      });
    this.service.getMovieImages(this.movieId)
      .subscribe((response: any) => {
        this.imgUrl = this.service.poseterUrl + response['posters'][1]['file_path'];
      });
    this.service.getMovieReviews(this.movieId)
      .subscribe((response: any) => {
        this.reviews = response['results'];
      });

    this.service.getMovieCredits(this.movieId)
      .subscribe((response: any) => {
        this.casts = response['cast'];
      });
  }
}
