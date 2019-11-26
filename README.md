# dash
An anonymous chat app built with feather.js, socket.io, express, and react.js

## The Goal
My goal with this project is to learn how to use feather.js and socket.io and reinforce my skills in react.js while also implementing a chat app.

## Getting Started
Change in package.json the start script 
```
"test": "echo \"Error: no test specified\" && exit 1"
```

to
```
"start": "node app"
```

### Feathers.js
- What is Feathers.js? 
Feathers is a web-framework for creating real-time applications and REST APIs using JavaScript or TypeScript with Node.JS, React Native and the browser.

It works with any backend supporting many databases out of the box and with any frontend technology like React, VueJS, Angular, Android or iOS.

- Command Line with integration with express and socketio. Moment.js is a package that will aid with time in the application: 
```
npm i @feathersjs/feathers @feathersjs/express @feathersjs/socketio moment
```
### React.js
```
npm i react react-dom @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli babel-loader
```

### Babel & Babel presets
Babel is a JavaScript transpiler that converts edge JavaScript into plain old ES5 JavaScript that can run in any browser (even the old ones).

It makes available all the syntactical sugar that was added to JavaScript with the new ES6 specification, including classes, fat arrows and multiline strings.

