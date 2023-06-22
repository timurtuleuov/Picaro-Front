import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Post } from 'src/interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  

  constructor(private http: HttpClient) { 
  }
  getData(): Observable<Post[]> {
    const url = "http://localhost:8000/api/post/";
    return this.http.get<Post[]>(url);
  }
  getPostByUser(user_id: string): Observable<Post[]> {
    const url = `http://localhost:8000/api/user/${user_id}/posts/`;
    return this.http.get<Post[]>(url);
  }
  //TODO Make sendPost function
  sendPost(){
    const url = "http://localhost:8000/api/post/";  
    return this.http.post(url, '')
  }

  likePost(post_id: string): Observable<any> {
    const url = `http://localhost:8000/api/post/${post_id}/like/`;
    return this.http.post(url, '');
  }
  removeLikePost(post_id: string): Observable<any>  {
    const url = `http://localhost:8000/api/post/${post_id}/remove_like/`;
    return this.http.post(url, '')
  }
  sendComment(post_id:string, author_id:string, body:string): Observable<any> {
    const url = `http://localhost:8000/api/post/${post_id}/comment/`;
    return this.http.post(url, {"post": post_id, "author": author_id, "body": body, "post_uuid": post_id})
  }
}
