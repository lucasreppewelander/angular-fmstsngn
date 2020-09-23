import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'comment-list-item',
  templateUrl: './comment-list-item.component.html',
  styleUrls: ['./comment-list-item.component.scss'],
})
export class CommentListItemComponent implements OnInit {
  @Input() item: any;
  constructor() {}

  ngOnInit(): void {}
}
