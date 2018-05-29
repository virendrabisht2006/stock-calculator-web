import{Injectable}from'@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse}from '@angular/common/http';
import {Observable}from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {IStock}from './stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private _stockUrl = 'http://localhost:8081/v1/stocks';

    constructor(private _http: HttpClient) { }

    getStocks(): Observable<IStock[]> {
        return this._http.get<IStock[]>(this._stockUrl)
            .do(data => console.log('Get Data All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getStock(stockSymbol: string): Observable<IStock> {
    console.log('I am here..');
        return this.getStocks()
            .map((stocks: IStock[]) => stocks.find(s => s.stockSymbol === stockSymbol));
    }

    addStock(stock: IStock): Observable<IStock>{
      console.log('Jsom data: '+JSON.stringify(stock))

     const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods': 'POST, GET, DELETE, PUT,OPTIONS' })
    };
       let body = JSON.stringify(stock);

        return this._http.post<any>(this._stockUrl, body, httpOptions)
       .do(data => console.log('All Post Data: ' + JSON.stringify(data)))
           .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof Error) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }
}
