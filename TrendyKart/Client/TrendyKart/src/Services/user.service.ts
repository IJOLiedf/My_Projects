import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  public users="https://localhost:44351/api/user";
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(this.users);
  }

  checkUserExists(username: string, email: string): Observable<{ userExists: boolean }> {
    return this.http.get<{ userExists: boolean }>(`${this.users}/check?username=${username}&email=${email}`);
  }

  createUser(userData: { username: string; email: string; password: string }): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(`${this.users}`, userData);
  }
}
