import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {MultiSelectModule} from 'primeng/multiselect';



@NgModule({
  declarations: [],
  imports: [
    DropdownModule,
    ButtonModule,
    MultiSelectModule
  ],
  exports:[
    DropdownModule,
    ButtonModule,
    MultiSelectModule
  ]
})
export class UiComponentModule { }
