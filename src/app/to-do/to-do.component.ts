import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iTask } from '../model/task';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
})
export class ToDoComponent implements OnInit {
  todoForm!: FormGroup;
  tasks: iTask[] = [];
  inprogress: iTask[] = [];
  done: iTask[] = [];
  itemId: any;
  editMode: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    // this.getItem();
  }
  buildForm() {
    this.todoForm = this.fb.group({
      item: ['', [Validators.required]],
    });
  }

  addTask() {
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false,
    });
    // localStorage.setItem('token', JSON.stringify(this.tasks));
    this.todoForm.updateValueAndValidity();
    this.todoForm.reset();
  }
  // getItem() {
  //   this.tasks = JSON.parse(localStorage.getItem('token') || '');
  // }
  deleteTask(i: number) {
    this.tasks.splice(i, 1);
    localStorage.setItem('token', JSON.stringify(this.tasks));
  }
  deleteProgress(i: number) {
    this.inprogress.splice(i, 1);
  }
  deleteDone(i: number) {
    this.done.splice(i, 1);
  }
  editTask(item: iTask, i: number) {
    this.todoForm.controls['item'].setValue(item.description);
    this.editMode = true;
    this.itemId = i;
  }
  updateTask() {
    this.tasks[this.itemId].description = this.todoForm.value.item;
    this.tasks[this.itemId].done = false;
    this.todoForm.reset();
    this.todoForm.updateValueAndValidity();
    this.editMode = false;
  }
  ///////////////////////////////////////////////////////////////Drog
  drop(event: CdkDragDrop<iTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
