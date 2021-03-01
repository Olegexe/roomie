import './assets/scss/main.scss';
import Carousel from './assets/js/carousel'
import AOS from 'aos';
import 'aos/dist/aos.css';

import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide-core.min.css';

// new Splide( '.splide' ).mount();

AOS.init({
    once: true,
    duration: 600,
    anchorPlacement: 'bottom-bottom'
});

var carousel = new Carousel({
    number_of_slides: 3
});

window.onload = function () {
    AOS.refresh();
}