import {Injectable} from '@angular/core';
import {UserLoginModel} from "../../models/api/user-login.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {baseUrl} from "../../models/baseUrl";
import {UserRegisterModel} from "../../models/api/user-register.model";
import {LocalstorageService} from "../localstorage.service";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private localstorage: LocalstorageService,
        private http: HttpClient,
    ) {
    }

    login(data: UserLoginModel): Observable<any> {
        return this.http.post(`${baseUrl}/login`, data);
    }

    register(data: UserRegisterModel): Observable<any> {
        return this.http.post(`${baseUrl}/users`, data);
    }

    get(): Observable<any> {
        const token = this.localstorage.get('user');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        return this.http.get(`${baseUrl}/users/me`, {headers: headers});
    }
}
