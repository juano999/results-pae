import { DataServices } from './../../data.services';
import { Component, OnInit } from '@angular/core';
import Result from 'src/app/framework/models/result';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  results: Result[];
  constructor(private dataService: DataServices) {
    this.results = [{
      doctor: 'd1',
      date: '2022-08-25',
      url: 'dsdsdds.pdf',
      username: 'user2'
    }];
  }

  ngOnInit(): void {
    this.dataService.getResults('user1').subscribe(results => {
      this.results = results;
      console.log(this.results[0]);
    })
  }

}
