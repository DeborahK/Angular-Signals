import { Vehicle } from "./vehicle";

export class VehicleData {

  // Source: 'https://swapi.py4e.com/api/vehicles'
  static vehicles: Vehicle[] = [
    {
      cargo_capacity: 50000,
      cost_in_credits: 150000,
      crew: 46,
      films: ['api/films/1/', 'api/films/5'],
      manufacturer: "Corellia Mining Corporation",
      model: "Digger Crawler",
      name: "Sand Crawler",
      passengers: 30,
      vehicle_class: "wheeled"
    },
    {
      cargo_capacity: 50,
      cost_in_credits: 14500,
      crew: 1,
      films: ['api/films/1'],
      manufacturer: "Incom Corporation",
      model: "T-16 skyhopper",
      name: "T-16 skyhopper",
      passengers: 1,
      vehicle_class: "repulsorcraft"
    },
    {
      cargo_capacity: 5,
      cost_in_credits: 10550,
      crew: 1,
      films: ['api/films/1'],
      manufacturer: "SoroSuub Corporation",
      model: "X-34 landspeeder",
      name: "X-34 landspeeder",
      passengers: 1,
      vehicle_class: "repulsorcraft"
    },
    {
      cargo_capacity: 65,
      cost_in_credits: 250000,
      crew: 1,
      films: ['api/films/1', 'api/films/2', 'api/films/3'],
      manufacturer: "Sienar Fleet Systems",
      model: "Twin Ion Engine/Ln Starfighter",
      name: "TIE/LN starfighter",
      passengers: 0,
      vehicle_class: "starfighter",
    },
    {
      cargo_capacity: 10,
      cost_in_credits: 150000,
      crew: 2,
      films: ['api/films/2'],
      manufacturer: "Incom corporation",
      model: "t-47 airspeeder",
      name: "Snowspeeder",
      passengers: 0,
      vehicle_class: "airspeeder",
    },
    {
      cargo_capacity: 0,
      cost_in_credits: 400000,
      crew: 1,
      films: ['api/films/2', 'api/films/3'],
      manufacturer: "Sienar Fleet Systems",
      model: "TIE/sa bomber",
      name: "TIE bomber",
      passengers: 0,
      vehicle_class: "space/planetary bomber"
    },
    {
      cargo_capacity: 1000,
      cost_in_credits: 200000,
      crew: 5,
      films: ['api/films/2', 'api/films/3'],
      manufacturer: "Kuat Drive Yards, Imperial Department of Military Research",
      model: "All Terrain Armored Transport",
      name: "AT-AT",
      passengers: 40,
      vehicle_class: "assault walker"
    },
    {
      cargo_capacity: 200,
      cost_in_credits: 100000,
      crew: 2,
      films: ['api/films/2', 'api/films/3'],
      manufacturer: "Kuat Drive Yards, Imperial Department of Military Research",
      model: "All Terrain Scout Transport",
      name: "AT-ST",
      passengers: 0,
      vehicle_class: "walker"
    },
    {
      cargo_capacity: 10,
      cost_in_credits: 75000,
      crew: 2,
      films: ['api/films/2'],
      manufacturer: "Bespin Motors",
      model: "Storm IV Twin-Pod",
      name: "Storm IV Twin-Pod cloud car",
      passengers: 0,
      vehicle_class: "repulsorcraft",
    },
    {
      cargo_capacity: 2000000,
      cost_in_credits: 285000,
      crew: 26,
      films: ['api/films/3'],
      manufacturer: "Ubrikkian Industries Custom Vehicle Division",
      model: "Modified Luxury Sail Barge",
      name: "Sail barge",
      passengers: 500,
      vehicle_class: "sail barge"
    }
  ]
}