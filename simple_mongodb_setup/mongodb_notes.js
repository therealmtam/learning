/*
Installation of Mongodb and it's tools to get started on MacOS:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

Video tutorial:
https://www.youtube.com/watch?v=-56x56UppqQ

Install Mongo Compass - Gui for local mongo development
https://www.mongodb.com/try/download/compass

--------------------------------------
Install Notes:
- For mac 10.12 use Mongo-community@4.2 version.

https://docs.mongodb.com/v4.2/tutorial/install-mongodb-on-os-x/

- I ended up using the tgz download path to getting mongodb. I unzipped the tgz and moved all the binaries from the bin folder contained in the unzipped tgz to the /usr/local/bin folder. And now you can run ""> mongo" in a shell and spin up mongo. This was much easier than homebrew which for some reason did not install the mongo shell commands in the bin folder.

To uninstall mongo, you would need to remove these binaries that came with 4.2 from the bin folder and you are done:
bsondump
install_compass
mongo
mongod
mongodump
mongoexport
mongofiles
mongoimport
mongoreplay
mongorestore
mongos
mongostat
mongotop
--------------------------------------
Running Mongo Notes:

When you don't install via brew, you have to use a different command to run it as a background process:
> mongod --config /usr/local/etc/mongod.conf --fork

This will return you a proces id:
> MaxTam            4307   0.1  0.4  3691180  31696   ??  S     8:48PM   0:01.25 mongod --config /usr/local/etc/mongod.conf --fork

And to see the background process running:
> ps aux | grep -v grep | grep mongod

To kill the process:
> pkill mongod

After you run the mongod process which actually is a server spun up and accessible via a port (default port for mongo is 27017), you can open up a mongo shell to send commands to that process/server by first creating the shell:
> mongo

To exit the shell properly:
> exit

Sidenote:, you can see once you create the mongo background process, you can verify it running on the port via the browser by doing a GET to the server:
> GET http://localhost:27017/

and you'll get this response:
> It looks like you are trying to access MongoDB over HTTP on the native driver port.
--------------------------------------
Mongo Notes:

- When you use the community version, you have 3 DBS default created for you (Admin, Config, and Local). You can then create your own database and create your own collections.

- Collections are similar to ~ tables in sql. They are the tables in a specific database.

- Collections contain documents (entries) in the "table".

- Schema Design of NoSql https://www.youtube.com/watch?v=leNCfU5SYR8

*/