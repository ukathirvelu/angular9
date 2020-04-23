import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/service/json.service';
import { ViewTraining } from 'src/ViewTraining';

@Component({
  selector: 'app-view-training',
  templateUrl: './view-training.component.html',
  styleUrls: ['./view-training.component.scss']
})
export class ViewTrainingComponent implements OnInit {
  

  trainings = new Array<any>();
  updateViewTrainingFlag = false;
  viewTraining = new ViewTraining();
  constructor(private jsonServer: JsonService) { }

  ngOnInit(): void {
    this.fetchViewTrainings();
  }

  fetchViewTrainings() {
    this.jsonServer.fetchViewTrainings().subscribe(data => {
      this.trainings = data;
    });
  }

  updateTraining(id:number, trainingName:string, topic:string, startDate:string, endDate:string, operation:number) {
     this.updateViewTrainingFlag = true;
    if (operation == 1) {

      this.viewTraining.id = -1;
      this.viewTraining.trainingName = "";
      this.viewTraining.topic = "";
      this.viewTraining.startDate = "";
      this.viewTraining.endDate = "";
    } else if (operation == 0) {

      this.viewTraining.id = id;
      this.viewTraining.trainingName = trainingName;
      this.viewTraining.topic = topic;
      this.viewTraining.startDate = startDate;
      this.viewTraining.endDate = endDate;
    }
  }

  submitTraining(id:number, trainingName:string,topic:string,startDate:string,endDate:string) {

    this.jsonServer.updateTraining(id, trainingName, topic, startDate, endDate).subscribe(data =>{
       // this.addedTeamMember = 1;
      if (id >=0) {
        alert('updated training successfully');
        this.fetchViewTrainings();
      } else {
        alert('added training successfully');
        
        this.fetchViewTrainings();
      }
      this.updateViewTrainingFlag = false;
    })
  }

}
