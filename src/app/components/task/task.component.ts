import { Component, EventEmitter, Input,  OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { TaskService } from 'src/app/services/task.service';
import { EditDialogBoxComponent } from '../edit-dialog-box/edit-dialog-box.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private tasksService:TaskService,public matDialog:MatDialog) { }
  @Input() task : any;
  @Input() upcoming : any;
  @Input() missed : any;
  @Output() deleteClickedOrTaskUpdated = new EventEmitter<any>();
  
  ngOnInit(): void {
    
    
  }
 complete:boolean=false;
 @Output() emittedUpdate = new EventEmitter<any>();

  deleteTask(task_id:number){
   
       this.tasksService.deleteTask(task_id).subscribe(value=>{
        if(value?.msg){
        this.deleteClickedOrTaskUpdated.emit(' ');}
        },err=>{return});
       
  }




  checkIfComplete(task_id:any){
      this.complete =!this.complete;
      var values ={
        task_id,
        completed:this.complete
      }
     
   
      this.tasksService.updatedCompleted(values).subscribe(value=>{
        
             
             this.deleteClickedOrTaskUpdated.emit(' ');
 
           
      })
  }



  openDialog(task:any):void{

     var taskValues= {
         time_to_be_accomplished: this.tasksService.convertTimeToTwelve(task.time_to_be_accomplished),
         time_to_start:this.tasksService.convertTimeToTwelve(task.time_to_start),
         task_id: task.task_id,
         task:task.task,
         date_to_be_accomplished:task.date_to_be_accomplished

      }

   
     
      const dialogRef =  this.matDialog.open(EditDialogBoxComponent,{
        width: '400px',
        data:taskValues
     })
       
     dialogRef.afterClosed().subscribe(result=>{
          if(result){
            this.emittedUpdate.emit(result);
          }
     })
}



}
