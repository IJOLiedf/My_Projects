//import { CategoriesComponent } from './../categories/categories.component';
import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ElectronicsComponent } from '../electronics/electronics.component';
import { Console } from 'console';
import { FashionComponent } from '../fashion/fashion.component';
import { GroceryComponent } from '../grocery/grocery.component';
import { MobilesComponent } from '../mobiles/mobiles.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule,RouterOutlet,ElectronicsComponent,RouterModule,FashionComponent,GroceryComponent,MobilesComponent,NgbCarouselModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent  implements OnInit{
  
  ngOnInit(): void {
    this.getlikesData();
    this.getproductscount();
    this.getorders();
  }
likedProductsCount: number = 0;
cartItemsCount: number =0;
render:boolean=false;
ordersCount: number = 0;
  

  categories = [
    {
      name: 'Electronics',
      iconClass: 'bi bi-laptop'
    },
    {
      name: 'Fashion',
      iconClass: 'bi bi-people'
    },
    {
      name: 'Grocery',
      iconClass: 'bi bi-basket'
    },
    {
      name: 'Mobiles',
      iconClass: 'bi bi-phone'
    },
    
  ];

  constructor(private router:Router,private http:HttpClient){}

  username = sessionStorage['name'];
  
  showDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  function1(){
    
    this.router.navigate(['/main/Electronics']);
    
  }
  function2(){
    
    this.router.navigate(['/main/Fashion']);
    
  }
  function3(){
    
    this.router.navigate(['/main/Grocery']);
    
  }
  function4(){
    
    this.router.navigate(['/main/Mobiles']);

  }
  ordersfunction() {
    // Navigate to the orders page or display the orders in a modal/dialog
    this.router.navigate(['/orders']);
  }

   

  logout() {
    // Add your logout logic here
    this.router.navigate(['/login']);
    sessionStorage.clear(); 
  }
  likefunction(){
    this.router.navigate(['/likes']);
  }
  cartfunction(){
    this.router.navigate(['/cart']);
  }

  getlikesData() {
    this.http.get<number>(`https://localhost:44351/api/Electronics/likescount?username=${this.username}`)
      .subscribe(
        (count) => {
          this.likedProductsCount = count;
          
        },
        (error) => {
          console.error('Error fetching likes count:', error);
        }
        
      );
      
      
  }
  getproductscount(){
    this.http.get<number>(`https://localhost:44351/api/cart/productscount?username=${this.username}`)
      .subscribe(
        (count) => {
          this.cartItemsCount = count;
        },
        (error) => {
          console.error('Error fetching likes count:', error);
        }
      );
      
  }
  getorders(){
    let name=this.username;
    this.http.get<number>(`https://localhost:44351/api/userOrdersCount?username=${name}`).subscribe(
      (res)=>{
        this.ordersCount=res;
        console.log(res);
      }
    )
  }
  navigateToUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}
