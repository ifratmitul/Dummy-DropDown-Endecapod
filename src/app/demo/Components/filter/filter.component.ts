import { Component, Input } from '@angular/core';
import { Option } from 'src/app/core/webshop/options';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Input() options: any;
  @Input() hasCountryGroups = false;

  constructor(
  ) { }

  getValues(): boolean {
    if (!this.options.exposed) {
      this._getValues((res: Option) => {
        this.setOption(res);
      });
      this.options.exposed = true;
    }
    return true;
  }

  private _getValues(doTask: (res: Option) => void) {
    this.options.filler.getValues(this.options.id).subscribe(
      (res: any) => {
        doTask(res);
      },
      (err: any) => {

      }
    );
  }

  private setOption(res: Option) {
    this.options.values = res.values;
    this.options.selectedValues = res.selectedValues;
  }

}
