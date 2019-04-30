const $ = require('jquery');
const AbortController = require('abort-controller');
const thrift = require('thrift');
const API = require('../gen-nodejs/API');
const convert = require("./convert");

function selectNode() {

  let activeNodes = new Array();

  return new Promise(function(resolve, reject) {

    let fetchResult;
    let completeRes = 0;

  	const result = $.ajax({
  		url: 'http://173.249.11.161/nodetestnet.json',
      success: function(result) {
        for(let index in result) {
          var sendDate = (new Date()).getTime();
          fetchResult = fetchAsync("http://"+result[index].ip+":8081/thrift/service/Api", 500)
          .then(function(val) {
            var receiveDate = (new Date()).getTime();
            var responseTimeMs = receiveDate - sendDate;
            activeNodes.push([result[index].ip, responseTimeMs]);
            completeRes++;
            if(completeRes === result.length) {
              syncState(activeNodes)
              .then(function(r) {
                chrome.storage.local.set({
            	 		'ip': r,
                  'port': 8081
            		});
                resolve(r);
              });
            }
          })
          .catch(function(val) {
            completeRes++;
            if(completeRes === result.length) {
              syncState(activeNodes)
              .then(function(r) {
                chrome.storage.local.set({
            	 		'ip': r,
                  'port': 8081
            		});
                resolve(r);
              });
            }
          });
        }
      }
  	});
  });
}

async function fetchAsync(url, abortTime) {
  const controller = new AbortController();

  const timeout = setTimeout(
  	() => { controller.abort(); },
  	abortTime,
  );

  return await fetch(
    url,
    {
  		headers: {"Content-Type":"application/x-thrift"},
      body: "[1,\"SyncStateGet\",1,1,{}]",
      method: 'POST',
      signal: controller.signal
    });
}

async function syncState(selectedNodes) {

  let options = {
    transport: thrift.TBufferedTransport,
    protocol: thrift.TJSONProtocol,
    path: "/thrift/service/Api",
    https: false
  };

  let syncedNodes = new Array();
  let completed = 0;
  let len = selectedNodes.length;
  let highestRound = 0;

  for(i=0;i<len;i++) {

    let ipNode = selectedNodes[i][0];
    let responseTime = selectedNodes[i][1];

    let connection = await thrift.createHttpConnection(ipNode, 8081, options);

    connection.on("error", function(err) {
       console.log("Error: " + err);
    });

    let client = await thrift.createHttpClient(API, connection);

    let response = await client.SyncStateGet();
    completed++;
    let curRound = convert(response.currRound.buffer);
    let lastBlock = convert(response.lastBlock.buffer);

    if(lastBlock > highestRound) {
      highestRound = curRound;
    }

    if((curRound-lastBlock) < 10 && curRound != 0) {
      syncedNodes.push([ipNode, responseTime, curRound, (curRound-lastBlock)]);
      console.log(ipNode + " is synced (" + (curRound-lastBlock) + ") MS: " + responseTime);
    } else {
      syncedNodes.push([ipNode, responseTime, lastBlock, (curRound-lastBlock)]);
      if(curRound === 0) {
        console.log(ipNode + " returns block 0, MS: " + responseTime);
      } else {
        console.log(ipNode + " is NOT synced (" + (curRound-lastBlock) + " blocks remaining) MS: " + responseTime);
      }
    }

    if(completed === len) {
      let syncedNode = new Array();
      let complete = 0;
      let leng = syncedNodes.length;

      for(i=0;i<leng;i++) {
        let roundDif = highestRound-syncedNodes[i][2];

        if(roundDif < 10 && syncedNodes[i][2] != 0) {
          syncedNode.push([syncedNodes[i][0], syncedNodes[i][1], syncedNodes[i][3]]);
          console.log("accept " + syncedNodes[i][0]);
          complete++;
        } else {
          console.log("reject " + syncedNodes[i][0]);
          complete++;
        }

        if(complete === leng) {
          if(syncedNode.length == 0) {
            alert('No node found');
          } else {
            return syncedNode[0][0];
          }
        }
      }
    }
  }
}

module.exports = selectNode;
