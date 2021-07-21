import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(
    private http: HttpClient,
  ) { }


  getAllCertificatesRequests(){
    return this.http.get(`${env.apiRoot}/api/Certificate/GetAllCertificatesRequests`);
  }

  SearchForCertificate(serialNumber: string){
    return this.http.get(`${env.apiRoot}/api/Certificate/SearchForCertificate/${serialNumber}`);
  }

}
