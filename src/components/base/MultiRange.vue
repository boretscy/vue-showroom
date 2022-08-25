<template>
    <div class="multirange">
        <div class="multirange__item">
            <label class="input">
                <input type="hidden" v-model="$parent.filter.ranges[range].value[0]">
                <input type="text" :value="String($parent.filter.ranges[range].value[0]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')" v-if="delimiter">
                <input type="text" :value="$parent.filter.ranges[range].value[0]" v-else>
                <span class="price">{{ nameRange }} от</span>
                <span class="rub">{{ descVal }}</span>
            </label>
            <label class="input">
                <input type="hidden" v-model="$parent.filter.ranges[range].value[1]">
                <input type="text" :value="String($parent.filter.ranges[range].value[1]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')" v-if="delimiter">
                <input type="text" :value="$parent.filter.ranges[range].value[1]" v-else>
                <span  class="price">до</span>
                <span class="rub">{{ descVal }}</span>
            </label>
        </div>
        <div class="price_slider slider-styled">
            <vue-slider 
                v-model="$parent.filter.ranges[range].value"
                :min="$parent.filter.ranges[range].min"
                :max="$parent.filter.ranges[range].max"
                :interval="step"
                tooltip="none"
                @drag-end="cc"
                ></vue-slider>
        </div>
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
    name: 'MultiRange',
    components: {
        VueSlider
    },
    props:[
        'descVal',
        'nameRange',
        'range',
        'delimiter'
    ],
    data() {
        return {
            value: [0,0],
            min: 0,
            max: 999999999,
            step: 1
        }
    },
    computed:{
        indxRange: function() {
            return this.range
        },
    },
    watch: {
    },
    mounted: function() {
        // this.value = this.$parent.filter.ranges[this.range].value
        // this.min = this.$parent.filter.ranges[this.range].min
        // this.max = this.$parent.filter.ranges[this.range].max
    },
    methods: {
        cc() {
            this.$emit('range', { range: this.range, value: this.$parent.filter.ranges[this.range].value})
        },
        // reset() {

        //     this.min = 0
        //     this.max = 99999999
        //     this.value = [0,99999999]
        // },

        // helpers
        Format(q) {
			
            var Price = new Intl.NumberFormat('ru', { currency: 'RUR' });
            return Price.format(q);	
        }
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
.vue-slider-process {
    background-color: var(--yayellow);
    border-radius: 15px;
}
.price_slider {
    position: absolute;
    width: 100%;
    bottom: -4px;
}
span.rub {
    margin-left: 5px !important;
}
</style>