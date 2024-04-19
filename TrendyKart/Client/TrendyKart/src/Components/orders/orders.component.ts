import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  myorders:any[]=[];
  ngOnInit(): void {
    this.getorders();
  }
  constructor(private http:HttpClient){}
  getorders(){
    let name=sessionStorage.getItem('name');
    this.http.get<any>(`https://localhost:44351/api/userOrders?username=${name}`).subscribe(
      (res)=>{
        this.myorders=res;
        console.log(res);
      }
    );
  }
}
