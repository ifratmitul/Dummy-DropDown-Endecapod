import { Component, Injectable, OnInit } from '@angular/core';
import { EdcaUrlSerializer, EndecapodService } from '@ibfd/endecapod';
import { AppConfigData } from 'src/app/core/config/app-config-data';
import { TreatySearchDimension, TreatySearchFeatureConfig, TreatySearchFilter } from 'src/app/core/config/featureConfig';
import { Treaty } from 'src/app/core/config/treaty';
import { AppConfigService } from 'src/app/core/services/app-config.service';
import { Option } from 'src/app/core/webshop/options';

import { from, Observable, of } from 'rxjs';
import { concatAll, map, mergeMap, take, toArray } from 'rxjs/operators';
import { DimensionFilterValueServiceService } from 'src/app/core/services/dimension-filter-value-service.service';

@Injectable()
export class FilterExposeService extends EndecapodService { }

@Injectable()
export class FilterExposeMainService extends EndecapodService { }


interface FilterOption extends Option {
  selected: number[];
  type: FilterType;
}

enum FilterType {
  DIM_FILTER = 'dim_filter',
  ROLLUP_FILTER = 'rollup_filter'
}

export interface SearchParams {
  dimensions: number[];
  rollupType: string;
}

@Component({
  selector: 'app-demo-multi-select-container',
  templateUrl: './demo-multi-select-container.component.html',
  styleUrls: ['./demo-multi-select-container.component.scss'],
  providers: [
    { provide: FilterExposeService, useClass: FilterExposeService },
    { provide: EndecapodService, useClass: FilterExposeMainService }
  ]
})
export class DemoMultiSelectContainerComponent implements OnInit {

  private treatySearchConfig: TreatySearchFeatureConfig | null = null;
  private appConfigData: AppConfigData | null = null;

  filters: FilterOption[] = [];
  dimensions: number[] = [];
  rollupType = '';
  dimension: TreatySearchDimension;

  constructor(
    appConfigSvc: AppConfigService,
    private filterExposeService: FilterExposeService,
    private endecapodService: EndecapodService,
    private urlSerializer: EdcaUrlSerializer,

  ) {
    this.appConfigData = new AppConfigData(appConfigSvc.config);
    this.loadInitQuery()
    this.treatySearchConfig = this.appConfigData.getTreatySearchFeatureConfig();
    this.dimension = this.treatySearchConfig.dimension;
  }

  ngOnInit(): void {
    this.loadFilters();
  }

  private loadFilters() {
    console.log("Treaty config :: ", this.treatySearchConfig)
    // debugger;
    const filters:any = this.treatySearchConfig?.filters;
    console.log(filters)
    from(filters)
      .pipe(
        map((f:any) =>{
          console.log("Get filter :: ",this.getFilter(f))
          return  this.getFilter(f);
        }),
        concatAll(),
        toArray(),
        take(1)
      ).subscribe(f => {
        console.log(f)
        this.filters = f;
      });
  }

  private getFilter(filter: TreatySearchFilter): Observable<FilterOption> {
    console.log("Fillters in getFilter ::", filter)
    const valueObservable = filter.exposed ? of(filter.values) : this.getFilterValues(filter);
    console.log("value obserable :: " , valueObservable)
    return valueObservable.pipe(
      map(v => this.toFilter(v!, filter))
    );
  }

  private getFilterValues(filter: TreatySearchFilter): Observable<any[]> {
    const valueService = new DimensionFilterValueServiceService(this.filterExposeService, this.endecapodService);
    // debugger
    console.log("Value srvc :: ", valueService)
    return valueService.getValues(filter.dimension)
      .pipe(
        mergeMap(op => op.values),
        toArray()
      );
  }

  private toFilter(values: any[], filters: TreatySearchFilter): FilterOption {
    return <any>{
      name: filters.alias,
      id: filters.dimension,
      pfx: 'a',
      values,
      selectedValues: [],
      multi: filters.multiple,
      exposed: true,
      selected: [],
      type: filters.type
    };
  }

  private loadInitQuery() {
    this.endecapodService.setURL(this.appConfigData?.getEndecapodURL()!, this.appConfigData?.getAwareURL()!);
    this.endecapodService.setSubscriptionAwareness(true);
    this.endecapodService.RegisterParams(this.urlSerializer.parse(`?${this.appConfigData?.getInitQuery()}`).queryParamMap);
  }


}
