This application provides RestFull services to communicate with Cassandra NoSQL database.

# **REST API Specifications** #

## POST Method Requests: ##


/keyspaces
-Creates a keyspace

/keyspaces/[keyspace_name]/tables
Creates a table in specified keyspace

/keyspaces/[keyspace_name]/tables
/[table_name]/columns
-Creates column in specified table and keyspace.

/keyspaces/[keyspace_name]/tables
/[table_name]/records
-Insert new record in specified table and keyspace.

/connections
-add new connection


### ## -JSON request body for POST requests: ## ###
**/keyspaces**

{
  “keyspaceInfo”: {
"options": [
    {
      "key": "replication_factor",
      "value": 3
    }
  ],
  "strategy": "SimpleStrategy",
  "name": "SomeName"
}
OR
{
  "options": [
    {
      "key": "dc1",
      "value": 3
    },
   {
      "key": "dc2",
      "value": 2
    }
   ….

  ],
  "strategy": "NetworkTopologyStrategy",
  "name": "SomeName"
 }
}
}

**/keyspaces/[keyspace_name]/tables**

{
  "tableInfo":{
  "name": "myTable2",
  "columns": [
    {
      "name": "id",
      "dataType": "uuid"
    },
    {
      "name": "dob",
      "dataType": "text"
    }
  ],
  "primarykeys": [
    "id", "dob"
  ],
  "clusteringColumns": []
}
}


**/keyspaces/[keyspace_name]/tables/[table_name]/columns**

{
  "columnInfo": {
    "name": "someName",
    "type": "text"
  }
}




**/keyspaces/[keyspace_name]/tables /[table_name]/records**


{
  "recordInfo": {
    "columns": [
      {
        "name": "email",
        "value": "’dummy@dummy.com’",
        “type”:”text”
      },
      {
        "name": "first_name",
        "value": "’Ali’",
       “type”:”text”
      },
      {
        "name": "top_scores",
        "value": [
          "12",
          "43",
          "54"
        ],
       “type”:”set<int>”
      }
    ]
  }
}





**/connections**


{
  "connectionInfo": {
    "name" : "connName",
    "hosts": [
      "127.0.0.1"
    ],
   “port”:9042
  }
}



## GET Method Requests ##

/keyspaces
-Retrieve all keyspaces

/keyspaces/[keyspace_name]
-Retrieve specific keyspace

/keyspaces/[keyspace_name]/tables
-Retrieve tables in specified keyspace

/keyspaces/[keyspace_name]/tables/[table_name]
-Retrieve specified table in keyspace.

/keyspaces/[keyspace_name]/tables
-/[table_name]/columns
Retrieve columns in specified table and keyspace.
/keyspaces/[keyspace_name]/tables
/[table_name]/records
Retrieve all records in specified table and keyspace.

/connections
-Retrieve all connections

/execute?statement=”some query”
-executes the query and return result


## DELETE Method Requests ##


/keyspaces/[keyspace_name]
-Drop keyspace 


/keyspaces/[keyspace_name]/tables/[table_name]
-Drop table in specified keyspace

/keyspaces/[keyspace_name]/tables/[table_name]/columns/[column_name]
-Drop columns in specified table and keyspace.

/connections
-Delete specified connection

  ### JSON request body for Delete requests: ###
/connections


{
  "connectionInfo": {
    "name" : "connName",
  }
}




## Response Message Format for all requests##


{  
   "success":false,
   "data":[  
         ],
   "message":"",
   "errorCode":-1
}



## installation guide: ##

install node:

### step 1: ###
- nodejs.org
or
- brew install node

### step 2: ###

-open terminal
-goto root dir of application
-run command "npm install"
-run command "node bin/www"