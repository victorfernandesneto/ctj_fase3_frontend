import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Movie {
  id: number;
  titulo: string;
  diretor: string;
  descricao: string;
  lancamento: string;
  watched?: boolean;
}

interface WatchedMovie {
  filme_id: number;
}

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  watchedMovies: Movie[] = [];
  user_id: string | null = sessionStorage.getItem('user_id');

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchMovies();
    this.fetchWatchedStatus();
  }

  fetchMovies() {
    this.http.get<Movie[]>('http://localhost:3000/movies')
      .subscribe(data => {
        this.movies = data;
      });
  }

  fetchWatchedStatus() {
    this.http.get<WatchedMovie[]>('http://localhost:3000/movies/watched?user_uuid=' + this.user_id!)
      .subscribe(data =>
        {
        const watchedMovieIds = new Set(data.map((movie: WatchedMovie) => movie.filme_id));

        this.movies.forEach((movie: Movie) => {
          movie.watched = watchedMovieIds.has(movie.id);
        });
        this.movies.forEach(m => console.log(m.titulo, m.watched));
      });
  }

  toggleWatched(movie: Movie) {
    const watched = !movie.watched;
    movie.watched = watched;

    this.http.post('http://localhost:3000/movies/watched', {
      user_uuid: this.user_id,
      movie_id: movie.id
    })
      .subscribe(() => console.log('Movie watched status updated'));
  }
}