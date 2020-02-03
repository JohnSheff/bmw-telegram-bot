const turl = require ('turl');


class Linker {
  constructor (parsedFile) {
    this.parsedFile = parsedFile;
  }
  
  linkMaker () {
    let arr = this.parsedFile;
    switch (arr[0]) {
      case 'KJ39':
        arr.splice(0,1, "TX31");
        break;
      case "KJ79":
        arr.splice(0,1, "TX71");
        break;
      case "KJ99":
        arr.splice(0,1, "TY51");
        break;
      case "TR91":
        arr.splice(0,1, "TY51");
        break;
      case "TS31":
        arr.splice(0,1, "TY91");
        break;
      case "TR51":
        arr.splice(0,1, "TY11");
        break;
      case "KJ59":
        arr.splice(0,1, "TY11");
        break;
    }
    
    let newArr = [];
    let model;
    arr.forEach((element)=> {
      let text;
      let newStr;
      
      if(element==arr[0]){
        model=element;
      } else if (element == arr[1]) {
        text = element.split('');
        text.unshift("P", "0");
        newStr = text.join('');
        newArr.push(newStr)
      } else if (element == arr[2]) {
        text = element.split('');
        text.unshift('F');
        let newStr = text.join('');
        newArr.unshift(newStr);
      } else if (element.length === 3) {
        text = element.split('');
        text.unshift("S", "0");
        newStr = text.join ('');
        newArr.push (newStr);
      }
      else if (element.length === 4 && !newArr.includes (element)) {
        text = element.split ('');
        text.unshift ('S');
        newStr = text.join ('');
        newArr.push (newStr);
      }
    });
    let address = newArr.join (',');
    let modelUrl = `https://configure.bmw.ru/ru_RU/summary/G01/${model}/${address}`;
    
    return turl.shorten (modelUrl)
  }
}

module.exports=Linker

