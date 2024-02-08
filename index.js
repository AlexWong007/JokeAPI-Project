import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
    console.log(req.body);
    let RandomNumber = -1;
    let result;
    const name = req.body.name;
    while (!result) {
        while (RandomNumber < 0 || RandomNumber > 100) {
            RandomNumber = RandomNumber / 2;
            RandomNumber = Math.floor(Math.random() * name.length * Math.floor(Math.random() * 9)) * 50;
            RandomNumber = Math.floor(RandomNumber / (Math.random() * 4));
        }
        console.log(RandomNumber);
    
        try {
            const response = await axios.get(`https://v2.jokeapi.dev/joke/Any?idRange=0-${RandomNumber}`);
            result = response.data.joke;
            console.log(result);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    res.render("index.ejs", {joke: result});
});

app.listen(port, ()=> { 
    console.log(`Listening on port ${port}`)
});