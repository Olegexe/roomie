function getSlide(price, i) {
    return `
    <div class="news-slider__slide">
        <div class="news-slider__slide-content">
            <div class="news-slider__slide-text">
                <h3 class="news-slider__caption">Новое поступление</h3>
                <h1 class="news-slider__title">Дизайнерские кресла</h1>
                <div class="news-slider__price">От ${price} ₽</div>
                <a class="btn" href="">Купить сейчас</a>
            </div>
            <div class="news-slider__slide-image">
                <img src="/assets/img/news_slider${i}.png">
            </div>
        </div>
    </div>
    `;
}

class Carousel {
    constructor(user_options) {

        let options = {
            number_of_slides: user_options.number_of_slides
        }

        let state = {
            current: 0
        }

        let $cache = {
            slides: null,
            control: null,
            prev: null,
            next: null,
            current: null,
            total: null
        }

        let $el = $('#carousel');
        
        $cache.slides = $el.find('.carousel__slides')
        $cache.prev = $el.find('[data-cs-arrow="prev"]');
        $cache.next = $el.find('[data-cs-arrow="next"]');
        $cache.current = $el.find('[data-cs-counter="current"');
        $cache.total = $el.find('[data-cs-counter="total"');

        $cache.prev.on('click', function() {
            $cache.slides.find('.news-slider__slide').attr('class', 'news-slider__slide');
            if(state.current <= 0) {
                state.current = options.number_of_slides - 1;
                $cache.slides.find('.news-slider__slide').eq(state.current).addClass('fadeLeft').addClass('active');
                $cache.slides.find('.news-slider__slide').eq(0).addClass('fadeRightInverse');
            } else {
                $cache.slides.find('.news-slider__slide').eq(state.current - 1).addClass('fadeLeft').addClass('active');
                $cache.slides.find('.news-slider__slide').eq(state.current).addClass('fadeRightInverse');
                state.current--;
            }

            $cache.current.html(state.current + 1);
        });

        $cache.next.on('click', function() {
            $cache.slides.find('.news-slider__slide').attr('class', 'news-slider__slide');
            if(state.current >= options.number_of_slides - 1) {
                state.current = 0;
                $cache.slides.find('.news-slider__slide').eq(state.current).addClass('fadeRight').addClass('active');
                $cache.slides.find('.news-slider__slide').eq(options.number_of_slides - 1).addClass('fadeLeftInverse');
            } else {
                $cache.slides.find('.news-slider__slide').eq(state.current + 1).addClass('fadeRight').addClass('active');
                $cache.slides.find('.news-slider__slide').eq(state.current).addClass('fadeLeftInverse');
                state.current++;
            }

            $cache.current.html(state.current + 1);
        });


        for(let i = 0; i < options.number_of_slides; i++)
            $cache.slides.append(getSlide('3 599' + i, i + 1));
        
        $cache.slides.find('.news-slider__slide:first').addClass('active');
    }
}

export default Carousel;