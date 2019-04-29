import { Injectable } from '@angular/core';
import { Tweet } from './tweet';
import { Tweets } from './mock-tweets';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  //Defina o TweetesUrldo formulário :base/:collectionNamecom o endereço do recurso heróis no servidor. 
  //Aqui baseestá o recurso para o qual as solicitações são feitas e collectionNameé o objeto de dados de heróis no in-memory-data-service.ts.
  
  private tweetsUrl = 'api/tweets';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {}
    
  getTweets(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(this.tweetsUrl)
    .pipe(
      tap(_ => this.log('fetched Tweet')),
      catchError(this.handleError<Tweet[]>('getTweet', []))
    );

  }
 /** GETTweetby name. Return `undefined` when name not found */
 getTweetNo404<Data>(name: String): Observable<Tweet> {
  const url = `${this.tweetsUrl}/?name=${name}`;
  return this.http.get<Tweet[]>(url)
    .pipe(
      map(Tweets => Tweets [0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} Tweet name=${name}`);
      }),
      catchError(this.handleError<Tweet>(`getTweet name=${name}`))
    );
}

/** GETTweet by name. Will 404 if name not found */
getTweet(name: String): Observable<Tweet> {
  const url = `${this.tweetsUrl}/${name}`;
  return this.http.get<Tweet>(url).pipe(
    tap(_ => this.log(`fetched Tweet name=${name}`)),
    catchError(this.handleError<Tweet>(`getTweet name=${name}`))
  );
}

/* GET Tweet whose name contains search term */
searchTweet(term: string): Observable<Tweet[]> {
  if (!term.trim()) {
    // if not search term, return empty Tweet array.
    return of([]);
  }
  return this.http.get<Tweet[]>(`${this.tweetsUrl}/?name=${term}`).pipe(
    tap(_ => this.log(`found Tweet matching "${term}"`)),
    catchError(this.handleError<Tweet[]>('searchTweet', []))
  );
}

//////// Save methods //////////

/** POST: add a new Tweet to the server */
addTweet (tweet: Tweet): Observable<Tweet> {
  return this.http.post<Tweet>(this.tweetsUrl, Tweet, httpOptions).pipe(
    tap((newTweet: Tweet) => this.log(`added Tweet w/ name=${newTweet.name}`)),
    catchError(this.handleError<Tweet>('addTweet'))
  );
}

/** DELETE: delete the Tweet from the server */
deleteTweet (tweet: Tweet | number): Observable<Tweet> {
  const name = typeof Tweet === 'number' ? Tweet : Tweet.name;
  const url = `${this.tweetsUrl}/${name}`;

  return this.http.delete<Tweet>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted Tweet name=${name}`)),
    catchError(this.handleError<Tweet>('deleteTweet'))
  );
}

/** PUT: update the Tweeton the server */
updateTweet (tweet: Tweet): Observable<any> {
  return this.http.put(this.tweetsUrl, Tweet, httpOptions).pipe(
    tap(_ => this.log(`updated Tweet name=${Tweet.name}`)),
    catchError(this.handleError<any>('updateTweet'))
  );
}

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

/** Log a Tweet Service message with the MessageService */
private log(message: string) {
  this.messageService.add(`TweetService: ${message}`);
}
}