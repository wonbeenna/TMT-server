// hello world
//hi

// 젭알젭알!!!!

import indexer from "./trip/indexer";

const data = {
  elasticsearch: {
    url: "http://localhost:",
    port: "9200",
    elasticsearchIndices: {
      PLACE: {
        index: "spot",
        type: "SPOT",
        collectionName: "dbs",
      },
    },
  },
};

const indexName = data.elasticsearch.elasticsearchIndices.PLACE.index;
const indexType = data.elasticsearch.elasticsearchIndices.PLACE.type;
const tableName = data.elasticsearch.elasticsearchIndices.PLACE.collectionName;

indexer.DeleteMappings(indexName);
