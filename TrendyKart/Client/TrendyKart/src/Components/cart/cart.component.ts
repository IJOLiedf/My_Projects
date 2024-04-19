import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  username = sessionStorage.getItem('name');
  cartproducts: any[] = [];
  totalPrice:number=0;
  productsExist:boolean=false;
  totalCartPrice:number=0;
  placeorder:boolean=false;
  

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getData();
    //this.getCartProductsCount();
    
  }

  
  getData() {
    this.http.get<any[]>("https://localhost:44351/api/cart").subscribe(
      (items) => {
        this.filterProducts(items);
        console.log(this.cartproducts);
        if(this.cartproducts.length>0)
          {
            this.placeorder=true;
          }
        for(let item of this.cartproducts)
          {
            this.totalCartPrice+=item.price;
          }
          console.log(this.totalCartPrice);
      },
      (error) => {
        console.error('Error fetching cart data:', error);
      }
    );
  }

  filterProducts(items: any[]) {
    this.cartproducts = items.filter((product) => product.username === this.username);
  }

  removefromcart(id:number)
  {
    this.http.delete(`https://localhost:44351/api/cart/${id}`).subscribe(
      (res) => {
        console.log('deleted from cart');
      }
    );
    window.location.reload();
  }
  
  
  place()
  {
    this.router.navigate(['/Address']);
  }

  // getCartProductsCount(){
  //   let name=sessionStorage.getItem('name');
  //   this.http.get<number>(`https://localhost:44351/api/cartProductsCount?username={name}`).subscribe(
  //     (res)=>{
  //       if(res>0)
  //         {
  //           this.placeorder=true;
  //         }
  //     }
  //   )
  // }
  
  
}