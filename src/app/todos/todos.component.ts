import { Component, OnInit } from '@angular/core';
import { TodosPermision, CrudServiceService } from '../crud-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TODOSComponent implements OnInit {

  task!: TodosPermision
  allData: Array<TodosPermision> = new Array<TodosPermision>();
  btnDone = false;
  updateAddBtn= false;
  searchValue: string;
  allTags = new Array();
  removeDuplicatesArrayByName = new Array();


  constructor(private Data: CrudServiceService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.task = new TodosPermision;
    this.GetData();
  }



  // =============================ADD DATA METHOD=============================//
  AddData() {
    if (this.task.task_name) {


      this.Data.addTask(this.task).subscribe({
        next: (res) => {
          this.GetData();
          this.task = new TodosPermision;
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
    else {
      this.toastr.warning('plese enter your task');
    }
  }
  // =============================GET DATA METHOD=============================//
  GetData() {
    this.Data.getTask().subscribe({
      next: (res: any) => {
        this.allData = res;
        this.getAllTags();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // ====================== REMOVE DUPLICATE TAGS MATHOD(FIRST)
  removeDuplicates(arr: any) {
    let s = []
    for (let i of arr) {
      s.push(i.tag_name);
    }
    return [...new Set(s)];
  }


  getAllTags() {
    this.Data.getTask().subscribe({
      next: (res) => {
        // this.allTags= res;
        let test = res;
        this.removeDuplicates(res);
        console.log(res);
        this.removeDuplicatesArrayByName = this.removeDuplicates(res);
      },
      error: (err) => {
        this.toastr.error(err.status);
      }
    });
  }

  // ======================SEARCH DATA TAG THROUGH METHOD


  tagSearchData(data) {
    if (data) {
      let searchEmployee = new Array<TodosPermision>();
      if (this.allData.length > 0) {
        for (let emp of this.allData) {
          if (JSON.stringify(emp).toLowerCase().indexOf(data.toLowerCase()) > 0) {
            searchEmployee.push(emp);
          }
        }
        this.allData = searchEmployee;
      }
      else {
        this.GetData();
      }
    }
    else {
      this.GetData();
    }
  }

  // ======================TYPING DATA TAG THROUGH METHOD
  typingSearchData() {
    if (this.searchValue) {
      let searchEmployee = new Array<TodosPermision>();
      if (this.allData.length > 0) {
        for (let emp of this.allData) {
          if (JSON.stringify(emp).toLowerCase().indexOf(this.searchValue.toLowerCase()) > 0) {
            searchEmployee.push(emp);
          }
        }
        this.allData = searchEmployee;
      }
      else {
        this.GetData();
      }
    }
    else {
      this.GetData();
    }
  }

  // =============================EDIT DATA METHOD=============================//


  fillData(Data: TodosPermision) {
    this.task = Data;
    this.updateAddBtn= true;
  }
  EditData() {
    this.Data.editTask(this.task).subscribe({
      next: (res) => {
        this.task = new TodosPermision;
        // this.GetData();
        this.updateAddBtn= false;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("Edit Data");
      },
    })
  }

  // =============================DELETE DATA METHOD=============================//
  DeleteData(Data: TodosPermision) {
    this.Data.deleteTask(Data).subscribe({
      next: (res) => {
        this.GetData();
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.toastr.success('Task Deleted Syccessfully');
      }
    })
  }


  // =============================COMPLETE DATA METHOD START=============================//
  changeTaskReload(event: any) {
    if (event.target.checked) {
      this.btnDone = true;
    }
    else {
      this.btnDone = false;
    }
  }
  convertDoneOnUnDone(event: any, i: any) {
    if (event.target.checked) {
      this.btnDone = true;
      this.Data.updateTaskUnDoneData(i).subscribe({
        next: (res) => {
          this.btnDone = false;
          this.GetData();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    else {
      this.btnDone = false;
      this.Data.updateTaskDoneData(i).subscribe({
        next: (res) => {
          this.btnDone = true;
          this.GetData();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
  // =============================COMPLETE DATA METHOD END=============================//
}
