#VSTS - Release Planning plug-in

#Introduction
This project will extend VSTS platform in order to generate a Release Plan.

#Getting Started
1.	Pre-requisites
Please download Node.js v.6.9.4 and install it on your local machine.

Once installed, open console/terminal and run this command:
npm install npm@latest -g

2.	Setting-up the local environment
Open console/terminal on the folder you have git clone the repository and run this command: 
npm install

3.	Build the package to publich on the VSTS platfom.
Open console/terminal on the folder you have git clone the repository and run this command: 
npm run vsts

tfx extension publish --publisher ytaloborjamori --vsix ytaloborjamori.vsts-extensions-optrel-1.0.36.vsix --share-with ytachi0026 --token n5hzm74vlbdf5sql6qoe5xoj65kc76e7fp7fkkan6hjmg4eamzuq

tfx extension install --publisher ytaloborjamori --extension-id vsts-extensions-optrel --accounts ytachi0026 --token n5hzm74vlbdf5sql6qoe5xoj65kc76e7fp7fkkan6hjmg4eamzuq



#Learning
1. Webpack
2. ReactJS
3. TypeScript
