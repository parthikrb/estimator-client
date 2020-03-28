import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss']
})
export class JoinPageComponent implements OnInit {

  joinFormGroup: FormGroup;

  roles: string[] = ['Developer', 'Quality Analyst', 'Business Analyst'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.joinForm();
  }

  joinForm() {
    this.joinFormGroup = this.formBuilder.group({
      name: [null, Validators.required],
      role: [null, Validators.required],
      code: [null, Validators.required]
    });
  }

  join(value) {
    console.log(value);
  }

}
