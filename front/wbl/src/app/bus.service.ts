import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Bus, Token} from "./models";
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class BusService {
  BASE_URL:string = 'http://127.0.0.1:8000'
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<Token>{
    return this.http.post<Token>(
      `${this.BASE_URL}/api/login/`,
      {username, password}
    )
  }

  getBuses(): Observable<Bus[]>{
    return this.http.get<Bus[]>(`${this.BASE_URL}/api/buses/`)
  }

  getBus(id: number):Observable<Bus>{
    return this.http.get<Bus>(`${this.BASE_URL}/api/buses/${id}/`)
  }

  createBus(bus: Bus): Observable<Bus>{
    return this.http.post<Bus>(`${this.BASE_URL}/api/buses/`,bus)
  }

  updateBus(updatedBus: Bus): Observable<Bus>{
    return this.http.put<Bus>(`${this.BASE_URL}/api/buses/${updatedBus.id}/`, updatedBus);
  }

  deleteBus(id: number){
    return this.http.delete<Bus>(`${this.BASE_URL}/api/buses/${id}/`);
  }

}
