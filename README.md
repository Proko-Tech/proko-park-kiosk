# Raspberry Pi Rest API - PROKO-TECH

### Table of Contents
**[Project Description](#Project-Description)**<br>
**[Team Members](#Team-Members)**<br>
**[Project Architecture](#Project-Architecture)**<br>
**[Run Project/Setup Environment](#Run-Project/Setup-Environment)**<br>
**[Database Model](#Database-Model)**<br>

## Project Description

Proko Park is a system and method that assists drivers’ searching, reserving, parking, and paying for a parking spot online  hence the online smart parking system. The online intelligent parking system assigns an encrypted id for each user  and their vehicles, utilizing a real-time location tracking feature to suggest the closest available parking spots. The  system allows users to reserve parking spots at the desired parking structure and scans the user and the vehicle  id upon entry by QR code(or other means like a barcode). Each spot will be guarded with a microcontroller with  sensors that verify the users’ identity upon parking and provide a timing feature to calculate elapsed parking time  and the amount due for payment. The online smart parking system stores and manages available parking lots,  reservations, vehicle ids, and elapsed parking time under the program.

This repository is the rest api for each parking lot's barrier/master control
system. The REST API allows each sensors to make web requests to check on their
real time status, and update sensor status. 
## Team Members

### Software Engineers:
- Jessica Hilario
- Rohan Sidhu
- Thomas Li
- Yuichi Kurino

### Hardware Engineeers:
- Don Walhquist
- Andrew Brown
- Rob Guerrero

## Project Architecture
```
.
├── app
│   ├── routes
|   │   ├── api.js
│   |   └── index.js
│   ├── views
|   │   ├── error.ejs
│   |   └── index.ejs
│   └──  index.js
├── database
│   ├── migrations
│   │   ├── 20201221110023_lot_table.js
│   │   └── 20201221124821_lot_table_add_time_stamp.js
│   ├── models
│   │   └── spotsModel.js
│   ├── seeds
│   └── dbConfig.js
├── provider
│   ├── index.js
├── scripts
│   ├── index.js
└── app.js
```

## Run Project/Setup Environment
### Setting up repository:
```
npm install
npm install -g knex
```
use the first command to install all dependencies of the repository, and the second command
installs knex functionalities in the project. 

Add in the fields in `.env` based on the `.env_sample`

### Run Knex migrations:
```
knex migrate:latest
```
This command runs all database settings in local mysql server

```
knex seed:run
```

This command adds pre-written seeds into the tables of the database

### Run app:
```
nodemon
```
or
```
npm start
```

### Deploy app with Docker
```
sudo docker-compose build
sudo docker-compose up
```

## Database Model

#### spots table
```
- id: primary key, not null, unique, auto increments
- spot_name: text
- secret: text
- alive_status: boolean
- spot_status: enum(['UNOCCUPIED','RESERVED','OCCUPIED','OFF_LINE'])
- created_at: timestamp
- updated_at: timestamp
```


