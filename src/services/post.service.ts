import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Post, PostResponse } from 'src/interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = "http://localhost:4200";
  url = "http://localhost:8000/api/post/";

  constructor(private http: HttpClient) { 
    this.getData();
  }
  getData(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(this.url);
    
  }
  
}
