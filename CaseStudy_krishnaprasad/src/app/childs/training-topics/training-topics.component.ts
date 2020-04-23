import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/service/json.service';
import { TopicDTO } from 'src/TopicDTO';

@Component({
  selector: 'app-training-topics',
  templateUrl: './training-topics.component.html',
  styleUrls: ['./training-topics.component.scss']
})
export class TrainingTopicsComponent implements OnInit {


  topicList = new Array<any>();
  updateTopicFlag = false;
  topicDtos = new TopicDTO();
  constructor(private jsonServer: JsonService) { }

  ngOnInit(): void {
    this.fetchTopics();
  }

  fetchTopics() {
    this.jsonServer.fetchTopics().subscribe(data => {
      this.topicList = data;
    });
  }

  updateTopic(id:number, topicName:string, description:string, startDate:string, endDate:string, operation:number) {
     this.updateTopicFlag = true;
    if (operation == 1) {

      this.topicDtos.id = -1;
      this.topicDtos.topicName = "";
      this.topicDtos.description = "";
      this.topicDtos.startDate = "";
      this.topicDtos.endDate = "";
    } else if (operation == 0) {

      this.topicDtos.id = id;
      this.topicDtos.topicName = topicName;
      this.topicDtos.description = description;
      this.topicDtos.startDate = startDate;
      this.topicDtos.endDate = endDate;
    }
  }

  submitTopic(id:number, topicName:string,description:string,startDate:string,endDate:string) {

    this.jsonServer.updateTopic(id, topicName, description, startDate, endDate).subscribe(data =>{
       // this.addedTeamMember = 1;
      if (id >=0) {
        alert('updated topic successfully');
        this.fetchTopics();
      } else {
        alert('added topic successfully');
        
        this.fetchTopics();
      }
      this.updateTopicFlag = false;
    })
  }

}
