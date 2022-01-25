import { map } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = 'https://demo.angulararchitects.io/api/Airport';

  findAll(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.apiUrl);
  }
}
