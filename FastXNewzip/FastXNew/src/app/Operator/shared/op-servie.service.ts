import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from './schedule.model';
import { Booking } from './booking.model';
import { Seat } from './seat.model';

@Injectable({
  providedIn: 'root'
})
export class OpServiceService {
  private readonly bapiUrl = 'http://localhost:5030/api/bookings';
  private readonly sapiUrl='http://localhost:5030/api/seats';
  private readonly bsapiUrl='http://localhost:5030/api/BusSchedules';

  list: Seat[] = [];
  ppData: Seat = new Seat();
  bslist:Schedule[]=[];
  bsData:Schedule=new Schedule();
  
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }


  public scheduleList(): Observable<Schedule[]> {
    const headers = this.getHeaders();
    return this.http.get<Schedule[]>(`${this.bsapiUrl}`, { headers });
  }

  public delSchedule(id: number) {
    const headers = this.getHeaders();
    return this.http.delete(`${this.bsapiUrl}/${id}`, { headers });
  }

  public getSchedulesWithBusDetails(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.bsapiUrl}`, { headers });
  }

   public regSchedule(){
    return this.http.post(this.bsapiUrl,this.bsData);
  }
  
  public updateSchedule(schedule: any) {
    return this.http.put(`${this.bsapiUrl}/${schedule.ScheduleId}`, schedule, { headers: this.getHeaders() });
  }
  

  public seatList(): Observable<Seat[]> {
    return this.http.get<Seat[]>(this.sapiUrl);
  }
  
  public regSeat(){
    return this.http.post(this.sapiUrl,this.ppData);
  }

  public delSeat(id: number) {
    const headers = this.getHeaders();
    return this.http.delete(`${this.sapiUrl}/${id}`, { headers });
  }
  
   public updateSeat(){
    return this.http.put(this.sapiUrl+'/'+this.ppData.SeatId,this.ppData);
  }

  public getSeatwithBusDetails(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.sapiUrl}`, { headers });
  }


  public bookingList(): Observable<Booking[]> {
    const headers = this.getHeaders();
    return this.http.get<Booking[]>(`${this.bapiUrl}`, { headers });
  }

  public delBooking(id:number){
    return this.http.delete(this.bapiUrl+'/'+id);
  }

  public getBookingwithBusDetails(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.bapiUrl}`, { headers });
  } 
 

  
}
