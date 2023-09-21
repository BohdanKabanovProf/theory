let posts = [];
const search = document.querySelector('.search-table');
const table = document.querySelector('.table')
function fetchData() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            posts = data;
            uploadContentFromTable(posts, table);
        })
        .catch(error => console.error(error));
}

function uploadContentFromTable(data, table) {
    const thead = table?.querySelector('thead');
    const tbody = table?.querySelector('tbody')
    tbody.innerHTML = ''
    data.forEach(post => {
        const row = document.createElement('tr');
        const idCell = document.createElement('td');
        const titleCell = document.createElement('td');
        const bodyCell = document.createElement('td');
        idCell.textContent = post.id;
        titleCell.textContent = post.title;
        bodyCell.textContent = post.body;
        row.appendChild(idCell);
        row.appendChild(titleCell);
        row.appendChild(bodyCell);
        tbody?.appendChild(row);
    });
}

const headers = table.querySelector('thead')?.querySelectorAll('th');
headers?.forEach(header => {
    header.addEventListener('click', () => {
        search.value = ''
        const tbody = table.querySelector('tbody')
        const column = header.getAttribute('data-column');
        const order = header.getAttribute('data-order', 'desc');
        header.setAttribute('data-order', order === 'asc' ? 'desc' : 'asc');
        const sortedData = sortTable(posts, column, order);
        uploadContentFromTable(sortedData, table);
    });
});

search.addEventListener('input', (search) => {
    const query = search.target.value.replace(/(\r\n|\n|\r)/gm, ' ').toUpperCase()
    const filteredData = posts.filter(post => {
        console.log(post.body.replace(/(\r\n|\n|\r)/gm, ' ').toUpperCase());
        return post.title.replace(/(\r\n|\n|\r)/gm, ' ').toUpperCase().includes(query) || post.body.replace(/(\r\n|\n|\r)/gm, '').toUpperCase().includes(query);
    });

    if (query.length >= 3) {
        uploadContentFromTable(filteredData, table)
    } else {
        uploadContentFromTable(posts, table)
    }
})

function sortTable(data, column, order) {
    const sortedData = data.sort((a, b) => {
        if (order === 'asc') {
            return a[column] > b[column] ? 1 : -1;
        } else {
            return a[column] < b[column] ? 1 : -1;
        }
    });
    return sortedData;
}

fetchData()