import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/services/post.service';
import { Post } from 'src/interfaces/post';
import { UserService } from 'src/services/user.service';
import { User } from 'src/interfaces/user';
import {ActivatedRoute} from "@angular/router";
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
  constructor(private postService: PostService, private userService: UserService, private route: ActivatedRoute){
    this.userInfo = localStorage.getItem('user');
    this.userInfo = JSON.parse(this.userInfo);
  }
  userId!: string;
  avatar: any;
  username!: string;
  userBio!: string | null;
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
        this.loadData(this.userId);
      },
      (error) => {
        console.error('Коммент не удалось отправить:', error);
      }
    );
  };
  loadData(userId: string): void{
    this.postService.getPostByUser(userId).subscribe((data) => {
      this.posts = data;
      this.isLoading = false;
      this.dataLoaded = true;
    });
  }

  getUserInfo(slug: string){
    this.userService.getUserInfo(slug).subscribe((data) => {
      this.userId = data.id;
      this.username = data.username;
      this.userBio = data.bio;
      this.avatar = data.avatar;
      this.loadData(this.userId);
    })
  }
  ngOnInit(){
    this.getUserInfo(this.route.snapshot.params['slug'])
    
    this.buildSendCommentForm();
    // this.loadData()

    
  }
}
