import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ActorsResponse, Actor } from "../interfaces/actors.interfaces";
import { ActorsDetailResponse } from "../interfaces/actorsDetails.interface";

@Injectable({
  providedIn: "root",
})
export class ActorsService {
  constructor(private http: HttpClient) {}

  public getActors(page: number): Observable<ActorsResponse> {
    return this.http.get<ActorsResponse>(
      `${environment.base_url}/person/popular?api_key=${environment.api_key}&page=${page}`
    );
  }
  public getActorsDetails(id: string): Observable<ActorsDetailResponse> {
    return this.http.get<ActorsDetailResponse>(
      `${environment.base_url}/person/${id}?api_key=${environment.api_key}`
    );
  }
}
