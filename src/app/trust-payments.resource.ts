import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TrustedPaymentsResource {

  getPaymentJwt(): Observable<string> {
    return of('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJKd3RATkJDcHJvcGVydHkuY29tIiwiaWF0IjoxNjU4OTI2MTM0LCJwYXlsb2FkIjp7ImFjY291bnR0eXBlZGVzY3JpcHRpb24iOiJFQ09NIiwiYmFzZWFtb3VudCI6IjEyMzQiLCJjdXJyZW5jeWlzbzNhIjoiR0JQIiwic2l0ZXJlZmVyZW5jZSI6InRlc3RfbmJjcHJvcGVydHltYXN0ZXIxMDM4NjQiLCJyZXF1ZXN0dHlwZWRlc2NyaXB0aW9ucyI6WyJUSFJFRURRVUVSWSIsIkZJTkFMIl19fQ.OtjIytlOeMP5E2aL9JZfBA9A2k7Yq0C_Ghb4IW9rZS0');
  }
}
