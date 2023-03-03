import {EneRecord, Dimension, Chips} from '@ibfd/endecapod';
import { TplField } from '../config/templatefield';

export class EneRecordImpl {

    constructor(private rec: EneRecord) {
    }

    private compileInput(aggr: boolean, input: any): string {
        switch (input.type) {
            case 'prop':
                return this.getProperty(aggr, input.ref);
            case 'dimVal':
                return this.getDimVal(aggr, input.ref).name || '';
            case 'literal':
                return input.ref;
        }
        return '';
    }

    private compileField(aggr: boolean, field: TplField): any {
        const compiledInput:any = new Object({ 'field': field.field });
        field.input.map((input:any) => {
            compiledInput[input.name] = this.compileInput(aggr, input);
        });
        return compiledInput;
    }

    public compileTemplate(fields: TplField[], aggregate: boolean, topicSearchChips: Chips[]): any[] {
        const compiledTemplate: any[] = [];
        fields.map(field => {
            if (field.aggr) {
              this.rec.records!
                .sort((a, b) => {
                  if (field.sort && field.sort[1] && field.sort[1] === 'NUM') {
                    return parseInt(a.properties[field.sort[0]], 10) > parseInt(b.properties[field.sort[0]], 10) ? 1 : -1;
                  } else {
                    return a.properties[field.sort![0]] > b.properties[field.sort![0]] ? 1 : -1;
                  }
                })
                .map( enerec => {
                  const record = new EneRecordImpl(enerec).compileField(aggregate, field);
                  if (field.field === 'nestedtitlelink') {
                    record['subsection'] = this.getSubsections(enerec, topicSearchChips);
                  }
                  compiledTemplate.push(record);
                });
            } else {
                compiledTemplate.push(this.compileField(aggregate, field));
            }
        });
        return compiledTemplate;
    }

  /**
   * get subsection from Endeca.Relation.References and sort them
   */
  private getSubsections(endecaRecord: EneRecord, topicSearchChips: Chips[]): any[] {
      if (!topicSearchChips || topicSearchChips.length === 0) {
        return [];
      }

      const compiledSubsections: any[] = [];
      const uidSet = new Set();
      uidSet.add(endecaRecord.properties['docid'][0]);

      topicSearchChips.forEach( (chip:any) => {
        const topicId = '/' + chip.dimension.name.split(' ')[0];
        let subsections = endecaRecord.properties['Endeca.Relation.References'];
        subsections = subsections ? subsections.filter( (item:any) => item.startsWith(topicId) ) : [];
        subsections.forEach( (item:any, index:any) => {
          const words = item.split('/');
          const uid = words[2];
          if (!uidSet.has(uid)) {
            compiledSubsections.push(  new Object({ 'code': words[1], 'uid': uid, 'title': words[3].trim() }) );
            uidSet.add(uid);
          }
        });
      });

     compiledSubsections.sort( (a, b) =>  a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' }) );

      return compiledSubsections;
    }

    /*
     * If the property exists on the record level return it.
     * If not and we are aggregating, return the property of the first record of the aggregate result
     */
    public getProperty(aggregate: boolean, name: string): string {
        if (!this.rec) { return undefined!; }
        if (this.rec.properties[name]) {
            return this.rec.properties[name][0];
        }
        if (aggregate) {
            return this.getAggrProperty(name, 0);
        }
        return '';
    }
    public getAggrProperty(name: string, recno: number): string {
        if (!this.rec) { return undefined!; }
        if (this.rec.records && this.rec.records[recno]) {
            return this.rec.records[recno].properties[name] ? this.rec.records[recno].properties[name][0] : '';
        }
        return '';
    }
    /*
     * If the property exists on the record level return it.
     * If not and we are aggregating, return the property of the first record of the aggregate result
     */
    public getProperties(aggregate: boolean, name: string): string[] {
        if (!this.rec) { return undefined!; }
        if (this.rec.properties[name]) {
            return this.rec.properties[name];
        }
        if (aggregate) {
            return this.getAggrProperties(name, 0);
        }
        return [];
    }
    public getAggrProperties(name: string, recno: number): string[] {
        if (!this.rec) { return undefined!; }
        if (this.rec.records && this.rec.records[recno]) {
            return this.rec.records[recno].properties[name] ? this.rec.records[recno].properties[name] : [];
        }
        return [];
    }
    /*
     * If the dimensionValue exists on the record level return it.
     * If not and we are aggregating, return the property of the first record of the aggregate result
     */
    public getDimVal(aggregate: boolean, name: string): Dimension {
        if (!this.rec) { return undefined!; }
        if (this.rec.dimensionValues && this.rec.dimensionValues[name]) {
            return this.rec.dimensionValues[name][0];
        }
        if (aggregate) {
            return this.getAggrDimVal(name, 0);
        }
        return <Dimension>{};
    }
    public getAggrDimVal(name: string, recno: number): Dimension {
        if (!this.rec) { return undefined!; }
        if (this.rec?.records![recno]) {
            return this.rec.records[recno].dimensionValues[name] ? this.rec.records[recno].dimensionValues[name][0] : '';
        }
        return <Dimension>{};
    }
}
