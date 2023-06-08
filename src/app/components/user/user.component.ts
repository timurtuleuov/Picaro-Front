import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/services/post.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  userInfo: any;
  posts: any;
  dataLoaded = false;
  isLoading = true;
  constructor(private postService: PostService){
    this.userInfo = localStorage.getItem('user');
    this.userInfo = JSON.parse(this.userInfo);
  }
  avatar_route = "E:/Программирование/DJANGO+REACT/Scripts/CoreRoot"
  avatar: any;
  username!: string;
  userBio!: string;
  userPosts!: object;
  ngOnInit(){
    this.username = this.userInfo.username;
    this.userBio = this.userInfo.bio;
    this.avatar = this.userInfo.avatar;

    this.postService.getPostByUser(this.userInfo.id).subscribe((data) => {
      this.posts = data;
      console.log(this.posts)
      this.isLoading = false;
      this.dataLoaded = true;
    });
    
  }
}
