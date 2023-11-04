// competitions.js

// Function to save and load competition posts from localStorage
function savePostsToLocalStorage(posts) {
    localStorage.setItem('competitionPosts', JSON.stringify(posts));
}

function loadPostsFromLocalStorage() {
    const storedPosts = localStorage.getItem('competitionPosts');
    if (storedPosts) {
        return JSON.parse(storedPosts);
    } else {
        return [];
    }
}

// Create a function to generate HTML for a competition post
function createPostElement(post, index) {
    const postElement = document.createElement("li");
    postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        <p>Date: ${post.date}</p>
        <img src="${post.imageUrl}" alt="${post.title}">
        <button class="delete-button" data-index="${index}">Delete</button>
    `;
    return postElement;
}

// Event listeners for buttons, forms, etc.
const createPostButton = document.getElementById("create-post-button");
const competitionForm = document.getElementById("competition-form");
const addCompetitionButton = document.getElementById("add-competition");
const cancelCompetitionButton = document.getElementById("cancel-competition");
const competitionList = document.getElementById("competition-list");
let title, description, date, image;

createPostButton.addEventListener("click", function () {
    // Show the competition form
    competitionForm.style.display = "block";
});

cancelCompetitionButton.addEventListener("click", function () {
    // Cancel button hides the form
    competitionForm.style.display = "none";


});

addCompetitionButton.addEventListener("click", function (e) {
    e.preventDefault();

    // Get input values
    title = document.getElementById("competition-title").value;
    description = document.getElementById("competition-description").value;
    date = document.getElementById("competition-date").value;
    image = document.getElementById("competition-image").files[0];

    if (title && description && date && image) {
        // Create a new competition post
        const post = {
            title: title,
            description: description,
            date: date,
            imageUrl: URL.createObjectURL(image),
        };

        // Add the post to the list and save it to local storage
        const storedPosts = loadPostsFromLocalStorage();
        storedPosts.push(post);
        savePostsToLocalStorage(storedPosts);

        // Update the post list to display the new post
        updatePostList();
        
        // Reset the form and hide it
        competitionForm.reset();
        competitionForm.style.display = "none";
    }
});

// Event listener to handle post deletion
competitionList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-button")) {
        const index = e.target.getAttribute("data-index");
        deletePost(index);
    }
});

// Function to delete a post by index
function deletePost(index) {
    const storedPosts = loadPostsFromLocalStorage();
    storedPosts.splice(index, 1); // Remove the post at the specified index
    savePostsToLocalStorage(storedPosts);
    updatePostList();
}

// Function to update the post list
function updatePostList() {
    competitionList.innerHTML = ""; // Clear the current list
    const storedPosts = loadPostsFromLocalStorage();
    storedPosts.forEach((post, index) => {
        const postElement = createPostElement(post, index);
        competitionList.appendChild(postElement);
    });
}

// Load competition posts from localStorage and display them
document.addEventListener("DOMContentLoaded", function () {
    updatePostList();
});


// Add this JavaScript code to redirect when the button is clicked
const goToIndexButton = document.getElementById("go-to-index");

goToIndexButton.addEventListener("click", function () {
    window.location.href = "index.html"; // Redirect to index.html
});
