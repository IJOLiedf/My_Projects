import { OrderSuccessComponent } from './../Components/order-success/order-success.component';
import { Routes } from '@angular/router';
import { SignUpComponent } from '../Components/sign-up/sign-up.component';
import { LoginComponent } from '../Components/login/login.component';
import { MainComponent } from '../Components/main/main.component';
import { ElectronicsComponent } from '../Components/electronics/electronics.component';
import { FashionComponent } from '../Components/fashion/fashion.component';
import { LikesComponent } from '../Components/likes/likes.component';
import { CartComponent } from '../Components/cart/cart.component';
import { GroceryComponent } from '../Components/grocery/grocery.component';
import { MobilesComponent } from '../Components/mobiles/mobiles.component';
import { AddressComponent } from '../Components/address/address.component';
import { OrdersComponent } from '../Components/orders/orders.component';
import { AboutUsComponent } from '../Components/about-us/about-us.component';
import { ContactUsComponent } from '../Components/contact-us/contact-us.component';
import { PrivacyPolicyComponent } from '../Components/privacy-policy/privacy-policy.component';
import { TcComponent } from '../Components/tc/tc.component';

export const routes: Routes = [
    {path:'',component:SignUpComponent},
    {path:'signup',component:SignUpComponent},
    { path: 'login', component: LoginComponent },
    {path:'main',component:MainComponent,
        children:[
            {path:'Electronics',component:ElectronicsComponent},
            {path:'Fashion',component:FashionComponent},
            {path:'Grocery',component:GroceryComponent},
            {path:'Mobiles',component:MobilesComponent}
        ]
    },
    {path:'likes',component:LikesComponent},
    {path:'cart',component:CartComponent},
    {path:'Address',component:AddressComponent},
    {path:'Success',component:OrderSuccessComponent},
    {path:'orders',component:OrdersComponent},
    {path:'aboutUs',component:AboutUsComponent},
    {path:'contactUs',component:ContactUsComponent},
    {path:'privacy',component:PrivacyPolicyComponent},
    {path:'Terms & Conditions',component:TcComponent}
    

];
