# server
The backend implementation that is composed of three different layers:
- API: implements RESTFul API to create/read/delete/search person information
- business - validate different business logic prior to access the data in the database
- repository (data access) - provides functionality to create/read/delete/search person information in/from database
  
## Installation
Simply run `npm install` in the server directory. The command downloads required packages to compile and run the application
  
## Run the application
Run `npm start` in the server directory. This command starts the server to serve incoming HTTP request
 
## Run the test
Run `npm test` in the server directory. This command should run both unit and integration tests.
 
## Production Build
Run `npm build` in the server directory. The command builds the application for production use and places the compiled Javascript files in the `{/root}/dist` directory

## Environment variables
  
Here is the list of environment variables to override default configuration
- PORT: the HTTP listening port of the application. Default value is `3001`
- DATABASE_PERSON_FILE_FULLPATH: full path to the person data store file path. Default `{root directory}/person.db`
- LOG_LEVEL: the production log level. Default is `info`
- DEVELOPMENT_LOG_LEVEL: the development log level. Default is `info`
- ERROR_LOG_FILE_FULLPATH: full path to the error log file. Default `{root directory}/error.log`
- COMBINED_LOG_FILE_FULLPATH: full path to the log file contains all logging entries. Default `{root directory}/all.log`
