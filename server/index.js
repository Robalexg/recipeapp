const express = require('express');
const path = require('path');
const app = express();
const axios = require("axios");

app.use(express.json())
app.use(express.static(path.join(__dirname, '../build')));

const thumbDescription = (str) => {
  var description = str

  if(str != null) {
    if(str.length >= 100){
      description = description.slice(0,97)
      description += '...'
    }
    return description
  }

  return 'No Description'
}



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, +'../build/index.html'));
});



app.post('/api/getRecipes',  (req, res) => {
  var query = req.body.data
  var recipes = []
  axios({
      "method":"GET",
      "url":"https://tasty.p.rapidapi.com/recipes/list",
      "headers":{
      "x-rapidapi-host":"tasty.p.rapidapi.com",
      "x-rapidapi-key":"c09e20d38cmsh10cc39686cce85cp170685jsnb2cad371e024"
      },"params":{
      'q':query,
      "from":"0",
      "sizes":"10"
      }
      })
      .then((response) => {
        response.data.results.map((recipe) => {
          var obj = {}
          obj.title = recipe.name
          obj.imgURL = recipe.thumbnail_url
          obj.description = thumbDescription(recipe.description)
          recipes.push(obj)

        })     
         res.send(recipes);

      })
      .catch((error) => { 
        console.log(error)
      })


 
});





app.listen(process.env.PORT || 8080);
console.log("connected")
