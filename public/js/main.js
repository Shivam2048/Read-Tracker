// Function to open popup
function openPopup(title, book = {}) {
    document.getElementById('popupTitle').textContent = title;

    // Fill form fields if editing (for Add New Book, book can be empty)
    document.getElementById('bookId').value = book.id || "";
    document.querySelector('input[name="title"]').value = book.title || "";
    document.querySelector('input[name="author"]').value = book.author || "";
    document.querySelector('input[name="DOC"]').value = book.DOC || "";
    document.querySelector('textarea[name="summary"]').value = book.summary || "";
    document.querySelector('input[name="rating"]').value = book.rating || "";

    document.getElementById('bookPopup').style.display = 'flex';
}

// Function to close popup
function closePopup() {
    document.getElementById('bookPopup').style.display = 'none';
}

// Add listener to cancel button
document.getElementById('cancelPopup').addEventListener('click', closePopup);
