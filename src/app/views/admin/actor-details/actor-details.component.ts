import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actor } from 'src/app/interfaces/actors.interfaces';
import { ActorDialogData } from 'src/app/interfaces/actorData.interface';
import { ActorsService } from 'src/app/services/actors.service';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
})
export class ActorDetailsComponent implements OnInit {
  public data: ActorDialogData;
  id='';

  constructor(private route: ActivatedRoute, private actorsService: ActorsService) {
    this.getActorDetails(this.id);
    this.getActors(1);
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    console.log(this.id);
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
}
