import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-make-post',
  templateUrl: './make-post.component.html',
  styleUrls: ['./make-post.component.css']
})
export class MakePostComponent {
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
}
