const filterItems = document.querySelectorAll('.filter-item');
const posts = document.querySelectorAll('.post');

filterItems.forEach(item => {
    item.addEventListener('click', function () {
        filterItems.forEach(filterItem => filterItem.classList.remove('active'));
        this.classList.add('active');

        const category = this.classList.contains('all') ? 'all' : this.textContent.trim().toLowerCase();

        if (category === 'all') {
            posts.forEach(post => post.classList.remove('hidden'));
        } else {
            posts.forEach(post => post.classList.add('hidden'));

            const filteredPosts = document.querySelectorAll(`.post.${category}`);
            filteredPosts.forEach(post => post.classList.remove('hidden'));
        }
    });
});

const initMasonryLayout = function (columns) {
    const containerElement = document.querySelector('.gallery-container') || '';

    if (!containerElement) {
        return;
    }

    const wrapperElement = containerElement.parentNode;
    const masonryElements = Array.from(document.querySelectorAll('.post'));

    containerElement.parentNode.removeChild(containerElement);

    const newElement = document.createElement('div');
    newElement.setAttribute('id', 'post-container');
    newElement.classList.add('masonry-layout', `columns-${columns}`);
    wrapperElement.appendChild(newElement);

    const columnsArray = Array.from({ length: columns }, (_, i) => {
        const newColumn = document.createElement('div');
        newColumn.classList.add(`masonry-column-${i + 1}`);
        newElement.appendChild(newColumn);
        return newColumn;
    });

    function handleResize() {
        const columnsPerRow = window.innerWidth <= 992 ? 2 : columns;

        newElement.className = '';
        newElement.classList.add('masonry-layout', `columns-${columnsPerRow}`);

        columnsArray.forEach(column => column.innerHTML = '');

        masonryElements.forEach((image, index) => {
            const columnIndex = index % columnsPerRow;
            columnsArray[columnIndex].appendChild(image);
        });
    }

    handleResize();
    window.addEventListener('resize', handleResize);
};

const initialColumns = window.innerWidth <= 992 ? 2 : 4;
initMasonryLayout(initialColumns);

function expandGallery() {
    const gallery = document.querySelector('#post-container');
    if (gallery) {
        gallery.classList.add('expanded');
        document.querySelector('.show-more').style.display = 'none';
        document.querySelector('.gradient-box').style.display = 'none';
    }
}

document.querySelector('.show-more').addEventListener('click', expandGallery);

