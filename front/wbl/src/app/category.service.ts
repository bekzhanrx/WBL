import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "./models";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private client: HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.client.get<Category[]>('http://127.0.0.1:8000/api/categories/');
  }
  getCategory(id: number): Observable<Category>{
    return this.client.get<Category>(`http://127.0.0.1:8000/api/categories/${id}/`)
  }
}
