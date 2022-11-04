import { Component, Input, OnInit } from "@angular/core";
import { ActorDialogData } from "src/app/interfaces/actorData.interface";
import { ActorsService } from "src/app/services/actors.service";

@Component({
  selector: "app-card-actor",
  templateUrl: "./card-actor.component.html",
})
export class CardActorComponent implements OnInit {
  @Input() data: ActorDialogData;

  constructor() {}

  ngOnInit(): void {

  }
}
