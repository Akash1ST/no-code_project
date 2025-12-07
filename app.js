document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');
            
            // Базовая валидация
            if (!email || !password) {
                errorMessage.textContent = 'Пожалуйста, заполните все поля';
                errorMessage.style.display = 'block';
                return;
            }
            
            if (!isValidEmail(email)) {
                errorMessage.textContent = 'Пожалуйста, введите корректный email';
                errorMessage.style.display = 'block';
                return;
            }
            
            // Здесь будет отправка данных на сервер
            console.log('Отправка данных:', { email, password });
            
            // Имитация успешного входа
            errorMessage.style.display = 'none';
            alert('Вход выполнен успешно!');
            
            // В реальном приложении здесь будет редирект
            // window.location.href = '/dashboard';
        });
        
        document.getElementById('forgotPassword').addEventListener('click', function(e) {
            e.preventDefault();
            alert('Функция восстановления пароля будет доступна в ближайшее время');
        });
        
        document.getElementById('registerLink').addEventListener('click', function(e) {
            e.preventDefault();
            alert('Переход на страницу регистрации');
        });
        
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }