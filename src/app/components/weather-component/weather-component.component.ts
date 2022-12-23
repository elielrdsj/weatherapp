import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { observable } from 'rxjs';
import { WeatherData } from 'src/app/models/weather-model';
import { WeatherService } from 'src/app/services/weather-service.service';

@Component({
  selector: 'app-weather-component',
  templateUrl: './weather-component.component.html',
  styleUrls: ['./weather-component.component.css']
})
export class WeatherComponentComponent {
  constructor(private weatherService: WeatherService) {}
  cities: string[] = ['Caruaru', 'Recife', 'London', 'Tokyo', 'Curitiba'];
  weatherData?: WeatherData[] = [];
  cityName: string = '';
  ngOnInit(): void {
    let i = 0;
    this.cities.forEach((city) => {
      this.weatherService.getWeatherData(city).subscribe({
        next: (response: any) => {
          response.main.temp -= 275.15;
          response.main.temp_max -= 275.15;
          response.main.temp_min -= 275.15;
          this.weatherData?.push(response);

          console.log(this.weatherData);
        },
      });
    });
  }
  onSubmit() {
    this.weatherService.getWeatherData(this.cityName).subscribe({
      next: (response: any) => {
        if (!response) window.alert('Cidade não encontrada');
        response.main.temp -= 275.15;
        response.main.temp_max -= 275.15;
        response.main.temp_min -= 275.15;
        this.weatherData?.push(response);

        console.log(this.weatherData);
      },
      error(msg) {
        window.alert('Cidade não encontrada');
        console.log(msg);
      },
    });
    this.cityName = '';
  }
  onDelete(i: number) {
    if (i !== -1) {
      this.weatherData?.splice(i, 1);
    }
  }
}

