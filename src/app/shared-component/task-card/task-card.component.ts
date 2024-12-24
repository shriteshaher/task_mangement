import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskDetail } from '../../servicess/DAO/TaskDetail';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input()card_data!:TaskDetail
  @Output()deleleEventEmitter!:EventEmitter<string>
  @Output()viewEventEmitter!:EventEmitter<TaskDetail>
  @Output()updateEventEmitter!:EventEmitter<TaskDetail>
  // onCardClick=(){

  // }
  constructor(){
   this.deleleEventEmitter=new EventEmitter<string>()
  this.viewEventEmitter=new EventEmitter<TaskDetail>()
  this.updateEventEmitter=new EventEmitter<TaskDetail>()
  }
  deleteEventEmitterDataTrigger(){ 
    this.deleleEventEmitter.emit(this.card_data.id)
  }
  viewSelectedCardDataTrigger(){
    this.viewEventEmitter.emit(this.card_data)
  }
  updateSelectedCardDataTrigger(){
    this.updateEventEmitter.emit(this.card_data)
  }
}
