const WeatherSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row animate-pulse">
      {/* Left Column - Current Weather & Hourly */}
      <div className="flex-1 p-4 border rounded-md shadow md:max-w-[50%]">
        {/* Header with location and refresh button */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-gray-300 rounded w-48"></div>
          <div className="h-8 bg-gray-300 rounded w-20"></div>
        </div>
        
        <div className="flex flex-col gap-6">
          {/* Current Weather Section */}
          <div className="flex-1 current-weather">
            <div className="flex justify-between mb-4 border-b pb-2">
              <div className="h-5 bg-gray-300 rounded w-32"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
            
            <div className="flex flex-col gap-4 md:flex-row">
              {/* Weather Icon and Temperature */}
              <div className="flex flex-1 gap-4">
                <div className="w-20 h-20 bg-gray-300 rounded"></div>
                <div className="flex flex-col gap-2">
                  <div className="h-12 bg-gray-300 rounded w-24"></div>
                  <div className="h-6 bg-gray-300 rounded w-32"></div>
                </div>
              </div>
              
              {/* Weather Details */}
              <div className="flex-1 space-y-3">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex justify-between py-2 border-b last:border-b-0">
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Hourly Forecast Section */}
          <div className="flex-1 today-forecast">
            <div className="h-5 bg-gray-300 rounded w-32 mb-4"></div>
            <div className="flex gap-2 overflow-hidden" style={{ height: '160px' }}>
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex flex-col items-center gap-2 h-full p-3 border rounded-md bg-gray-50 min-w-[100px] flex-1">
                  <div className="h-4 bg-gray-300 rounded w-12"></div>
                  <div className="w-8 h-8 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-10"></div>
                  <div className="h-3 bg-gray-300 rounded w-16"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Column - 7-Day Forecast */}
      <div className="flex-1 p-4 border rounded-md shadow">
        <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
        <div className="flex flex-col border">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="p-4 border-b last:border-b-0">
              <div className="flex items-center w-full gap-4">
                {/* Day and Date */}
                <div className="w-12 text-center space-y-1">
                  <div className="h-4 bg-gray-300 rounded w-10 mx-auto"></div>
                  <div className="h-3 bg-gray-300 rounded w-8 mx-auto"></div>
                </div>
                
                {/* Weather Icon */}
                <div className="w-16 h-16 bg-gray-300 rounded"></div>
                
                {/* Temperatures */}
                <div className="flex items-end gap-2">
                  <div className="h-8 bg-gray-300 rounded w-12"></div>
                  <div className="h-6 bg-gray-300 rounded w-10"></div>
                </div>
                
                {/* Condition Text */}
                <div className="hidden lg:block h-4 bg-gray-300 rounded w-24"></div>
                
                {/* Humidity */}
                <div className="flex-1 text-right">
                  <div className="h-4 bg-gray-300 rounded w-12 ml-auto"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherSkeleton;
