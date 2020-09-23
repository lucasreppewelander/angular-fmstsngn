import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'reddit-list-item',
  templateUrl: './reddit-list-item.component.html',
  styleUrls: ['./reddit-list-item.component.scss'],
})
export class RedditListItemComponent implements OnInit {
  @Input() item: any;
  isOpened: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.isOpened = !this.isOpened;
  }
}
