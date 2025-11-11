document.addEventListener('DOMContentLoaded', function() {
    initGallery();
});

function initGallery() {
    let currentSlide = 0;

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

    if (!galleryImage || !dots.length) {
        console.error('Gallery elements not found');
        return;
    }

    function showSlide(index) {
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        galleryImage.style.opacity = '0';

        setTimeout(() => {
            galleryImage.src = images[currentSlide];
            galleryImage.alt = 'Изображение ' + (currentSlide + 1);
            galleryImage.style.opacity = '1';
        }, 150);

        dots[currentSlide].classList.add('active');

        currentSlideSpan.textContent = currentSlide + 1;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

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
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    showSlide(0);
}
