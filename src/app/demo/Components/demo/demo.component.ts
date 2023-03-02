import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { EndecapodService, EdcaUrlSerializer } from '@ibfd/endecapod';

//rxjs import
import { from, Observable, of, Subscription, zip } from 'rxjs';
import { concatMap, filter, map, mergeMap, take, toArray } from 'rxjs/operators';

import { Option } from 'src/app/core/webshop/options';

import { AppConfigData } from 'src/app/core/config/app-config-data';
import { TsmChips } from 'src/app/core/config/tsm-config';
import { AppConfigService } from 'src/app/core/services/app-config.service';
import { DimensionFilterValueServiceService } from 'src/app/core/services/dimension-filter-value-service.service';

@Injectable()
export class FilterExposeService extends EndecapodService { }


enum FilterStatus {
  FILTER_LOAD_PENDING = 1,
  MAP_VIEW = 2
}

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  providers: [
    { provide: FilterExposeService, useClass: FilterExposeService }
  ],
})
export class DemoComponent implements OnInit, OnDestroy {

  private appConfigData: AppConfigData | null = null;
  filters: Option[] = [];
  private subscription: Subscription | null = null;
  treatyStatusFilter: Option | null = null;
  selectedValues = [];
  private treatyStatusOptions = [];

  constructor(
    private appConfigService: AppConfigService,
    private endecapodService: EndecapodService,
    private filterExposeService: FilterExposeService,
    private urlSerializer: EdcaUrlSerializer,

  ) {
    this.appConfigData = new AppConfigData(this.appConfigService.config);
    this.loadInitQuery()
  }

  ngOnInit(): void {
    this.loadFilters();
  }

  private loadFilters() {
    console.log("In Load filter");
    const tsmChips: any = this.appConfigData?.getTsmEnablerChips();
    console.log("tsmChip :: ", tsmChips)

    zip(this.getTsmFilters(tsmChips), this.getTreatyStatusFilter())
      .pipe(
        take(1)
      ).subscribe(([filters, treatyStatusFilter]) => {
        console.log("filter :: ", filters);
        console.log("treatestatusFilter:  ", treatyStatusFilter)
        this.filters = this.swapFilter(filters);
        this.treatyStatusFilter = treatyStatusFilter;
      });
  }

  private swapFilter(filters: Option[]) {
    if (!filters || filters.length !== 2) {
      return filters;
    }
    return [filters[0], filters[1]] = [filters[1], filters[0]];
  }

  private getTsmFilters(tsmChips: TsmChips[]): Observable<Option[]> {
    const valueService = new DimensionFilterValueServiceService(this.filterExposeService, this.endecapodService);
    console.log("valueService :: ", valueService)
    const virtualCountryDimValIds = this.appConfigData?.getVirtualCountryDimValIds();
    console.log("virtualCountryDimValIds :: ", virtualCountryDimValIds)
    return from(tsmChips)
      .pipe(
        concatMap(chip => {
          console.log("chip :: ", chip)
          return valueService.getValues(chip.dimension).pipe(
            mergeMap(op => op.values),
            filter(v => !virtualCountryDimValIds?.includes(v.id)),
            toArray(),
            map(v => this.toFilter(v, chip))
          )
        }), toArray());
  }

  private toFilter(values: Option[], tsmChip: TsmChips): Option {
    return <any>{
      name: this.appConfigData?.getDefaultDimensionAlias(tsmChip.dimension),
      id: tsmChip.dimension,
      pfx: 'a',
      values,
      selectedValues: [],
      exposed: true
    };
  }


  private getTreatyStatusFilter(): Observable<Option> {
    return of(this.treatyStatusOptions).pipe(
      map(values => this.toTreatyStatusFilter(values))
    );
  }

  private toTreatyStatusFilter(values: Option[]) {
    return <any>{
      name: 'Treaty Status',
      pfx: 'a',
      values,
      selectedValues: [],
      exposed: true,
      disabled: true
    };
  }

  private loadInitQuery() {
    this.endecapodService.setURL(this.appConfigData?.getEndecapodURL()!, this.appConfigData?.getAwareURL()!);
    this.endecapodService.setSubscriptionAwareness(true);
    this.endecapodService.RegisterParams(this.urlSerializer.parse(`?${this.appConfigData?.getInitQuery()}`).queryParamMap);
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
