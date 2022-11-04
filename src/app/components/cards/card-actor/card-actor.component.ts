import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ActorDialogData } from "src/app/interfaces/actorData.interface";
import { Actor } from "src/app/interfaces/actors.interfaces";
import { ActorsDetailResponse } from "src/app/interfaces/actorsDetails.interface";
import { ActorsService } from "src/app/services/actors.service";

@Component({
  selector: "app-card-actor",
  templateUrl: "./card-actor.component.html",
})
export class CardActorComponent implements OnInit {
  data: ActorDialogData = {} as ActorDialogData;
  id='';

  constructor(private route: ActivatedRoute, private actorsService: ActorsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.getActorDetails(this.id);
    this.getActors(1);
  }
  getActorDetails(id: string){
    this.actorsService.getActorsDetails(id).subscribe(resp=>{
      this.data.actorDetails = resp;
    })

  }
  getActors(page: number) {
    this.actorsService.getActors(page).subscribe((resp) => {
      this.data.actor = resp.results.find(x => x.id.toString() === this.id);
    });
  }
  getAge(actor: ActorsDetailResponse) {
    let age: number;
    var timeDiff = Math.abs(Date.now() - new Date(actor.birthday).getTime());
    age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    return age;
  }
  getActorImage(actor: Actor) {
    let url = '';
    if (actor.profile_path != null) {
      url = `https://image.tmdb.org/t/p/original${actor.profile_path}`;
    }
    return url;
  }
  truncNumber(num: number) {
    let truncado: number;

    truncado = Math.trunc(num);
    return truncado;
  }
}
