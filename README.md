# NodeJS API
REST API in Nodejs. This repositories are no view project but this project got everything like login system -> jwt token -> authentication -> Create -> view -> delete -> update.
This repositories are working as a API based system and view page you find my other repositories (https://github.com/tasherul/NodeJS_View). The main Database and Backend process
are on this repositories and the other one showing the this data.

Also use docker images sytem that makes virtual nodejs server. [if you run this application in docker then must Install Docker]

#Application Run must need

    NodeJS Version <= v15.9.0

    NPM Version <= 7.5.4

Check your NPM version

    npm --version

Check your Node version

    node --version

Install Express Framework 

    npm install --save express
    
Install nodemon

    npm install --save-dev nodemon

		if any problem in nodemon
		-----------------------------
		npm install -g nodemon 
		npm install -g nodemon --save 
		npm install --save-dev nodemon 
		npm install -g nodemon@debug 
		npm install -g --force nodemon
		-------------------------------
		if any powershall problem for security 
		--------------------------------------
		Set-ExecutionPolicy Unrestricted
            Type Y or A   
    
Install Morgan

    npm install --save morgan
    
Install *body-parser*  [for body posting json]

    npm install --save body-parser 
    
Install *mongoose* [for mongo db database]

    npm install --save mongoose 
    
Install *bcrypt* [for secure password]

    npm install bcrypt --save
    
Install JWT token Script [for session secure or encrypt data]    

    npm install jsonwebtoken --save

Install UUID for random Uuid collection 

    npm install uuid --save
    
    npm i uuid-random --save
    
Then Run your server and check it [without docker system]
    
    nodemon server.js

this server will run in *3000* port it look like (localhost:3000) or (http://localhost:3000) or (http://your_ip:3000)
this is api system so if you run it not show anything. when this server run then you run #nodejs_view my other repositories 
(https://github.com/tasherul/NodeJS_View)

Build your Docker Image

    docker build -t nodejsapi:1.0 .
    
    [must have DockerFile in repositories i give you]
 
Find your image
  
    docker images
    
It look like
 
    REPOSITORY         TAG          IMAGE ID              CREATED         SIZE
    nodejsapi          1.0          ec568zxcc654d         1 weeks ago     225.02 MB
    
Now run you docker image

  docker run ec568zxcc654d
  
in (ec568zxcc654d) image code is different in your maching. now run it will run it and you can see.

    if any problem your docker you use  [nodemon server.js] this code will run it 
    
if any problme to run your Nodejs api then i send a other document you can download and unzip and check it
https://drive.google.com/file/d/1Vb_8l02wAdpcvaNH7lC5gRF4EbJpohB6/view?usp=sharing

#thank you 

      Author 
      ---------
      Tasherul Islam
      whatsapp: https://wa.me/8801610037670
      mail: tasherulislam@gmail.com
