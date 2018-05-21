import{Component, OnInit}from '@angular/core';
import {IStock}from './stock';
import {StockService}from './stock.service';

@Component({
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

    pageTitle: string = 'Stock List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;
    _listFilter: string;

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredStocks = this.listFilter ? this.performFilter(this.listFilter) : this.stocks;
    }

    filteredStocks: IStock[];

    stocks: IStock[];

     performFilter(filterBy: string): IStock[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.stocks.filter((stock: IStock) =>
              stock.stockSymbol.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }


  constructor(private _stockService: StockService) {}

  ngOnInit() {
  this._stockService.getStocks()
                .subscribe(stocks => {
                    this.stocks = stocks;
                    this.filteredStocks = this.stocks;
                },
                    error => this.errorMessage = <any>error);
  }

  onSubmit(stock: IStock){
    console.log('Request recived for stock: '+stock.stockSymbol);
    this._stockService.addStock(stock).subscribe(status=> console.log(JSON.stringify(status)));
  }

}
