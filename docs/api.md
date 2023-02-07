[Back to Home](../README.md)

# APIs

The API endpoints were created using node `http.createServer`, it serves all file and assets using the `FileAssetController.js` and responds to the API calls with using the `ApiModule.js`.

The `ApiModule` class is the core of the endpoint builder engine. It knows how to parse the params, register new API and execute the controllers for them.

### Decorator

The `@RequestApi` is a decorator that transforms a static method into an endpoint, it just creates a reference with all the endpoints inside a private variable.

To make API activate the API you have to add it to the list inside `src/server/controller/index.js`. The `ApiModule.import` takes this list and make it available as a public endpoint.

Controller using the decorator

```js
export default class User {
  @RegisterApi('GET', '/user/(?<id>\\d+)')
  static getUserById(req, res, done, params) {
    // Your code here ...
  }
}
```

The `@RegisterApi` injects 4 arguments inside the function:

###### Parameters

| Param | Type         | Default | Description                          |
| ----- | ------------ | ------- | ------------------------------------ |
| req   | HTTPRequest  |         | HTTP Request                         |
| res   | HTTPResponse |         | HTTP Response                        |
| done  | function     |         | Function that ends the request       |
| param | object       |         | return all the path and query params |

### Host/User API

There are 4 public endpoints:

#### /host/apps/

##### GET

###### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Return list of Host |

##### POST

###### Responses

| Code | Description              |
| ---- | ------------------------ |
| 200  | Add application to hosts |

###### Parameters

| Name          | Located in | Description                          | Required | Schema   |
| ------------- | ---------- | ------------------------------------ | -------- | -------- |
| name          | body       | Application name                     | Yes      | string   |
| apdex         | body       | Score of the application             | Yes      | integer  |
| version       | body       | Version of the application           | Yes      | integer  |
| collaborators | body       | List of collaborators                | No       | string[] |
| host          | body       | List of host to add this application | Yes      | string[] |

#### /host/{host}/apps/{app}

##### DELETE

###### Responses

| Code | Description |
| ---- | ----------- |
| 200  | SUCCESS     |

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| host | path       | Host name   | Yes      | string |
| app  | path       | App name    | Yes      | string |

#### /user/{id}

##### GET

###### Responses

| Code | Description |
| ---- | ----------- |
| 200  | SUCCESS     |

###### Parameters

| Name | Located in | Description | Required | Schema  |
| ---- | ---------- | ----------- | -------- | ------- |
| id   | path       | User id     | Yes      | integer |

## Repository

Based on the exercise it database used to this project is the host mock JSON supplied. The repository only takes care of reading and write to the file.

## Service

The services are responsible for manipulate the data gathered from the Repository before responding to the controllers.
