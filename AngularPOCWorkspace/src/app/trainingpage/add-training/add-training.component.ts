import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrainingPageService } from 'src/app/training-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.scss']
})
export class AddTrainingComponent implements OnInit {
  addForm : FormGroup;
  constructor(private formBuilder:FormBuilder,private trainingPageService:TrainingPageService,private router:Router) { }

  ngOnInit(): void {
    this.addForm=this.formBuilder.group({
      id:[],
      trainingName:['',Validators.required],
      topicName:['',Validators.required],
      trainingSeason:['',Validators.required],
      startDate:[],
      endDate:[]
    });
  }

  onSubmit(){

    this.trainingPageService.addTraining(this.addForm.value,this.addForm.value.trainingSeason).subscribe(data=>{
      console.log(data);
    });
    console.log("topicname --->"+this.addForm.value.topicName);
    this.trainingPageService.addTopicNames(this.addForm.value,this.addForm.value.trainingName).subscribe(data=>{
      this.router.navigate(['home']);
    });
 
  }

}
