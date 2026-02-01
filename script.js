document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const activeHall = document.getElementById('active-hall');
    const backButton = document.getElementById('back-to-halls');
    const enterButtons = document.querySelectorAll('.enter-btn');
    const knowledgePointsEl = document.getElementById('knowledge-points');
    
    let knowledgePoints = 0;
    let currentHall = null;
    
    // Данные для залов
    const hallData = {
        spectrum: {
            title: 'Шкала электромагнитных волн',
            icon: 'fas fa-wave-square',
            content: `
                <h2><i class="fas fa-wave-square"></i> Шкала электромагнитных волн</h2>
                <p>Электромагнитные волны - это колебания электрического и магнитного полей, которые распространяются в пространстве. Они отличаются длиной волны и частотой.</p>
                
                <div class="spectrum-scale">
                    <h3>Полный спектр ЭМ волн:</h3>
                    
                    <div class="wave-item">
                        <div class="wave-color" style="background-color: #7209b7;"></div>
                        <div class="wave-info">
                            <strong>Радиоволны</strong>
                            <div class="wavelength">Длина волны: > 1 мм | Использование: радио, ТВ, сотовая связь</div>
                        </div>
                        <button class="info-btn" data-wave="radio">Подробнее</button>
                    </div>
                    
                    <div class="wave-item">
                        <div class="wave-color" style="background-color: #4361ee;"></div>
                        <div class="wave-info">
                            <strong>Микроволны</strong>
                            <div class="wavelength">Длина волны: 1 мм - 1 м | Использование: микроволновки, Wi-Fi, радары</div>
                        </div>
                        <button class="info-btn" data-wave="microwave">Подробнее</button>
                    </div>
                    
                    <div class="wave-item">
                        <div class="wave-color" style="background-color: #4cc9f0;"></div>
                        <div class="wave-info">
                            <strong>Инфракрасное излучение</strong>
                            <div class="wavelength">Длина волны: 1 мм - 700 нм | Использование: пульты ДУ, тепловизоры</div>
                        </div>
                        <button class="info-btn" data-wave="infrared">Подробнее</button>
                    </div>
                    
                    <div class="wave-item">
                        <div class="wave-color" style="background-color: #ffbd00;"></div>
                        <div class="wave-info">
                            <strong>Видимый свет</strong>
                            <div class="wavelength">Длина волны: 700 нм - 400 нм | Использование: зрение, оптика</div>
                        </div>
                        <button class="info-btn" data-wave="visible">Подробнее</button>
                    </div>
                    
                    <div class="wave-item">
                        <div class="wave-color" style="background-color: #f8961e;"></div>
                        <div class="wave-info">
                            <strong>Ультрафиолетовое излучение</strong>
                            <div class="wavelength">Длина волны: 400 нм - 10 нм | Использование: дезинфекция, солярий</div>
                        </div>
                        <button class="info-btn" data-wave="ultraviolet">Подробнее</button>
                    </div>
                    
                    <div class="wave-item">
                        <div class="wave-color" style="background-color: #f94144;"></div>
                        <div class="wave-info">
                            <strong>Рентгеновское излучение</strong>
                            <div class="wavelength">Длина волны: 10 нм - 0.01 нм | Использование: медицина, анализ веществ</div>
                        </div>
                        <button class="info-btn" data-wave="xray">Подробнее</button>
                    </div>
                    
                    <div class="wave-item">
                        <div class="wave-color" style="background-color: #9d4edd;"></div>
                        <div class="wave-info">
                            <strong>Гамма-излучение</strong>
                            <div class="wavelength">Длина волны: < 0.01 нм | Использование: медицина, ядерная физика</div>
                        </div>
                        <button class="info-btn" data-wave="gamma">Подробнее</button>
                    </div>
                </div>
                
                <div class="interactive-demo">
                    <h3>Интерактивная шкала</h3>
                    <p>Перемещайте ползунок, чтобы увидеть, как меняются свойства волн:</p>
                    
                    <div class="slider-container">
                        <label for="wavelength-slider">Длина волны: <span id="wavelength-value">1 м</span></label>
                        <input type="range" min="1" max="7" value="1" class="slider" id="wavelength-slider">
                        <div id="wave-description">Радиоволны - самые длинные волны, используются для связи на большие расстояния.</div>
                    </div>
                    
                    <div id="wave-use" class="wave-use-info">
                        <h4>Использование в жизни:</h4>
                        <p id="use-text">Радио, телевидение, мобильная связь</p>
                    </div>
                </div>
                
                <div class="add-points-btn-container">
                    <button id="add-spectrum-points" class="add-points-btn">
                        <i class="fas fa-star"></i> Я изучил шкалу ЭМ волн! (+10 баллов)
                    </button>
                </div>
            `
        },
        
        cellular: {
            title: 'Использование ЭМ волн для сотовой связи',
            icon: 'fas fa-broadcast-tower',
            content: `
                <h2><i class="fas fa-broadcast-tower"></i> Сотовая связь и электромагнитные волны</h2>
                <p>Мобильные телефоны используют радиоволны для передачи голоса, сообщений и данных. Давайте разберемся, как это работает!</p>
                
                <div class="connection-visualization">
                    <div class="phone">
                        <i class="fas fa-mobile-alt"></i>
                        <p>Телефон</p>
                    </div>
                    <div class="wave-animation"></div>
                    <div class="tower">
                        <i class="fas fa-tower-cell"></i>
                        <p>Вышка связи</p>
                    </div>
                </div>
                
                <h3>Как работает сотовая связь?</h3>
                <ol class="explanation-list">
                    <li>Телефон преобразует голос в электрические сигналы</li>
                    <li>Эти сигналы превращаются в радиоволны определенной частоты</li>
                    <li>Радиоволны передаются на ближайшую вышку сотовой связи</li>
                    <li>Вышка передает сигнал на коммутатор, а затем на вышку получателя</li>
                    <li>Сигнал поступает на телефон получателя и преобразуется обратно в звук</li>
                </ol>
                
                <div class="interactive-demo">
                    <h3>Диапазоны частот для сотовой связи</h3>
                    <p>В России для мобильной связи используются следующие диапазоны:</p>
                    
                    <table class="frequency-table">
                        <tr>
                            <th>Поколение</th>
                            <th>Диапазон частот</th>
                            <th>Использование</th>
                        </tr>
                        <tr>
                            <td>2G</td>
                            <td>900 МГц, 1800 МГц</td>
                            <td>Звонки, SMS</td>
                        </tr>
                        <tr>
                            <td>3G</td>
                            <td>2100 МГц</td>
                            <td>Интернет, видео</td>
                        </tr>
                        <tr>
                            <td>4G (LTE)</td>
                            <td>800 МГц, 2600 МГц</td>
                            <td>Быстрый интернет</td>
                        </tr>
                        <tr>
                            <td>5G</td>
                            <td>3400-3800 МГц</td>
                            <td>Сверхбыстрый интернет</td>
                        </tr>
                    </table>
                    
                    <div class="simulation">
                        <h4>Симуляция передачи сигнала</h4>
                        <p>Нажмите кнопку, чтобы отправить "сообщение" на вышку:</p>
                        <div class="simulation-controls">
                            <input type="text" id="message-input" placeholder="Введите сообщение" value="Привет от 9 класса!">
                            <button id="send-message-btn">Отправить как радиоволну</button>
                        </div>
                        <div id="transmission-result"></div>
                    </div>
                </div>
                
                <div class="safety-info">
                    <h3><i class="fas fa-shield-alt"></i> Безопасность сотовой связи</h3>
                    <p>Мощность излучения мобильного телефона очень мала (до 2 Вт) и безопасна для здоровья. В режиме ожидания телефон почти не излучает.</p>
                    <p>Совет: Используйте гарнитуру для долгих разговоров и не носите телефон в кармане постоянно.</p>
                </div>
                
                <div class="add-points-btn-container">
                    <button id="add-cellular-points" class="add-points-btn">
                        <i class="fas fa-star"></i> Я разобрался с сотовой связью! (+15 баллов)
                    </button>
                </div>
            `
        },
        
        quiz: {
            title: 'Проверь свои знания',
            icon: 'fas fa-question-circle',
            content: `
                <h2><i class="fas fa-question-circle"></i> Тест по теме конференции</h2>
                <p>Проверьте, что вы запомнили! За каждый правильный ответ получите 5 баллов.</p>
                
                <div id="quiz-container">
                    <div class="quiz-question" data-question="1">
                        <h4>1. Какие электромагнитные волны используются для сотовой связи?</h4>
                        <div class="quiz-options">
                            <div class="quiz-option" data-correct="true">Радиоволны</div>
                            <div class="quiz-option">Рентгеновские лучи</div>
                            <div class="quiz-option">Видимый свет</div>
                            <div class="quiz-option">Гамма-лучи</div>
                        </div>
                    </div>
                    
                    <div class="quiz-question" data-question="2">
                        <h4>2. Какое излучение имеет самую большую длину волны?</h4>
                        <div class="quiz-options">
                            <div class="quiz-option" data-correct="true">Радиоволны</div>
                            <div class="quiz-option">Ультрафиолетовое</div>
                            <div class="quiz-option">Рентгеновское</div>
                            <div class="quiz-option">Гамма-излучение</div>
                        </div>
                    </div>
                    
                    <div class="quiz-question" data-question="3">
                        <h4>3. Какие волны используются в микроволновых печах?</h4>
                        <div class="quiz-options">
                            <div class="quiz-option">Инфракрасные</div>
                            <div class="quiz-option" data-correct="true">Микроволны</div>
                            <div class="quiz-option">Радиоволны</div>
                            <div class="quiz-option">Ультрафиолетовые</div>
                        </div>
                    </div>
                    
                    <div class="quiz-question" data-question="4">
                        <h4>4. Какое поколение связи (5G) использует самые высокие частоты?</h4>
                        <div class="quiz-options">
                            <div class="quiz-option">2G</div>
                            <div class="quiz-option">3G</div>
                            <div class="quiz-option">4G</div>
                            <div class="quiz-option" data-correct="true">5G</div>
                        </div>
                    </div>
                    
                    <div class="quiz-question" data-question="5">
                        <h4>5. Что происходит с энергией волны при увеличении частоты?</h4>
                        <div class="quiz-options">
                            <div class="quiz-option">Уменьшается</div>
                            <div class="quiz-option">Не меняется</div>
                            <div class="quiz-option" data-correct="true">Увеличивается</div>
                            <div class="quiz-option">Сначала увеличивается, потом уменьшается</div>
                        </div>
                    </div>
                </div>
                
                <button id="check-quiz-btn" class="check-quiz-btn">Проверить ответы</button>
                <div id="quiz-result"></div>
            `
        }
    };
    
    // Словарь для интерактивной шкалы
    const waveData = {
        1: {
            name: "Радиоволны",
            wavelength: "1 м - 10 км",
            use: "Радио, телевидение, мобильная связь, GPS",
            description: "Самые длинные волны, могут огибать земную поверхность и распространяться на большие расстояния."
        },
        2: {
            name: "Микроволны",
            wavelength: "1 мм - 1 м",
            use: "Микроволновые печи, Wi-Fi, радары, спутниковая связь",
            description: "Используются для передачи данных на короткие расстояния и нагрева пищи в микроволновках."
        },
        3: {
            name: "Инфракрасное излучение",
            wavelength: "700 нм - 1 мм",
            use: "Пульты ДУ, тепловизоры, приборы ночного видения",
            description: "Мы ощущаем его как тепло. Испускается всеми нагретыми телами."
        },
        4: {
            name: "Видимый свет",
            wavelength: "400 нм - 700 нм",
            use: "Зрение, освещение, фотосинтез растений",
            description: "Единственный диапазон, который видит человеческий глаз. Состоит из цветов радуги."
        },
        5: {
            name: "Ультрафиолетовое излучение",
            wavelength: "10 нм - 400 нм",
            use: "Дезинфекция, солярии, люминесцентные лампы",
            description: "Вызывает загар, но в больших дозах опасен для кожи и глаз."
        },
        6: {
            name: "Рентгеновское излучение",
            wavelength: "0.01 нм - 10 нм",
            use: "Медицинская диагностика, анализ кристаллов",
            description: "Проникает сквозь мягкие ткани, но задерживается костями и металлами."
        },
        7: {
            name: "Гамма-излучение",
            wavelength: "< 0.01 нм",
            use: "Медицина (лучевая терапия), ядерная физика",
            description: "Самые короткие и энергичные волны. Возникают при ядерных реакциях."
        }
    };
    
    // Обработчики кнопок входа в залы
    enterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const hallId = this.getAttribute('data-hall');
            enterHall(hallId);
        });
    });
    
    // Функция входа в зал
    function enterHall(hallId) {
        currentHall = hallId;
        const hall = hallData[hallId];
        
        // Обновляем активный зал
        activeHall.innerHTML = `
            <div class="hall-content">
                ${hall.content}
            </div>
        `;
        
        // Показываем кнопку возврата
        backButton.style.display = 'block';
        
        // Прокручиваем к началу зала
        activeHall.scrollIntoView({ behavior: 'smooth' });
        
        // Инициализируем специфичные для зала функции
        if (hallId === 'spectrum') {
            initSpectrumHall();
        } else if (hallId === 'cellular') {
            initCellularHall();
        } else if (hallId === 'quiz') {
            initQuizHall();
        }
    }
    
    // Инициализация зала спектров
    function initSpectrumHall() {
        const slider = document.getElementById('wavelength-slider');
        const wavelengthValue = document.getElementById('wavelength-value');
        const waveDescription = document.getElementById('wave-description');
        const useText = document.getElementById('use-text');
        
        // Обработчик слайдера
        slider.addEventListener('input', function() {
            const value = parseInt(this.value);
            const wave = waveData[value];
            
            wavelengthValue.textContent = wave.wavelength;
            waveDescription.textContent = `${wave.name} - ${wave.description}`;
            useText.textContent = wave.use;
        });
        
        // Инициализируем начальное состояние
        const initialWave = waveData[1];
        wavelengthValue.textContent = initialWave.wavelength;
        waveDescription.textContent = `${initialWave.name} - ${initialWave.description}`;
        useText.textContent = initialWave.use;
        
        // Кнопка добавления баллов
        const addPointsBtn = document.getElementById('add-spectrum-points');
        addPointsBtn.addEventListener('click', function() {
            addPoints(10);
            this.innerHTML = '<i class="fas fa-check"></i> Вы уже изучили эту тему!';
            this.disabled = true;
        });
        
        // Кнопки "Подробнее"
        document.querySelectorAll('.info-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const waveType = this.getAttribute('data-wave');
                const waveNames = {
                    radio: 'Радиоволны',
                    microwave: 'Микроволны',
                    infrared: 'Инфракрасное излучение',
                    visible: 'Видимый свет',
                    ultraviolet: 'Ультрафиолетовое излучение',
                    xray: 'Рентгеновское излучение',
                    gamma: 'Гамма-излучение'
                };
                
                alert(`Вы выбрали: ${waveNames[waveType]}\n\nПодробную информацию можно найти в учебнике физики для 9 класса или в интернете.`);
                addPoints(2);
            });
        });
    }
    
    // Инициализация зала сотовой связи
    function initCellularHall() {
        // Симуляция отправки сообщения
        const sendBtn = document.getElementById('send-message-btn');
        const messageInput = document.getElementById('message-input');
        const transmissionResult = document.getElementById('transmission-result');
        
        sendBtn.addEventListener('click', function() {
            const message = messageInput.value || 'Привет от 9 класса!';
            
            transmissionResult.innerHTML = `
                <div class="transmission-process">
                    <p><i class="fas fa-sync-alt fa-spin"></i> Преобразую "${message}" в радиоволны...</p>
                    <p><i class="fas fa-satellite-dish"></i> Передаю сигнал на вышку связи...</p>
                    <p><i class="fas fa-broadcast-tower"></i> Сигнал передан на коммутатор...</p>
                    <p><i class="fas fa-mobile-alt"></i> Сообщение доставлено!</p>
                    <p class="success-message"><i class="fas fa-check-circle"></i> Ваше сообщение успешно передано с помощью радиоволн!</p>
                </div>
            `;
            
            addPoints(5);
        });
        
        // Кнопка добавления баллов
        const addPointsBtn = document.getElementById('add-cellular-points');
        addPointsBtn.addEventListener('click', function() {
            addPoints(15);
            this.innerHTML = '<i class="fas fa-check"></i> Вы уже изучили эту тему!';
            this.disabled = true;
        });
    }
    
    // Инициализация зала с викториной
    function initQuizHall() {
        let score = 0;
        let answered = 0;
        const totalQuestions = 5;
        
        // Обработчики выбора ответов
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', function() {
                // Снимаем выделение с других вариантов в этом вопросе
                const question = this.closest('.quiz-question');
                question.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Выделяем выбранный вариант
                this.classList.add('selected');
                this.setAttribute('data-selected', 'true');
            });
        });
        
        // Кнопка проверки теста
        const checkBtn = document.getElementById('check-quiz-btn');
        checkBtn.addEventListener('click', function() {
            score = 0;
            answered = 0;
            
            // Проверяем каждый вопрос
            document.querySelectorAll('.quiz-question').forEach(question => {
                const selectedOption = question.querySelector('.quiz-option[data-selected="true"]');
                
                if (selectedOption) {
                    answered++;
                    
                    if (selectedOption.hasAttribute('data-correct')) {
                        selectedOption.classList.add('correct');
                        score++;
                    } else {
                        selectedOption.classList.add('incorrect');
                        // Показываем правильный ответ
                        const correctOption = question.querySelector('.quiz-option[data-correct="true"]');
                        if (correctOption) {
                            correctOption.classList.add('correct');
                        }
                    }
                }
            });
            
            // Показываем результат
            const quizResult = document.getElementById('quiz-result');
            const pointsEarned = score * 5;
            
            if (answered === totalQuestions) {
                quizResult.innerHTML = `
                    <div class="quiz-result">
                        <h3><i class="fas fa-award"></i> Результаты теста</h3>
                        <p>Вы ответили на ${score} из ${totalQuestions} вопросов правильно!</p>
                        <p>Ваша оценка: ${score >= 4 ? '5' : score >= 3 ? '4' : score >= 2 ? '3' : '2'}</p>
                        <p>Вы заработали <strong>${pointsEarned} баллов</strong>!</p>
                    </div>
                `;
                
                addPoints(pointsEarned);
                checkBtn.disabled = true;
                checkBtn.textContent = 'Тест пройден!';
            } else {
                quizResult.innerHTML = `
                    <div class="quiz-result">
                        <p class="warning"><i class="fas fa-exclamation-triangle"></i> Ответьте на все вопросы перед проверкой!</p>
                    </div>
                `;
            }
        });
    }
    
    // Функция добавления баллов
    function addPoints(points) {
        knowledgePoints += points;
        knowledgePointsEl.textContent = knowledgePoints;
        
        // Анимация
        knowledgePointsEl.style.transform = 'scale(1.3)';
        setTimeout(() => {
            knowledgePointsEl.style.transform = 'scale(1)';
        }, 300);
        
        // Уведомление
        showNotification(`+${points} баллов! Теперь у вас ${knowledgePoints} баллов.`);
    }
    
    // Показ уведомления
    function showNotification(message) {
        // Создаем уведомление
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `<i class="fas fa-star"></i> ${message}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Удаляем через 3 секунды
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Добавляем стили для анимации уведомлений
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification {
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
    
    // Обработчик кнопки возврата
    backButton.addEventListener('click', function() {
        activeHall.innerHTML = `
            <div class="welcome-message">
                <h2><i class="fas fa-hand-wave"></i> Добро пожаловать на конференцию!</h2>
                <p>Выберите секцию выше, чтобы начать изучение темы.</p>
                <p class="tip"><i class="fas fa-lightbulb"></i> Совет: Начните с "Шкалы ЭМ волн", затем перейдите к "Сотовой связи"</p>
            </div>
        `;
        
        this.style.display = 'none';
        currentHall = null;
    });
    
    // Инициализация при загрузке
    console.log('Конференция по физике загружена! Удачи в изучении темы!');
});
