import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grocery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grocery.component.html',
  styleUrl: './grocery.component.css'
})
export class GroceryComponent implements OnInit{

  total:any[]=[];
  Grocery:any[]=[];
  isLiked: boolean = false;
  likes: any[] = [];
  elefound: boolean = false;
  simble: number[] = [];

  cart:any[]=[];
  itemfound:boolean=false;
  cartsimble:number[]=[];
  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.getData();
    
  }

  getData() {
    this.http.get<any[]>("https://localhost:44351/api/products").subscribe(
      (items) => {
        this.total = items;
        this.filterGroceryItems();
      },
      (error) => {
        console.error('Error fetching electronics data:', error);
      }
      
    );
    //console.log(this.total);
  }

  filterGroceryItems() {
    this.Grocery = this.total.filter(item => item.category == 'Grocery');
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
      category: product.category
    };
  
    try {
      const res = await this.http.get<any[]>("https://localhost:44351/api/Electronics/Likes").toPromise();
      if (res) {
        this.likes = res;
        this.elefound = this.likes.some((item) => item.id === obj.id);
      } else {
        this.likes = [];
        this.elefound = false;
      }
  
      if (!this.elefound) {
        await this.http.post("https://localhost:44351/api/Electronics", obj).toPromise();
        console.log('Product liked');
        

      } else {
        await this.http.delete(`https://localhost:44351/api/Electronics/${obj.id}`).toPromise();
        console.log('Product unliked');
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
    window.location.reload();
  }
  async cartfunction(product: any) {

    const productId = product.id;

    if (this.cartsimble.includes(productId)) {
      // Remove the product from the liked products
      this.cartsimble = this.cartsimble.filter(id => id !== productId);
    } else {
      // Add the product to the liked products
      this.cartsimble.push(productId);
    }
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
