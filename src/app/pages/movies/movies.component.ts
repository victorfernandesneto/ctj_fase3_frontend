import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

interface Movie {
  id: number;
  titulo: string;
  diretor: string;
  descricao: string;
  lancamento: string;
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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Movie[]>('http://localhost:3000/movies')
      .subscribe(data => this.movies = data);
      console.log(this.movies);
  }
}