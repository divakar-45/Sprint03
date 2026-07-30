# Sprint03# GitHub User Finder

GitHub User Finder is a responsive web application that allows users to search for GitHub profiles, view user information, explore recent repositories, and compare two GitHub users using the GitHub REST API.

---

## Features

- Search GitHub users by username
- View profile information
  - Name
  - Username
  - Bio
  - Join Date
  - Followers
  - Following
  - Public Repositories
  - Portfolio Website
- Display latest five repositories
- Battle Mode to compare two GitHub users
- Winner selection based on total repository stars
- Error handling for invalid usernames
- Loading indicator while fetching data
- Responsive design for desktop, tablet, and mobile
- Keyboard support using Enter key
- Accessible HTML with ARIA labels

---

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6)
- GitHub REST API

---

## Project Structure

```
GitHub-User-Finder/
│
├── index.html
├── style.css
├── script.js
├── favicon.ico
└── README.md
```

---

## How It Works

### Profile Search

1. Enter a GitHub username.
2. Click Search.
3. The application sends a request to the GitHub API.
4. User profile details are displayed.
5. Latest repositories are fetched and shown.

---

### Battle Mode

1. Enter two GitHub usernames.
2. Click Compare.
3. The application fetches both users.
4. Total stars from all repositories are calculated.
5. User with the highest number of stars is declared the winner.

---

## API Used

GitHub REST API

```
https://api.github.com/users/{username}
```

---

## Future Improvements

- Dark Mode
- Repository Search
- Repository Language Statistics
- GitHub Contribution Graph
- Profile Export as PDF
- Pagination for repositories
- User Activity Timeline
- GitHub Organization Details
- Repository Filters
- Repository Sorting Options

---

## Learning Outcomes

- Working with REST APIs
- JavaScript Fetch API
- Async/Await
- Promise Handling
- DOM Manipulation
- Responsive Web Design
- Error Handling
- API Integration
- Accessibility Basics

---

## Author

Divakar Pathak
