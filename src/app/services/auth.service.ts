import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { map } from 'rxjs/operators';

interface AuthResponse {
  token: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "http://localhost:8080/auth";

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
    tap((res: AuthResponse) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('refreshToken', res.refreshToken);
    })
  );
}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  refreshToken(): Observable<string> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token found');

    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      map(res => {
        localStorage.setItem('token', res.token); // update token
        return res.token;
      })
    );
  }

getProtectedData(): Observable<any> {
  const token = localStorage.getItem('accessToken');
  return this.http.get('http://localhost:8080/protected', {
    headers: { Authorization: `Bearer ${token}` }
  });
}


  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  
}
