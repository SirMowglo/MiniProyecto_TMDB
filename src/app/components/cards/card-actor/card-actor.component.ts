import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { createPopper } from "@popperjs/core";
import { ActorDialogData } from "src/app/interfaces/actorData.interface";
import { Actor } from "src/app/interfaces/actors.interfaces";
import { ActorsDetailResponse } from "src/app/interfaces/actorsDetails.interface";
import { Cast } from "src/app/interfaces/movie-credits.interface";
import { ActorsService } from "src/app/services/actors.service";

@Component({
  selector: "app-card-actor",
  templateUrl: "./card-actor.component.html",
})
export class CardActorComponent implements OnInit {
  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef: ElementRef;

  data: ActorDialogData = {} as ActorDialogData;
  id = "";
  knownForMovies: string[] = [];
  actorMovies: Cast[] = [];

  popper = document.createElement("div");
  constructor(
    private route: ActivatedRoute,
    private actorsService: ActorsService
  ) {}

  ngOnInit(): void {;

    this.route.params.subscribe((params) => {
      this.id = params["id"];
    });
    this.getActorDetails(this.id);
    this.getActors(1);
  }
  getActorDetails(id: string) {
    this.actorsService.getActorsDetails(id).subscribe((resp) => {
      this.data.actorDetails = resp;
    });
  }
  getActors(page: number) {
    this.actorsService.getActors(page).subscribe((resp) => {
      this.data.actor = resp.results.find((x) => x.id.toString() === this.id);
      this.getKnownForMovies(this.data.actor);
      this.getMovies(this.id);
    });
  }
  getMovies(actor_id: string) {
    this.actorsService.getActorsMovieCredits(actor_id).subscribe((resp) => {
      this.actorMovies = resp.cast;
    });
  }
  getAge(actor: ActorsDetailResponse) {
    let age: number;
    var timeDiff = Math.abs(Date.now() - new Date(actor.birthday).getTime());
    age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    return age;
  }
  getActorImage(actor: Actor) {
    let url = "";
    if (actor.profile_path != null) {
      url = `https://image.tmdb.org/t/p/original${actor.profile_path}`;
    }
    return url;
  }

  getKnownForMovies(actor: Actor) {
    for (var i = 0; i < actor.known_for.length; i++) {
      this.knownForMovies.push(actor.known_for[i].poster_path);
    }
  }
  truncNumber(num: number) {
    let truncado: number;

    truncado = Math.trunc(num);
    return truncado;
  }
  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
      this.createPoppper();
    }
  }
  createPoppper() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }
}
