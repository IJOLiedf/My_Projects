import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
//import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
  
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
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
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signin()
  {
    this.router.navigate(['/signup']);
  }
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

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

  onSubmit() {
    console.log(this.data);
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const existingUser = this.data.find(user => user.userName === username && user.password === password);

      if (existingUser) {
        this.userExists = false;
        
        this.router.navigate(['/main']);
        sessionStorage['name']=username;
      } else {
        this.userExists = true;
        this.errorMessage = 'Invalid username or password.';
      }
    }
  }
}
