# ATMOS — Weather, in Motion

A Vite + React weather assessment project using Axios and OpenWeatherMap.

## Setup

1. In your existing Vite project, copy the files in this package into the matching locations in your project. Keep your existing `package.json` and Vite config.
2. Install Axios if needed: `npm install axios`
3. Create a file named `.env` in the project root (the same folder as `package.json`).
4. Add this line to `.env` and replace the value with your own OpenWeatherMap API key:

   `VITE_OPENWEATHER_API_KEY=your_actual_api_key`

5. Stop and restart Vite after changing `.env`:

   `npm run dev`

## Notes

- This project uses the OpenWeatherMap current weather endpoint and `units=metric`.
- The app converts the returned Celsius values to Fahrenheit in the interface.
- A Vite `VITE_` environment variable is visible in browser code. For a learning assessment this is common, but do not treat it as a secret suitable for production. Do not commit your `.env` file.
- The weather endpoint may reject a newly created API key until it has been activated.
