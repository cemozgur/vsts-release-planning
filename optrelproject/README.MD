#VSTS - Release Planning plug-in

Testing branch

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


#Testing
1. First, git clone the repository, and change to the branch optreltesting
2. On the root folder (optrel), run: npm install
3. The folder that contains the demo test are on folder: /test 
4. To run the test on our beloved Microsoft project, on the terminal, run: npm run test

Highlights: 
Karma wont open any browser (Chrome, Mozilla), as it will work with a headless browser called Phantom.

#Learning
1. Webpack
https://www.youtube.com/watch?v=9kJVYpOqcVU

2. ReactJS
https://www.youtube.com/watch?v=MhkGQAoc7bc

3. TypeScript
