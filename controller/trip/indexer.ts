const elasticsearch = require("elasticsearch");
const mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";

const elasticClient = new elasticsearch.Client({
  host: "http://localhost:9200",
});

let itemQue: any = [];
let limitData = 1000;
let offset = 0;
let prev = 0;
let iIndex = 1;

function bulkop(data: any, callback: any) {
  elasticClient.bulk(
    {
      body: data,
    },
    function (error: any, response: Response) {
      if (callback) callback(error, response);
    }
  );
  data = [];
}

export const indexMongodbData = function IndexMongodbData(
  esIndexName: any,
  esIndexType: any,
  collectionName: any
) {
  mongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err: any, client: any) {
      if (err) {
        console.log("Sorry unable to connect to MongoDB Error:\n");
      } else {
        // mongodb
        console.log("Connected successfully to server");
        let db = client.db("myFirstDatabase");
        db.collection(collectionName, function (err: any, collection: any) {
          collection
            .find({})
            .skip(offset)
            .limit(limitData)
            .sort({ _id: -1 })
            .toArray(function (err: any, result: any) {
              if (result.length > 0) {
                process.nextTick(function () {
                  result.forEach((element: { _id: any }) => {
                    if (element._id) {
                      itemQue.push({
                        index: {
                          _index: esIndexName,
                          _type: esIndexType,
                          _id: element._id,
                        },
                      });
                      delete element._id;
                    } else {
                      itemQue.push({
                        index: {
                          _index: esIndexName,
                          _type: esIndexType,
                          _id: iIndex,
                        },
                      });
                      // console.log(itemQue);
                    }
                    itemQue.push(JSON.stringify(element));
                    // console.log(itemQue);
                    iIndex++;
                  }); //End For loop

                  if (itemQue.length > 0) {
                    // console.log(JSON.stringify(itemQue));
                    bulkop(itemQue, function (err: any, res: Response) {
                      prev = offset;
                      offset = offset + limitData;

                      console.log("prevSet :" + prev + " newSet : " + offset);
                      if (err) console.log(err);
                      else if (res) {
                        console.log("Data Items added succesfully ");
                        IndexMongodbData(
                          esIndexName,
                          esIndexType,
                          collectionName
                        );
                      }
                    }); //end Bulk copy Elastic search
                  } else {
                    process.exit();
                  }
                }); //Process Next tick
              } //end if result
              else {
                console.log(
                  "All the data successfully imported into the Elasticsearch!"
                );
                process.exit();
              }
            }); //end select query mongo collection table
        });
      }
    }
  );
};

export const deleteMappings = function DeleteMappings(esIndexName: any) {
  elasticClient.indices.delete(
    {
      index: esIndexName, //delete all indices '_all'
    },
    function (err: any, res: Response) {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Indices have been deleted!", esIndexName);
      }
    }
  );
};

//exports = { IndexMongodbData, DeleteMappings };
