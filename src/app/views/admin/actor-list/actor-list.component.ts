import { Component, OnInit } from "@angular/core";
import { Actor } from "src/app/interfaces/actors.interfaces";
import { ActorsDetailResponse } from "src/app/interfaces/actorsDetails.interface";
import { ActorsService } from "src/app/services/actors.service";

@Component({
  selector: "app-actor-list",
  templateUrl: "./actor-list.component.html",
})
export class ActorListComponent implements OnInit {
  actorsList: Actor[] = [];
  actorDetails!: ActorsDetailResponse;

  constructor(private actorsService: ActorsService) {}

  ngOnInit(): void {
    this.getActors(1);
  }

  getActors(page: number) {
    this.actorsService.getActors(page).subscribe((resp) => {
      this.actorsList = resp.results;
    });
  }

  getActorImage(actor: Actor) {
    let url = "";
    if (actor.profile_path != null) {
      url = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;
    }
    return url;
  }
  getKnownFor(actor: Actor) {
    let pelis = "";
    for (var i = 0; i < actor.known_for.length; i++) {
      if (actor.known_for[i].name !== undefined) {
        pelis = actor.known_for[i].name || "";
      }
    }
    if (pelis != "") {
      pelis = "Conocido por: " + pelis;
    } else {
      pelis = "";
    }
    return pelis;
  }
}
