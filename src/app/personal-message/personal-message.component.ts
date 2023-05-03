import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-personal-message',
  templateUrl: './personal-message.component.html',
  styleUrls: ['./personal-message.component.css']
})
export class PersonalMessageComponent implements OnInit{
  message!: Message;

  constructor(private messageService : MessageService) { }

  ngOnInit() {
    this.message = {message: ''};
  }

  displayMessage(name: string) {
    this.messageService.getHelloByName(name).subscribe({
      next:(data:Message) => this.message = {
        message: (data as any) .message,
      }
    });
  }
}
