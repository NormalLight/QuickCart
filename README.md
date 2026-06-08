# QuickCart

QuickCart is a simple grocery list web application designed with a clean, colorful, and easy-to-use interface. The app helps users view grocery items, filter items by dietary needs, add new items, and manage a basic profile page.

## Features

- Grocery list with preloaded items
- Dietary filter buttons for:
  - All
  - Vegan
  - Halal
  - Gluten-Free
- Checkbox interaction for marking grocery items as complete
- Add Item modal for adding custom grocery list items
- Dietary tags and icons for added items
- Profile page with editable user information
- Ability to update the profile picture
- Local storage support for saving profile changes
- Responsive profile layout for smaller screens

## Project Structure

```text
QuickCart/
├── images/
│   ├── background.svg
│   ├── food1.png
│   ├── food2.png
│   ├── food3.png
│   ├── logo.svg
│   └── profile.png
├── index.html
├── profile.css
├── profile.html
├── profile.js
├── script.js
└── styles.css
```

## Files Overview

| File | Description |
|---|---|
| `index.html` | Main grocery list page for QuickCart. |
| `styles.css` | Main styling file for the home page, layout, navbar, filters, grocery items, footer, and modal. |
| `script.js` | Handles grocery list interactions, dietary filtering, checkboxes, and adding new items. |
| `profile.html` | Profile page containing the user profile picture and editable profile fields. |
| `profile.css` | Styling specific to the profile page. |
| `profile.js` | Handles profile picture changes, logout behavior, and saving profile field updates with local storage. |
| `images/` | Stores the background, logo, profile picture, and food/dietary icon images. |

## How to Run

1. Download or clone the project files.
2. Keep the file structure the same, especially the `images` folder.
3. Open `index.html` in a web browser.
4. Use the profile icon in the navigation bar to open the profile page.

No installation or server setup is required because this is a static HTML, CSS, and JavaScript project.

## Technologies Used

- HTML
- CSS
- JavaScript
- Browser local storage
- Google Fonts

## Notes

This project is front-end only. It does not use a database or back-end server, so grocery list changes are only active during the current page session. Profile information and profile picture changes are saved locally in the browser using local storage.

## Course Context

QuickCart was made for a User Interfaces course. It represents the final product of a design process that moved from low-fidelity wireframes to a refined high-fidelity prototype, while applying user interface design principles such as visual hierarchy, consistency, accessibility, feedback, and ease of navigation.
