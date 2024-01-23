import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { TopicService } from 'src/app/services/topic.service';
import { Subscription } from 'rxjs';
import { Modal } from 'bootstrap';
import { Topic } from 'src/app/models/topic';
import { Helper } from 'src/app/helper/helper';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopicListComponent implements OnInit, OnDestroy {
  allTopicIds: Array<number> = [];
  topicIdIndex: number = 0;
  topicIds2Dimensional: Array<Topic[]> = [];
  topicSubscription: Subscription = new Subscription;
  selectedTopic: Topic = {
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
  currentDate: number = (new Date().valueOf() / 1000);



  constructor(
    private topicService: TopicService
  ) {}

  ngOnInit(): void {
    this.topicSubscription = this.topicService.getTopicList({}).subscribe((response: Array<number>) => {
      
      this.allTopicIds = response;
      this.topicIdsTo2Dimensional(20);
      
      
    });
  }
    
  ngOnDestroy(): void {
    if (this.topicSubscription != null) this.topicSubscription.unsubscribe();
  }

  showDetailsModal(event: Event, topic: Topic) {
    event.preventDefault(); //preventing window from scrolling to top

    this.selectedTopic = topic;
    const modalElement = document.getElementById("topic-details-modal") as HTMLElement;
    const modal = new Modal(modalElement);
    modal.show();
    
  }

  topicIdsTo2Dimensional(numberOfItemToAdd: number) : void {

    for (let i = 0; i < numberOfItemToAdd; i++) {

      if (this.topicIdIndex >= this.allTopicIds.length) {
        console.log("no more data to load");
        break;
      }

      this.topicService.getTopicById(this.allTopicIds[this.topicIdIndex]).subscribe((topicResp: Topic) => {
        const topic = topicResp;

        if (this.topicIds2Dimensional.length == 0) {
          this.topicIds2Dimensional.push([<Topic>topic]); // push initial array item
        } else {
          let targetIndex = this.topicIds2Dimensional.length;
          if (this.topicIds2Dimensional[targetIndex-1].length < 4) {
            this.topicIds2Dimensional[targetIndex-1].push(<Topic>topic); // push item to existing index
          } else {
            this.topicIds2Dimensional.push([<Topic>topic]); // push item to next index 
          }
        }
  
        
      });

      this.topicIdIndex++;
    }
  }

  toRelativeTime(currentDate: number, dateToConvert: number): string {
    return Helper.relativeDate(currentDate, dateToConvert);
  }
}
