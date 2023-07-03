import { AfterViewInit, Component } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as L from 'leaflet';
import { environment } from './environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements AfterViewInit {
  x:any;
  y:any;
  name="";
  desc ="";
  map: any;
  change = false;

  onName(event: any){
    this.name=event.target.value;
  }
  onDesc(event: any){
    this.desc=event.target.value;
  }
  changeData(){
  this.change=true;
  }
  constructor() {
  }

  public ngAfterViewInit(): void {
    this.loadMap();
  }

  private getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          observer.complete();
        });
      } else {
        observer.error();
      }
    });
  }

  private loadMap(): void {
    this.map = L.map('map').setView([0, 0], 1);
    this.map.doubleClickZoom.disable();
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: environment.mapbox.accessToken,
    }).addTo(this.map);
    const icon = L.icon({
      iconUrl: '/assets/marker-icon.png',
      shadowUrl: '/assets/marker-shadow.png',
      popupAnchor: [13, 0],
    });
    this.getCurrentPosition()
      .subscribe((position: any) => {
        this.map.flyTo([position.latitude, position.longitude], 13);
      });
    this.map.on("dblclick", (e:any) => {
      L.marker([e.latlng.lat, e.latlng.lng], { icon, draggable:true }).bindPopup("Name: " + this.name+","+'\n' + "Desc: " + this.desc).addTo(this.map).on('click', (e) => {
        this.x=e.latlng.lat;
        this.y=e.latlng.lng;
        if(this.change){
          e.target.setPopupContent("Name: " + this.name+","+'\n' + "Desc: " + this.desc);
          this.change=false;
        }
        const popup = e.target.getPopup();
        let content = popup.getContent();
        content = content.split(",",2);
        this.name=content[0].substring(6);
        this.desc=content[1].substring(7);
      });
    });
  }

}
