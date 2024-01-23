import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Topic } from '../models/topic';
const BASE_URL_API = "https://hacker-news.firebaseio.com/v0";


@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private httpClient: HttpClient) { }

  // ASK STORIES
  getTopicList(params: any): Observable<Array<number>> {
    return this.httpClient.get<Array<number>>(`${BASE_URL_API}/askstories.json?print=pretty`);
  }

  getTopicById(id: number): Observable<Topic> {
    return this.httpClient.get<Topic>(`${BASE_URL_API}/item/${id}.json?print=pretty`);
  }

}
