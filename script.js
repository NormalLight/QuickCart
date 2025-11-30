// QuickCart Grocery List - Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    initializeCheckboxes();
    initializeAddItemButton();
});

// ========== DIETARY FILTER FUNCTIONALITY ==========
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter type
            const filterType = this.textContent.trim().toLowerCase();
            filterGroceryItems(filterType);
        });
    });
}

function filterGroceryItems(filterType) {
    const groceryItems = document.querySelectorAll('.grocery-item');
    
    groceryItems.forEach(item => {
        const dietaryTags = item.getAttribute('data-dietary') || '';
        
        if (filterType === 'all') {
            // Show all items when "All" is selected
            item.style.display = 'flex';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        } else {
            // Check if item matches the selected filter
            const matches = dietaryTags.includes(filterType);
            
            if (matches) {
                item.style.display = 'flex';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            } else {
                // Hide items that don't match
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        }
    });
    
    // Animate the transition
    requestAnimationFrame(() => {
        const visibleItems = document.querySelectorAll('.grocery-item[style*="display: flex"]');
        visibleItems.forEach((item, index) => {
            item.style.transition = 'all 0.3s ease';
            item.style.transitionDelay = `${index * 0.05}s`;
        });
    });
}

// ========== CHECKBOX FUNCTIONALITY ==========
function initializeCheckboxes() {
    const checkboxes = document.querySelectorAll('.checkbox-container input');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const itemName = this.closest('.grocery-item').querySelector('.item-name');
            
            if (this.checked) {
                itemName.classList.add('checked');
                itemName.style.fontWeight = '400';
            } else {
                itemName.classList.remove('checked');
                itemName.style.fontWeight = '700';
            }
        });
    });
}

// ========== ADD ITEM FUNCTIONALITY ==========
function initializeAddItemButton() {
    const addButton = document.querySelector('.add-item-btn');
    
    addButton.addEventListener('click', function() {
        showAddItemModal();
    });
}

function showAddItemModal() {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="modal">
            <h2 class="modal-title">Add New Item</h2>
            <input type="text" id="itemNameInput" class="modal-input" placeholder="Enter item name...">
            <div class="modal-dietary">
                <span class="modal-label">Dietary Tags:</span>
                <div class="dietary-checkboxes">
                    <label><input type="checkbox" value="vegan"> Vegan</label>
                    <label><input type="checkbox" value="halal"> Halal</label>
                    <label><input type="checkbox" value="gluten-free"> Gluten-Free</label>
                </div>
            </div>
            <div class="modal-buttons">
                <button class="modal-btn cancel-btn">Cancel</button>
                <button class="modal-btn add-btn">Add Item</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Focus the input
    const input = overlay.querySelector('#itemNameInput');
    input.focus();
    
    // Cancel button
    overlay.querySelector('.cancel-btn').addEventListener('click', () => {
        overlay.remove();
    });
    
    // Add button
    overlay.querySelector('.add-btn').addEventListener('click', () => {
        const itemName = input.value.trim();
        if (itemName) {
            const dietaryTags = Array.from(overlay.querySelectorAll('.dietary-checkboxes input:checked'))
                .map(cb => cb.value)
                .join(' ');
            addNewItem(itemName, dietaryTags);
            overlay.remove();
        }
    });
    
    // Enter key to add
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            overlay.querySelector('.add-btn').click();
        }
    });
    
    // Click outside to close
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

function addNewItem(name, dietaryTags = '') {
    const groceryList = document.querySelector('.grocery-items');
    
    const newItem = document.createElement('li');
    newItem.className = 'grocery-item';
    newItem.setAttribute('data-dietary', dietaryTags);
let iconsHtml = "";

if (dietaryTags.includes("vegan")) {
    iconsHtml += `<img src="images/food3.png" class="item-icon icon-2">`;
}
if (dietaryTags.includes("halal")) {
    iconsHtml += `<img src="images/food2.png" class="item-icon icon-1">`;
}
if (dietaryTags.includes("gluten-free")) {
    iconsHtml += `<img src="images/food1.png" class="item-icon icon-3">`;
}

newItem.innerHTML = `
    <label class="checkbox-container">
        <input type="checkbox">
        <span class="checkmark"></span>
    </label>
    <span class="item-name">${escapeHtml(name)}</span>
    <div class="item-icons">
        ${iconsHtml}
    </div>
`;

    
    // Add with animation
    newItem.style.opacity = '0';
    newItem.style.transform = 'translateY(-20px)';
    groceryList.appendChild(newItem);
    
    requestAnimationFrame(() => {
        newItem.style.transition = 'all 0.3s ease';
        newItem.style.opacity = '1';
        newItem.style.transform = 'translateY(0)';
    });
    
    // Re-initialize checkbox for new item
    const newCheckbox = newItem.querySelector('.checkbox-container input');
    newCheckbox.addEventListener('change', function() {
        const itemNameSpan = this.closest('.grocery-item').querySelector('.item-name');
        
        if (this.checked) {
            itemNameSpan.classList.add('checked');
            itemNameSpan.style.fontWeight = '400';
        } else {
            itemNameSpan.classList.remove('checked');
            itemNameSpan.style.fontWeight = '700';
        }
    });
    
    // Re-apply current filter
    const activeFilter = document.querySelector('.filter-btn.active');
    if (activeFilter) {
        const filterType = activeFilter.textContent.trim().toLowerCase();
        filterGroceryItems(filterType);
    }
}

// Helper function to escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
