// Initialization and event listeners
document.addEventListener('DOMContentLoaded', () => {
    if (!validateUser()) {
        window.location.href = '../html/login.html'; // Redirect to login if not validated
        return;
    }
    allResumes = resumeData.resume; // Directly access data from data.js
    filteredResumes = [...allResumes]; // Start with all resumes
    setupEventListeners();
    displayResume(0); // Display the first resume when the document loads
});

let currentResumeIndex = 0;
let allResumes = [];
let filteredResumes = [];

function validateUser() {
    return sessionStorage.getItem('isLoggedIn') === 'true';
}

function displayResume(index) {

    if (index < 0 || index >= filteredResumes.length) {
        document.getElementById('resumeContainer').style.display = 'none'; // Hide resume display
        displayNoResumesMessage(); // Show no resumes error message
        return;
    } else {
        document.getElementById('resumeContainer').style.display = ''; // Show resume display
        hideNoResumesMessage(); // Hide no resumes message
    }

    const resume = filteredResumes[index];  // Define 'resume' based on the current index
    if (!resume) {
        console.error('No resume data available.');
        return;
    }

    // Continue with updating HTML elements with the resume data
    document.getElementById('name').textContent = resume.basics.name;
    document.getElementById('appliedFor').textContent = resume.basics.AppliedFor;
    document.getElementById('email').textContent = resume.basics.email;
    document.getElementById('phone').textContent = resume.basics.phone;
    document.getElementById('linkedin').href = resume.basics.profiles.url;

    const skills = resume.skills.keywords.map(skill => `<p class="right-align">${skill}</p>`).join('');
    document.getElementById('technicalSkills').innerHTML = skills;

    const hobbies = resume.interests.hobbies.map(hobby => `<p class="right-align">${hobby}</p>`).join('');
    document.getElementById('hobbies').innerHTML = hobbies;

    document.getElementById('previousCompanyDetails').innerHTML = formatWorkExperience(resume.work);

    document.getElementById('projectDetails').innerHTML = formatProjectDetails(resume.projects);

    document.getElementById('education').innerHTML = formatEducationDetails(resume.education);

    document.getElementById('internship').innerHTML = formatInternshipDetails(resume.Internship);

    document.getElementById('achievements').innerHTML = formatAchievements(resume.achievements);

    updateNavigationButtons();
}

function displayNoResumesMessage() {
    document.getElementById('noResumes').style.display = 'block'; // Display the error message
}

function hideNoResumesMessage() {
    document.getElementById('noResumes').style.display = 'none'; // Hide the error message
}

function updateNavigationButtons() {
    // Determine the visibility of buttons based on the number of resumes
    let showButtons = filteredResumes.length > 1;

    // Hide the 'Previous' button if the current index is 0 (first resume) or only one resume is present
    document.getElementById('previousBtn').style.display = (currentResumeIndex === 0 || !showButtons) ? "none" : "block";

    // Hide the 'Next' button if the current index is at the last resume or only one resume is present
    document.getElementById('nextBtn').style.display = (currentResumeIndex >= filteredResumes.length - 1 || !showButtons) ? "none" : "block";
}

function setupEventListeners() {
    document.getElementById('previousBtn').addEventListener('click', () => {
        if (currentResumeIndex > 0) {
            currentResumeIndex--;
            displayResume(currentResumeIndex);
        }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentResumeIndex < filteredResumes.length - 1) {
            currentResumeIndex++;
            displayResume(currentResumeIndex);
        }
    });

    document.getElementById('search').addEventListener('input', handleSearch);
}

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    filteredResumes = allResumes.filter(resume =>
        resume.basics.name.toLowerCase().includes(searchTerm) ||
        resume.basics.AppliedFor.toLowerCase().includes(searchTerm)
    );
    currentResumeIndex = 0;
    displayResume(currentResumeIndex);
    updateNavigationButtons(); // Update button visibility based on the search result
}

// Helper functions for formatting details
function formatWorkExperience(work) {
    if (!work) return '<p>No work experience provided.</p>';
    return `<p><strong>Company Name:</strong> ${work["Company Name"]}</p>
            <p><strong>Position:</strong> ${work.Position}</p>
            <p><strong>Start Date:</strong> ${work["Start Date"]}</p>
            <p><strong>End Date:</strong> ${work["End Date"]}</p>
            <p><strong>Summary:</strong> ${work.Summary}</p>`;
}

function formatProjectDetails(projects) {
    if (!projects) return '<p>No projects listed.</p>';
    return `<p><strong>${projects.name}:</strong> ${projects.description}</p>`;
}

function formatEducationDetails(education) {
    if (!education) return '<ul>No education details provided.</ul>';
    return `<ul>${Object.keys(education).map(level => {
        const details = education[level];
        return `<li><strong>${level}:</strong> ${details.institute}, ${details.course} (${details["Start Date"]} - ${details["End Date"]}), CGPA: ${details.cgpa}</li>`;
    }).join('')}</ul>`;
}

function formatInternshipDetails(internship) {
    if (!internship) return '<ul>No internship data available.</ul>';
    return `<ul>
                <li><strong>Company:</strong> ${internship["Company Name"]}</li>
                <li><strong>Position:</strong> ${internship.Position}</li>
                <li><strong>Start Date:</strong> ${internship["Start Date"]}</li>
                <li><strong>End Date:</strong> ${internship["End Date"]}</li>
                <li><strong>Summary:</strong> ${internship.Summary}</li>
            </ul>`;
}

function formatAchievements(achievements) {
    if (!achievements || !achievements.Summary) return '<p>No achievements listed.</p>';
    return `<ul>${achievements.Summary.map(achievement => `<li>${achievement}</li>`).join('')}</ul>`;
}
