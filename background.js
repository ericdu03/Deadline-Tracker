deadlines = [];
names = [];
date_created = [];
function validate(name, date) {
    if (name == "" && date == "") {
            text = "enter something lol";
        } else if (name == "") {
            text = "No name given";     
        } else if (date == "") {
            text = "No time given";
        } else {
            const regex = new RegExp('(0[1-9]|1[12])/(0[1-9]|[12][0-9]|3[01])/(19|20)\\d{2}', 'g');
            let array = date.match(regex)
        
            if (array == null) {
                text = "Invalid format for date";
            } else { 
                text = "";
                deadlines.push(Date.parse(date));
                names.push(name);
                date_created.push(Date.now())
            }
    }
    return text;
}

function getDateTime() {
    let name = document.getElementById('name').value;
    let date = document.getElementById('time').value;
    let text = validate(name, date);
    document.getElementById("validation").innerHTML = text; 

    // dates, time = returnDates();
    addBar(name);
}

function addBar(name) {
    let bar = document.createElement("meter");

    // Threshold colors for the meter element
    bar.min = 0;
    bar.max = 1;
    bar.low = 0.2;
    bar.high = 0.6;
    bar.optimum = 0.8;
    bar.value = 1;


    // add bar to page
    let text = document.createElement("div");
    let textId = deadlines.length - 1; // ID'd based on the order in which they are due, zero indexed
    text.innerHTML = name;
    text.className = "textStyle";
    text.id = textId;
    
    // create text showing deadline
    let afterText = document.createElement("div");
    let timestamp = new Date(deadlines[deadlines.length-1] - 1) // subtract 1 so it shows 11:59PM of the previous day
    let time_fmt = {month: "long",day: "2-digit", minute: "2-digit", hour12:true, hour:"numeric"};
    afterText.innerHTML = timestamp.toLocaleString('en-US', time_fmt);
    afterText.style.fontSize = '11pt';

    // add elements to HTML, with padding
    document.getElementById("bars").append(text, document.createElement("br"));
    document.getElementById(textId).append(document.createElement("br"), bar, afterText);
    // text.after(bar, afterText, newline)


    // --------------------------- TESTING BELOW -----------------------------
    var collapsible = document.createElement("button");
    collapsible.innerHTML = "Collapsible button";
    collapsible.className = "collapsible";

    collapsible.addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        console.log(content);
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    })
    document.getElementById("bars").append(collapsible);

    var content2 = document.createElement("div");
    content2.className = "content"; // div content class
    content2.id = "div2";

    var content3 = document.createElement("p");
    content3.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    document.getElementById("bars").append(content2);
    document.getElementById("div2").append(content3);
    // document.getElementById("bars").append(content);


    // document.getElementById(textId).append(collapsible);

}

// window.setInterval(updateBar, 5000); // rate at which progress bars update

function updateBar() { // method to update all progress bars periodically
    var now = Date.now();
    for (let i = 0; i < deadlines.length; i++) {
        document.getElementById(i).setAttribute("value", (deadlines[i] - now)/(deadlines[i]- date_created[i]));
    }
}

