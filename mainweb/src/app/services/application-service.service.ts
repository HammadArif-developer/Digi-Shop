import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  public products: BehaviorSubject<any[]> = new BehaviorSubject([]);

  baseUrl = 'http://localhost/api';
  constructor(private http: HttpClient) { }

  getallcategories(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl + '/getcategories.php');
  }
  getallbrands(): Observable<any> {
    return this.http.get<any[]>('http://localhost/api' + '/allbrands.php');
  }
  getsubcategory(id: number): Observable<any> {
    return this.http.post<any[]>(this.baseUrl + '/getsubcategories.php',{'id' : id});
  }
  getproductinsubcategory(cat_id: number, subcat_id: number): Observable<any> {
    return this.http.post<any[]>(this.baseUrl + '/product.php',{ 'cat_id': cat_id,'subcat_id' : subcat_id });
  }
  getproductimage(product_id: number): Observable<any> {
    return this.http.post<any[]>(this.baseUrl + '/imageData.php', {'product_id' : product_id});
  }
  getfeaturedcategories(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl + '/featuredcategory.php');
  }
  getfeaturedproduct(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl + '/featuredproduct.php');
  }
  getproductdetails(id: number): Observable<any> {
    return this.http.post<any[]>(this.baseUrl + '/singleproduct.php', {'prod_id' : id});
  }
  getproductbrand(id: number): Observable<any> {
    return this.http.post<any[]>(this.baseUrl + '/singlebrand.php', {'id' : id});
  }
  addproducttocache(ids: any) { 
    this.products.next(ids);
    sessionStorage.setItem("products",JSON.stringify(this.products.getValue()));
  }
  togeordercode(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl + '/maxorderid.php');
  }
  reduceprodquantity(id:any, quantity:any): Observable<any> {
    return this.http.post<any[]>(this.baseUrl + '/reduceprodquantity.php', {'id' : id, 'quantity': quantity});
  }
  orderinfo(address: string,productId : any,quantity: any,contactPerson: any, contactPersonNumber1: any, contactPersonNumber2: any, grandTotal: any, orderCode: any): Observable<any> { 
    return this.http.post<any>(this.baseUrl + '/insertorder.php',{'address': address,'productId': productId, 'quantity': quantity, 'contact_person': contactPerson, 'contact_person_number1': contactPersonNumber1, 'contact_person_number2': contactPersonNumber2, 'totalAmount': grandTotal, 'ordercode': orderCode});
  }
  addorderedproduct(product: any,order: any, quantity: any): Observable<any> {
    return this.http.post<any[]>(this.baseUrl + '/addorderedproduct.php', {'product_id' : product, 'ordered_id': order,'quantity': quantity});
  }
  singlesale(id:any): Observable<any> {
    return this.http.post<any[]>(this.baseUrl + '/singlesale.php', {'id' : id});
  }
  addcomment(Description: any,name: any, id: any, Email: any): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/addcomment.php',{'description': Description, 'comment_by': name, 'product_id': id,'email': Email})
  }
  productcomments(id:any): Observable<any> {
    return this.http.post<any[]>(this.baseUrl + '/allcomments.php', {'id' : id});
  }
  addrating(stars:any,prod_id:any): Observable<any> {
    return this.http.post<any[]>(this.baseUrl + '/addrating.php', {'stars': stars,'id' : prod_id});
  }
  getprodrating(prod_id:any): Observable<any> {
    return this.http.post<any[]>(this.baseUrl + '/getproductrating.php', {'id' : prod_id});
  }
}
