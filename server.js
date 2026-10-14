const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 3000;

const responsesFile =
    path.join(__dirname, "responses.json");


/* ALLOW JSON */

app.use(express.json());


/* SERVE WEBSITE */

app.use(express.static(__dirname));


/* CREATE RESPONSES FILE */

if (!fs.existsSync(responsesFile)) {

    fs.writeFileSync(
        responsesFile,
        "[]",
        "utf8"
    );

}


/* RECEIVE ANSWER */

app.post("/respond", (req, res) => {

    const {
        name,
        answer
    } = req.body;


    if (!name || !answer) {

        return res.status(400).json({

            success: false,

            message: "Missing information"

        });

    }


    let responses = [];


    try {

        const fileData =
            fs.readFileSync(
                responsesFile,
                "utf8"
            );

        responses = JSON.parse(fileData);

    } catch (error) {

        responses = [];

    }


    /* SAVE RESPONSE */

    responses.push({

        name: name,

        answer: answer,

        timestamp: new Date().toISOString()

    });


    /* WRITE TO FILE */

    fs.writeFileSync(

        responsesFile,

        JSON.stringify(
            responses,
            null,
            2
        ),

        "utf8"

    );


    console.log(
        `${name} → ${answer}`
    );


    res.json({

        success: true

    });

});


/* START SERVER */

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});