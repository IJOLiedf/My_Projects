import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-likes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './likes.component.html',
  styleUrl: './likes.component.css'
})
export class LikesComponent implements OnInit {
  username = sessionStorage.getItem('name');
  likedproducts: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.http.get<any[]>("https://localhost:44351/api/Electronics/Likes").subscribe(
      (items) => {
        this.filterProducts(items);
      },
      (error) => {
        console.error('Error fetching electronics data:', error);
      }
    );
  }

  filterProducts(items: any[]) {
    this.likedproducts = items.filter((product) => product.username === this.username);
  }

  remove(id: number) {
    this.http.delete(`https://localhost:44351/api/Electronics/${id}`).subscribe(
      (res) => {
        console.log('deleted');
      }
    );
    window.location.reload();
  }
  addtocart(pro:object,id:number)
  {
    this.http.delete(`https://localhost:44351/api/Electronics/${id}`).subscribe(
      (res) => {
        console.log('deleted');
      }
    );

    this.http.post(`https://localhost:44351/api/cart`,pro).subscribe(
      (res)=>{
        console.log('added to cart');
      }
    );
    window.location.reload();
    
  }

}
  
