import { EneRecord } from '@ibfd/endecapod';
import { EneRecordImpl } from '../webshop/record';

export class Treaty {
  private eneRecordImpl: EneRecordImpl;
  constructor(private record: EneRecord, private aggregate: boolean) {
    this.eneRecordImpl = new EneRecordImpl(record);
  }

  get title(): string {
    return this.getPropertyValue('short_title');
  }

  get path(): string {
    return this.getPropertyValue('relative_path');
  }

  get status(): string {
    return this.getPropertyValue('global_status');
  }

  get docId(): string {
    return this.getPropertyValue('docid');
  }

  get inforceDate(): string {
    return this.getPropertyValue('global_inforcedate');
  }

  get effectiveDate(): string {
    return this.getPropertyValue('global_effectdate1');
  }

  get signedDate(): string {
    return this.getPropertyValue('global_signdate');
  }

  get mliTreatyStatus(): string {
    if (this.aggregate) {
      return this.record?.records![0].dimensionValues?.['MLI Matching']?.[0]?.name;
    }
    return this.record.dimensionValues?.['MLI Matching']?.[0]?.name;
  }

  private getPropertyValue(property: string): string {
    return this.eneRecordImpl.getProperties(this.aggregate, property)?.[0];
  }

}
