/*
Bangg's Fomelo Bot v1.0.0
Pulls character information from the game Shards of Dalaya, parses it, and returns a character sheet.
Primarily to be used with my discord bot.

todo: parse other stats, get relic/archaic spell information, item information, kills, deaths.
*/
const axios = require('axios').default;
const cheerio = require('cheerio');
const fs = require('fs');
let htmlStrip = new RegExp("<\/?[^>]+(>|$)", "g");

characterSheet = (character) => {
    let sheet = [];
    let guildMatch = new RegExp("&lt;", "g");
    let hp = new RegExp("Hit Points", "g");got 
    let ac = new RegExp("AC", "g");
    let mana = new RegExp("Mana", "g");
    let AA = new RegExp("Earned", "g");

    sheet.push(`Name: ${character[0]}`, `Class: ${character[1]}`);
    if (character[2].match(guildMatch)) { sheet.push(`Guild: ${character[2].replace(guildMatch, '<').replace(/&gt;/g, '>')}`); }
    let statsOne = [];
    character.forEach(ele => {
        if (ele.match(hp)) statsOne.push(`(HP: ${ele.split(" ")[2]} |`);
        if (ele.match(ac)) statsOne.push(`AC: ${ele.split(" ")[1]} |`);
        if (ele.match(mana)) statsOne.push(`MANA: ${ele.split(" ")[1]})`);
        if (ele.match(AA)) sheet.push(ele);
    })
    sheet.splice(sheet.length-1, 0, statsOne.join(" "));
    return sheet;
}
const fomelo = (character) => {
    async function parseCharacter(info) {
        const result = await characterSheet(info);
        console.log(result);
    }
    axios.get(`http://shardsofdalaya.com/fomelo/fomelo.php?char=${character}`)
    .then((response) => {
        if (response.status === 200) {
            let notFound = new RegExp("Character not found", "g");
            let infoMatch = new RegExp("<tr>.+</tr>", "g");
            let result;
            let resultArray = [];
            thing = response.data;
            if (thing.match(notFound)) { console.log("Character not found in Fomelo database."); return; }
            else {
                let a = thing.match(infoMatch).toString().replace(htmlStrip, ' ');
                result = a.split(",");
                result.forEach(element => {
                     resultArray.push(element.trim().split(" ").filter(word => word).join(" "));
                });
                parseCharacter(resultArray);
            }
        }
    }, (error) => console.log(err));
}

//usage: fomelo('<character');
fomelo('bangg');

