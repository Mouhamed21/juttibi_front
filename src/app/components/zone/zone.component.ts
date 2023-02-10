import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ZoneService } from 'src/app/service/zone/zone.service';
import { Zone } from 'src/app/modele/zone';


@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss'],
  providers: [MessageService,ConfirmationService]

})
export class ZoneComponent implements OnInit {


  zone:Zone;
  zones:any;
  submitted: boolean;
  zoneDialog: boolean;
  zoneEditDialog: boolean;
  loading:boolean;
  tableau:boolean;

  constructor(private zoneService: ZoneService,private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

ngOnInit(): void {
this.getAllzone();
}

public getAllzone(){
console.log('On Init ...');
this.loading=true;
this.tableau=true;

return this.zoneService.getAllZone().subscribe((data) =>
{
  this.zones = data;
  if (this.zones.length==0){
      this.tableau=false;
  }
  this.loading=false;
  console.log(data)
})
}
editzone(zone: Zone) {
this.zone = {...zone};
this.zoneEditDialog = true;
}
public postzone() {

this.submitted = true;
//debugger
if (this.zone.libelle.trim()) {
  if (this.zone.id) {
      this.zoneService.updateZone(this.zone.id,this.zone).subscribe(
          data => {
              console.log(data);
              this.zoneEditDialog = false;
              this.zone = {};
              this.getAllzone();

              this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Mise à jour zone', life: 6000});

          },
          error => {
              console.log(error);
              this.messageService.add({severity:'error', summary: 'Echec', detail: 'Mise à jour zone', life: 6000});
          }
      );
  }
  else {
      //debugger
      this.zoneService.postZone(this.zone).subscribe( data =>
          {
              console.log(this.zone);
              this.zoneDialog = false;
              this.getAllzone();
              this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout zone', life: 6000});
          },
          error => {
              console.log(error);
              this.messageService.add({severity:'error', summary: 'Echec', detail: 'Ajout zone', life: 6000});
          }
      );
  }

  this.zones = [...this.zones];
  this.zoneDialog = false;
  this.zoneEditDialog = false;
  this.zone = {};
}

}

openNew(){
this.zone = {};
this.submitted = false;
this.zoneDialog = true;
}
hideDialog() {
this.zoneDialog = false;
this.submitted = false;
this.zoneEditDialog = false;
//this.editClasseDialog = false;
}
first = 0;

rows = 10;
next() {
this.first = this.first + this.rows;
}

prev() {
this.first = this.first - this.rows;
}

reset() {
this.first = 0;
}

isLastPage(): boolean {
return this.zones ? this.first === (this.zones.length - this.rows): true;
}

isFirstPage(): boolean {
return this.zones ? this.first === 0 : true;
}


}
