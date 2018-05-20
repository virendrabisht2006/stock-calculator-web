import{Injectable}from'@angular/core';
import {HttpClient, HttpErrorResponse}from '@angular/common/http';
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

  private _stockUrl = 'http://127.0.0.1:8080/v1/stocks';

    constructor(private _http: HttpClient) { }

    getStocks(): Observable<IStock[]> {
        return this._http.get<IStock[]>(this._stockUrl)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getStock(stockSymbol: string): Observable<IStock> {
        return this.getStocks()
            .map((stocks: IStock[]) => stocks.find(s => s.stockSymbol === stockSymbol));
    }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }
}
