# User list generator

This is a small application which generate a table 
with users within 100km from Dublin

## Instalation

You will need `node.js` and `git` installed on your machine

```bash
git clone https://github.com/jucasoliveira/user-invitee.git && cd user-invitee
```

```bash
npm install
```

The project structure should appears :

```
/bin
    www
/modules
    calcDistante.js
/node_modules
/public
    /images
    /javascripts
    /stylesheets
    faviicon.ico
/routes
    index.js
    userlist.js
/userlistJson
    userListJson.json
/views
    error.hbs
    index.hbs
    layout.hbs
    userslist.hbs
.gitignore
apps.js
app-test.spec.js
email-inviter.iml
package.json
package-lock.json
README.md
```

## To run application

```bash
npm start
```
Will open running the application. To see it go to your browser at 
```html
http://localhost:3000/
```
To change your localhost port, you must change on bin/www, line 15 or inserting env file with the port you want
```javascript
var port = normalizePort(process.env.PORT || '3000');
``` 

* First Page.
  * The initial page should look like:
  * ![frontpage](/public/images/frontpage.png)
  
* User list.
  * After clicking on 'See List', the page should render the table:
  * ![tablelist](/public/images/tablelist.png)

## Distance calculation

To calculate the distance between the userlist and the fixed point, was used [Haversine Formula](https://en.wikipedia.org/wiki/Haversine_formula) .
This formula is calculated on `./modules/calcDistance`:

```javascript
let R = radius;
    let φ1 = this.lat.toRadians(),  λ1 = this.lon.toRadians();
    let φ2 = point.lat.toRadians(), λ2 = point.lon.toRadians();
    let Δφ = φ2 - φ1;
    let Δλ = λ2 - λ1;

    let a = Math.sin(Δφ/2) * Math.sin(Δφ/2)
        + Math.cos(φ1) * Math.cos(φ2)
        * Math.sin(Δλ/2) * Math.sin(Δλ/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;
```
##### Testing

```bash
npm test
```
It will run tests against `app-test.spec.js` file using Mocha

![coverage](/public/images/coverage.png)