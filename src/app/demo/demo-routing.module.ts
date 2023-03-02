import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './Components/demo/demo.component';
import { DemoContainerComponent } from './demo-container.component';

const routes: Routes = [
  {path: '', component: DemoContainerComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
