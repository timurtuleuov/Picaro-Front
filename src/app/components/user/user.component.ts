import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/services/post.service';
import { Post } from 'src/interfaces/post';


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
  avatar: any;
  username!: string;
  userBio!: string;
  userPosts!: object;
  like(post_id: string) {
    const likedPost = this.posts.find((post: Post) => post.id === post_id);
    console.log(likedPost.liked)
    if (likedPost.liked){
      this.postService.removeLikePost(post_id).subscribe(
        (response) => {
          likedPost.likes_count = response.likes_count;
          likedPost.liked = false;
          console.log('Лайк успешно удален!');
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
  sendCommentGroup!: FormGroup;
  buildSendCommentForm() {
    this.sendCommentGroup = new FormGroup({
      'body': new FormControl('', Validators.required)
    });
  }

  
  onAdd( post: string, author: string,) {
    console.log(this.sendCommentGroup.value.body)
    this.postService.sendComment(post, author, this.sendCommentGroup.value.body).subscribe(
      (response) => {
        this.sendCommentGroup.reset();
        this.loadData();
      },
      (error) => {
        console.error('Коммент не удалось отправить:', error);
      }
    );
  };
  loadData(): void{
    this.postService.getPostByUser(this.userInfo.id).subscribe((data) => {
      this.posts = data;
      console.log(this.posts)
      console.log(data)
      this.isLoading = false;
      this.dataLoaded = true;
    });
  }
  ngOnInit(){
    this.username = this.userInfo.username;
    this.userBio = this.userInfo.bio;
    this.avatar = this.userInfo.avatar;

    this.loadData()

    
  }
}
