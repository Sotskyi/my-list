const Models = require("../models/Transaction");
const scraper = require("../modules/scraper");

// route get api/words

exports.getWords = async (req, res, next) => {
  try {
    const queryName = req.query.word;

    let findvalue = await Models.find(
      { value: new RegExp("^" + queryName, "i") },
      function (err, doc) {
        if (err) {
          console.log(err);
        }
        // return doc.forEach((elem)=> result.push(elem.value))
      }
    );
    let result = findvalue.map((elem) => elem.value);

    return res.status(201).json({
      value: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
exports.addWords = async (req, res, next) => {
  try {
    const { listName, listItems } = req.body;
    const queryListName = req.body.listName;
    const queryListItems = req.body.listItems;
    const queryItem = Object.keys(queryListItems);
    let findList = await Models.findOne({ listName });

    if (findList) {
      console.log("find listname" + findList);
      if (Object.keys(findList.listItems).includes(queryItem[0])) {
        console.log("item exist");
        return res.status(200).json({
          success: true,
          act:"word exist in your list!"
        });
      } else {
        findList.listItems[queryItem] = Object.values(queryListItems)[0];
        let result = findList.listItems
        await Models.updateOne(
          { listName },
          { $set: { listItems: result } }
        );
        return res.status(200).json({
          success: true,
          act:"word added!"
        });
      }
    } else { // create Ob
     
      console.log(req.body)
      await Models.create(req.body);
      return res.status(200).json({
        success: true,
        act:"word added!"
      });
    }

   
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.translate = async (req, res, next) => {
  try {
    const { translate } = req.body;

    if (translate) {
      let scrapeData = await scraper(translate);
      return res.status(200).json({
        success: true,

        data: scrapeData,
      });
    } else {
      console.log(translate);
      return res.status(200).json({
        success: true,

        data: translate,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
exports.allWords = async (req, res, next) => {
  try {
   

    let findvalue = await Models.find(
      {"listName":{$exists: true}},
      function (err, doc) {
        if (err) {
          console.log(err);
        }
        // return doc.forEach((elem)=> result.push(elem.value))
      }
    );
   
       let example={};
    let result = findvalue.forEach((elem) => { for (let [key, value] of Object.entries(elem.listItems)) {
      
      example[key]=value }         }  );
    
  

    return res.status(201).json({
      value: example,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.listName= async (req, res, next) => {
  try {
    const listName = req.query.listname;
   
    let findList = await Models.findOne({ listName });
    
  
    if (findList){  return res.status(201).json({
     status: "success",
     data:findList
    })} 
    
  } catch (err) {
    return res.status(201).json({
      status:"no such listname"
    });
  }
};