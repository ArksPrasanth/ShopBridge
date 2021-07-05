import { Injectable } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class InventoryManagementService {

  constructor(private http:HttpClient) { }
  LoadInventory(){
    const url="https://fakestoreapi.com/products";
    return this.http.get(url,{observe:'response'});
  }
  AddInventory(inventoryData: any){
    const url="https://fakestoreapi.com/products";
    return this.http.post(url,inventoryData);
  }
  DeleteInventory(id: any){
    const url="https://fakestoreapi.com/products/"+id;
    return this.http.delete(url);
  }
  UpdateInventory(id: any,inventoryData: any){
    const url="https://fakestoreapi.com/products/"+id;
    return this.http.put(url,inventoryData);
  }

}
