const courses = [   
    // Semester 1
    { course: "M1100", name: "Algebra", semester: "sem1", year: 1, professor: "Dr. A", credits: 6 },
    { course: "M1101", name: "Analysis", semester: "sem1", year: 1, professor: "Dr. B", credits: 6 },
    { course: "P1100", name: "Mechanics", semester: "sem1", year: 1, professor: "Dr. C", credits: 6 },
    { course: "P1101", name: "Electricity and Magnetism", semester: "sem1", year: 1, professor: "Dr. D", credits: 6 },
    { course: "S1101", name: "Statistics", semester: "sem1", year: 1, professor: "Dr. E", credits: 3 },
    { course: "I1100", name: "Introduction to Informatics", semester: "sem1", year: 1, professor: "Dr. F", credits: 3 },

    // Semester 2
    { course: "M1102", name: "Algebra 2", semester: "sem2", year: 1, professor: "Dr. G", credits: 3 },
    { course: "M1103", name: "Algebra 3", semester: "sem2", year: 1, professor: "Dr. H", credits: 6 },
    { course: "M1104", name: "Analysis 2", semester: "sem2", year: 1, professor: "Dr. I", credits: 6 },
    { course: "M1105", name: "Analysis 3", semester: "sem2", year: 1, professor: "Dr. J", credits: 6 },
    { course: "M1106", name: "Analysis 4", semester: "sem2", year: 1, professor: "Dr. K", credits: 3 },
    { course: "I1101", name: "Algorithms, Programming", semester: "sem2", year: 1, professor: "Dr. L", credits: 6 },

    // Semester 3
    { course: "I2201", name: "Web Development", semester: "sem3", year: 2, professor: "Dr. M", credits: 3 },
    { course: "I2202", name: "Computer Organization", semester: "sem3", year: 2, professor: "Dr. N", credits: 3 },
    { course: "I2203", name: "Operating System 1", semester: "sem3", year: 2, professor: "Dr. O", credits: 3 },
    { course: "I2204", name: "Imperative Programming", semester: "sem3", year: 2, professor: "Dr. P", credits: 3 },
    { course: "I2205", name: "Graphs", semester: "sem3", year: 2, professor: "Dr. Q", credits: 3 },
    { course: "S2250", name: "Statistics", semester: "sem3", year: 2, professor: "Dr. R", credits: 3 },

    // Semester 4
    { course: "I2206", name: "Data Structures", semester: "sem4", year: 2, professor: "Dr. S", credits: 3 },
    { course: "I2207", name: "Computer Architecture", semester: "sem4", year: 2, professor: "Dr. T", credits: 3 },
    { course: "I2208", name: "Network 1", semester: "sem4", year: 2, professor: "Dr. U", credits: 3 },
    { course: "I2209", name: "Logical Programming", semester: "sem4", year: 2, professor: "Dr. V", credits: 3 },
    { course: "I2210", name: "Database 1", semester: "sem4", year: 2, professor: "Dr. W", credits: 3 },

    // Semester 5
    { course: "DHR300", name: "Human Rights", semester: "sem5", year: 3, professor: "Dr. X", credits: 3 },
    { course: "I3301", name: "Software Engineering", semester: "sem5", year: 3, professor: "Dr. Y", credits: 4 },
    { course: "I3302", name: "PHP", semester: "sem5", year: 3, professor: "Dr. Z", credits: 4 },
    { course: "I3303", name: "OS 2", semester: "sem5", year: 3, professor: "Dr. AA", credits: 4 },
    { course: "I3304", name: "Network 2", semester: "sem5", year: 3, professor: "Dr. BB", credits: 4 },
    { course: "I3305", name: "Graphic Interface", semester: "sem5", year: 3, professor: "Dr. CC", credits: 3 },
    { course: "I3306", name: "Database 2", semester: "sem5", year: 3, professor: "Dr. DD", credits: 3 },

    // Semester 6
    { course: "I3307", name: "Theory of Computation", semester: "sem6", year: 3, professor: "Dr. EE", credits: 4 },
    { course: "I3308", name: "Project", semester: "sem6", year: 3, professor: "Dr. FF", credits: 4 },
    { course: "I3330", name: "IT Project Management", semester: "sem6", year: 3, professor: "Dr. GG", credits: 3 },
    { course: "I3331", name: "Computers and Society", semester: "sem6", year: 3, professor: "Dr. HH", credits: 3 },
    { course: "I3332", name: "Generation Programming Language", semester: "sem6", year: 3, professor: "Dr. II", credits: 3 }
];

const resources = [
    { course: "M1100", name: "Algebra Notes", resourceType: "PDF", link: "https://example.com/m1100" },
    { course: "M1100", name: "Algebra Practice Problems", resourceType: "Practice Problems", link: "https://example.com/m1100-practice" },
    { course: "M1101", name: "Analysis Assignments", resourceType: "Assignments", link: "https://example.com/m1101-assignments" },
    { course: "P1100", name: "Mechanics Study Guide", resourceType: "Study Guide", link: "https://example.com/p1100-guide" },
];
   
            
    // Populate professor filter
    function populateFilters() {
        const professorFilter = document.getElementById("professor-filter");

        const professors = [...new Set(courses.map(course => course.professor))];

        const populateSelect = (selectElement, options) => {
            options.forEach(option => {
                const optionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.textContent = option;
                selectElement.appendChild(optionElement);
            });
        };

        populateSelect(professorFilter, ["all", ...professors]);
    }

    // Filter courses based on user input
    function filterCourses() {
        const searchQuery = document.getElementById("search-bar").value.toLowerCase();
        const professorFilter = document.getElementById("professor-filter").value;
        const sortBy = document.getElementById("sort-by").value;

        const filteredCourses = courses.filter(course => {
            const matchesSearch = course.name.toLowerCase().includes(searchQuery) || course.course.toLowerCase().includes(searchQuery);
            const matchesProfessor = (professorFilter === "all" || course.professor === professorFilter);
            return matchesSearch && matchesProfessor;
        });

        displayCourses(filteredCourses, sortBy);
    }

    // Sort courses within each semester based on the selected criteria
    function sortCourses(courses, sortBy) {
        if (sortBy === "credits") {
            return courses.sort((a, b) => a.credits - b.credits);
        }
        // Default sort by course
        return courses.sort((a, b) => a.course.localeCompare(b.course));
    }

    // Display filtered and sorted courses
    function displayCourses(filteredCourses, sortBy) {
        const coursesList = document.getElementById("courses-list");
        coursesList.innerHTML = "";

        if (filteredCourses.length === 0) {
            coursesList.innerHTML = "<p>No courses found for the selected filters.</p>";
            return;
        }

        // Group courses by semester
        const groupedBySemester = filteredCourses.reduce((groups, course) => {
            const semester = course.semester;
            if (!groups[semester]) {
                groups[semester] = [];
            }
            groups[semester].push(course);
            return groups;
        }, {});

        // Iterate over each semester and display its courses
        for (const semester in groupedBySemester) {
            const semesterSection = document.createElement("section");

            const semesterHeader = document.createElement("h2");
            semesterHeader.textContent = `Courses for Semester ${semester.charAt(3)}`;
            semesterSection.appendChild(semesterHeader);

            const coursesContainer = document.createElement("div");
            coursesContainer.className = "courses-container";

            // Sort the courses within each semester
            const sortedCourses = sortCourses(groupedBySemester[semester], sortBy);

            sortedCourses.forEach(course => {
                const courseItem = document.createElement("div");
                courseItem.className = "course-item";

                const courseTitle = document.createElement("h3");
                courseTitle.className = "course-title";
                courseTitle.innerHTML = `
                    <a href="#" onclick="viewCoursePortal('${course.course}')">${course.course} - ${course.name}</a>
                `;

                const courseInfo = document.createElement("p");
                courseInfo.className = "course-info";
                courseInfo.textContent = `${course.credits} Credits | Professor: ${course.professor}`;

                courseItem.appendChild(courseTitle);
                courseItem.appendChild(courseInfo);
                coursesContainer.appendChild(courseItem);
            });

            semesterSection.appendChild(coursesContainer);
            coursesList.appendChild(semesterSection);
        }
    }

// Function to view the course portal (filter and sort resources for a particular course)
function viewCoursePortal(courseCode) {
    const filteredResources = resources.filter(resource => resource.course === courseCode); // Filter by course code

    const coursesList = document.getElementById("courses-list");
    coursesList.innerHTML = "";

    // Add a class to body to indicate we are in resource view
    document.body.classList.add("course-view");

    // Create and append "Go Back" button
    const goBackButton = document.createElement("button");
    goBackButton.textContent = "Go Back to Courses";
    goBackButton.className = "go-back-button";

    // When Go Back button is clicked
    goBackButton.onclick = () => {
        window.location.href = "resources.html"; // Change to the relevant page URL
    };

    coursesList.appendChild(goBackButton);

    const portalHeader = document.createElement("h2");
    portalHeader.textContent = `Resources for Course: ${courseCode}`;
    coursesList.appendChild(portalHeader);

    // Create and append search bar for filtering resources
    const searchBar = document.createElement("input");
    searchBar.type = "text";
    searchBar.id = "search-bar";
    searchBar.placeholder = "Search resources...";
    searchBar.className = "search-bar";
    coursesList.appendChild(searchBar);

    // Create and append resource type filter dropdown
    const resourceTypeFilter = document.createElement("select");
    resourceTypeFilter.id = "resource-type-filter";
    const resourceTypes = ["All", "PDF", "Exam", "Video", "Assignment"]; // Add more types as needed
    resourceTypes.forEach(type => {
        const option = document.createElement("option");
        option.value = type.toLowerCase();
        option.textContent = type;
        resourceTypeFilter.appendChild(option);
    });
    coursesList.appendChild(resourceTypeFilter);

    // Create and append sort dropdown for sorting resources
    const sortBy = document.createElement("select");
    sortBy.id = "sort-by";
    const sortByOptions = ["Sort by", "Name", "Resource Type"];
    sortByOptions.forEach(optionText => {
        const option = document.createElement("option");
        option.value = optionText.toLowerCase().replace(" ", "_");
        option.textContent = optionText;
        sortBy.appendChild(option);
    });
    coursesList.appendChild(sortBy);

    // Filter and sort resources whenever search, filter, or sort changes
    searchBar.addEventListener("input", updateResourceDisplay);
    resourceTypeFilter.addEventListener("change", updateResourceDisplay);
    sortBy.addEventListener("change", updateResourceDisplay);

    // Function to filter and sort resources based on search, resource type, and sort criteria
    function updateResourceDisplay() {
        const searchQuery = searchBar.value.toLowerCase();
        const selectedType = resourceTypeFilter.value;
        const filteredBySearch = filterResources(filteredResources, searchQuery, selectedType);
        const sortedResources = sortResources(filteredBySearch, sortBy.value);
        displayFilteredResources(sortedResources);
    }

    // Function to filter resources based on search query and selected resource type
    function filterResources(resources, searchQuery, resourceType) {
        return resources.filter(resource => {
            const matchesSearch = resource.name.toLowerCase().includes(searchQuery) ||
                                  resource.resourceType.toLowerCase().includes(searchQuery);
            const matchesType = resourceType === "all" || resource.resourceType.toLowerCase() === resourceType;
            return matchesSearch && matchesType;
        });
    }

    // Function to sort resources based on selected criterion
    function sortResources(resources, sortBy) {
        switch (sortBy) {
            case "name":
                return resources.sort((a, b) => a.name.localeCompare(b.name));
            case "resource_type":
                return resources.sort((a, b) => a.resourceType.localeCompare(b.resourceType));
            default:
                return resources;
        }
    }

    // Function to display filtered and sorted resources
    function displayFilteredResources(filteredResources) {
        const portalContainer = document.createElement("div");
        portalContainer.className = "portal-container";

        if (filteredResources.length === 0) {
            const noResourcesMessage = document.createElement("p");
            noResourcesMessage.textContent = "No resources found.";
            portalContainer.appendChild(noResourcesMessage);
        }

        filteredResources.forEach(resource => {
            const resourceItem = document.createElement("div");
            resourceItem.className = "course-item";

            const resourceName = document.createElement("h3");
            resourceName.textContent = `${resource.resourceType}: ${resource.name}`;

            const resourceLink = document.createElement("a");
            resourceLink.href = resource.link;
            resourceLink.target = "_blank";
            resourceLink.textContent = "Access Resource";

            resourceItem.appendChild(resourceName);
            resourceItem.appendChild(resourceLink);
            portalContainer.appendChild(resourceItem);
        });

        // Clear previous content and append the new filtered resources
        const existingPortalContainer = document.querySelector(".portal-container");
        if (existingPortalContainer) {
            existingPortalContainer.remove();
        }
        coursesList.appendChild(portalContainer);
    }

    // Initially display all resources for the course
    updateResourceDisplay();  // Use the update function to display the resources when the page loads
}

        // Initialize everything
        populateFilters();
        filterCourses();

        // Event listeners for updates
        document.getElementById("professor-filter").addEventListener("change", filterCourses);
        document.getElementById("sort-by").addEventListener("change", filterCourses);
        document.getElementById("search-bar").addEventListener("input", filterCourses);