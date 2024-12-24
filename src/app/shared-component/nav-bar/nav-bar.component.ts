import { Component, EventEmitter, Output } from '@angular/core';
import { STATUS } from '../../servicess/constant';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  openModalEvent!:EventEmitter<Object>
  @Output()filterTextEvent!:EventEmitter<string>
  isOpen = false;
  status=STATUS
  constructor(){
    this.openModalEvent=new EventEmitter<Object>()
    this.filterTextEvent=new EventEmitter<string>()
  }

 

  toggleSidenav() {
    this.isOpen = !this.isOpen;
  }
  openModalAddTaskForm(){
    this.openModalEvent.emit({
      isAddTaskForm:true
    })
  }
  openModalFilterForm(){
    this.openModalEvent.emit(
      {
        isFilterForm:true
      }
    )
  }
  filterByStatus(status:any){
    this.filterTextEvent.emit(status.value)
  
  }
}
