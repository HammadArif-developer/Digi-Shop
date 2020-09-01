import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  public productids: BehaviorSubject<any[]> = new BehaviorSubject([]);
  baseUrl = 'http://localhost:4000/digishop';
  constructor(private http: HttpClient) { }

  getPassword(Username: any): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/login.php',{username: Username});
  }
  getallproducts(): Observable<any> {
    return this.http.get<any[]>('http://localhost/api' + '/allproducts.php');
  }
  getallorders(): Observable<any> {
    return this.http.get<any[]>('http://localhost/api' + '/allorders.php');
  }
  getallsales(): Observable<any> {
    return this.http.get<any[]>('http://localhost/api' + '/allsales.php');
  }
  getallcategories(): Observable<any> {
    return this.http.get<any[]>('http://localhost/api' + '/getcategories.php');
  }
  getsubcategory(id: number): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/getsubcategories.php',{'id' : id});
  }
  getallbrands(): Observable<any> {
    return this.http.get<any[]>('http://localhost/api' + '/allbrands.php');
  }
  getallvendors(): Observable<any> {
    return this.http.get<any[]>('http://localhost/api' + '/allvendors.php');
  }
  getallstatus(): Observable<any> {
    return this.http.get<any[]>('http://localhost/api' + '/allstatus.php');
  }
  saveimage(file: any, id: any): Observable<any> {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post<any[]>('http://localhost/api' + '/insertimage.php',fd);
  }
  insertimage(file: any,id:any): Observable<any> {
    let filename = file.name;
    return this.http.post<any[]>('http://localhost/api' + '/addimage.php',{'filename': filename, 'id': id});
  }
  updateimage(image_id:any,file: any,id:any): Observable<any> {
    let filename = file.name;
    return this.http.post<any[]>('http://localhost/api' + '/updateimage.php',{'filename': filename, 'id': id, 'image_id': image_id});
  }
  insertnewproduct(category:any, subcategory:any,brand: any,vendor: any, title: any, status: any, sale:any,quantity:any, warranty: any, purchaseprice: any, sellingprice: any, productdescription: any, sizetype: any, size: any):Observable<any> {
    let product_code = 'digishop_' + title;
    return this.http.post<any[]>('http://localhost/api' + '/insertproduct.php',{'Category': category,'Subcategory': subcategory,'Brand': brand,'Vendor': vendor,'Title': title, 'Status': status, 'Sale': sale, 'Quantity': quantity, 'Warranty': warranty, 'Purchaseprice': purchaseprice, 'Sellingprice': sellingprice, 'description': productdescription,'code': product_code, 'size_type': sizetype, 'size': size});
  }
  getprodmaxid(): Observable<any>  {
    return this.http.get<any[]>('http://localhost/api' + '/maxprodid.php');
  }
  addcategory(title:any, description:any): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/addcategory.php',{title: title, description: description});
  }
  addsubcategory(title: any, category:any): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/addsubcategory.php',{Title: title, Category: category});
  }
  addbrand(title: any): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/addbrand.php',{title: title});
  }
  addvendor(vendor_name: any, vendor_number:any ,contact_person:any,contact_person_number:any,address:any): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/addvendor.php',{'Vendorname': vendor_name,'Vendornumber': vendor_number,'Contactperson': contact_person, 'Contactpersonnumber': contact_person_number, 'address': address});
  }
  addfeaturedcategory(category: any, title: any, image: any) {
    return this.http.post<any[]>('http://localhost/api' + '/addfeaturedcategory.php',{'category_id': category,'title': title,'image': image});
  }
  addfeaturedproduct(product: any, image: any) {
    return this.http.post<any[]>('http://localhost/api' + '/addfeaturedproduct.php',{'product_id': product,'image': image});
  }
  getproductinsubcategory(cat_id: number, subcat_id: number): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/product.php',{ 'cat_id': cat_id,'subcat_id' : subcat_id });
  }
  getproductimage(product_id: number): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/imageData.php', {'product_id' : product_id});
  }
  getfeaturedcategories(): Observable<any> {
    return this.http.get<any[]>('http://localhost/api' + '/featuredcategory.php');
  }
  deletefeaturedcategories(cat_id: any): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/deletefeaturedcategory.php',{'id': cat_id});
  }
  getproductincategory(cat_id: number): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/productincategory.php',{ 'cat_id': cat_id});
  }
  getfeaturedproducts(): Observable<any> {
    return this.http.get<any[]>('http://localhost/api' + '/featuredproduct.php');
  }
  getproductdetails(id: number): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/singleproduct.php', {'prod_id' : id});
  }
  deletefeaturedproduct(product_id: any): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/deletefeaturedproduct.php',{'id': product_id});
  }
  disableproduct(product_id: any): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/disableproduct.php',{'id': product_id});
  }
  deleteproduct(product_id: any): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/deleteproducts.php',{'id': product_id});
  }
  deletesale(sale_id: any): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/deletesale.php',{'id': sale_id});
  }
  editproduct(sale: any,product_id:any, category:any, subcategory:any,brand: any,vendor: any, title: any, status: any, quantity:any, warranty: any, purchaseprice: any, sellingprice: any, productdescription: any):Observable<any> {
    let product_code = 'digishop_' + title;
    return this.http.post<any[]>('http://localhost/api' + '/editproduct.php',{'sale_id': sale,'id': product_id,'Category': category,'Subcategory': subcategory,'Brand': brand,'Vendor': vendor,'Title': title, 'Status': status, 'Quantity': quantity, 'Warranty': warranty, 'Purchaseprice': purchaseprice, 'Sellingprice': sellingprice, 'description': productdescription,'code': product_code});
  }
  addnewsale(discount: any, title:any, start_date:any, end_date: any) {
    return this.http.post<any[]>('http://localhost/api' + '/addsale.php',{'discount': discount, 'title': title, 'start_date': start_date, 'end_date': end_date});
  }
  getorderedproducts(id: any): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/getorderedproducts.php',{'order_id': id});
  }
  updateorderstatus(id:any, status:any): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/updateorderstatus.php',{'id': id,'current_status': status});
  }
  togeordercode(): Observable<any> {
    return this.http.get<any[]>('http://localhost/api' + '/maxorderid.php');
  }
  reduceprodquantity(id:any, quantity:any): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/reduceprodquantity.php', {'id' : id, 'quantity': quantity});
  }
  orderinfo(address: string,productId : any,quantity: any,contactPerson: any, contactPersonNumber1: any, contactPersonNumber2: any, grandTotal: any, orderCode: any): Observable<any> { 
    return this.http.post<any>('http://localhost/api'+ '/insertorder.php',{'address': address,'productId': productId, 'quantity': quantity, 'contact_person': contactPerson, 'contact_person_number1': contactPersonNumber1, 'contact_person_number2': contactPersonNumber2, 'totalAmount': grandTotal, 'ordercode': orderCode});
  }
  addorderedproduct(product: any,order: any, quantity: any): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/addorderedproduct.php', {'product_id' : product, 'ordered_id': order,'quantity': quantity});
  }
  getsingleorder(id: any): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/getsingleorder.php',{'id': id});
  }
  singlesale(id:any): Observable<any> {
    return this.http.post<any[]>('http://localhost/api' + '/singlesale.php', {'id' : id});
  }
}
