import { WeatherData } from './models/weather-model';
import { WeatherService } from './services/weather-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
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
