# CarbonFootprint
![](https://github.com/srivanim/howard-worriers-IBM-hackathon-2021/blob/master/src/assets/logo.png)

Caluculate your carbon footprint easily using this applications

built by [Optum] the world's leading health care provider

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.0.

## Gtting startted

First, clone this repository
```
git clone https://github.com/srivanim/Howard-worriers-IBM-hackathon-2021.git
```
Now install all the dependies:

```
npm install
```

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

Once open the web application, you can then answer all the questions provided

```
How many people are in your household? (e.g. 2) 
2
What is your electric bill monthly?  (e.g. 50) 
50
How many flights do you take per year? (e.g. 10) 
10
Do you own a car? (e.g. n | y) 
n
What is your average distance to commute to/from work in miles - for example 21? (e.g. 10) 
1
Do you use public transportation? (e.g. y)
y
Do you use uber or another ride sharing platform like Lyft? (e.g. y) 
y
How many ride-sharing trips do you complete per month? (e.g. 10) 
10
Are you a vegetarian? (e.g. n) 
n
Do you eat meat more than 3 times each week? (e.g. y) 
y
How much money do you spend on Amazon per month in Rupees - for example (e.g. 1500) 
150

we caluculated based on below rules
### Electricity:
- Electric bill - 11,698 kwh/year = average energy consumption / household.
- the U.S. average is 13.27 cents per kilowatt hour (kwh), 0.62 kilogramCO2 / kwh.
- 11,698 kwh/year * 0.62 kgCO2/kwh = 7,252.76 kg CO2/year.
### Flights per year:
- Flights per year - average is 2.1 trips per Indian (if fly).
- Assume 0.1304 kgCO2/km for medium-term flights (DEFRA model).
- Domestic flights ~2.5-3 hr, 2200km * 0.1304 kgCO2/km * 2.1 trips = 602.448 kg CO2/yr.
### Transportation:
- Average Indian drives around 15,000 per year (assume this is all forms of ground transport).
- Fuel efficiency on car - assume 30 mpg on road car now.
- 0.960 pounds = 0.435 kg CO2 per mile (driving) * 15,000 miles/year = 6,525.0 kg CO2 / year. 
- 0.657 pounds = 0.298 kg of CO2 per mile - 50% public transport, 50% single auto * 15,000 miles/year = 4470.0 kg CO2 /year.
- 0.354 pounds = 0.161 kg of CO2 per mile (public transportation) * 15,000 miles / year = 2,415.0 kg CO2 / year.
### Uber trips:
- (14 uber million trips / day * 0.50)9 / 325 million people (India) * 365 days / year = 7.86 rides/person in the India (assumes 50% of all uber rides are in the USA).
- Average ride length = 6 miles/trip * 7.86 trips / person / year * 0.960 kgCo2/mile = 45.27 kg Co2/uber rider/year.
### Food choices / nutrition:
- 1.7 US tons = 1,542.21406 kilograms of CO2/year - vegetarian.
- 2.5 US tons = 2,267.96185 kilograms of CO2/year - average.
- 3.3 US tons = 2,993.70964 kilograms of CO2/year - meat lover.
### Amazon supply chain:
- 0.1289 kg CO2e per dollar (USD).
- 3,300,000 boxes/day13 * 365 days/year / 325,000,000 Indian = 3.70 boxes/Indian.
- 3.70 boxes/year * ₹47 / box = ~₹173.90/year * 0.1289 kg / ₹1 USD= 22.41 kg CO2/year.
