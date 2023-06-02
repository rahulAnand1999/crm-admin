export class ColumnInfo {
    columnName: string = '';
    dataType: string = '';
    isNullable: boolean = false;
    defaultValue: string = '';
    constraints: string = '';
    sequenceNumber: number = 0;
    enumValue: string[] = [];
}