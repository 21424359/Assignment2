# README.md

IMPORTANT: Once you've cloned this to your forked repository, ensure that you continuously update this document as you complete each task to demonstrate your ongoing progress.

Please include your shared repository link here: https://github.com/21424359/Assignment2.git

Example:
Choiru's shared repository: https://github.com/choiruzain-latrobe/Assignment2.git


Make sure for **your case it is in Private**
## Access Database
1 **Plsql Cheat Sheet:**
You can refer to the PostgreSQL cheat sheet [here](https://www.postgresqltutorial.com/postgresql-cheat-sheet/).

2 **Know the Container ID:**
To find out the container ID, execute the following command:
   ```bash
   docker ps
    9958a3a534c9   testsystem-nginx           "/docker-entrypoint.…"   6 minutes ago   Up 6 minutes   0.0.0.0:80->80/tcp   testsystem-nginx-1
    53121618baa4   testsystem-frontend        "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   3000/tcp             testsystem-frontend-1
    c89e46ac94b0   testsystem-api             "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   5000/tcp             testsystem-api-1
    9f4aea7cf538   postgres:15.3-alpine3.18   "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   5432/tcp             testsystem-db-1
   ```
3. Running the application

**docker compose command:**
   ```bash
   docker compose up --build
   ```

4 **Access postgreSQL in the container:**
Once you have the container ID, you can execute the container using the following command:
You will see the example of running the PostgreSQL inside the container.
   ```bash
   docker exec -it testsystem-db-1 psql -U postgres
   choiruzain@MacMarichoy TestSystem % docker exec -it testsystem-db-1 psql -U postgres                                       
   psql (15.3)
   Type "help" for help.
   
   postgres=# \dt
             List of relations
    Schema |   Name   | Type  |  Owner   
   --------+----------+-------+----------
    public | contacts | table | postgres
    public | phones   | table | postgres
   (2 rows)
  
    postgres=# select * from contacts;
    id |  name  |         createdAt         |         updatedAt         
   ----+--------+---------------------------+---------------------------
     1 | Helmut | 2024-08-08 11:57:57.88+00 | 2024-08-08 11:57:57.88+00
    (1 row)
    postgres=# select * from phones;
    id | phone_type |   number    | contactId |         createdAt          |         updatedAt          
   ----+------------+-------------+-----------+----------------------------+----------------------------
     1 | Work       | 081431      |         1 | 2024-08-08 11:59:04.386+00 | 2024-08-08 11:59:04.386+00


postgres=# select * from contacts;
   ```
Replace `container_ID` with the actual ID of the container you want to execute.

## Executing API

### Contact API


1. Add contacts API  (POST)
```bash
http post http://localhost/api/contacts name="Choiru"
        
choiruzain@MacMarichoy-7 TestSystem % http post http://localhost/api/contacts name="Choiru"
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Connection: keep-alive
Content-Length: 102
Content-Type: application/json; charset=utf-8
Date: Thu, 08 Aug 2024 21:01:53 GMT
ETag: W/"66-FmPYAaIkyQoroDwP2JsAZjWTAxs"
Server: nginx/1.25.1
Vary: Origin
X-Powered-By: Express

{
"createdAt": "2024-08-08T21:01:53.017Z",
"id": 1,
"name": "Choiru",
"updatedAt": "2024-08-08T21:01:53.017Z"
}

```
2 Get contacts API  (GET)

```bash
http get http://localhost/api/contacts


choiruzain@MacMarichoy-7 TestSystem % http get http://localhost/api/contacts
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Connection: keep-alive
Content-Length: 104
Content-Type: application/json; charset=utf-8
Date: Thu, 08 Aug 2024 21:04:58 GMT
ETag: W/"68-V+4KuL2xahYt8YAkKG6rKdR7wHg"
Server: nginx/1.25.1
Vary: Origin
X-Powered-By: Express

[
{
"createdAt": "2024-08-08T21:01:53.017Z",
"id": 1,
"name": "Choiru",
"updatedAt": "2024-08-08T21:01:53.017Z"
}
]


```
3. Show/create the API commmand to delete the contacts (DELETE)

```bash





```

4. Show/create the API command to edit the contacts (PUT)
```
http get http://localhost/api/contacts/1/phones

```

### Phone API


# Task 2
## Task 2.1
http GET http://localhost/api/contacts/
![Screenshot of result from GET contacts/ API](./Task2/T2_1.jpg)

## Task 2.2
http post http://localhost/api/contacts/ name="Jeremy"
![Screenshot of result from GET contacts/ API](./Task2/T2_2.jpg)

## Task 2.3
http delete http://localhost/api/contacts/9
![Screenshot of result from DELETE contacts/ API](./Task2/T2_3.jpg)

## Task 2.4
http put http://localhost/api/contacts/6 name="Jon"
![Screenshot of result from PUT contacts/ API](./Task2/T2_4.jpg)

## Task 2.5
http get http://localhost/api/contacts/3/phones
![Screenshot of result from GET phones API](./Task2/T2_5.jpg)

## Task 2.6
http post http://localhost/api/contacts/3/phones name="Home" number=0498765432
![Screenshot of result from ADD phones API](./Task2/T2_6.jpg)

## Task 2.7
http delete http://localhost/api/contacts/3/phones/6
![Screenshot of result from ADD phones API](./Task2/T2_7.jpg)

## Task 2.8
http put http://localhost/api/contacts/3/phones/5
![Screenshot of result from ADD phones API](./Task2/T2_8.jpg)

# Task 3
## Task 3.1
http GET localhost/api/contacts/
![Screenshot of result from GET contacts/ API](./Task3/T3_1.jpg)

## Task 3.2
http post http://localhost/api/contacts/ name="Ronald" address="123 Road street, bendigo"
![Screenshot of result from GET contacts/ API](./Task3/T3_2.jpg)

## Task 3.3
http delete http://localhost/api/contacts/13
![Screenshot of result from DELETE contacts/ API](./Task3/T3_3.jpg)

## Task 3.4
http put http://localhost/api/contacts/16 name="Ron"
![Screenshot of result from PUT contacts/ API](./Task3/T3_4.jpg)

## Task 3.5
http get http://localhost/api/contacts/3/phones
![Screenshot of result from GET phones API](./Task3/T3_5.jpg)

## Task 3.6
http post http://localhost/api/contacts/15/phones phone_type="Home" phone_number=0498765432
![Screenshot of result from ADD phones API](./Task3/T3_6.jpg)

## Task 3.7
http delete http://localhost/api/contacts/15/phones/17
![Screenshot of result from ADD phones API](./Task3/T3_7.jpg)

## Task 3.8
http put http://localhost/api/contacts/15/phones/
![Screenshot of result from ADD phones API](./Task3/T3_8.jpg)

# Task 4
The companies table was designed such that there is a 1:1 relationship between company and contact (each person works for 1 company as their main form of employment). Furthermore, given that this is a contact book kind of application, I thought to expose the company information through some deeper API rather than just /api/contacts so that the user would need to open the specific contact to be able to see the company detail (just like when adding contacts to your phone - you see the contact name. After opening the person's contact you see the phone number and company details).
## Task 4.2
The companies table is designed such that there is a 1:1 relationship between company and contact - each contact belongs to only 1 company.
### CREATE
http POST http://localhost/api/contacts/14/company company_name="Alphabet" company_address="Gamma street, Theta City"
![Screenshot of result from ADD company API](./Task4/T4_1.jpg)

### READ
http GET http://localhost/api/contacts/14/company
![Screenshot of result from GET company API](./Task4/T4_2.jpg)

### UPDATE
http PUT http://localhost/api/contacts/14/company company_name="XYZ Pty. Ltd."
![Screenshot of result from PUT company API](./Task4/T4_3.jpg)

### DELETE
http DELETE http://localhost/api/contacts/14/company
![Screenshot of result from DELETE company API](./Task4/T4_4.jpg)
