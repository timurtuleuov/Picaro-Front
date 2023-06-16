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


  like(post_id: string) {
    const likedPost = this.posts.find((post: Post) => post.id === post_id);
    console.log(likedPost.liked)
    if (likedPost.liked){
      this.postService.removeLikePost(post_id).subscribe(
        (response) => {
          likedPost.likes_count = response.likes_count;
          likedPost.liked = false;
          console.log("Лайк успешно удален!");
        }, 
        (error) => {
          console.error('Ошибка при удалении лайка:', error);
        }
      )
    } else 
      {

      
      this.postService.likePost(post_id).subscribe(
        (response) => {
          likedPost.likes_count = response.likes_count;
          likedPost.liked = true;
        
            // Обработка успешного ответа от сервера
          console.log('Лайк успешно добавлен!');
            // Дополнительные действия при необходимости
          },
        (error) => {
          // Обработка ошибки
          console.error('Ошибка при добавлении лайка:', error);
          // Дополнительные действия при необходимости
      }
    );
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
