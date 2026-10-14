const SUPABASE_URL =
    "https://btcrrfetdxsgugjxytok.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_c01hMVSsAB41BbTfSw7acg_5Rb5B6tA";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

let personName = "";

function continueToProposal() {

    const input = document.getElementById("nameInput");

    personName = input.value.trim();

    if (!personName) {
        input.focus();
        return;
    }

    document.getElementById("namePage").classList.add("hidden");
    document.getElementById("proposalPage").classList.remove("hidden");
}


function toggleTerms() {

    const terms = document.getElementById("terms");
    const arrow = document.getElementById("arrow");

    if (terms.classList.contains("hidden")) {

        terms.classList.remove("hidden");
        arrow.textContent = "−";

    } else {

        terms.classList.add("hidden");
        arrow.textContent = "+";

    }
}


async function sendResponse(answer) {

    const buttons = document.getElementById("responseButtons");
    const message = document.getElementById("responseMessage");

    buttons.style.pointerEvents = "none";

    const { error } = await supabaseClient
        .from("responses")
        .insert([
            {
                name: personName,
                answer: answer
            }
        ]);

    if (error) {

        console.error("Supabase error:", error);

        buttons.style.pointerEvents = "auto";

        message.textContent =
            "Something went wrong. Please try again.";

        return;
    }

    buttons.classList.add("hidden");

    if (answer === "Yes ♡") {
        message.textContent = "Okay. Date it is.";
    } else {
        message.textContent = "Okay. I understand.";
    }
}
