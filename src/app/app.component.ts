import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  defaultColDef = {
    sortable: true,
    filter: true
  };
  columnDefs = [
    {
      headerName: 'Make',
      field: 'make',
      rowGroup: true
    },
    { headerName: 'Price', field: 'price' }
  ];
  autoGroupColumnDef = {
    headerName: 'Model',
    field: 'model',
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true
    }
  };
  rowData: Observable<any[]>;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    //this.rowData = this.http.get<any[]>( 'https://www.ag-grid.com/example-assets/small-row-data.json');
    this.rowData = this.http.get<any[]>(
      'https://www.ag-grid.com/example-assets/row-data.json'
    );
  }
  // rowData = [
  //   { make: 'Toyota', model: 'Celica', price: 35000 },
  //   { make: 'Ford', model: 'Mondeo', price: 32000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 }
  // ];

  getSelectedRows(): void {
    const data: any[] = this.agGrid.api
      .getSelectedNodes()
      .map(node => node.data);
    console.log(data);
    console.log(this.formatData(data));
  }

  formatData(data: any[]) {
    return data.length
      ? data.map(d => `make : ${d.make}, mode : ${d.model}`).join(', ')
      : 'nothing selected';
  }
  getContextMenuItems = params => [
    {
      name: 'Cancel items',
      action: console.log(params),
      icon:
        '<span class="ag-icon ag-icon-save" unselectable="on" role="presentation"></span>'
    },
    'separator',
    'copy',
    'copyWithHeaders',
    'paste',
    'separator',
    'export'
  ];
}
