# NewRelic Test

## About the test

Thank you for letting me participate in this process I had a lot of fun doing this test since it took a lot of platform knowledge that we don't have to use on a day-to-day basis now.

It was asked me to use everything that I got on this, so I decide that since I can't use any framework/library to help me build the component, I would create one myself, That way I would show a lot about myself and I really think that you guys can enjoy it.

## Installation

1. Execute `yarn` to install all modules dependencies
2. Execute `yarn start` to start the application
3. Navigate to `http://localhost:8080/` at the browser

## Documentation

You can check the topics in this section:

- Client
  - [Components](docs/component.md)
    - [Decorator](docs/component.md#decorator)
    - [Import](docs/component.md#import)
- Server
  - [APIs](docs/api.md)
    - [Decorator](docs/api.md#decorator)
    - [Host API](docs/api.md#host-api)
  - [Service](docs/service.md)
  - [Repository](docs/repository.md)
- [Store](docs/store.md)

## Summary

This project was split in 3 milestones:

- Component builder
- API Builder
- State/Data Flow (Store)

The diagram bellow shows the basic data flow of the project:
![Structure Diagram](/docs/Structure%20Diagram.png)

#### Presentation Layer

To present component on the page dynamically, there is an annotation `@Component` that takes the HTML and CSS to inject in a Shadow DOM created inside the component.

There is a Dynamic Store that allows you to subscribe to change made to variables inside it. The Store uses a PUB/SUB pattern, that generates CustomEvents in the platform to notify whoever is waiting for that change.

#### Business Layer

Responsible for the presentation and transformations of the data, it will manage all data coming from the Data Layer.

#### Data Access Layer

The only source of data give was the host-app-data.json, this file has a list of applications that contains a list of hosts

## Project Structure

```
+-- dist
+-- documentation
+-- node_modules
+-- src
|   +-- assets
|   |   +-- css
|   |   |   +-- main.css
|   |   +-- data
|   |   |   +-- host-app-data.json
|   |   +-- fonts
|   |   |   +-- HelveticaNeue.ttf
|   +-- client
|   |   +-- index.js                // client init file
|   |   +-- html
|   |   |   +-- index.html
|   |   +-- js
|   |   |   +-- constants.js
|   |   |   +-- store.js
|   |   |   +-- components
|   |   |   |   +-- AppPage
|   |   |   |   +-- CardBox
|   |   |   |   +-- DialogBox
|   |   |   |   +-- ScoreItem
|   |   |   |   +-- TopHeader
|   |   |   |   +-- ComponentModule.js
|   |   |   +-- core
|   |   |   |   +-- ComponentDecorator.js
|   |   |   |   +-- ComponentImport.js
|   +-- common
|   |   +-- heapSort.js
|   |   +-- logger.js
|   +-- Server
|   |   +-- server.js               // server init file
|   |   +-- ApiModule.js
|   |   +-- FileAssetController.js
|   |   +-- RegisterApiDecorator.js
|   |   +-- api
|   |   |   +-- Host.js
|   |   |   +-- User.js
|   |   +-- service
|   |   |   +-- HostService.js
|   |   |   +-- UserService.js
|   |   +-- respository
|   |   |   +-- HostRepository.js
|   |   |   +-- UserRepository.js
+-- .babelrc
+-- .eslintrc.js
+-- .gitignore
+-- .prettierrc
+-- jsconfig.json
+-- package.json
+-- prebuild.js
+-- README.md
+-- webpack.config.js
+-- yarn.lock
```

## Setup & Start project

To start the project, you have to install the dependencies beforehand:

```bash
yarn
```

Then you can start the project:

```bash
yarn run start
```

To run the test:

```bash
yarn run test
```

This project uses:

- Bundler:
  - Webpack
    Plugins:
    - copy-webpack-plugin
    - file-loader
    - html-loader
    - html-webpack-plugin
    - mini-css-extract-plugin
    - optimize-css-assets-webpack-plugin
    - style-loader
    - uglifyjs-webpack-plugin
    - url-loader
    - webpack-merge
- Compiler:
  - Babel
    - @babel/plugin-proposal-class-properties
    - @babel/plugin-proposal-decorators
    - @babel/preset-env
    - babel-eslint
    - babel-loader
  - Eslint
    - eslint-loader,
    - eslint-plugin-import,
- Polyfill
  - construct-style-sheets-polyfill

\*The polyfill is used make the class `CSSStyleSheet` accessible in all browsers,

## About the author

I'm **Caique Lopes Sousa**, born in Brazil but living London at the moment. I'm working as a Senior Frontend Engineer at Spotahome which I'm currently responsable working on the new Design System of the company, creating and evolving the inventory(tokens, components, etc) and merging the react components distributed between all produts into one.
