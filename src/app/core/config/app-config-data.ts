import { Dimension } from "@ibfd/endecapod";
import { TsmChips, TsmConfig } from "./tsm-config";
import { FeatureConfig, MultilateralMappConfig, TreatySearchFeatureConfig } from "./featureConfig";

export enum RecordLabel {
    RECORD = 0,
    RECORDS = 1,
    A_RECORD = 2,
    A_RECORDS = 3,
    ACTION_RECORD = 4,
    ACTION_A_RECORD = 5
}

export class AppConfigData {
    private readonly configMap: any = {};

    constructor(data: any) {
        Object.keys(data).forEach(key => (this.configMap[key] = data[key]));
    }

    getCollectionDimension(): Dimension {
        return this.configMap['collection_dimension'];
    }

    private getCollections(): any[] {
        return this.configMap['collections'];
    }
    getCollection(code: string): Object {
        const collection: any = this.getCollections().find(
            col => this.hasCode(col, code)
        );
        return collection;
    }

    private hasCode(collection: any, code: string): boolean {
        if (collection['collection_code']) {
            const found = collection['collection_code'].find((c: any) => c === code);
            return !!found;
        }
        return false;
    }

    getDimensionAlias(dimensionId: number, collectionId: number): any {
        const dim: any = this.getCollections()
            .find((col: any) => col['N'] === collectionId)['dimensions'];
        const a: any = dim && dim.find((f: any) => (f['id'] === dimensionId));
        return a ? a['alias'] : this.getDefaultDimensionAlias(dimensionId);
    }

    getDropdownPrefix(dimensionId: number, collectionId: number): string {
        const dim: any = this.getCollections()
            .find((col: any) => col['N'] === collectionId)['dimensions'];
        const a = dim && dim.find((f: any) => (f['id'] === dimensionId));
        return a ? a['pfx'] : this.getDefaultDropdownPrefix(dimensionId);
    }

    getDefaultDimensionAlias(dimensionId: number): string {
        const dim: any = this.getCollections()
            .find(col => col['N'] === 0)['dimensions'];
        const a = dim && dim.find((f: any) => (f['id'] === dimensionId));
        return a ? a['alias'] : undefined;
    }

    getDefaultDropdownPrefix(dimensionId: number): string {
        const dim = this.getCollections()
            .find(col => col['N'] === 0)['dimensions'];
        const a = dim && dim.find((f: any) => (f['id'] === dimensionId));
        return a ? a['pfx'] : '';
    }

    private getTsmConfig(): TsmConfig {
        return this.configMap['tsm'];
    }

    public getTsmEnablerChips(): TsmChips[] {
        return this.getTsmConfig().enable;
    }

    getVirtualCountryDimValIds(): number[] {
        return this.configMap['virtual_country_dimval_ids'];
    }

    getEndecapodURL(): string {
        return this.configMap['endecapod']['url'];
    }


    getAwareURL(): string {
        return this.configMap['endecapod']['aware_url'];
    }

    getInitQuery(): string {
        return this.configMap['endecapod']['initial_query'];
    }

    private getLabToolsConfig(): FeatureConfig {
        return new FeatureConfig(this.configMap['features']);
    }

    public getTreatySearchFeatureConfig(): TreatySearchFeatureConfig {
        return this.getLabToolsConfig().getTreatySearchConfig();
    }
    public getLabMultilateralMappConfig(): MultilateralMappConfig {
        return this.getLabToolsConfig().getMultilateralMappConfig();
    }
}