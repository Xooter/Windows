export type Weather = {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    deg: number;
    speed: number;
  };
  weather: {
    icon: string;
    main: string;
  }[];
};
