### Setup

make sure you have node.js installed

run: ``npm install``

run: ``npm start``

### For unit testing

add in package.json in root json level property
 ``type: "module",`` - this is workaround for running unit tests issue with importing modules

run command ``npm run test``

P.S. but remove ``type: "module",`` from ``package.json`` while run project because it will fail start and import modules