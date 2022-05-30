<template>
    <div class="multirange">
        <div class="multirange__item">
            <label class="input">
                <input type="text" placeholder="600 000" v-model="minRange">
                <span class="price">{{ nameRange }} от</span>
                <span class="rub">{{ descVal }}</span>
            </label>
            <label class="input">
                <input type="text" placeholder="9 000 000" v-model="maxRange">
                <span  class="price">до</span>
                <span class="rub">{{ descVal }}</span>
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
    props:[
        'minVal',
        'maxVal',
        'stepVal',
        'descVal',
        'nameRange'
    ],
    data() {
        return {
            minRange: null,
            maxRange: null,
            slider: {
                startMin: 600000,
                startMax: 12000000,
                min: 600000,
                max: 12000000,
                start: 600000,
                step: 10000
            }      
        }
    },
    methods: {
        updateSlider: function updateSlider() {
        this.$refs.slider.noUiSlider.set([this.minRange, this.maxRange]);
        }
    },
    mounted: function() {

        this.slider = {
            startMin: Number(this.minVal),
            startMax: Number(this.maxVal),
            min: Number(this.minVal),
            max: Number(this.maxVal),
            start: Number(this.minVal),
            step: Number(this.stepVal)
        }

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

<style>
.multirange .input {
    --size: 1em;
    position: relative;
}
.multirange .input input {
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
.multirange .input input::placeholder {
    color: var(--gray);
}
.multirange .input input:focus-visible {
    border: solid 1px var(--main);
}
.multirange .input .icon {
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
    border: none;
    padding: 0 20px 0 35px;
    margin-top: 18px;
}
.multirange__item .input span.price {
    position: absolute;
    top: 0.4em;
    left: 1.3em;
    font-size: 12px;
    font-weight: 300;
    line-height: 1em;
    color: var(--yagray);
}
.multirange__item .input span.rub  {
    position: absolute;
    right: 1em;
    top: 0.4em;
    font-size: 12px;
    font-weight: 300;
    line-height: 1em;
    color: var(--yagray);
}
.multirange__item .input:nth-child(1) input{
    border-right: solid 1px var(--yagray);
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
}

.noUi-horizontal {
    height: 2px !important;
}
.noUi-target {
    border-radius: 4px!important;
    border: inherit!important;
    box-shadow: inherit!important;
    position: relative!important;
    top: -10px!important;
}
.noUi-connect {
    background: var(--yayellow) !important;
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
    background: var(--yawhite) no-repeat !important;
    border: 1px solid var(--yagray) !important;
}
.noUi-horizontal .noUi-handle {
    width: 16px !important;
    height: 16px !important;
    right: -8px !important;
    cursor: pointer;
    border-radius: 50%;
}
span.rub {
    margin-left: 5px !important;
}
</style>