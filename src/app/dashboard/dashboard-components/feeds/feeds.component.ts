import { Component, Injectable, OnInit } from '@angular/core';
import { Feeds,Feed, FeedService } from './feeds-data';


@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html'
})

@Injectable({   providedIn: 'root' })
export class FeedsComponent implements OnInit {

  feeds:any[] = [];

  constructor(private feedService: FeedService) {

    this.feedService.getFeed().subscribe(s=>{
      console.log(s)

      this.feeds = [...s];
    })

   // this.feeds = Feeds;
  }

  ngOnInit(): void {
  }

}
