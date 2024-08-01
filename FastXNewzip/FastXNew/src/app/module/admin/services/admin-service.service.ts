import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Operator } from './operator.model';
import { User } from './user.model';
import { Route } from './route.model';
import { Buses } from './buses.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class adminService {
  readonly ppApiUrl = "http://localhost:5030/api/busoperators";
  readonly UppApiUrl = "http://localhost:5030/api/users";
  readonly BppApiUrl = "http://localhost:5030/api/busroutes";
  readonly BusApiUrl="http://localhost:5030/api/buses";
  readonly BBapiUrl = 'http://localhost:5030/api/bookings';
  list: Operator[];
  ulist: User[];
  public blist: Route[] = [];
  ppData: Operator = new Operator();
  uppData: User = new User();
  bppData: Route = new Route();
 
  buslist:Buses[];
  bData:Buses=new Buses();
  constructor(private objHttp: HttpClient,private toastr: ToastrService) {}

  getOperatorList(): Observable<Operator[]> {
    return this.objHttp.get<Operator[]>(this.ppApiUrl);
  }

  deleteOperator(operatorId: number): Observable<void> {
    return this.objHttp.delete<void>(`${this.ppApiUrl}/${operatorId}`);
  }
  public getUserList(): Observable<User[]> {
    return this.objHttp.get<User[]>(this.UppApiUrl);
  }

  public delUser(id: number): Observable<any> {
    return this.objHttp.delete(`${this.UppApiUrl}/${id}`);
  }
  public getBusRouteList(): Observable<Route[]> {
    return this.objHttp.get<Route[]>(this.BppApiUrl);
  }

  

  public updateRoute(route: Route): Observable<any> {
    const url = `${this.BppApiUrl}/${route.RouteId}`;
    return this.objHttp.put(url, route).pipe(
      catchError(error => {
        console.error('Error updating route:', error);
        return throwError(error);
      })
    );
  }

  public delRoute(routeId: number): Observable<any> {
    const url = `${this.BppApiUrl}/${routeId}`;
    return this.objHttp.delete(url).pipe(
      catchError(error => {
        console.error('Error deleting route:', error);
        return throwError(error);
      })
    );
  }
  getBookings(): Observable<any[]> {
    return this.objHttp.get<any[]>(this.BBapiUrl);
  }

  deleteBooking(bookingId: number): Observable<any> {
    return this.objHttp.delete(`${this.BBapiUrl}/${bookingId}`);
  }

  public getBusList(): Observable<Buses[]> {
    return this.objHttp.get<Buses[]>(this.BusApiUrl);
  }

  public updateBus(bus: Buses): Observable<any> {
    const url = `${this.BusApiUrl}/${bus.BusId}`;
    return this.objHttp.put(url, bus).pipe(
      catchError(error => {
        console.error('Error updating bus:', error);
        return throwError(error);
      }),
      tap(() => {
        // Show success toastr notification
        this.toastr.success('Bus updated successfully', 'Success');
      })
    );
  }

  // Method to add a new bus
  public addBus(bus: Buses): Observable<Buses> {
    return this.objHttp.post<Buses>(this.BusApiUrl, bus).pipe(
      catchError(error => {
        console.error('Error adding bus:', error);
        return throwError(error);
      }),
      tap(() => {
        // Show success toastr notification
        this.toastr.success('Bus added successfully', 'Success');
      })
    );
  }

}
