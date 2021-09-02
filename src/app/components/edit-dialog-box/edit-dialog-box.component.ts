import { Component,  Inject, OnInit} from '@angular/core';


import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';

import * as moment from 'moment';


@Component({
  selector: 'app-edit-dialog-box',
  templateUrl: './edit-dialog-box.component.html',
  styleUrls: ['./edit-dialog-box.component.css']
})
export class EditDialogBoxComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<EditDialogBoxComponent>
           , @Inject(MAT_DIALOG_DATA) public data:any,private tasksService:TaskService
    ) { }
  
  
  

  ngOnInit(): void {
       this.data.date_to_be_accomplished = moment.utc(this.tasksService.formatDate(this.data.date_to_be_accomplished)).local();
  }
 
   onCancel(){
    
     this.dialogRef.close();
   }


   

}
