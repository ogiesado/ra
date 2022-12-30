## How To Run Application

Ensure you have docker and docker compose installed and follow the steps below:

- Clone the repo using the following command or any other way usually clone git repos. <br >
  `git clone git@github.com:ogiesado/ra.git`

- Using a terminal, go into the root directory of the newly cloned repo `cd ra`

- Optional: You can change the interval that the application updates rates in the `.env` file by changing the variable `RATES_UPDATE_INTERVAL_IN_SECONDS` to value you prefer in seconds.

- Run the following command `docker-compose build`.
- After the previous command has completed, run `docker-compose --env-file .env up`
- Wait till you see the output `Server running on the host port: 8081` then open the app in your browser at http://localhost:8082

## Notes

- API running at http://localhost:8081
  - GET: http://localhost:8081/conversions?page=1&perPage=50&sort=fromCurrency:asc,createdAt:desc
  - POST: http://localhost:8081/conversions - `{
  "fromCurrency": "USD",
  "toCurrency": "BTC",
  "fromAmount": 20,
  "rateId": "63aac4ecd721f28e910df002" 
}`
