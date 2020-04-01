import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss']
})
export class JoinPageComponent implements OnInit {

  joinFormGroup: FormGroup;

  loginFormGroup: FormGroup;

  roles: string[] = ['Developer', 'Quality Analyst', 'Business Analyst'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit() {
    this.joinForm();
    this.loginForm();
  }

  joinForm() {
    this.joinFormGroup = this.formBuilder.group({
      name: [null, Validators.required],
      role: [null, Validators.required],
      code: [null, Validators.required]
    });
  }

  loginForm() {
    this.loginFormGroup = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      isRemember: [null]
    });
  }

  join(value) {
    console.log(value);
    this.router.navigate(['/vote']);
  }

login(value) {
  console.log(value);
  this.router.navigate(['/admin']);
}

}
