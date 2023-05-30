import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/services/post.service';
import { Post, PostResponse } from 'src/interfaces/post';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit{
  posts: PostResponse[] = [];
  result: any;

    // Преобразование строки JSON в объект
  responseString = '{"count":1,"next":null,"previous":null,"results":[{"id":"c9479275b1da4d6db844807a621a0787","author":{"id":"5d83c5ab33804847ade550cb7ec9a8dc","username":"Timur Tuleuov","first_name":"Timur","last_name":"Tuleuov","bio":"afawfwfawawf","avatar":null,"email":"timmmur123@gmail.com","is_active":true,"created":"2023-05-27T07:50:47.933039Z","updated":"2023-05-27T07:50:47.933039Z"},"body":"Первый пост после сноса БД","edited":false,"liked":false,"likes_count":0,"created":"2023-05-27T07:52:07.628379Z","updated":"2023-05-27T07:52:07.628379Z"}]}';
  response = JSON.parse(this.responseString);

  constructor(private postService: PostService){}

  ngOnInit() {
    
    this.postService.getData().subscribe((data: PostResponse[]) => {
      this.posts = data;
      console.log(this.posts); // Помещаем вывод в консоль внутрь колбэка
    });
  }
}
