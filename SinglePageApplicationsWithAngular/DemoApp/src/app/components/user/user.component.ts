import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  name = 'Steve Smith';
  age: number;
  email: string;
  address: Address;
  hobbies: string[];
  posts: Post[];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.name = 'John Doe';
    this.age = 22;
    this.email = 'john@gmail.com';
    this.address = {
      street: 'SomeStreet',
      city: 'SomeCity',
      state: 'good',
    };

    this.dataService.getPosts()
      .subscribe((posts) => {
        this.posts = posts;
      });

    this.hobbies = ['watch movies', 'code', 'other'];
  }

  addHobby(hobby: string) {
    this.hobbies.push(hobby);
  }

  editUser(name: string, age: number) { }

  deleteHobby(hobby: string) {
    const index = this.hobbies.findIndex((h) => hobby.includes(h));
    if (index >= 0) {
      this.hobbies.splice(index, 1);
    }
  }
}

interface Address {
  street: string;
  city: string;
  state: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}
