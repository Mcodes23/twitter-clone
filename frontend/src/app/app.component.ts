import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NgFor, NgIf, FormsModule],
})
export class AppComponent implements OnInit {
  users: any[] = [];
  selectedUserId: number = 1; // Default user ID = 1
  selectedUser: any = null;
  posts: any[] = [];
  selectedPostId: number | null = null;
  comments: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe((users: any) => {
        this.users = users.map((user: { id: any }) => ({
          ...user,
          profilePicture: `https://i.pravatar.cc/150?img=${user.id}`, // Random profile pic
        }));
        this.setDefaultUser();
      });
  }

  setDefaultUser() {
    this.selectedUser = this.users.find(
      (user) => user.id == this.selectedUserId
    );
  }

  onUserChange() {
    this.selectedUser = this.users.find(
      (user) => user.id == this.selectedUserId
    );
    this.posts = [];
    this.comments = [];
  }

  fetchUserPosts() {
    if (this.selectedUserId) {
      this.http
        .get(
          `https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUserId}`
        )
        .subscribe((posts: any) => {
          this.posts = posts;
          if (posts.length > 0) {
            this.selectedPostId = posts[0].id; // Default: select first post
            this.fetchComments(posts[0].id);
          }
        });
    }
  }

  fetchComments(postId: number) {
    this.selectedPostId = postId;
    this.http
      .get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .subscribe((comments: any) => {
        this.comments = comments;
      });
  }
}
