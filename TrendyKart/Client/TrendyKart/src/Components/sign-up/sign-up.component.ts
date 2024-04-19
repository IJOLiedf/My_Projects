import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  data: any[] = [];
  userExists: boolean = false;
  errorMessage: string = '';

  ngOnInit() {
    this.fetchData();
  }
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get username() { return this.signUpForm.get('username'); }
  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }

  fetchData() {
    this.userService.getData().subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  login() {
    this.router.navigate(['/login']);
  }

  

  onSubmit() {
    if (this.signUpForm.valid) {
      //console.log(this.data);
      const { username, email } = this.signUpForm.value;
      const existingUser = this.data.find(user => user.userName === username || user.email === email);

      if (existingUser) {
        this.userExists = true;
        this.errorMessage = 'User already exists.';
      } else {
        this.userExists = false;
        this.errorMessage = '';
       //const {email}= this.signUpForm.value;
        //localStorage.setItem('email',email);
        this.userService.createUser(this.signUpForm.value)
          .subscribe(
            (user) => {
              this.router.navigate(['/login']);
            },
            (error) => {
              this.userExists = true;
              this.errorMessage = 'Error creating user.';
            }
          );
      }
    }
  }
}