import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Modal } from 'bootstrap';
import { Helper } from 'src/app/helper/helper';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnChanges {
  @Input() selectedTopic: Topic = {
    by: '',
    descendants: 0,
    id: 0,
    kids: [],
    score: 0,
    text: '',
    time: 0,
    title: '',
    type: '',
    url: '',
    deleted: false,
    dead: false
  };
  comments: Array<Topic> = [];
  commentIndex: number = 0;
  currentDate: number = (new Date().valueOf() / 1000);

  constructor(private topicService: TopicService) {}

  ngOnChanges(changes: SimpleChanges): void {
    // resetting state
    this.comments = [];
    this.commentIndex = 0;
    this.loadComments(2);
  }

  loadComments(numberOfCommentToLoad: number): void {
    if ('kids' in this.selectedTopic) {

      for (let i = 0; i < numberOfCommentToLoad; i++) {
        if (this.commentIndex >= this.selectedTopic.kids.length) {
          break;
        }
  
        this.topicService.getTopicById(this.selectedTopic.kids[this.commentIndex]).subscribe((commentResp: Topic) => {
          const comment = commentResp;
          this.comments.push(comment);
        });
  
        this.commentIndex++;
      }
   
    }
  }


  toRelativeTime(currentDate: number, dateToConvert: number): string {
    return Helper.relativeDate(currentDate, dateToConvert);
  }
  

  
}
