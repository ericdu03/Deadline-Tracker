var COURSENAMES = [];
var COURSES = [];

class Course {
    /**
     * Course constructor method
     * 
     * Instance variables: 
     * courseName: array containing all course names of assignemnts.
     * deadlines: array contiaing all deadlines of assignments. 
     * date_created: array containing all creation dates of assignments. 
     */
    constructor(name) {
        this.courseName = name; // name of the course
        this.deadlines = [];
        this.deadlineNames = [];
        this.date_created = [];

        var collapsible = document.createElement("button");
        collapsible.innerHTML = this.courseName;
        collapsible.className = "collapsible";
        collapsible.style.fontSize = "15pt";

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

        var courseDeadlines = document.createElement("div");
        courseDeadlines.className = "content";
        courseDeadlines.id = this.courseName;

        document.getElementById("courses").append(collapsible);
        collapsible.after(courseDeadlines);
        
        COURSENAMES.push(name);
    }
    /** 
     * Adds an assignment. If the Course Name doesn't already exist, creates a new collapsible menu with correspondoing course name. Also appends all course information to instance array.
     * 
     * deadline: A Date object specifying the deadline
     * name: The name of the assignment
     * date_created: A timestamp recording the time of the assignment creation, assumed to be the date assigned.
     */
    addAssignment(deadline, name, date_created) {
        this.deadlines.push(deadline); // set to 11:59PM the date entered.
        this.deadlineNames.push(name);
        this.date_created.push(date_created);

        this.addBar(name, deadline, date_created);
    }

    /**
         * Adds a deadline bar to the course section 
         * 
         * name: A string with the assignment's name.
         * deadline: A Date object specifying the time of the deadline. 
         */
    addBar(name, deadline, date_created) {
        let bar = document.createElement("meter");
        bar.min = 0;
        bar.max = 1;
        bar.low = 0.2;
        bar.high = 0.6;
        bar.optimum = 0.8;
        bar.value = 1;
        bar.id = "bar " + date_created;
        bar.style.marginBottom = "0.1cm";
        
        let assignment = document.createElement("div");
        assignment.innerHTML = name;
        assignment.className = "textStyle";
        assignment.id = "assignment " + String(date_created); // little bit janky but it works, find a nicer way to do this?   

        let afterText = document.createElement("div");
        let timestamp = new Date(deadline)
        let time_fmt = {month: "long",day: "2-digit", minute: "2-digit", hour12:true, hour:"numeric"};
        afterText.innerHTML = timestamp.toLocaleString('en-US', time_fmt);
        afterText.style.fontSize = '11pt';

        document.getElementById(this.courseName).append(assignment);
        document.getElementById(assignment.id).append(bar, afterText);
    }

    /**
     * Method to calculate the percentage of time left for every assignment
     */
    updateAssignments() {
        let now = Date.now();
        for (let i = 0; i < this.deadlines.length; i++) {
            document.getElementById("bar " + this.date_created[i]).setAttribute("value", (this.deadlines[i] - now)/(this.deadlines[i]- this.date_created[i]))
            // document.getElementById("bar " + this.date_created[i]).setAttribute("value", 0.3);
        }
    }

    removeAssignment() {
        // TODO: add functionality to remove assignment from list, requires remove button and corresponding unique id
    }
}

/**
 * Gets information from user fields in HTML, creates a new Course object if the course is new.
 */
function getInfo() {
    let name = document.getElementById('name').value;
    let deadline = document.getElementById('time').value;
    let courseName = document.getElementById('courseName').value;
    document.getElementById("validation").innerHTML = validate(name, deadline);

    if (COURSENAMES.includes(courseName)) {
        let index = COURSENAMES.indexOf(courseName);
        var course = COURSES[index];

    } else {
        var course = new Course(courseName);
        COURSENAMES.push(name);
        COURSES.push(course);
    }

    course.addAssignment(Date.parse(deadline) + 86399999, name, Date.now()) // added time to make it 11:59 of the entered date

    coll = document.getElementsByClassName("collapsible");
    for (let i = 0; i < coll.length; i++) {
        var content = coll[i].nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }

}

/** 
 * Validation function to make sure that the date can be parsed correctly, defaults to MM/DD/YYYY
 */
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
            }
    }
    return text;
}



window.setInterval(updateBar, 60000); // rate at which progress bars update, default: 1 minute
function updateBar() { // method to update all progress bars periodically

    for (let i = 0; i < COURSES.length; i++) {
        let course = COURSES[i];
        course.updateAssignments();
    }
}

