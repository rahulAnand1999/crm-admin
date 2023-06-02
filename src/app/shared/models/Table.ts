export class Table {
  tableName: string = "";
  displayName?: string = "";
  // icon?: string = "";
  columns: Column[] = [];
  relationships: Relation[] = [];
}
export class Column {
  name: string = "";
  dataType: string = "";
  constraints: string[] = [];
  defaultValue: any;
}
export class Relation {
  type: string = "";
  referenceTable: string = "";
  sourceColumn: string = "";
  referenceColumn: string = "";
}
