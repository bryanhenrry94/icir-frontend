import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = environment.baseURL;

  constructor(
    private http: HttpClient,
    private route: Router
    ) { }

  login(user){

    return this.http.post<any>(this.URL + '/login', user);
  }

  logout(){
    localStorage.removeItem('USER_DATA');

    this.route.navigate(['auth']);
  }

  loggedIn(): Boolean{
    return !!localStorage.getItem('USER_DATA');
  }

  getToken(): String{
    if(localStorage.getItem('USER_DATA') == null) return '';

    let jsonObj = JSON.parse(localStorage.getItem('USER_DATA'));

    let user: Usuario = <Usuario> jsonObj;

    return user.token;
  }

  getUserData(): Usuario{
    if(localStorage.getItem('USER_DATA') == null) return new Usuario;

    let jsonObj = JSON.parse(localStorage.getItem('USER_DATA'));

    let user: Usuario = <Usuario> jsonObj;

    return user;
  }
}
