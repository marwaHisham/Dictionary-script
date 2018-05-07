var Dictionary = {};
const fs = require("fs");
var myArgs = process.argv.slice(2);
if (myArgs)
  try {
    data = fs.readFileSync("dict");
  } catch (err) {
    fs.writeFileSync("dict", "{}")
  }



switch (myArgs[0]) {
  case 'add':
    try {
      if (!myArgs[1] || !myArgs[2]) {
        console.log("empty args");
      }
      Dictionary = JSON.parse(data);
      Dictionary[myArgs[1]] = myArgs[2];
      fs.writeFileSync("dict", JSON.stringify(Dictionary))
      break;
    }
    catch (err) {
      fs.writeFileSync("dict", "{}")
      data = fs.readFileSync("dict");
      Dictionary = JSON.parse(data);
      Dictionary[myArgs[1]] = myArgs[2];
      fs.writeFileSync("dict", JSON.stringify(Dictionary))
    }

  case 'list':
    fs.readFile('dict', 'utf8', function (err, data) {
      if (err) throw err;
      console.log(data);
    });
    break;
  case 'get':
    let read = [];
    let dataread = fs.readFileSync("dict");
    read = JSON.parse(dataread);
    if (read[myArgs[1]]) {
      console.log(myArgs[1] + " : " + read[myArgs[1]])
    } else {
      console.log("can not find key")
    }
    break;
  case 'remove':

    if (myArgs[1]) {
      let dataremoveData = fs.readFileSync("dict");
      Dictionary = JSON.parse(dataremoveData);
      if(Dictionary[myArgs[1]]){
      delete Dictionary[myArgs[1]];
      fs.writeFileSync("dict", JSON.stringify(Dictionary))
      console.log("done");
      
      }else{
        console.log("not found")
      }
     
    } else {
      console.log("something  error ");
    }
    break;
  case 'clear':
    fs.writeFileSync("dict", "{}")
    break;
  default:
    console.log('Sorry, that is not something I know how to do.');
}