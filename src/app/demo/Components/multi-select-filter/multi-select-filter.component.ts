import { Component, Input } from '@angular/core';
import { Option } from 'src/app/core/webshop/options';

@Component({
  selector: 'app-multi-select-filter',
  templateUrl: './multi-select-filter.component.html',
  styleUrls: ['./multi-select-filter.component.scss']
})
export class MultiSelectFilterComponent {
  @Input() options: Option | null = null;
  option: any;
}
