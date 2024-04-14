import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {FilterModel} from "../../models/api/filter.model";
import {baseUrl} from "../../models/baseUrl";
import {LocalstorageService} from "../localstorage.service";

@Injectable({
    providedIn: 'root'
})
export class InternshipsService {
    public observer = new Subject();
    public subscribers$ = this.observer.asObservable();

    constructor(
        private http: HttpClient,
        private localstorage: LocalstorageService,
    ) {
    }

    public emit_data(data: FilterModel) {
        this.observer.next({data});
    }

    filter(data: FilterModel): Observable<any> {
        let params = new HttpParams();
        for (const key in data) { // @ts-ignore
            params = params.append(key, data[key]);
        }
        return this.http.get(`${baseUrl}/internship`, {params: params});
    }

    get_liked(): Observable<any> {
        const token = this.localstorage.get('user');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        return this.http.get(`${baseUrl}/liked_internships`, {headers: headers});
    }
}
