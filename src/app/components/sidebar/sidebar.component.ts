import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CreateSessionDto } from "src/app/dto/create-session.dto";
import { DeleteSessionDto } from "src/app/dto/delete-session.dto";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  approved = false;
  reqToken = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((qParams) => {
      const ap = qParams["approved"];
      const rToken = qParams["request_token"];
      this.approved = ap == "true" ? true : false;
      console.log(rToken);
      if (this.approved) {
        let session = new CreateSessionDto();
        session.request_token = rToken;
        this.authService.createSession(session).subscribe((resp) => {
          localStorage.setItem("session_id", resp.session_id);
          console.log("Session id: " + resp.session_id);
          console.log('primer if' +this.approved)
        });
      } else {
        if (localStorage.getItem("session_id") != null) {
          console.log("Session id : " + localStorage.getItem("session_id"));
          this.approved = true;
          console.log('segundo if' +this.approved)
        }
      }
    });
  }

  requestToken() {
    this.authService.createRequestToken().subscribe((resp) => {
      this.reqToken = resp.request_token;
      window.location.href = `https://www.themoviedb.org/authenticate/${this.reqToken}?redirect_to=http://localhost:4200/admin`;
    });
  }
  // Al no funcionar el deleteSession() del servicio, simplemente cambio el approved para que pueda desverse elementos
  // logout() {
  //   let deleteSessionDto = new DeleteSessionDto();
  //   if (localStorage.getItem("session_id") != null) {
  //     deleteSessionDto.session_id = localStorage.getItem("session_id")!;
  //     this.authService.deleteSession(deleteSessionDto).subscribe((resp) => {
  //       if (resp.success) {
  //         localStorage.removeItem("session_id");
  //         this.approved = false;
  //       }
  //     });
  //   }
  // }

  logout(){
    this.approved = false;
    localStorage.removeItem("session_id");
    this.router.navigate(['/admin/actorlist']);
  }
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }
}
