document.addEventListener('DOMContentLoaded', function() {
    initGallery();
});

function initGallery() {
    let currentSlide = 0;
    
    // Массив с путями к изображениям
    const images = [
        'img/cobain.jpg',
        'img/chester.jpg',
        'img/layne.jpg',
        'img/beatles.jpg',
        'img/jim.jpg',
        'img/moreno.jpg',
        'img/cornell.jpg',
        'img/sting.jpg'
    ];
    
    const galleryImage = document.getElementById('galleryImage');
    const dots = document.querySelectorAll('.gallery-dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSlideSpan = document.getElementById('currentSlide');
    const totalSlidesSpan = document.getElementById('totalSlides');
    
    const totalSlides = images.length;
    
    // Проверка наличия элементов
    if (!galleryImage || !dots.length) {
        console.error('Gallery elements not found');
        return;
    }
    
    // Функция показа слайда
    function showSlide(index) {
        // Убираем активный класс у всех точек
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Проверка границ
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        
        // Анимация исчезновения
        galleryImage.style.opacity = '0';
        
        // Меняем изображение после исчезновения
        setTimeout(() => {
            galleryImage.src = images[currentSlide];
            galleryImage.alt = 'Изображение ' + (currentSlide + 1);
            galleryImage.style.opacity = '1';
        }, 150);
        
        // Активируем соответствующую точку
        dots[currentSlide].classList.add('active');
        
        // Обновляем счетчик
        currentSlideSpan.textContent = currentSlide + 1;
    }
    
    // Функция для следующего слайда
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Функция для предыдущего слайда
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Обработчики для кнопок
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Обработчики для точек-индикаторов
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Управление клавиатурой
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Поддержка свайпов для мобильных устройств
    let touchStartX = 0;
    let touchEndX = 0;
    
    const gallerySlider = document.querySelector('.gallery-slider');
    
    gallerySlider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    gallerySlider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Свайп влево - следующий слайд
                nextSlide();
            } else {
                // Свайп вправо - предыдущий слайд
                prevSlide();
            }
        }
    }
    
    // Инициализация - показываем первый слайд
    showSlide(0);
}