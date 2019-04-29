import { Component, OnInit } from '@angular/core';
import { Tweet } from "../tweet";
import { TweetService } from "../tweet.service";
import { Tweets } from '../mock-tweets';


@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  listaTweets: Tweet[];
  Tweets: any;

  constructor(private tweetService: TweetService) { }

  ngOnInit() {
    this.getTweets();
  }

  getTweets(): void {
    this.tweetService.getTweets().subscribe(tweets => this.listaTweets = tweets);

  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.tweetService.addTweet({ name } as Tweets)
      .subscribe(hero => {
        this.Tweets.push(Tweets);
      });
  }
 
  delete(tweets: Tweets): void {
    this.Tweets = this.Tweets.filter(t => t!== Tweets);
    this.tweetService.deleteTweet(Tweets).subscribe();
  }

}
