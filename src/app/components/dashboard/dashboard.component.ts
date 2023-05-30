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
  constructor(private postService: PostService){}
  ngOnInit() {
    this.postService.getData().subscribe((data: PostResponse[]) => {
      this.posts = data;
      console.log(this.posts); // Помещаем вывод в консоль внутрь колбэка
    });
  }
}
