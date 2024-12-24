import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from './constant';
import { Observable } from 'rxjs';
import { TaskDetail } from './DAO/TaskDetail';
import { __classPrivateFieldSet } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
 
  constructor(private https:HttpClient) { }
  addTask(_payload:Object):Observable<any>{
    return this.https.post(`${API_URL}post_task_detail`,_payload)
  }
  getTaskDetails(filter:string):Observable<any>{
   if(filter=="")
    return this.https.get(`${API_URL}post_task_detail`)
   else
   return this.https.get(`${API_URL}post_task_detail?status=${filter}`)
  }

  deleteTask(_id:string):Observable<any>{
    return this.https.delete(`${API_URL}post_task_detail/${_id}`)
  }

  updateTask(_id:string,__payload:TaskDetail):Observable<any>{
    return this.https.put(`${API_URL}post_task_detail/${_id}`,__payload)
  }
}
