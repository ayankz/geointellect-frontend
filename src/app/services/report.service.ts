import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, Subject, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Report } from '../types/report';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  selectedReport: WritableSignal<any | null> = signal(null);
  constructor(private http: HttpClient) {}

  private base64ToBlob(base64: string): Blob {
    const byteString = atob(base64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: 'image/png' });
  }
  setSelectedReport(report: Report): void {
    const requestOptions: Object = {
      responseType: 'text' as const,
    };
    this.http
      .post<string>(
        environment.API_URL + 'auth/generate-token',
        {
          username: 'string',
          password: 'string',
        },
        requestOptions
      )
      .pipe(
        switchMap((token: string) => {
          const reportDetail$ = this.http
            .post<any>(
              environment.API_URL + `report/report-detail?uid=${report.Uid}`,
              {},
              { headers: { token } }
            )
            .pipe(map(response => response.results));
          const reportImage$ = this.http
            .post<any>(
              `${environment.API_URL}report/report-image?uid=${report.Uid}`,
              {},
              { headers: { token } }
            )
            .pipe(map(response => response.results));
          return forkJoin([reportDetail$, reportImage$]);
        }),
        map(([reportDetail, reportImageBase64]) => {
          const imageBlob = this.base64ToBlob(reportImageBase64); // Convert base64 to Blob
          const imageUrl = URL.createObjectURL(imageBlob); // Create URL for the image
          return {
            ...reportDetail,
            layers: reportDetail.ReportContent.Layers,
            base64: reportImageBase64,
            imageUrl, // Add the URL to the report object
          };
        })
      )
      .subscribe((data: any) => {
        console.log(data);
        this.selectedReport.set(data);
      });
  }
  clearSelectedReport() {
    this.selectedReport.set(null);
  }
  get reports(): Observable<Report[]> {
    const requestOptions: Object = {
      responseType: 'text' as const,
    };
    return this.http
      .post<string>(
        environment.API_URL + 'auth/generate-token',
        {
          username: 'string',
          password: 'string',
        },
        requestOptions
      )
      .pipe(
        switchMap((token: string) => {
          return this.http.post<Report[]>(
            environment.API_URL + 'report/report-history',
            {},
            { headers: { token } }
          );
        }),
        map((reports: Report[]) => {
          // Add isSelected: false to each report
          return reports.map(report => ({
            ...report,
            isSelected: false,
          }));
        })
      );
  }
}
