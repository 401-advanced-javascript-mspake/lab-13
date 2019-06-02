![CF](http://i.imgur.com/7v5ASc8.png) LAB  
=================================================  
  
## Lab 13  
  
### Author: Morgana Spake

### Links and Resources  
* [submission PR](https://github.com/401-advanced-javascript-mspake/lab-13/pull/1)  
* [travis](https://www.travis-ci.com/401-advanced-javascript-mspake/lab-13)  
  
#### Documentation
* [api docs](http://xyz.com) (API servers)
* [jsdoc](http://xyz.com) (Server assignments)
* [styleguide](http://xyz.com) (React assignments)

### Modules  
#### `app.js, google.js, middleware.js, router.js, users-model.js, 404.js, error.js`
##### Exported Values and Methods

###### `app -> express server`  
###### `google -> google auth2.0 authentication function`  
###### `book -> express Router instance`  
###### `middleware -> authentication middleware`  
###### `router -> express Router instance`  
###### `users-model -> mongoose model`  
###### `404 -> route not found middleware`  
###### `error -> error handler middleware`  
  
### Setup  
#### `.env` requirements  
* `PORT` - Port number  
* `MONGODB_URI` - URL to the running mongo instance/db  
* `SECRET` - Secret used to encode tokens and keys  
* `GOOGLE_CLIENT_ID`
* `GOOGLE_CLIENT_SECRET`
* `EXPIRATION` - If you want tokens to expire set the time here (i.e: 15m or 1hr, etc...)  
* `SINGLE_USE` - If you want tokens to be single use, set this to true.  
    
#### Running the app  
* `npm start`  
Endpoints:  
* `/signup` - basic auth only  
* `/signin` - basic auth only  
* `/oauth` - oauth google login  
* `/key` - Using your signin token, you can generate a key that never expries and allows you access to the protected route.  
* `/protected-route` - Accessible with either a valid token or key.  
  
#### Tests  
* How do you run tests?  `npm test`  
* What assertions were made?  
    * can create a user  
    * can signin with basic  
    * can assign a key to a user  
    * can access the protected route with a token  
    * can access the protected route with a key  
    * single use tokens can only be used once  
    * keys can be used more than once  
* What assertions need to be / should be made?  
    * Expired tokens no longer work  
  
#### UML  
![uml](https://github.com/401-advanced-javascript-mspake/lab-13/tree/bearer-authorization/assets/uml.jpg)