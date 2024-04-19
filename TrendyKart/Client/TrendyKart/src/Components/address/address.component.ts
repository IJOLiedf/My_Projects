//import { SendGridService } from '@sendgrid/mail';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
//import { Router } from 'express';
import { Router } from '@angular/router';
import emailjs from '@emailjs/browser';


@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addressForm!: FormGroup;
  myOrders: any[] = [];
  usermail:string='';

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {

  }

  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      area: ['', Validators.required]
    });
    this.getmail();
  }

  getmail(){
    this.http.get<string>(`https://localhost:44351/api/getgmail?username=${sessionStorage.getItem('name')}`).subscribe(
      (res)=>{
          this.usermail=res;
      }
      
    )
  }
  onSubmit() {
    if (this.addressForm.valid) {
      console.log('Form submitted with data:', this.addressForm.value);
      const obj = {
        username: sessionStorage.getItem('name'),
        country: this.addressForm.get('country')?.value,
        state: this.addressForm.get('state')?.value,
        city: this.addressForm.get('city')?.value,
        pincode: this.addressForm.get('pincode')?.value,
        area: this.addressForm.get('area')?.value
      };

      this.http.post('https://localhost:44351/api/address', obj).subscribe(
        (res) => {
          console.log(res);
          console.log('data submitted');
        },
        (error) => {
          console.error('Error:', error);
          console.log('data not submitted');
        }
      );

      this.http.get<any[]>('https://localhost:44351/api/cartproducts').subscribe(
        (res) => {
          this.myOrders = res.filter(item => item.username === sessionStorage.getItem('name'));
          console.log(this.myOrders);
          this.saveOrderDetails();
          this.sendEmail();
          this.router.navigate(['/Success']);
          this.deleteProductsFromCart();
        }

      );

    } else {
      console.log('Form is invalid');
    }
  }

  saveOrderDetails() {
    for (let i = 0; i < this.myOrders.length; i++) {
      let obj = {
        username: sessionStorage.getItem('name'),
        product_name: this.myOrders[i].name,
        price: this.myOrders[i].price,
        id: this.myOrders[i].id,
        photo: this.myOrders[i].photo,
      };
      console.log(obj);
      this.http.post('https://localhost:44351/api/orders', obj).subscribe(
        (res) => {
          console.log(res);
        }
      );
    }
  }

  deleteProductsFromCart() {
    let name = sessionStorage.getItem('name');
    this.http.delete(`https://localhost:44351/api/delCartItemOfUser?username=${name}`).subscribe(
      (res) => {
        console.log("successfully deleted");
      }
    );
  }
  sendEmail() {
    // Assuming you have the recipient's email stored somewhere
    //const recipientEmail = sessionStorage.getItem('email');
    console.log(this.usermail);
    let emailData = {
      from_name: "TrendyKart",
      to_name: sessionStorage.getItem('name'), // Use the username stored in sessionStorage
      message: "", // Initialize message
      to_email: this.usermail,// Set the recipient's email dynamically
    };
   
    // Loop through myOrders to construct the message and calculate total price
    let totalPrice = 0;
    this.myOrders.forEach((order, index) => {
      // Append product details to the message
      emailData.message += `${index + 1}. product_name: ${order.name}, Price: ${order.price}\n`;
      // Calculate total price
      totalPrice += order.price;
    });
  
    // Append total price to the message
    emailData.message += `\nTotal Price: ${totalPrice}`;
  
    // Now, send the email
    emailjs.init('zPOfVyyIUWWZQSrWc');
    emailjs.send("service_jqncjxn", "template_jew5rza", emailData)
      .then(function (response) {
        console.log("Email sent successfully:", response);
        
      })
      .catch(function (error) {
        console.error("Error sending email:", error);
      });
  }
  
  
}

