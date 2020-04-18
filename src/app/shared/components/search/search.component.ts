import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;

  @Input() placeholder: string;

  @Output() textEntered = new EventEmitter();

  constructor(
    private formbuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createSearchForm();
  }

  createSearchForm() {
    this.searchForm = this.formbuilder.group({
      searchField: [null]
    });
  }

  valueEntered($event) {
    this.textEntered.emit($event);
  }

}
