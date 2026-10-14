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

    document.getElementById("namePage")
        .classList.add("hidden");

    document.getElementById("proposalPage")
        .classList.remove("hidden");
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


/* YES */

async function sendResponse(answer) {

    const buttons =
        document.getElementById("responseButtons");

    const message =
        document.getElementById("responseMessage");

    buttons.style.pointerEvents = "none";

    const { error } = await supabaseClient
        .from("responses")
        .insert([
            {
                name: personName,
                answer: answer,
                reason: null
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

    message.textContent =
        "Okay. Date it is.";
}


/* NOT RN */

function showReasonBox() {

    document.getElementById("responseButtons")
        .classList.add("hidden");

    document.getElementById("reasonBox")
        .classList.remove("hidden");

    document.getElementById("reasonInput")
        .focus();
}


/* SUBMIT REASON */

async function submitReason() {

    const reason =
        document.getElementById("reasonInput")
        .value
        .trim();

    await saveNotNowResponse(reason);
}


/* SKIP */

async function skipReason() {

    await saveNotNowResponse(null);
}


/* SAVE NOT RN */

async function saveNotNowResponse(reason) {

    const reasonBox =
        document.getElementById("reasonBox");

    const message =
        document.getElementById("responseMessage");

    reasonBox.style.pointerEvents = "none";

    const { error } = await supabaseClient
        .from("responses")
        .insert([
            {
                name: personName,
                answer: "Not rn",
                reason: reason || null
            }
        ]);

    if (error) {

        console.error("Supabase error:", error);

        reasonBox.style.pointerEvents = "auto";

        message.textContent =
            "Something went wrong. Please try again.";

        return;
    }

    reasonBox.classList.add("hidden");

    message.textContent =
        "Noted. I understand.";
}
