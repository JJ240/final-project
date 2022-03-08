import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from "src/app/service/product.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-edit-product',
    templateUrl: './productedit.component.html',
    styleUrls: ['./productedit.component.css']
})
export class ProducteditComponent implements OnInit {
    id: any;
    productForm!: FormGroup;
    currentProduct: any;
    constructor(private service: ProductService, private router: Router, private activatedRouter: ActivatedRoute) { }
    ngOnInit(): void {
      this.productForm = new FormGroup({
        productId: new FormControl(),
        name: new FormControl(),
        price: new FormControl()
      });
  
      this.activatedRouter.params.subscribe(params=>{
        this.id = params['id'];
      });
  
      this.service.getProductById(this.id).subscribe((res)=>{
        this.currentProduct = res.data;
        this.productForm.controls['productId'].setValue(this.currentProduct.productId);
        this.productForm.controls['name'].setValue(this.currentProduct.name);
        this.productForm.controls['price'].setValue(this.currentProduct.price);
        this.productForm.controls['unit'].setValue(this.currentProduct.unit);
      });
    }
  
    updateProduct(){
      let product = {
        productId:this.productForm.value.productId,
        name:this.productForm.value.name,
        price:this.productForm.value.price
      };
  
      this.service.updateProduct(product, this.id).subscribe((res)=>{
        window.alert("Edit Complete!");
        this.router.navigate(["/product"]);
      });
    }
  
  }
