import { Component, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskDetail } from '../../servicess/DAO/TaskDetail';
import { STATUS } from '../../servicess/constant';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss'
})
export class AddTaskFormComponent {
  priority = [
    "Low", "Medium", "High"
  ];
  status=STATUS
  addTaskFormGroup!:FormGroup
  submitValueEventEmitter!:EventEmitter<TaskDetail>
  updateValueEventEmiter!:EventEmitter<TaskDetail>
  isDisabled!:boolean
  isUpdate!:boolean
  
  constructor(private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddTaskFormComponent>
  ){
  this.addTaskFormGroup=new FormGroup(
    {
      task_title: new FormControl(null,[Validators.required]),
      task_description:new FormControl(null),
      priority:new FormControl(null),
      status:new FormControl(null)
    }
  )
  this.submitValueEventEmitter=new EventEmitter<TaskDetail>()
  this.updateValueEventEmiter=new EventEmitter<TaskDetail>()
  }

  submitForm(){
    //console.log(this.addTaskFormGroup.value)
    if(this.isUpdate){
      this.updateForm()
      return
    }
    if(this.addTaskFormGroup.invalid){
      this.addTaskFormGroup.markAllAsTouched()
      alert("Please Enter The Task Title")
      return
    }
    
    this.submitValueEventEmitter.emit(this.addTaskFormGroup.value)
   
  }

  updateForm(){
    if(this.addTaskFormGroup.invalid){
      this.addTaskFormGroup.markAllAsTouched()
      alert("Please Enter The Task Title")
      return
    }
    this.updateValueEventEmiter.emit(this.addTaskFormGroup.value)
  }
  closed(){
    this.dialogRef.close()
  }
}
