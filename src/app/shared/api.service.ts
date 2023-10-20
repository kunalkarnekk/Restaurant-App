import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  //  get All Data

  getAllRestaurant() {
    return this.http.get<any>('http://localhost:3000/posts').pipe(map((resp: any) => {
      return resp;
    }))
  }

  //post data


  postRestaurant(data: any) {
    return this.http.post<any>("http://localhost:3000/posts", data).pipe(map((resp: any) => {
      return resp;
    }))
  }

  // Update restaurant

  updateRestaurant(data: any, id: Number) {
    return this.http.put<any>("http://localhost:3000/posts/" + id, data).pipe(map((resp: any) => {
      return resp;
    }))
  }

  // delete restaurant

  deleteRestaurant(id: Number) {
    return this.http.delete<any>("http://localhost:3000/posts/" + id).pipe(map((resp: any) => {
      return resp;
    }))
  }
}
