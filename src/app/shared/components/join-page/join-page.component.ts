import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';
import { UserLogin } from './../../../entities/user';

@Component({
  selector: 'app-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss']
})
export class JoinPageComponent implements OnInit {

  returnUrl: string;
  joinFormGroup: FormGroup;
  loginFormGroup: FormGroup;
  roles: string[] = ['Developer', 'Quality Analyst', 'Business Analyst'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private readonly authenticationService: AuthenticationService,
    ) { }

  ngOnInit() {
    this.joinForm();
    this.loginForm();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/admin';
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

  login(value: UserLogin) {
    if (this.loginFormGroup.invalid) {
      return;
    }
    // const password = await bcrypt.hash(value.password, 10);
    this.authenticationService.login(value.username, value.password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        }
      );
  }

}
