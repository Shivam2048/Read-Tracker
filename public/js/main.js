// Function to open popup
function openPopup(title, book = {}) {
    document.getElementById('popupTitle').textContent = title;

    document.getElementById('bookForm').action = (title === "Edit Book") ? "/edit" : "/add";

    document.getElementById('bookId').value = book.id || "";
    document.querySelector('input[name="title"]').value = book.title || "";
    document.querySelector('input[name="author"]').value = book.author || "";
    document.querySelector('input[name="DOC"]').value = book.date || "";
    document.querySelector('input[name="DOC"]').value = book.DOC || "";
    document.querySelector('input[name="rating"]').value = book.rating || "";

    document.getElementById('bookPopup').style.display = 'flex';
}

// Add listener for "Add new book" button
document.querySelector('.h-addBook').addEventListener('click', () => {
    openPopup("Add New Book");
});

// Add listener for Edit buttons
document.querySelectorAll(".edit-btn").forEach(btn => {
  btn.addEventListener("click", function() {
    const card = this.closest(".book-card");
    const id = card.dataset.id;
    if (!id) {
        alert("No ID found for this book!");
        return;
    }
    openPopup("Edit Book", {
        id: card.dataset.id,
        title: card.dataset.title,
        author: card.dataset.author,
        date: card.dataset.date,
        note: card.dataset.note,
        rating: card.dataset.rating
    });
  });
});

// Function to close popup
function closePopup() {
    document.getElementById('bookPopup').style.display = 'none';
}

// Add listener to cancel button
document.getElementById('cancelPopup').addEventListener('click', closePopup);
