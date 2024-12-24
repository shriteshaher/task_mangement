import {
  ChangeDetectorRef,
  Component,
  inject,
  ViewChild,
  viewChild,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavBarComponent } from './shared-component/nav-bar/nav-bar.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddTaskFormComponent } from './shared-component/add-task-form/add-task-form.component';
import { TasksService } from './servicess/tasks.service';
import { TaskDetail } from './servicess/DAO/TaskDetail';
import { MatSnackBar } from '@angular/material/snack-bar';

type flagDetails = {
  isFilterForm: boolean;
  isAddTaskForm: boolean;
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'task_management';
  dialog = inject(MatDialog);
  task_details: Array<TaskDetail> = [];
  @ViewChild(AddTaskFormComponent) addTaskForm!: AddTaskFormComponent;
  @ViewChild(NavBarComponent) navBar!: NavBarComponent;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private taskSerivice: TasksService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {
    // this.matIconRegistry.addSvgIcon('filter',this.sanitizer.bypassSecurityTrustResourceUrl("assets/images/funnel.svg"))
  }
  ngOnInit() {
    this.getTaskDetails('');
  }
  ngAfterViewInit() {
    this.navBar.openModalEvent.subscribe((event: flagDetails) => {
      if (event) {
        if (event.isAddTaskForm) {
          this.submitTaskDetails();
        }
      }
    });
  }

  openModalAddTaskForm() {
    const dialogRef = this.dialog.open(AddTaskFormComponent, {
      width: '400px',
      height: '470px',
    });

    return dialogRef;
  }

  getTaskDetails(searchText: any) {
    console.log(searchText);
    if (!searchText) {
      this.taskSerivice.getTaskDetails('').subscribe((result) => {
        console.log(result);
        this.task_details = result;
      });
    } else {
      this.taskSerivice.getTaskDetails(searchText).subscribe(
        (result) => {
          this.task_details = result;
        },
        (err) => {
          alert('not found');
          this.task_details = [];
        }
      );
    }
  }

  deleteCard(card_id: string) {
    this.taskSerivice.deleteTask(card_id).subscribe((res) => {
      alert('Task Deleted Successfully');
      this.getTaskDetails('');
    });
  }

  viewTaskDataModal(card_data: TaskDetail) {
    const dialogRef = this.openModalAddTaskForm();
    dialogRef.componentInstance.addTaskFormGroup.setValue({
      task_title: card_data.task_title,
      task_description: card_data.task_description,
      priority: card_data.priority,
      status: card_data.status,
    });
    dialogRef.componentInstance.addTaskFormGroup.disable();
    dialogRef.componentInstance.isDisabled = true;
    this.cdr.detectChanges();
  }

  submitTaskDetails() {
    const dialogRef = this.openModalAddTaskForm();
    dialogRef.componentInstance.submitValueEventEmitter.subscribe((result) => {
      this.taskSerivice.addTask(result).subscribe((result) => {
        alert('Task Added Successfully');
        if (result) {
          this.getTaskDetails('');
          dialogRef.close();
        }
      });
    });
  }

  updateCardDataModal(card_data: TaskDetail) {
    const dialogRef = this.openModalAddTaskForm();
    dialogRef.componentInstance.addTaskFormGroup.setValue({
      task_title: card_data.task_title,
      task_description: card_data.task_description,
      priority: card_data.priority,
      status: card_data.status,
    });
    dialogRef.componentInstance.isUpdate = true;
    dialogRef.componentInstance.updateValueEventEmiter.subscribe((result) => {
      result.id = card_data.id;
      this.taskSerivice.updateTask(result.id, result).subscribe((res) => {
        alert('Task Updated Successfully');
        this.getTaskDetails('');
        dialogRef.close();
      });
    });
  }
}
