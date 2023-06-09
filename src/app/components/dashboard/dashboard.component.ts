import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/services/post.service';
import { Post } from 'src/interfaces/post';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    if (localStorage !== null){
    this.userInfo = localStorage.getItem('user');
    this.userInfo = JSON.parse(this.userInfo);
    this.avatar = this.userInfo.avatar;
    }
  }
  sendPostGroup!: FormGroup;
  buildSendPostForm() {
    this.sendPostGroup = new FormGroup({
      'postText': new FormControl('', ),
      'postImage': new FormControl('', )
    });
  }
  onSend():void{
    console.log(this.sendPostGroup.value.postText);
  console.log(this.sendPostGroup.value.postImage);
  }
  ngOnInit() {
    

    this.postService.getData().subscribe((data) => {
      this.posts = data;
      this.isLoading = false;
      this.dataLoaded = true;
    });
  }
}
