import { Actor } from "src/app/interfaces/actors.interfaces";
import { ActorsDetailResponse } from "./actorsDetails.interface";

export interface ActorDialogData {
    actorDetails: ActorsDetailResponse;
    actor: Actor
  }
