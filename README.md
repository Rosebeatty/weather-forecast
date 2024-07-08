## Weather Forecast

The Weather Forecast is a responsive mobile and desktop app which implementes the OpenMeteo API to enable users to search weather data by a location name or by coordinates. The app consists of two views: the dashboard for searching and the details page for displaying a detailed forecast. Additionally, if the user enables geolocation tracking within the browser, the app can automatically determine and display local weather forecast data.  

I chose to use Styled Components for a quick and effective design implementation, however I would replace this with TailwindCSS or at least refactor the CSS to separate files if the app got any larger. I wrote simple tests with Jest & Enzyme and I would add to this with further integration & e2e tests. 


Main technologies:

- React
- Styled Components
- Jest & Enzyme
- Axios
- Prettier
- OpenMeteo API
- Git


Improvements:

- Add Typescript
- Add Input validation messages
- Improve Design & Accessibilty
- Weather Animations
- More UI tests
- Refactor LocationSearch into smaller UI components
- Refactor CSS to seperate files or use Tailwind instead of Styled Components for scalability
- Refactor geolocation services
- Performance: Code splitting and lazy loading (if the app became larger)
- Deployment (CI/CD)


## Set-up

- Copy the .env.example file to a .env file
- Run `npm install` to install packages


## Available Scripts

In the project directory, you can run:


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


### `npm run format`

Formats all files in the src folder with Prettier.

