import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  parse(object: any){
    console.log(JSON.parse(object))
    return JSON.parse(object);
  }
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

  @ViewChild('postList', { static: true }) postList!: ElementRef;
  like(post_id: string) {
    this.postService.likePost(post_id);
    const postElements = this.postList.nativeElement.getElementsByClassName('tweet-wrap');
    for (let i = 0; i < postElements.length; i++) {
      const postElement = postElements[i];
      const postId = postElement.getAttribute('data-post-id');
      if (postId === post_id) {
        // Обновите только содержимое или стиль блока поста
        postElement.querySelector('.like-button').setAttribute('disabled', 'disabled');
        postElement.querySelector('.like-status').textContent = 'Liked!';
        break;
      }
    }
  
    
  }
  


  ngOnInit() {
    

    this.postService.getData().subscribe((data) => {
      this.posts = data;
      this.isLoading = false;
      this.dataLoaded = true;
    });
  }
}
