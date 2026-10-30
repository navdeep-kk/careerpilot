const navItems=[...document.querySelectorAll(".nav-item")];
const views=[...document.querySelectorAll(".view")];
const title=document.getElementById("pageTitle");
const titles={dashboard:"Dashboard",resume:"Resume Builder",skills:"Skill Explorer",jobs:"Job Tracker",interview:"Interview Lab",planner:"Career Planner",analytics:"Analytics",resources:"Resources"};

function openView(id){
  views.forEach(v=>v.classList.toggle("active",v.id===id));
  navItems.forEach(n=>n.classList.toggle("active",n.dataset.view===id));
  title.textContent=titles[id];
  window.scrollTo({top:0,behavior:"smooth"});
  document.getElementById("sidebar").classList.remove("open");
}
navItems.forEach(n=>n.addEventListener("click",()=>openView(n.dataset.view)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>openView(b.dataset.go)));
document.getElementById("mobileMenu").addEventListener("click",()=>document.getElementById("sidebar").classList.toggle("open"));

document.getElementById("today").textContent=new Intl.DateTimeFormat("en-GB",{day:"2-digit",month:"short",year:"numeric"}).format(new Date());

function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove("show"),2200)}

const skills=[
 ["HTML & CSS","Technical",82,"WEB"],["JavaScript","Technical",76,"JS"],["UI Design","Creative",64,"UI"],["Problem Solving","Professional",88,"PS"],
 ["Communication","Professional",70,"CO"],["Git & GitHub","Technical",73,"GIT"],["Responsive Design","Technical",84,"RD"],["Presentation","Professional",68,"PR"],
 ["Figma","Creative",58,"FG"],["Accessibility","Technical",61,"AX"],["Teamwork","Professional",79,"TW"],["Content Design","Creative",72,"CD"]
];
function renderSkills(filter="all",query=""){
 const grid=document.getElementById("skillGrid");grid.innerHTML="";
 skills.filter(s=>(filter==="all"||s[1]===filter)&&s[0].toLowerCase().includes(query.toLowerCase())).forEach(s=>{
  const el=document.createElement("article");el.className="skill-card";
  el.innerHTML=`<div class="skill-icon">${s[3]}</div><h3>${s[0]}</h3><small>${s[1]} · ${s[2]}% confidence</small><div class="skill-line"><i style="width:${s[2]}%"></i></div>`;
  grid.appendChild(el);
 });
}
renderSkills();
document.getElementById("skillSearch").addEventListener("input",e=>renderSkills(document.querySelector(".filter.active").dataset.filter,e.target.value));
document.querySelectorAll(".filter").forEach(f=>f.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));f.classList.add("active");renderSkills(f.dataset.filter,document.getElementById("skillSearch").value)}));

const jobs=[
 ["Northstar Labs","Frontend Developer","Interview","22 Oct","High"],
 ["Brightline Studio","UI Developer","Applied","20 Oct","Medium"],
 ["Vertex Systems","Web Intern","Offer stage","18 Oct","High"],
 ["Orbit Digital","Junior Developer","Applied","16 Oct","Medium"],
 ["PixelWorks","Product Intern","Screening","14 Oct","Low"],
 ["NovaTech","Frontend Intern","Interview","11 Oct","High"]
];
const statusClass={"Interview":"green","Offer stage":"green","Applied":"blue","Screening":"yellow"};
document.getElementById("jobBody").innerHTML=jobs.map(j=>`<tr><td><b>${j[0]}</b></td><td>${j[1]}</td><td><span class="status ${statusClass[j[2]]||"blue"}">${j[2]}</span></td><td>${j[3]}</td><td>${j[4]}</td></tr>`).join("");
document.querySelectorAll(".status").forEach(s=>s.style.background=s.classList.contains("green")?"#e3f6ed":s.classList.contains("yellow")?"#fff2d9":"#edf2ff");
document.querySelectorAll(".status").forEach(s=>s.style.color=s.classList.contains("green")?"#18764f":s.classList.contains("yellow")?"#946813":"#3155b9");

document.getElementById("addJob").addEventListener("click",()=>toast("Application form ready for your next opportunity."));
document.getElementById("bell").addEventListener("click",()=>toast("You have 2 career actions due this week."));

const questions=[
 ["Tell me about a project you are proud of.","Use STAR: situation, task, action and result."],
 ["Why do you want this role?","Connect your skills and interests to the role rather than giving a generic answer."],
 ["Describe a difficult problem you solved.","Focus on your reasoning, the action you took and the measurable result."],
 ["What is one skill you are currently improving?","Show self-awareness and explain the system you are using to improve."]
];
let qi=0;
document.getElementById("newQuestion").addEventListener("click",()=>{
 qi=(qi+1)%questions.length;document.getElementById("question").textContent=questions[qi][0];document.getElementById("hint").textContent=questions[qi][1];document.getElementById("qNumber").textContent=String(qi+1).padStart(2,"0");document.getElementById("answer").value="";document.getElementById("feedback").classList.add("hidden");
});
document.getElementById("showHint").addEventListener("click",()=>toast(questions[qi][1]));
document.getElementById("scoreAnswer").addEventListener("click",()=>{
 const answer=document.getElementById("answer").value.trim(), box=document.getElementById("feedback");
 box.classList.remove("hidden");
 if(answer.length<60) box.textContent="Add more evidence. Mention what you did personally and what changed because of your action.";
 else box.textContent="Good foundation. Strengthen it further with a measurable result or a clear lesson learned.";
 toast(answer.length<60?"Add more detail":"Answer reviewed");
});

document.getElementById("resumeForm").addEventListener("submit",e=>{
 e.preventDefault();
 document.getElementById("pName").textContent=document.getElementById("rName").value;
 document.getElementById("pTitle").textContent=document.getElementById("rTitle").value;
 document.getElementById("pEmail").textContent=document.getElementById("rEmail").value;
 document.getElementById("pAbout").textContent=document.getElementById("rAbout").value;
 document.getElementById("pSkills").innerHTML=document.getElementById("rSkills").value.split(",").map(x=>`<span>${x.trim()}</span>`).join("");
 toast("Profile preview updated");
});
document.getElementById("saveResume").addEventListener("click",()=>toast("Profile saved in this demo session."));

document.querySelectorAll(".resource-btn").forEach(b=>b.addEventListener("click",()=>toast("Resource opened in the project demo.")));
document.querySelectorAll(".dash-task").forEach(x=>x.addEventListener("change",()=>toast(x.checked?"Task completed":"Task reopened")));

document.getElementById("themeBtn").addEventListener("click",()=>{
 document.body.classList.toggle("dark");
 const dark=document.body.classList.contains("dark");
 localStorage.setItem("career-dark",dark?"1":"0");
 toast(dark?"Dark mode enabled":"Light mode enabled");
});
if(localStorage.getItem("career-dark")==="1")document.body.classList.add("dark");
document.getElementById("pSkills").innerHTML=document.getElementById("rSkills").value.split(",").map(x=>`<span>${x.trim()}</span>`).join("");
