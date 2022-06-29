import { Component, Input, OnInit } from '@angular/core';
import { SentimentResult } from 'src/app/interfaces/sentiment-response.interface';

@Component({
  selector: 'app-month-data',
  templateUrl: './month-data.component.html',
  styleUrls: ['./month-data.component.scss'],
})
export class MonthDataComponent implements OnInit {
  @Input() sentimentResult: SentimentResult;

  constructor() {}

  ngOnInit(): void {}
}
