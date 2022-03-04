import { Pipe, PipeTransform } from '@angular/core';
import { ProductList } from '../models/product-list';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: ProductList[], filterString: string, propertyName:string): any {
    const result:ProductList[]=[];
    if(!value || filterString==='' || propertyName==='')
      return value;
    value.forEach((a:any)=>{
      if(a[propertyName].trim().toLowerCase().includes(filterString.toLowerCase()))
        result.push(a);
    });
    return result;
  }

}
