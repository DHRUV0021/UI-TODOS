import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

constructor(private http:HttpClient) { }

dbUrl = 'http://localhost:3000/todosData';//JSON URL


// ============GET DATA METHOD
getTask(){
  return this.http.get(this.dbUrl);
}

// ============ADD DATA METHOD
addTask(data:TodosPermision){
  return this.http.post(this.dbUrl,data);
}

// ============EDIT DATA METHOD
editTask(data:TodosPermision){
  return this.http.put(`${this.dbUrl}/${data.id}`,data);

}

// ============DELETE DATA METHOD
deleteTask(data:TodosPermision){
  return this.http.delete(`${this.dbUrl}/${data.id}`);
}



// ============COMPLETE TASK DATA METHOD  STRAT (two method)
//(1)
updateTaskDoneData(body:TodosPermision){
  const task_update= false;
  return this.http.put(`${this.dbUrl}/${body.id}`,{task_name:body.task_name, tag_name:body.tag_name, tag_fg_color:body.tag_fg_color, tag_bg_color:body.tag_bg_color, completed:task_update});
}
//(2)
updateTaskUnDoneData(body:TodosPermision){
  const task_up = true;
  return this.http.put(`${this.dbUrl}/${body.id}`,{task_name:body.task_name, tag_name:body.tag_name, tag_fg_color:body.tag_fg_color, tag_bg_color:body.tag_bg_color, completed:task_up});
}
}
// ============COMPLETE TASK DATA METHOD END






//---------------class
export class TodosPermision{
  id?:number ;
  tag_name?:string;
  task_name?:string;
  tag_fg_color?:string;
  tag_bg_color?:string;
  completed?:boolean=false;
}
