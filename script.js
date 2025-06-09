const books = [
    { title: 'The Kite Runner', category: 'Fiction', borrowed: false, cover: 'the_kite_runner.png' },
    { title: 'In Cold Blood', category: 'Non-Fiction', borrowed: true, cover: 'in_cold_blood.png' },
    { title: 'A Brief History Of Time', category: 'Science', borrowed: false, cover: 'a_brief_history_of_time.png' },
    { title: 'Blue Ocean Strategy', category: 'Business', borrowed: false, cover: 'blue_ocean_strategy.png' } // New book added
];

const history = [];

document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('book-list');
    const historyList = document.getElementById('history-list');
    const searchInput = document.getElementById('search');

    function displayBooks() {
        bookList.innerHTML = '';
        books.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.className = 'book-item';
            bookItem.innerHTML = `
                <img src="${book.cover}" alt="${book.title} Cover">
                <div>
                    <h3>${book.title}</h3>
                    <p>Category: ${book.category}</p>
                    <button onclick="borrowBook('${book.title}')">${book.borrowed ? 'Return' : 'Borrow'}</button>
                </div>
            `;
            bookList.appendChild(bookItem);
        });
    }

    function displayHistory() {
        historyList.innerHTML = '';
        history.forEach(entry => {
            const historyItem = document.createElement('li');
            historyItem.textContent = `${entry.title} - ${entry.action}`;
            historyList.appendChild(historyItem);
        });
    }

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query));
        bookList.innerHTML = '';
        filteredBooks.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.className = 'book-item';
            bookItem.innerHTML = `
                <img src="${book.cover}" alt="${book.title} Cover">
                <div>
                    <h3>${book.title}</h3>
                    <p>Category: ${book.category}</p>
                    <button onclick="borrowBook('${book.title}')">${book.borrowed ? 'Return' : 'Borrow'}</button>
                </div>
            `;
            bookList.appendChild(bookItem);
        });
    });

    window.borrowBook = (title) => {
        const book = books.find(b => b.title === title);
        book.borrowed = !book.borrowed;
        history.push({ title: book.title, action: book.borrowed ? 'Borrowed' : 'Returned' });
        displayBooks();
        displayHistory();
    };

    displayBooks();
    displayHistory();
});
