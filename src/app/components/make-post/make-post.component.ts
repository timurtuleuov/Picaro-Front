import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-make-post',
  templateUrl: './make-post.component.html',
  styleUrls: ['./make-post.component.css']
})
export class MakePostComponent implements OnInit{
  sendPostGroup!: FormGroup;
  userInfo: any;
  author: any;
  constructor(private postService: PostService){
    if (localStorage !== null){
      this.userInfo = localStorage.getItem('user');
      this.userInfo = JSON.parse(this.userInfo);
      this.author = this.userInfo.id;
      // this.avatar = this.userInfo.avatar;
      }
  }
  buildSendPostForm() {
    this.sendPostGroup = new FormGroup({
      'postText': new FormControl('', ),
      'postImage': new FormControl('', )
    });
  }
  onSend():void{
    console.log(this.sendPostGroup.value.postText);
    this.postService.sendPost(this.sendPostGroup.value.postText, this.author, this.sendPostGroup.value.postImage).subscribe(
      (data) => {
        console.log(data);
      }, (error) => {
        console.error("Не удалосб загрузить пост", error);
      }
    )
  }
  
  ngOnInit(): void {
    this.buildSendPostForm();
  }
}
