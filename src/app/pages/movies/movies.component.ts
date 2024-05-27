import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { VariantInputComponent } from '../../components/variant-input/variant-input.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  imports: [CommonModule, VariantInputComponent],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  watchedMovies: Movie[] = [];
  user_id: string | null = sessionStorage.getItem('user_id');
  apiUrl = 'http://localhost:3000/movies'

  constructor(private http: HttpClient,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchMovies();
    this.fetchWatchedStatus();
  }

  fetchMovies() {
    this.http.get<Movie[]>(this.apiUrl)
      .subscribe(data => {
        this.movies = data;
      });
  }

  fetchWatchedStatus() {
    this.http.get<WatchedMovie[]>(this.apiUrl + '/watched?user_uuid=' + this.user_id!)
      .subscribe(data => {
        const watchedMovieIds = new Set(data.map((movie: WatchedMovie) => movie.filme_id));

        this.movies.forEach((movie: Movie) => {
          movie.watched = watchedMovieIds.has(movie.id);
        });
      });
  }

  fetchMoviesFilter() {
    const m = sessionStorage.getItem('filme-pesquisa');
    if (!m) {
      sessionStorage.removeItem('filme-pesquisa');
      this.fetchMovies();
      return;
    }
    this.http.get<Movie[]>(this.apiUrl + '/title?title=' + m)
      .subscribe(data => {
        this.movies = data;
      });
    this.fetchWatchedStatus();
  }

  toggleWatched(movie: Movie) {
    const watched = !movie.watched;
    movie.watched = watched;

    this.http.post(this.apiUrl + '/watched', {
      user_uuid: this.user_id,
      movie_id: movie.id
    })
      .subscribe(() => console.log('Movie watched status updated'));
  }

  suggestMovie() {
    const sugestao = sessionStorage.getItem('filme-sugestao');
    this.http.post(this.apiUrl + '/suggest', {
      titulo: sugestao,
      usuario: this.user_id
    }).subscribe({
      next: () => {
        this.toastService.success("Filme sugerido com sucesso!")
        sessionStorage.removeItem('filme-sugestao');
      },
      error: () => this.toastService.error("Opa! Deu algo de errado. Tente novamente mais tarde.")
    })

  
  }
  logout() {
    sessionStorage.clear();
    location.reload();
    }}