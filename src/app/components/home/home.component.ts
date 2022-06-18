import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  systemUp = false;

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.searchService.healthCheck().subscribe(result => {
      console.log(result);

      if (result.responseObject) {
        this.systemUp = true;
      }
    });
  }
}
