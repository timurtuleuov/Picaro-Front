import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/services/post.service';
import { Post, PostResponse } from 'src/interfaces/post';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  posts: any;
  dataLoaded = false;
  isLoading = true;

  constructor(private postService: PostService){}

  ngOnInit() {
    

    this.postService.getData().subscribe((data) => {
      this.posts = data;
      this.isLoading = false;
      this.dataLoaded = true;
    });
  }
}
