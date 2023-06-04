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
  userInfo: any;
  avatar: any;

  constructor(private postService: PostService){
    this.userInfo = localStorage.getItem('user');
    this.userInfo = JSON.parse(this.userInfo);
    this.avatar = this.userInfo.avatar;

  }

  ngOnInit() {
    

    this.postService.getData().subscribe((data) => {
      this.posts = data;
      this.isLoading = false;
      this.dataLoaded = true;
    });
  }
}
