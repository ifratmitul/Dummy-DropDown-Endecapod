import { Component, Input } from '@angular/core';
import { Option } from '../../../core/webshop/options';

@Component({
  selector: 'app-single-select-filter',
  templateUrl: './single-select-filter.component.html',
  styleUrls: ['./single-select-filter.component.scss']
})
export class SingleSelectFilterComponent {
  @Input() options: Option | null = null;
  option: any;
  constructor() { }

}
