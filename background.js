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

// window.setInterval(getDateTime, 10000)
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
    bar.width = 300;


    // add bar to page
    let text = document.createElement("div");
    let textId = deadlines.length; // ID'd based on the order in which they are due
    text.innerHTML = name;

    // TODO: Can I move this to a separate file 
    {
    text.style.fontSize = '15pt';
    text.style.marginBottom='10px'
    text.id = textId;
    text.style.paddingLeft = "0.5cm";
    text.style.paddingTop = "0.5cm";
    text.style.paddingBottom = "0.5cm";
    }

    { // border stylings
    text.style.border = "1px solid black";
    text.style.borderRadius = "0.2cm";
    text.style.borderLeft = "solid #32a1ce";
    text.style.left = "10px";
    // text.style.position = "";
    }
    
    // create text showing deadline
    let afterText = document.createElement("div");
    let timestamp = new Date(deadlines[deadlines.length-1] - 1) // subtract 1 so it shows 11:59PM of the previous day
    afterText.innerHTML = timestamp.toLocaleString('en-US', {month: "long", day: "2-digit", minute: "2-digit" , hour12:true, hour:"numeric"});
    afterText.style.fontSize = '11pt';

    // add elements to HTML, with padding
    document.getElementById("bars").append(text, document.createElement("br"));
    document.getElementById(textId).append(document.createElement("br"), bar, afterText);
    // text.after(bar, afterText, newline)

}

// window.setInterval(updateBar, 5000); // rate at which progress bars update

function updateBar() { // method to update all progress bars periodically
    var now = Date.now();
    document.getElementById("bars").innerHTML = ' ';

    for (let i = 0; i < deadlines.length; i++) {
        let bar = document.createElement("meter");
        bar.min = 0;
        bar.max = 1;
        bar.low = 0.2;
        bar.high = 0.6;
        bar.optimum = 0.8;

        // Update bar progress
        bar.value = (deadlines[i] - now)/(deadlines[i] - date_created[i]);

        let text = document.createElement("p");
        text.innerHTML = names[i];
        text.style.fontSize = '15pt';
        document.getElementById("bars").append(text);
        document.getElementById("bars").append(bar);

        let afterText = document.createElement("p");

        let timestamp = new Date(deadlines[i] - 1) // subtract 1 so it shows 11:59PM of the previous day
        afterText.innerHTML = timestamp.toLocaleString('en-US', {month: "long", day: "2-digit", minute: "2-digit" , hour12:true, hour:"numeric"});
        bar.after(afterText);

        let newline = document.createElement("body");
        newline.style.paddingBottom = "10px"
        document.getElementById("bars").append(newline);
    }
}

