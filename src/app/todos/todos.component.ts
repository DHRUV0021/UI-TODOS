import { Component, OnInit } from '@angular/core';
import { TodosPermision, CrudServiceService } from '../crud-service.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TODOSComponent implements OnInit{

  task!:TodosPermision
  allData:Array<TodosPermision>=new Array<TodosPermision>();
  btnDone = false;

  constructor(private Data:CrudServiceService){}


  ngOnInit(): void {
    this.task=new TodosPermision;
    this.GetData();
  }



// =============================ADD DATA METHOD=============================//
  AddData(){
    this.Data.addTask(this.task).subscribe({
      next:(res)=>{
        this.GetData();
        this.task=new TodosPermision;
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("added");
      }
    })
  }

// =============================GET DATA METHOD=============================//
  GetData(){
      this.Data.getTask().subscribe({
        next:(res:any)=>{
        this.allData=res;
          console.log(res);
        },
        error:(err)=>{
          console.log(err);
        },
        complete:()=>{
          console.log("get data  complete");
        }
      })
    }


    // =============================EDIT DATA METHOD=============================//


    fillData(Data:TodosPermision){
      this.task=Data;
    }
    EditData(Data:TodosPermision){
      this.Data.editTask(Data).subscribe({
        next:(res)=>{
          this.task=new TodosPermision;
            
          console.log(res);
        },
        error:(err)=>{
          console.log(err);
        },
        complete:()=>{
          console.log("Edit Data");
        },
      })
    }

// =============================DELETE DATA METHOD=============================//
DeleteData(Data:TodosPermision){
  this.Data.deleteTask(Data).subscribe({
    next:(res)=>{
      this.GetData();
      console.log(res);
    },
    error:(err)=>{
      console.log(err);
    },
    complete:()=>{
      console.log("delete success");
    }
  })
}


// =============================COMPLETE DATA METHOD START=============================//
changeTaskReload(event:any){
  if(event.target.checked){
    this.btnDone=true;
  }
  else{
    this.btnDone=false;
  }
}

convertDoneOnUnDone(event:any,i:any){
  if(event.target.checked){
    this.btnDone = true;  
    this.Data.updateTaskUnDoneData(i).subscribe({
      next: (res) => {
          this.btnDone = false;  
          this.GetData();
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
    else{
      this.btnDone = false;
      this.Data.updateTaskDoneData(i).subscribe({
        next: (res) => {
          this.btnDone = true;
          this.GetData();
        },
        error:(err)=>{
          console.log(err);
        }
      });
  }
}
// =============================COMPLETE DATA METHOD END=============================//


}
