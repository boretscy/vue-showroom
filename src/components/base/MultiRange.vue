<template>
    <div class="multirange">
        <div class="multirange__item">
            <label class="input">
                <input type="text" placeholder="600 000" v-model="minRange">
                <span class="price">от</span>
                <span class="rub">₽</span>
            </label>
            <label class="input">
                <input type="text" placeholder="9 000 000" v-model="maxRange">
                <span  class="price">до</span>
                <span class="rub">₽</span>
            </label>
        </div>
        <div class="price_slider slider-styled" ref="slider"></div>
    </div>
</template>

<script>
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export default {
    name: 'MultiRange',
    data() {
        return {
            minRange: null,
            maxRange: null,
            slider: {
                startMin: 25,
                startMax: 75,
                min: 0,
                max: 100,
                start: 40,
                step: 1
            }       
        }
  },
  methods: {
    updateSlider: function updateSlider() {
      this.$refs.slider.noUiSlider.set([this.minRange, this.maxRange]);
    }
  },
  mounted: function() {
    noUiSlider.create(this.$refs.slider, {
      start: [this.slider.startMin, this.slider.startMax],
      step: this.slider.step,
      range: {
        'min': this.slider.min,
        'max': this.slider.max
      }
    }); 
            
    this.$refs.slider.noUiSlider.on('update',(values, handle) => {
      this[handle ? 'maxRange' : 'minRange'] = parseInt(values[handle]);
    }); 
  }
}
</script>

<style scoped>
.input {
    --size: 1em;
    position: relative;
}
.input input {
    --background-color: var(--white);
    width: 100%;
    margin: 10px 0;
    outline: none;
    border: solid 1px var(--border-input);
    padding: 10px 15px;
    border-radius: 3px;
    box-sizing: border-box;
    background: var(--background-color);
    outline: none;
    font-size: 13px;
    color: #000;
    font-weight: 400;
}
.input input::placeholder {
    color: var(--gray);
}
.input input:focus-visible {
    border: solid 1px var(--main);
}
.input .icon {
    width: var(--size);
    height: var(--size);
    position: absolute;
    right: 1em;
    top: 50%;
    transform: translateY(-50%);
    fill: var(--main);
}
.multirange {
    position: relative;
}
.multirange__item {
    display: flex;
}
.multirange__item .input input {
    border: solid 1px var(--main);
    padding: 16px 20px 5px 15px;
}
.multirange__item .input span.price {
    position: absolute;
    top: 1em;
    left: 1.3em;
    font-size: 12px;
    font-weight: 300;
    line-height: 1em;
    color: var(--radio-grid-color);
}
.multirange__item .input span.rub  {
    position: absolute;
    right: 1em;
    bottom: 1.4em;
    font-size: 12px;
    font-weight: 300;
    line-height: 1em;
    color: var(--radio-grid-color);
}
.multirange__item .input:nth-child(1) input{
    border-right: solid 1px var(--border-input);
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
}
.multirange__item .input:nth-child(2) input{
    border-left: solid 1px var(--border-input);
    border-top-left-radius: 0;
    border-bottom-right-radius: 0;
}

.noUi-horizontal {
    height: 2px !important;
}
.noUi-target {
    background: var(--orange) !important;
    border-radius: 4px !important;
    border: inherit !important;
    box-shadow: inherit !important;
    position: relative !important;
    top: -12px !important;
}
.noUi-connect {
    background: var(--orange) !important;
}
.slider-styled,
.slider-styled .noUi-handle {
    box-shadow: none;
}

/* Hide markers on slider handles */
.slider-styled .noUi-handle::before,
.slider-styled .noUi-handle::after {
    display: none;
}
.noUi-handle {
    background: url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAANAA0DAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+xbw54c179pDXvHHiLxF438SeHPDHh3xJd+HPDfhrw3efYxbmxVZFvr1ZRNA07QTW7Tzm3e5u7mS5SOeztLS3tq/gDhfhfiL6UfEPH3E3E3H3FHDHCfDXFGM4Y4X4V4Wx31JYZ4CEakcfjo1lXw88RPD18PLEYiWFnisZiquKp0sRgsHg8NhT+lM3zfK/CDLOG8pyjhvKM3zrNsooZvm+c5xh3iParEtweGw7punVjSjVp1VSpKtGlQowoznSxFevVrGl8P8A4n6/8NNc8dfDTxnqOoeN4fB+o6ZFoOtEl9ROn6laz3ot7+eZ55JBFCbTyY5ZZ5LSVrq0S4ktYbVIfV8OPFniLwr4g8QfCrjrM8y4+o8E5nlVHh3PnJzzSWW5rhMRjlhsxxGIq16tX2NB4L2NKrWxFTBVpYzBxxNXB0cHTo8nFPBeV8ZZbwzxlw7hMJw3PiDCY2eaZbblwixeDr0sO6uFp04U4Q9pUWI9pOEKcK8FQrujCvUryqN+KHgHXfhp4h1Dxl8NPHep+EY/HN/K+uaGmm2mp2DakzvPPf24vJvJiEklzJJFEbR5rSSW5FreRWsqWsK8WvDriDwr4mzLjjwr8Qs14LpeIGYVqnEHD9PK8Hm2XSzWVSeIxGY4aOOr+woqrUxdWpSovBzr4KrWxUcJjaWErU8JQfBXFGWcZZTheHuMeGcHn0+GcLTjluZyxlfBYpYNRjSpYWq8PT9pNwjRhGdRV408RCFF18POtCVep7N8JvhFpPgjS9R1DUr+Xxh4m8W3EGsa/wCIdZtlM13KVmlt4Yraae+8hIDeXDySm4lnup55JJZREttb237l4N+C2TcA5RmWZZpmFbjbirjPE4fO+I+Jc8wsJV8ZWlCtWw1Gjha9fHrDww/13Ezq1Xia2IxeIr1ataqqMcLhsL+ecdce4/iTG4TC4PDQ4fybIaVXL8qynLq0lToQTpwq1KlanTw3tZVPq9KMIKlTpUaVOEIQ9o61WsD/2Q==') no-repeat !important;
    border: 0 !important;
}
.noUi-horizontal .noUi-handle {
    width: 12px !important;
    height: 13px !important;
    right: -6px !important;
    cursor: pointer;
}
span.rub {
    font-family: 'Rub';
    margin-left: 5px !important;
}
</style>