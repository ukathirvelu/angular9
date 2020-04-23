import { Component, OnInit } from '@angular/core';
import { TeamMembersDTO } from 'teamMember';
import { JsonService } from 'src/app/service/json.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit {

  teamMembers = new Array<any>();
  teamMembersDto = new TeamMembersDTO();
  showTeamMemberList = false;
  addedTeamMember = 0;
  updateTeamMemberFlag = false;

  constructor(private jsonServer: JsonService) { }

  ngOnInit(): void {
    this.fetchTeamMembers();
  }

  getTeamMebers() {
    if(this.teamMembers.length == 0 || (this.teamMembers.length > 0 && this.addedTeamMember == 1)) {
      
      this.fetchTeamMembers();
      this.addedTeamMember = 0;
      this.showTeamMemberList = true;
     }else if(this.teamMembers.length > 0 && this.showTeamMemberList) {
      this.showTeamMemberList = false;
    } else if(this.teamMembers.length > 0 && !this.showTeamMemberList) {
      this.showTeamMemberList = true;
    }
    
  }
  updateTeamMember(id:number, firstName:string,lastName:string,phone:string,email:string,operation:number) {
    this.updateTeamMemberFlag = true;
    if (operation == 1) {
      this.teamMembersDto.id = -1;
      this.teamMembersDto.firstName = "";
      this.teamMembersDto.lastName = "";
      this.teamMembersDto.phone = "";
      this.teamMembersDto.email = "";
    } else if (operation == 0) {
      this.teamMembersDto.id = id;
      this.teamMembersDto.firstName = firstName;
      this.teamMembersDto.lastName = lastName;
      this.teamMembersDto.phone = phone;
      this.teamMembersDto.email = email;
    }
  }

  submitTeamMember(id:number, firstName:string,lastName:string,phone:string,email:string) {

    this.jsonServer.updateTeamMember(id, firstName, lastName, phone, email).subscribe(data =>{
        this.addedTeamMember = 1;
      if (id >=0) {
        alert('updated team member successfully');
        this.getTeamMebers();
      } else {
        alert('added team member successfully');
        
        this.getTeamMebers();
      }
      this.updateTeamMemberFlag = false;
    })
  }

  fetchTeamMembers() {
    this.jsonServer.getTeamMebers().subscribe(data => {
      this.teamMembers = data;
    });
  }

}
