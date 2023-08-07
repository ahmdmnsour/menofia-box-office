import { Component, Input } from '@angular/core';

@Component({
  selector: 'movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent {
  @Input('movie-title') movieTitle!: string;
  @Input('release-date') releaseDate!: number;
  @Input('poseter') posterUrl!: string;
  @Input() rating!: number;
}
