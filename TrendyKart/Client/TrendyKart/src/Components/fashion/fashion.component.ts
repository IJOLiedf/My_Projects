import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fashion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fashion.component.html',
  styleUrl: './fashion.component.css'
})
export class FashionComponent implements OnInit {
  ngOnInit(): void {
    this.getData();
  }
  
  isLiked: boolean = false;
  likes: any[] = [];
  
  cart:any[]=[];
  itemfound:boolean=false;
  cartsimble:number[]=[];

  elefound: boolean = false;
  simble: number[] = [];
  Fashion: any[] = []; // Type should match the structure of the data you expect

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<any[]>("https://localhost:44351/api/Fashion").subscribe(
      (items: any[]) => { // Specify the type of data you're expecting
        this.Fashion = items;
        console.log(this.Fashion);
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
