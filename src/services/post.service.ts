import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Post } from 'src/interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url = "http://localhost:8000/api/post/";

  constructor(private http: HttpClient) { 
    this.getData();
  }
  getData(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
    
  }
  // getPostById(): Observable<Post[]> {
  //   return this.http.get<Post
  // }
  
}
