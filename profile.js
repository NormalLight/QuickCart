// QuickCart Profile Page - Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeEditPictureButton();
    initializeLogoutButton();
    initializeFormFields();
});

// ========== EDIT PROFILE PICTURE ==========
function initializeEditPictureButton() {
    const editBtn = document.querySelector('.edit-picture-btn');
    const profileImage = document.getElementById('profileImage');
    
    editBtn.addEventListener('click', function() {
        // Create a file input to select new image
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    profileImage.src = event.target.result;
                    // Save to localStorage for persistence
                    localStorage.setItem('profileImage', event.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
        
        fileInput.click();
    });
    
    // Load saved profile image if exists
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        profileImage.src = savedImage;
    }
}

// ========== LOGOUT BUTTON ==========
function initializeLogoutButton() {
    const logoutBtn = document.querySelector('.logout-btn');
    
    logoutBtn.addEventListener('click', function() {
        // Show confirmation
        if (confirm('Are you sure you want to logout?')) {
            // Clear any saved data
            localStorage.removeItem('profileImage');
            // Redirect to main page
            window.location.href = 'index.html';
        }
    });
}

// ========== FORM FIELDS ==========
function initializeFormFields() {
    const formInputs = document.querySelectorAll('.field-input');
    
    // Load saved form data
    formInputs.forEach(input => {
        const savedValue = localStorage.getItem('profile_' + input.previousElementSibling.previousElementSibling.textContent.toLowerCase().replace(/\s/g, '_'));
        if (savedValue) {
            input.value = savedValue;
        }
        
        // Save on change
        input.addEventListener('change', function() {
            const labelText = this.closest('.form-group').querySelector('.field-label').textContent;
            localStorage.setItem('profile_' + labelText.toLowerCase().replace(/\s/g, '_'), this.value);
        });
    });
}

