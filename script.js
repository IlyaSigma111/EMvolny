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
                
                <div class="spectrum-visual">
                    <h3>Полный спектр ЭМ волн:</h3>
                    
                    <div class="spectrum-graphic">
                        <div class="spectrum-line">
                            <div class="wave-type" data-type="radio">
                                <div class="wave-bar" style="background-color: #7209b7; width: 180px;"></div>
                                <span class="wave-label">Радиоволны</span>
                                <span class="wave-desc">> 1 мм</span>
                            </div>
                            <div class="wave-type" data-type="microwave">
                                <div class="wave-bar" style="background-color: #4361ee; width: 150px;"></div>
                                <span class="wave-label">Микроволны</span>
                                <span class="wave-desc">1 мм - 1 м</span>
                            </div>
                            <div class="wave-type" data-type="infrared">
                                <div class="wave-bar" style="background-color: #4cc9f0; width: 120px;"></div>
                                <span class="wave-label">Инфракрасные</span>
                                <span class="wave-desc">1 мм - 700 нм</span>
                            </div>
                            <div class="wave-type" data-type="visible">
                                <div class="wave-bar" style="background-color: #ffbd00; width: 90px;"></div>
                                <span class="wave-label">Видимый свет</span>
                                <span class="wave-desc">700-400 нм</span>
                            </div>
                            <div class="wave-type" data-type="ultraviolet">
                                <div class="wave-bar" style="background-color: #f8961e; width: 60px;"></div>
                                <span class="wave-label">Ультрафиолет</span>
                                <span class="wave-desc">400-10 нм</span>
                            </div>
                            <div class="wave-type" data-type="xray">
                                <div class="wave-bar" style="background-color: #f94144; width: 30px;"></div>
                                <span class="wave-label">Рентген</span>
                                <span class="wave-desc">10-0.01 нм</span>
                            </div>
                            <div class="wave-type" data-type="gamma">
                                <div class="wave-bar" style="background-color: #9d4edd; width: 15px;"></div>
                                <span class="wave-label">Гамма</span>
                                <span class="wave-desc">< 0.01 нм</span>
                            </div>
                        </div>
                        <div class="spectrum-legend">
                            <div class="legend-item"><div class="legend-color" style="background-color: #7209b7;"></div>Длинные волны</div>
                            <div class="legend-item"><div class="legend-color" style="background-color: #9d4edd;"></div>Короткие волны</div>
                        </div>
                    </div>
                    
                    <div class="spectrum-info-box">
                        <div id="selected-wave-info">
                            <h4><i class="fas fa-mouse-pointer"></i> Нажмите на любой тип волны выше</h4>
                            <p>Узнайте подробности о каждом виде электромагнитных волн</p>
                        </div>
                    </div>
                </div>
                
                <div class="interactive-demo">
                    <h3>Интерактивная шкала</h3>
                    <p>Перемещайте ползунок, чтобы увидеть, как меняются свойства волн:</p>
                    
                    <div class="slider-container">
                        <label for="wavelength-slider">Тип волны: <span id="wavelength-value">Радиоволны</span></label>
                        <input type="range" min="1" max="7" value="1" class="slider" id="wavelength-slider">
                        <div id="wave-description">Самые длинные волны, используются для связи на большие расстояния.</div>
                    </div>
                    
                    <div id="wave-use" class="wave-use-info">
                        <h4>Использование в жизни:</h4>
                        <p id="use-text">Радио, телевидение, мобильная связь, GPS</p>
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
    
    // Данные для волн (интерактивная шкала)
    const waveData = {
        1: {
            name: "Радиоволны",
            wavelength: "> 1 мм",
            use: "Радио, телевидение, мобильная связь, GPS, Wi-Fi",
            description: "Самые длинные волны, могут огибать земную поверхность и распространяться на большие расстояния. Безопасны для человека.",
            color: "#7209b7"
        },
        2: {
            name: "Микроволны",
            wavelength: "1 мм - 1 м", 
            use: "Микроволновые печи, Wi-Fi, радары, спутниковая связь",
            description: "Используются для передачи данных на короткие расстояния и нагрева пищи в микроволновках.",
            color: "#4361ee"
        },
        3: {
            name: "Инфракрасное излучение",
            wavelength: "1 мм - 700 нм",
            use: "Пульты ДУ, тепловизоры, приборы ночного видения",
            description: "Мы ощущаем его как тепло. Испускается всеми нагретыми телами, в том числе человеком.",
            color: "#4cc9f0"
        },
        4: {
            name: "Видимый свет",
            wavelength: "700-400 нм",
            use: "Зрение, освещение, фотосинтез растений, лазеры",
            description: "Единственный диапазон, который видит человеческий глаз. Состоит из 7 цветов радуги.",
            color: "#ffbd00"
        },
        5: {
            name: "Ультрафиолетовое излучение",
            wavelength: "400-10 нм",
            use: "Дезинфекция, солярии, люминесцентные лампы, определение подлинности банкнот",
            description: "Вызывает загар, но в больших дозах опасен для кожи и глаз. Частично задерживается озоновым слоем.",
            color: "#f8961e"
        },
        6: {
            name: "Рентгеновское излучение",
            wavelength: "10-0.01 нм", 
            use: "Медицинская диагностика, анализ кристаллов, безопасность в аэропортах",
            description: "Проникает сквозь мягкие ткани, но задерживается костями и металлами. В больших дозах опасен.",
            color: "#f94144"
        },
        7: {
            name: "Гамма-излучение",
            wavelength: "< 0.01 нм",
            use: "Медицина (лучевая терапия), ядерная физика, стерилизация оборудования",
            description: "Самые короткие и энергичные волны. Возникают при ядерных реакциях и радиоактивном распаде. Опасны в больших дозах.",
            color: "#9d4edd"
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
        const waveTypes = document.querySelectorAll('.wave-type');
        const selectedWaveInfo = document.getElementById('selected-wave-info');
        
        // Обработчик слайдера
        slider.addEventListener('input', function() {
            const value = parseInt(this.value);
            const wave = waveData[value];
            
            wavelengthValue.textContent = wave.name;
            waveDescription.textContent = wave.description;
            useText.textContent = wave.use;
            
            // Подсвечиваем соответствующую волну
            waveTypes.forEach(wt => wt.classList.remove('selected'));
            if (waveTypes[value - 1]) {
                waveTypes[value - 1].classList.add('selected');
            }
            
            addPoints(1); // Небольшие баллы за взаимодействие
        });
        
        // Обработчики кликов на волны
        waveTypes.forEach((waveType, index) => {
            waveType.addEventListener('click', function() {
                const wave = waveData[index + 1];
                
                // Обновляем информацию
                selectedWaveInfo.innerHTML = `
                    <h4><i class="fas fa-${getWaveIcon(index + 1)}"></i> ${wave.name}</h4>
                    <p><strong>Длина волны:</strong> ${wave.wavelength}</p>
                    <p><strong>Описание:</strong> ${wave.description}</p>
                    <p><strong>Применение:</strong> ${wave.use}</p>
                `;
                
                // Обновляем слайдер
                slider.value = index + 1;
                wavelengthValue.textContent = wave.name;
                waveDescription.textContent = wave.description;
                useText.textContent = wave.use;
                
                // Подсвечиваем выбранную волну
                waveTypes.forEach(wt => wt.classList.remove('selected'));
                this.classList.add('selected');
                
                addPoints(2);
            });
        });
        
        // Инициализируем начальное состояние
        const initialWave = waveData[1];
        wavelengthValue.textContent = initialWave.name;
        waveDescription.textContent = initialWave.description;
        useText.textContent = initialWave.use;
        
        // Выделяем первую волну
        if (waveTypes[0]) {
            waveTypes[0].classList.add('selected');
        }
        
        // Кнопка добавления баллов
        const addPointsBtn = document.getElementById('add-spectrum-points');
        if (addPointsBtn) {
            addPointsBtn.addEventListener('click', function() {
                addPoints(10);
                this.innerHTML = '<i class="fas fa-check"></i> Вы уже изучили эту тему!';
                this.disabled = true;
            });
        }
    }
    
    // Функция для получения иконки волны
    function getWaveIcon(waveIndex) {
        const icons = [
            'broadcast-tower',    // Радиоволны
            'microphone',         // Микроволны
            'thermometer-half',   // Инфракрасные
            'sun',                // Видимый свет
            'radiation',          // Ультрафиолет
            'x-ray',              // Рентген
            'atom'                // Гамма
        ];
        return icons[waveIndex - 1] || 'wave-square';
    }
    
    // Инициализация зала сотовой связи
    function initCellularHall() {
        // Симуляция отправки сообщения
        const sendBtn = document.getElementById('send-message-btn');
        const messageInput = document.getElementById('message-input');
        const transmissionResult = document.getElementById('transmission-result');
        
        if (sendBtn && messageInput && transmissionResult) {
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
        }
        
        // Кнопка добавления баллов
        const addPointsBtn = document.getElementById('add-cellular-points');
        if (addPointsBtn) {
            addPointsBtn.addEventListener('click', function() {
                addPoints(15);
                this.innerHTML = '<i class="fas fa-check"></i> Вы уже изучили эту тему!';
                this.disabled = true;
            });
        }
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
        if (checkBtn) {
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
            display: flex;
            align-items: center;
            gap: 0.8rem;
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
