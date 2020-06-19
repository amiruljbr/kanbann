# Kanban
`Kanban Project Week 1. Simple web application of manage Your Team. This app has :`
> - Register
> - Login
> - Login with Google
> - Create Task
> - Delete Task
> - Edit Task
---
`environment variables: (.env)`
> - PORT=
> - SECRET=
> - CLIENT_ID=
---
`link deploy:`
> - https://baj-kanban2.web.app/ (client)
---
# RESTful endpoints
## Global Responses
_Response (500 - Unknown error)_
> This endpoint should always return response below,
```
{ "message": "Interval Server Error" }
```
---
## POST /register
> Create a new user account
_Request Header_
```
  no need
```
_Request Body_
```
{ 
  username: <username input>,
  email: <email input>,
  password: <password input>
}
```
_Response (201)_
```
{
    "id": <created id>,
    "email": <created email>,
    "username": <created username>
}
```
_Response (400 - Bad Request)_
```
{ 
    "message": <message>
}
```
---
## POST /login
> Login for User exist
_Request Header_
```
  no need
```
_Request Body_
```
{ 
  username: <username input> || email: <email input>,
  password: <email password>
}
```
_Response (200)_
```
{
    "access_token": <token>,
    "currentUser": {
        "id": 10,
        "email": "amiruljabar21@gmail.com",
        "username": "amiruljbr21"
    }
}
```
_Response (400 - Bad request)_
```
{ 
    "message": <email/username not found, Invalid, check email or password>
}
```
---
## POST /google-sign-in
> Google sign in 
_Request Header_
```
  no need
```
_Request Body_
```
{
  id_token: <given id_token>
}
```
_Response (200)_
```
{
    "access_token": <token>,
    "currentUser": {
        "id": 10,
        "email": "amiruljabar21@gmail.com",
        "username": "amiruljbr21"
    }
}
```
---
## GET /tasks
> Show All Todo List
_Request Header_
```
{
    "access_token": <token>
}
```
_Request Body_
```
  no need
```
_Response (200)_
```
[
  {
      "id": 2,
      "title": "Task 3",
      "description": "Desc 3",
      "category": "Completed",
      "UserId": 7,
      "createdAt": "2020-06-16T13:28:56.164Z",
      "updatedAt": "2020-06-16T13:28:56.164Z",
      "UserEmail": "amiruljabar41@gmail.com",
      "Username": "amiruljbr41"
  },
  {
      "id": 3,
      "title": "Task 2",
      "description": "Desc 2",
      "category": "Backlog",
      "UserId": 7,
      "createdAt": "2020-06-16T13:29:01.009Z",
      "updatedAt": "2020-06-16T13:29:01.009Z",
      "UserEmail": "amiruljabar413@gmail.com",
      "Username": "amiruljbr413"
  },
  {
      "id": 5,
      "title": "Task1",
      "description": "desc 1",
      "category": "Todo",
      "UserId": 7,
      "createdAt": "2020-06-19T01:27:44.443Z",
      "updatedAt": "2020-06-19T01:27:44.443Z",
      "UserEmail": "amiruljabar@gmail.com",
      "Username": "amiruljbr"
  }
]
```
---
## POST /tasks
> Create Todo List
_Request Header_
```
{
    "access_token": <token>
}
```
_Request Body_
```
{
    "title": <input title>,
    "description": <input description>,
    "category": <input category>
}
```
_Response (201)_
```
  {
    "id": 6,
    "title": <input title>,
    "description": <input description>,
    "category": <input category>,
    "UserId": 10,
    "createdAt": "2020-06-13T08:32:40.126Z",
    "updatedAt": "2020-06-13T08:32:40.126Z"
  }

```
---
## DELETE /tasks/:id
> Delete Todo List
_Request Header_
```
{
    "access_token": <token>
}
```
_Request Params_
```
{
    "id": <id task>
}
```
_Response (200)_
```
{
  1
}

```
_Response (400 - Bad request)_
```
  {
    "message": "you're not authorize"
  }

```
---
## GET /tasks/:id
> Get data from selected id
_Request Header_
```
{
    "access_token": <token>
}
```
_Request Params_
```
{
    "id":<id token>
}
```
_Response (200)_
```
  {
    "id": 6,
    "title": "dsads",
    "description": "fsafsaf",
    "category": "uncompleted",
    "UserId": 10,
    "createdAt": "2020-06-13T08:32:40.126Z",
    "updatedAt": "2020-06-13T08:32:40.126Z"
  }

```
---
## PUT /tasks/:id
> To submit Form Edit Task
_Request Header_
```
{
    "access_token": <token>
}
```
_Request Params_
```
{
    "id":<id task>
}
```
_Request Body_
```
{
    "title": "fsafs",
    "description": "fsafsaf",
    "category": "uncategorize",
}
```
_Response (200)_
```
{
  "title": "edit 1",
  "description": "edit 1",
  "category": "Done"
}

```
_Response (400 - Bad request)_
```
  {
    "message": "you're not authorize"
  }

```