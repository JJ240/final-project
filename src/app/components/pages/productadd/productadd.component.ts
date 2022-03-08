import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from "src/app/service/product.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-new-product',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css']
})
export class NewProductComponent implements OnInit {
  productForm!: FormGroup;
  constructor(private ps: ProductService, private router:Router) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      product_id: new FormControl(),
      name: new FormControl(),
      author: new FormControl(),
      publisher: new FormControl(),
      price: new FormControl()
    });
  }

  addProduct(){
    let product = {
      product_id: this.productForm.value.product_id,
      name: this.productForm.value.name,
      author: this.productForm.value.author,
      publisher:this.productForm.value.publisher,
      price:this.productForm.value.price
    };
    this.ps.addProduct(product).subscribe(res=>{
      console.log(res);
      this.router.navigate(["/product"]);
    });
  }

}
