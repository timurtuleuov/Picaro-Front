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
  likePost(post_id: string): Observable<any> {
    const url = `http://localhost:8000/api/post/${post_id}/like/`;
    return this.http.post(url, '');
  }
  removeLikePost(post_id: string) {
    const url = `http://localhost:8000/api/post/${post_id}/remove_like/`;
  
    this.http.post(url, '').subscribe(
      (response) => {
        console.log('Лайк успешно удален!');
      },
      (error) => {
        console.error('Ошибка при удалении лайка:', error);
      }
    );
  }
}
