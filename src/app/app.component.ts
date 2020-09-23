import qsm from 'qsm';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  response: any;
  list: [];
  limit: number = 10;
  lastId: string;
  firstId: string;
  pageIncrements: number = 0;
  reddit: string = 'angular';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData({});
  }

  fetchData(query: object): void {
    this.http
      .get(
        qsm.add(`https://www.reddit.com/r/${this.reddit}.json`, {
          limit: this.limit,
          ...query,
        })
      )
      .subscribe((response) => {
        this.response = response;
        this.list = this.response.data.children.map((item: any) => {
          return {
            title: item.data.title,
            created: new Date(item.data.created * 1000).toLocaleString(),
            num_comments: item.data.num_comments || 0,
            author: item.data.author,
            score: item.data.score,
            permalink: `https://www.reddit.com${item.data.permalink}`,
            text: item.data.selftext,
          };
        });

        this.firstId = this.response.data.children[0].name;
        this.lastId = this.response.data.after;
      });
  }

  onChangeLimit(event: any) {
    this.limit = Number(event.target.value);
    this.fetchData({});
  }
  onChangeSubbredit(event: any) {
    this.reddit = event.target.value;
    this.fetchData({});
  }

  nextPage() {
    this.pageIncrements = this.pageIncrements + 1;
    this.fetchData({
      after: this.lastId,
    });
  }

  previousPage() {
    this.pageIncrements = this.pageIncrements - 1;

    let queryObject: any = {};
    if (this.pageIncrements !== 0) {
      queryObject.before = this.firstId;
    }

    this.fetchData(queryObject);
  }
}
