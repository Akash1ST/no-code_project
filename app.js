// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Расширяем на весь экран
tg.expand();

// Получаем данные пользователя
const user = tg.initDataUnsafe.user;
const userId = user?.id || 'Неизвестно';
const firstName = user?.first_name || 'Гость';
const username = user?.username ? `@${user.username}` : 'Нет username';

// Показываем информацию о пользователе
document.getElementById('user-info').innerHTML = `
    <span>👤 ${firstName}</span>
    ${username !== 'Нет username' ? `<span>${username}</span>` : ''}
`;

// Показываем все данные пользователя
document.getElementById('user-data').textContent = JSON.stringify(user, null, 2);

// Обновляем заголовок
document.getElementById('app-title').textContent = `Привет, ${firstName}!`;

// Основная кнопка
document.getElementById('main-btn').addEventListener('click', () => {
    tg.showPopup({
        title: 'Уведомление',
        message: 'Вы нажали на кнопку!',
        buttons: [{ type: 'ok' }]
    });
    
    // Отправляем данные боту
    tg.sendData(JSON.stringify({
        action: 'button_click',
        user_id: userId,
        timestamp: Date.now()
    }));
    
    // Показываем feedback
    tg.HapticFeedback.impactOccurred('medium');
});

// Кнопки функций
document.querySelectorAll('.feature-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const action = this.dataset.action;
        
        switch(action) {
            case 'theme':
                // Переключаем тему
                const newTheme = tg.colorScheme === 'dark' ? 'light' : 'dark';
                tg.setHeaderColor(newTheme === 'dark' ? '#212121' : '#3390ec');
                tg.showAlert(`Тема изменена на ${newTheme}`);
                break;
                
            case 'haptic':
                // Вибрация
                tg.HapticFeedback.impactOccurred('heavy');
                tg.showAlert('Вибрация! 📳');
                break;
                
            case 'share':
                // Поделиться
                if (tg.share) {
                    tg.share({
                        title: 'Telegram Mini App',
                        text: 'Посмотрите это крутое приложение!',
                        url: window.location.href
                    });
                }
                break;
        }
    });
});

// Кнопка закрытия
document.getElementById('close-btn').addEventListener('click', () => {
    tg.close();
});

// Обработка данных от бота
tg.onEvent('viewportChanged', () => {
    console.log('Viewport изменился');
});

// Основная кнопка внизу (если нужна)
tg.MainButton.setParams({
    text: 'ОТПРАВИТЬ ДАННЫЕ',
    color: '#3390ec',
    text_color: '#ffffff'
});

tg.MainButton.onClick(() => {
    tg.sendData(JSON.stringify({
        command: 'save_data',
        user: user,
        app_data: { some: 'data' }
    }));
    tg.close();
});

// Показываем кнопку при определенных условиях
if (tg.initDataUnsafe.start_param) {
    tg.MainButton.show();
}

// Инициализация завершена
tg.ready();
console.log('Telegram Web App инициализирован');