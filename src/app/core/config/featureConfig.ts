import { Dimension } from '@ibfd/endecapod';

export interface QAndAConfig {
  readonly topics: Dimension[];
  readonly tables: number[];
}

export interface JATSConfig {
  readonly url: string;
  readonly files: string[];
}

export interface PEWizardConfig {
  readonly disabled_msg: string;
  readonly filters: PEWizardFilter[];
  readonly initial_query: string;
}

export interface PEWizardFilter {
  dimension: number;
  alias: string;
  multiple: boolean;
  max?: number;
}

export interface TsmToolConfig {
  dimensions: number[];
  page_size: number;
}

interface AgreementFilter {
  readonly name: string;
  readonly docs: { docid: string, alias: string }[];
}

// TODO: make common TreatySearchFilter and PEWizardFilter
export interface TreatySearchFilter {
  type: string;
  dimension?: number;
  alias: string;
  multiple: boolean;
  exposed: boolean;
  values?: any[];
  max?: number;
}


export interface TreatySearchDimension {
  multilateral: number;
  bilateral: number;
}

export class TreatySearchFeatureConfig {

  constructor(private readonly cfg: any) {}

  get query(): string {
    return this.cfg['query'];
  }

  get defaultDimensions(): number[] {
    return this.cfg['default_dimensions'];
  }

  get filters(): TreatySearchFilter[] {
    return this.cfg['filters'];
  }

  get dimension(): TreatySearchDimension {
    return this.cfg['dimension'];
  }
}

export class MultilateralMappConfig {

  constructor(private readonly cfg: any) {}

  public getAgreementFilter(): AgreementFilter {
    return this.cfg['agreement_filter'];
  }

  public getMliReservationAndNotification(): {initialQuery: string} {
    return {initialQuery: this.cfg['mli_reservation_and_notification']['initial_query']};
  }
}


export class MliPosOverviewConfig {
  constructor(private readonly cfg: any) {}
  get endecaSearchUrl(): string {
    return this.cfg['endeca_search_url'];
  }

  get articles(): {id: string, name: string}[] {
    return this.cfg['articles'];
  }
}

export class DtmCountryFilter {
  constructor(private filter: any) { }

  get name(): string {
    return this.filter['name'];
  }

  get mapTo(): string {
    return this.filter['map_to'];
  }
}


export class DtmCoverageConfig {
  constructor(private config: any) {}
  public get countryInfoXql(): string {
      return this.config['country_info_xql'];
  }

  public get countryInfoUrl(): string {
      return this.config['country_info_url'];
  }

  public get filters(): DtmCountryFilter[] {
    return this.config['filters'].map((filter:any) => new DtmCountryFilter(filter));
  }
}


export class FeatureConfig {
  constructor(private readonly cfg: any) {}

  public getLabQuery(): string {
    return this.cfg['lab_query'];
  }

  public getToolsQuery(): string {
    return this.cfg['tools_query'];
  }

  public getJATSConfig(): JATSConfig {
    return this.cfg['jats'];
  }

  public getMliPosOverviewConfig(): MliPosOverviewConfig {
    return new MliPosOverviewConfig(this.cfg['mli_pos_overview']);
  }

  public getMultilateralMappConfig(): MultilateralMappConfig {
    return new MultilateralMappConfig(this.cfg['multilateral_mapp']);
  }

  public getTsmToolConfig(): TsmToolConfig {
    return this.cfg['tsm'];
  }

  public getDtmCoverageConfig(): DtmCoverageConfig {
    return new DtmCoverageConfig(this.cfg['dtm_coverage']);
  }

  public getPEWizardConfig(): PEWizardConfig {
    return this.cfg['pe_wizard'];
  }

  public getQAndAConfig(): QAndAConfig {
    return this.cfg['q_and_a'];
  }

  public getTreatySearchConfig(): TreatySearchFeatureConfig {
    return new TreatySearchFeatureConfig(this.cfg['treaty-search']);
  }
}
