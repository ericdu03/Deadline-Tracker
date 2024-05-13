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
    bar.low = 0.3;
    bar.high = 0.6;
    bar.optimum = 0.8;
    bar.value = 1;
    bar.width = 300;


    // add bar to page
    let text = document.createElement("p");
    text.innerHTML = name;
    text.style.fontSize = '15pt';
    document.getElementById("bars").append(text);
    document.getElementById("bars").append(bar);

    // TODO: fix aftertext so that deadline time shows
    let afterText = document.createElement("p");
    afterText.innerHTMl = deadlines[0].getDateTime();
    bar.after(afterText);

    // add white space after
    let newline = document.createElement("body");
    newline.style.paddingBottom = "10px"
    document.getElementById("bars").append(newline);

}

window.setInterval(updateBar, 5000); // rate at which progress bars update

function updateBar() { // method to update all progress bars periodically
    var now = Date.now();
    document.getElementById("bars").innerHTML = ' ';

    for (let i = 0; i < deadlines.length; i++) {
        let bar = document.createElement("meter");
        bar.min = 0;
        bar.max = 1;
        bar.low = 0.3;
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
        afterText.innerHTMl = Date.parse(deadlines[i]);
        bar.after(afterText);

        let newline = document.createElement("body");
        newline.style.paddingBottom = "10px"
        document.getElementById("bars").append(newline);
    }
}

