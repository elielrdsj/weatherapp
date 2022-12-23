import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable, OnInit } from '@angular/core';
import { WeatherData } from '../models/weather-model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements OnInit {
  WeatherData:any;
  cities: string[] = ["SaoPaulo", "NewYork", "London", "Caruaru", "Tokyo"];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getWeatherData(cityName: string) : Observable<WeatherData> {
    return this.http.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=79595b8b65a390ccde694a735b4fa3fa`);
  }
}