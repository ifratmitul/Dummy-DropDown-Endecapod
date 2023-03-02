import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './Components/demo/demo.component';
import { DemoRoutingModule } from './demo-routing.module';
import { DemoContainerComponent } from './demo-container.component';
import { CoreModule } from '../core/core.module';
import { UiComponentModule } from '../ui-component/ui-component.module';
import { FilterComponent } from './Components/filter/filter.component';
import { SingleSelectFilterComponent } from './Components/single-select-filter/single-select-filter.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DemoComponent,
    DemoContainerComponent,
    FilterComponent,
    SingleSelectFilterComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    UiComponentModule,
    FormsModule
  ]
})
export class DemoModule { }
