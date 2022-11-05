import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CreateSessionDto } from "../dto/create-session.dto";
import { DeleteSessionDto } from "../dto/delete-session.dto";
import { CreateSessionResponse } from "../interfaces/create-session.interface";
import { DeleteSessionResponse } from "../interfaces/delete-session.interface";
import { RequestTokenResponse } from "../interfaces/request-token.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  createRequestToken(): Observable<RequestTokenResponse> {
    return this.http.get<RequestTokenResponse>(
      `${environment.base_url}/authentication/token/new?api_key=${environment.api_key}`
    );
  }

  createSession(
    sessionDto: CreateSessionDto
  ): Observable<CreateSessionResponse> {
    return this.http.post<CreateSessionResponse>(
      `${environment.base_url}/authentication/session/new?api_key=${environment.api_key}`,
      sessionDto
    );
  }
  //===============================================================================
  //========== Por alguna razon que desconozco no termina de funcionar ============
  //===============================================================================

  // deleteSession(
  //   deleteSessionDto: DeleteSessionDto
  // ): Observable<DeleteSessionResponse> {
  //   return this.http.delete<DeleteSessionResponse>(
  //     `${environment.base_url}/authentication/session?api_key=${environment.api_key}`,
  //     {
  //       body: deleteSessionDto,
  //     }
  //   );
  // }
}
