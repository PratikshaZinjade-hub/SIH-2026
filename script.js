function login() {
    let name = document.getElementById("name").value;
    let role = document.getElementById("role").value;

    if (name === "") {
        alert("Please enter your name");
        return;
    }

    if (role === "Trainee") {
        document.body.innerHTML = `
            <div class="container">
                <h1>SkillTrack Maharashtra</h1>
                <p>Welcome, ${name} </p>

                <div class="login-box">
                    <h2>Trainee Dashboard</h2>

                    <p><b>Training Course:</b> Web Development</p>
                    <p><b>District:</b> Pune</p>
                    <p><b>Training Status:</b> Completed </b></p>
                    <p><b>Assessment Score:</b> 82%</p>
                    <p><b>Employment Status:</b> Looking for Job</p>

                    <button onclick="employmentForm()">
                        Update Employment Status
                    </button>
                </div>
            </div>
        `;
    } 
    else {
        showAdminDashboard();
    }
}


function employmentForm() {

    document.body.innerHTML = `
        <div class="container">

            <h1>SkillTrack Maharashtra</h1>

            <div class="login-box">

                <h2>Employment Update</h2>

                <select id="status">
                    <option>Employed</option>
                    <option>Self-employed</option>
                    <option>Apprenticeship</option>
                    <option>Looking for Job</option>
                </select>

                <input type="text" id="company"
                placeholder="Company Name">

                <input type="text" id="salary"
                placeholder="Monthly Salary">

                <button onclick="saveEmployment()">
                    Save Information
                </button>

            </div>
        </div>
    `;
}


function saveEmployment() {
    let status = document.getElementById("status").value;
    let company = document.getElementById("company").value;
    let salary = document.getElementById("salary").value;

    if (status === "Employed" && company === "") {
        alert("Please enter company name");
        return;
    }

    localStorage.setItem("employmentStatus", status);
    localStorage.setItem("companyName", company);
    localStorage.setItem("salary", salary);

    alert("Employment information saved successfully!");

    followUpForm();
}
function followUpForm() {
    document.body.innerHTML = `
        <div class="container">
            <h1>SkillTrack Maharashtra</h1>

            <div class="login-box">
                <h2>Follow-up Tracking</h2>

                <input type="date" id="followupDate">

                <select id="currentStatus">
                    <option>Still Employed</option>
                    <option>Changed Job</option>
                    <option>Left Job</option>
                    <option>Still Looking for Job</option>
                </select>

                <input type="text" id="remarks"
                    placeholder="Enter Remarks">

                <button onclick="saveFollowUp()">
                    Save Follow-up
                </button>
            </div>
        </div>
    `;
}
function saveFollowUp() {
    let date = document.getElementById("followupDate").value;
    let status = document.getElementById("currentStatus").value;
    let remarks = document.getElementById("remarks").value;

    localStorage.setItem("followupDate", date);
    localStorage.setItem("followupStatus", status);
    localStorage.setItem("followupRemarks", remarks);

    alert("Follow-up information saved successfully!");

    showAdminDashboard();
}
function showAdminDashboard() {

    let status = localStorage.getItem("employmentStatus") || "Not Updated";
    let company = localStorage.getItem("companyName") || "Not Provided";
    let salary = localStorage.getItem("salary") || "Not Provided";

    let followupDate = localStorage.getItem("followupDate") || "Not Updated";
    let followupStatus = localStorage.getItem("followupStatus") || "Not Updated";
    let followupRemarks = localStorage.getItem("followupRemarks") || "Not Provided";

    document.body.innerHTML = `
        <div class="container">
            <h1>SkillTrack Maharashtra</h1>
            <p>Admin Dashboard</p>
            <div class="dashboard-cards">

            <div class="card">
            <h3>Total Trainees</h3>
            <p>100</p>
            </div>

            <div class="card">
            <h3>Employed</h3>
            <p>62</p>
            </div>

           <div class="card">
           <h3>Self-employed</h3>
           <p>15</p>
           </div>

           <div class="card">
           <h3>Job Seeking</h3>
           <p>15</p>
        </div>

    </div>

            <div class="login-box">

                <h2>Employment Overview</h2>

                <p><b>Total Trainees:</b> 100</p>
                <p><b>Employed:</b> 62</p>
                <p><b>Self-employed:</b> 15</p>
                <p><b>Apprenticeship:</b> 8</p>
                <p><b>Looking for Job:</b> 15</p>

                <hr>

                <h2>Employment Status</h2>
                <canvas id="employmentChart"></canvas>

                <hr>

                <h2>Latest Employment Update</h2>

                <p><b>Status:</b> ${status}</p>
                <p><b>Company:</b> ${company}</p>
                <p><b>Monthly Salary:</b> ${salary}</p>

                <hr>

                <h2>Follow-up Tracking</h2>

                <p><b>Follow-up Date:</b> ${followupDate}</p>
                <p><b>Current Status:</b> ${followupStatus}</p>
                <p><b>Remarks:</b> ${followupRemarks}</p>

                <hr>

                <h2>Training & Employment Analytics</h2>

                <p><b>Training Completion Rate:</b> 85%</p>
                <p><b>Employment Rate:</b> 62%</p>
                <p><b>Self-Employment Rate:</b> 15%</p>
                <p><b>Apprenticeship Rate:</b> 8%</p>
                <p><b>Job-Seeking Rate:</b> 15%</p>

                <hr>

                <h2>Program Performance</h2>

                <p><b>Overall Training Performance:</b> Good</p>
                <p><b>Employment Outcome:</b> 62% employed</p>
                <p><b>Follow-up Status:</b> Tracking Active</p>

                <h2>Skill Gap Analysis</h2>

                <p><b>Web Development:</b> Good</p>
                <p><b>Data Analysis:</b> Needs Improvement</p>
                <p><b>Communication Skills:</b> Needs Improvement</p>
                <p><b>Problem Solving:</b> Needs Improvement</p>
                <p><b>Interview Skills:</b> Good</p>
                <hr>

                <button onclick="logout()">Logout</button>

            </div>
        </div>
    `;

    new Chart(document.getElementById("employmentChart"), {
        type: "doughnut",

        data: {
            labels: [
                "Employed",
                "Self-employed",
                "Apprenticeship",
                "Looking for Job"
            ],

            datasets: [{
                data: [62, 15, 8, 15]
            }]
        },

        options: {
            responsive: true
        }
    });
}
function logout(){
    location.reload();
}