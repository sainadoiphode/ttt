let personName = "";


/* GO TO PROPOSAL */

function continueToProposal() {

    const input = document.getElementById("nameInput");

    personName = input.value.trim();

    if (personName === "") {
        input.focus();
        return;
    }

    document
        .getElementById("namePage")
        .classList.add("hidden");

    document
        .getElementById("proposalPage")
        .classList.remove("hidden");
}


/* OPEN / CLOSE TERMS */

function toggleTerms() {

    const terms = document.getElementById("terms");
    const arrow = document.getElementById("arrow");

    terms.classList.toggle("hidden");

    if (terms.classList.contains("hidden")) {

        arrow.textContent = "+";

    } else {

        arrow.textContent = "−";

    }
}


/* SEND RESPONSE */

async function sendResponse(answer) {

    const message =
        document.getElementById("responseMessage");

    message.textContent =
        "Recording response...";


    try {

        const response = await fetch(
            "/respond",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: personName,
                    answer: answer
                })
            }
        );


        const data = await response.json();


        if (data.success) {

            if (answer === "Yes") {

                message.textContent =
                    "Response recorded ♡";

            } else {

                message.textContent =
                    "Okay. Your response has been recorded.";

            }

        } else {

            message.textContent =
                "Something went wrong.";

        }

    } catch (error) {

        console.error(error);

        message.textContent =
            "Could not record the response.";

    }
}