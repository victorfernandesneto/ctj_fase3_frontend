import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string){
    return this.httpClient.post<LoginResponse>("http://localhost:3000/auth/login/", { email, password }).pipe(
      tap((value) => {
        console.log(value)
        sessionStorage.setItem("access_token", value.data.session.access_token)
        sessionStorage.setItem("refresh_token", value.data.session.refresh_token)
        sessionStorage.setItem("user_id", value.data.session.user.id)
      })
    )
  }
}