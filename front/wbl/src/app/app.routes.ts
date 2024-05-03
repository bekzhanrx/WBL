import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CategoryComponent} from "./category/category.component";
import {CategoryDetailComponent} from "./category-detail/category-detail.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'home', component: HomeComponent, title: 'Home'},
  {path: 'categories', component: CategoryComponent, title: 'Categories'},
  {path: 'categories/:categoryId', component: CategoryDetailComponent, title: 'Category'}
];
