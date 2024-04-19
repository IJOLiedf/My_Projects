import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-electronics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './electronics.component.html',
  styleUrl: './electronics.component.css'
})
export class ElectronicsComponent implements OnInit {
  isLiked: boolean = false;
  likes: any[] = [];
  cart:any[]=[];
  elefound: boolean = false;
  itemfound:boolean=false;
  Electronics: any[] = [];
  cartsimble:number[]=[];
  status:number=0;
  select:boolean=false;
  simble: number[] = [];

  userLikes:any[]=[];
  

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.http.get<any[]>("https://localhost:44351/api/Electronics").subscribe(
      (items) => {
        this.Electronics = items;
      },
      (error) => {
        console.error('Error fetching electronics data:', error);
      }
    );
  }

  async heartfunction(product: any) {

    const productId = product.id;
    if (this.simble.includes(productId)) {
      // Remove the product from the liked products
      this.simble = this.simble.filter(id => id !== productId);
    } else {
      // Add the product to the liked products
      this.simble.push(productId);
    }
    
    const obj = {
      username: sessionStorage.getItem('name'),
      id: product.id,
      name: product.name,
      price: product.price,
      photo: product.photo,
      category: product.category,
      status:product.status
    };
  
    try {
      const res = await this.http.get<any[]>("https://localhost:44351/api/Electronics/Likes").toPromise();
      if (res) {
        this.likes = res;
        this.elefound = this.likes.some((item) => item.id === obj.id);
      } else {
        this.likes = [];
        this.itemfound = false;
      }
  
      if (!this.elefound) {
        await this.http.post("https://localhost:44351/api/Electronics", {...obj,status:1}).toPromise();
        console.log('Product liked');
        
        

      } else {
        await this.http.delete(`https://localhost:44351/api/Electronics/${obj.id}`).toPromise();
        console.log('Product unliked');
        this.status=0;
        
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
    window.location.reload();
  }

  async cartfunction(product: any) {

    const productId = product.id;

   
    const obj = {
      username: sessionStorage.getItem('name'),
      id: product.id,
      name: product.name,
      price: product.price,
      photo: product.photo,
      category: product.category
    };
  
    try {
      const res = await this.http.get<any[]>("https://localhost:44351/api/cart").toPromise();
      if (res) {
        this.cart = res;
        this.itemfound = this.cart.some((item) => item.id === obj.id);
      } else {
        this.cart = [];
        this.itemfound = false;
      }
  
      if (!this.itemfound) {
        await this.http.post("https://localhost:44351/api/cart", obj).toPromise();
        console.log('Product added');
        

      } else {
        await this.http.delete(`https://localhost:44351/api/cart/${obj.id}`).toPromise();
        console.log('Product deleted');
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
    window.location.reload();
  }
}