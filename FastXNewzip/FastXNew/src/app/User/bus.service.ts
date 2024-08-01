import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Bus } from './bus.model';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  private selectedBusSubject=new Subject<Bus>();
  selectedBus=this.selectedBusSubject.asObservable();

  setSelectedBus(bus:Bus){
    this.selectedBusSubject.next(bus);
  }
}
