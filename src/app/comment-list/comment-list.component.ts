import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input() url: string;
  @Input() isOpened: boolean;
  response: any;
  comments: [];
  thread: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  fetchComments() {
    this.http.get(`${this.url}.json`).subscribe((response) => {
      this.response = response;
      let [thread, comments] = this.response;

      this.thread = thread.data.children[0].data.selftext;

      if (comments) {
        this.comments = comments.data.children.map((item: any) => {
          return {
            body: item.data.body,
            created: new Date(item.data.created * 1000).toLocaleString(),
            author: item.data.author,
            score: item.data.score,
          };
        });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isOpened.currentValue !== changes.isOpened.previousValue) {
      if (changes.isOpened.currentValue === true) {
        this.fetchComments();
      }
    }
  }
}
