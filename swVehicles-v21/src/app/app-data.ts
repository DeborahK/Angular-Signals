import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Vehicle } from './vehicles/vehicle';
import { VehicleData } from './vehicles/vehicle-data';
import { Film } from './films/film';
import { FilmData } from './films/film-data';

// Required class for the In Memory Web API
export class AppData implements InMemoryDbService {

  // Creates the 'in memory' database
  // Can then issue http requests to retrieve this data,
  // just as if the data were located on a backend server
  createDb(): { vehicles: Vehicle[], films: Film[] } {
    const vehicles = VehicleData.vehicles;
    const films = FilmData.films;
    return { vehicles, films };
  }
}
