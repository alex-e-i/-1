let page = 1; // Текущая страница
const itemsPerPage = 5; // Количество элементов на странице
const content = document.getElementById('content');
const loading = document.getElementById('loading');

// Функция для загрузки данных
async function loadMoreItems() {
    loading.style.display = 'block'; // Показываем индикатор загрузки

    // Загружаем данные из JSON-файла
    const response = await fetch('data.json');
    const data = await response.json();

    // Вычисляем, какие элементы нужно показать
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = data.slice(startIndex, endIndex);

    // Добавляем новые элементы в ленту
    itemsToShow.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        itemElement.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.content}</p>
        `;
        content.appendChild(itemElement);
    });

    loading.style.display = 'none'; // Скрываем индикатор загрузки
    page++; // Увеличиваем номер страницы

    // Если данные закончились, останавливаем подгрузку
    if (endIndex >= data.length) {
        window.removeEventListener('scroll', checkScroll);
        const endMessage = document.createElement('div');
        endMessage.textContent = 'Вы достигли конца ленты.';
        content.appendChild(endMessage);
    }
}

// Функция для проверки прокрутки
function checkScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // Если пользователь прокрутил до конца страницы
    if (scrollTop + clientHeight >= scrollHeight - 10) {
        loadMoreItems();
    }
}

// Загружаем первую страницу при загрузке сайта
loadMoreItems();

// Следим за прокруткой
window.addEventListener('scroll', checkScroll);