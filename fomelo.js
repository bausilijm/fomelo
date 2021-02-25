const axios = require('axios').default;
const cheerio = require('cheerio');
const fs = require('fs');
let result;
let nameMatch = new RegExp("<tr>.+</tr>", "g");
let htmlStrip = new RegExp("<\/?[^>]+(>|$)", "g");
let guildMatch = new RegExp("&lt;", "g");
let guildMatchTwo = new RegExp("&gt;", "g");
let characterResult = [];
let guilded;
let resultArray;

const characterSheet = (character) => {
    characterResult.push(character[0].trim());
    characterResult.push(character[1].trim());
    if (character[2].match(guildMatch)) {
        characterResult.push(character[2].replace(guildMatch, '<').replace(guildMatchTwo, '>').trim());
        guilded = true;
    }
    if (guilded) {
        characterResult.push(`HP: ${character[3].trim().split(" ")[5]}`);
        characterResult.push(`AC: ${character[4].trim().split(" ")[4]}`);
        characterResult.push(`MANA: ${character[5].trim().split(" ")[4]}`);
    }
    else {
        characterResult.push(`HP: ${character[2].trim().split(" ")[3]}`);
        characterResult.push(`AC: ${character[3].trim().split(" ")[2]}`);
        characterResult.push(`MANA: ${character[4].trim().split(" ")[2]}`);
    }
    console.log(characterResult.join('\r\n'));
}
const fomelo = (character) => {
axios.get(`http://shardsofdalaya.com/fomelo/fomelo.php?char=${character}`)
    .then((response) => {
        if (response.status === 200) {
            thing = response.data;
            let a = thing.match(nameMatch).toString().replace(htmlStrip, ' ');
            result = a.split(",");
            result.forEach(element => {
                resultArray = element.trim().split(" ").filter(word => word);
                //element.trim().split(" ").filter(word => word);
            });
            console.log(resultArray);
            //characterSheet(result);
        }
    }, (error) => console.log(err));
}

fomelo('miffane');