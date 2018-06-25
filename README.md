# eid-angular
oxford dictionary api



steps for up and running

* `npm install`
* `nodemon server/index.js`
* `mongod --dbpath=data/db/ (run mongod)`
* get the shell to mongodb  `mongo --host 127.0.0.1:27017` Some common commands to run under mongod shell

* `show dbs`
* `use <db_name> e.g use angular`
* `show collections`
* `db.<collection_name> e.g db.repos.find({})` note the model 'Thesaurus' defined in schema, auto converts to plural collection_name

```

