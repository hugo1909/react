import { useWeather } from "../../hooks/useWeather";
import SearchBar from './SearchBar';
import WeatherSkeleton from './WeatherSkeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const WeatherApp = () => {
  const { weather, loading, error, setLocation, refreshWeather } = useWeather();

  // Get filtered hours for today's forecast
  const hourlyForecast = weather?.forecast?.forecastday[0]?.hour
    ?.filter(hour => new Date(hour.time) > new Date()) || [];

  const daysForecast = weather?.forecast?.forecastday.filter(day => new Date(day.date) > new Date()) || [];

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Weather App</h1>
      <p className="mb-4 text-gray-600">
        Get the latest weather updates for your location.
      </p>
      {error && <p className="mb-4 text-red-500">{error.message}</p>}
      <SearchBar setLocation={setLocation} />
      
      {loading && !weather ? (
        <WeatherSkeleton />
      ) : weather ? (
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1 p-4 border rounded-md shadow md:max-w-[50%]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-black">{weather.location.name}, {weather.location.country}</h4>
              <button 
                onClick={refreshWeather}
                disabled={loading}
                className="flex items-center gap-2 p-0 text-sm text-blue-500 transition-colors hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                alt="Refresh"
              >
                <svg 
                  className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex-1 current-weather">
                <div className="flex justify-between mb-4 border-b">
                  <h4 className="mb-2 text-base font-semibold text-black">Current weather</h4>
                  <span className="text-sm font-bold text-black">{new Date(weather.current.last_updated).toLocaleString('vi-VN', { hour: 'numeric', minute: 'numeric' })}</span>
                </div>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="flex flex-1 gap-4 icon">
                    <img className="w-20 h-20" src={weather.current.condition.icon} alt={weather.current.condition.text} />
                    <div>
                      <p className="text-4xl font-semibold">{Math.round(weather.current.temp_c)}°C</p>
                      <p className="text-lg font-bold text-black">{weather.current.condition.text}</p>
                    </div>
                  </div>
                  <div className="flex-1 details max-w-1/2">
                    <p className="flex justify-between py-2 text-sm text-black border-b"><span>Feels like:</span> <strong>{weather.current.feelslike_c}°C</strong></p>
                    <p className="flex justify-between py-2 text-sm text-black border-b"><span>Humidity:</span> <strong>{weather.current.humidity}%</strong></p>
                    <p className="flex justify-between py-2 text-sm text-black border-b"><span>Wind:</span> <strong>{weather.current.wind_kph} kph</strong></p>
                    <p className="flex justify-between py-2 text-sm text-black border-b"><span>UV Index:</span> <strong>{weather.current.uv}</strong></p>
                    <p className="flex justify-between py-2 text-sm text-black"><span>Visibility:</span> <strong>{weather.current.vis_km} km</strong></p>
                  </div>
                </div>
              </div>
              <div className="flex-1 today-forecast">
                <h4 className="mb-4 text-base font-semibold text-black">Hourly Weather</h4>
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={8}
                  slidesPerView={5}
                  navigation
                  pagination={{ clickable: true }}
                  breakpoints={{
                    320: {
                      slidesPerView: 3
                    },
                    768: {
                      slidesPerView: 5
                    },
                  }}
                  className="hourly-forecast-slider"
                  style={{ height: '160px' }}
                >
                  {hourlyForecast.map((hour, index) => (
                    <SwiperSlide key={index} className="h-full">
                      <div className="flex flex-col items-center gap-2 h-full p-3 border rounded-md bg-gray-50 min-h-[140px]">
                        <span className="text-sm font-medium text-center">{hour.time.split(' ')[1]}</span>
                        <span className="w-8 h-8"><img src={hour.condition.icon} alt={hour.condition.text} className="flex-shrink-0 w-8 h-8" /></span>
                        <span className="text-sm font-bold">{Math.round(hour.temp_c)}°C</span>
                        <span className="text-xs leading-tight text-center text-gray-600">{hour.condition.text}</span>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 border rounded-md shadow">
            <h4 className="mb-4 text-lg font-semibold text-black">7-Day Forecast</h4>
            <div className="flex flex-col border">
              {weather && daysForecast.map((day, index) => (
                <div key={index} className="p-4 border-b last:border-b-0">
                  <div className="flex items-center w-full gap-4">
                    <div className="w-12 text-center">
                      <p className="font-bold">{(new Date(day.date)).toLocaleDateString('en-US', {weekday: 'short'})}
                      </p>
                      <p className="text-xs text-gray-500">{(new Date(day.date)).toLocaleDateString('en-US', {month: '2-digit', day: 'numeric' })}</p>
                    </div>
                    <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-16 h-16" />
                    <div className="flex items-end gap-2 temp">
                      <p className="text-3xl font-semibold">{Math.round(day.day.maxtemp_c)}°C</p>
                      <p className="text-lg text-gray-500">{Math.round(day.day.mintemp_c)}°C</p>
                    </div>
                    <p className="hidden text-sm font-bold lg:block">{day.day.condition.text}</p>
                    <p className="flex-1 text-base text-right text-gray-500">
                      <span className='inline-block w-3 h-3 mr-1'>
                        <svg class="precip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 16"><path fill="none" fill-rule="nonzero" stroke="#000" stroke-width=".714" d="M5.532.891c1.723.952 5.315 5.477 5.775 8.756.028 1.718-.534 3.101-1.45 4.082C8.888 14.766 7.52 15.357 6 15.357a5.532 5.532 0 0 1-3.74-1.425c-.975-.89-1.587-2.124-1.616-3.49.503-4.035 4.013-8.49 4.888-9.551Zm-1.815 7.33a.336.336 0 0 0-.025.043c-.322.62-.59 1.255-.695 2.207.012.408.143.787.358 1.111.234.352.568.641.96.839.035.017.071.021.106.017a.201.201 0 0 0 .104-.044l.01-.005-.078-.1c-.328-.415-.82-1.067-.82-1.946 0-.752.076-1.613.08-2.121Z"></path></svg>
                      </span>
                      {day.day.avghumidity}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      
      <footer className="mt-6">
        <p className="text-sm text-gray-600">Weather data provided by WeatherAPI</p>
      </footer>
    </>
  );
};

export default WeatherApp;
