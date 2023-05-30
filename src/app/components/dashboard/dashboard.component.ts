import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/services/post.service';
import { Post } from 'src/interfaces/post';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit{
  posts: Post[] = [];
  constructor(private postService: PostService){}
  ngOnInit() {
    this.postService.getData().subscribe((data: Post[]) => {
      this.posts = data;
    });
  }
}
