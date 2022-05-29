<template>
    <div class="filter">
        <div class="filter__head">
            <div class="filter__head-item">
                <drop
                    block-style="block"
                    list-title="Выбрать автомобиль"
                    list-name="mode"/>
            </div>
            <div class="filter__head-item">
                <drop
                    block-style="block"
                    list-title="Марка"
                    list-name="brands"/>
            </div>
            <div class="filter__head-item">
                <drop
                    block-style="block"
                    list-title="Модель"
                    list-name="models"/>
            </div>
            <div class="filter__head-item" style="padding: 0; height: 40px;">
                <multi-range
                    min-val="600000"
                    max-val="12000000"
                    step-val="1000"
                    desc-val="₽"
                    name-range="Цена"/>
            </div>
            <div class="filter__head-item" v-if="viewFull">
                <drop
                    block-style="block"
                    list-title="КПП"
                    list-name="models"/>
            </div>
            <div class="filter__head-item" style="padding: 0; height: 40px;" v-if="viewFull">
                <multi-range
                    min-val="600000"
                    max-val="12000000"
                    step-val="1000"
                    desc-val="л"
                    name-range="Объем"/>
            </div>
            <div class="filter__head-item" style="padding: 0; height: 40px;" v-if="viewFull">
                <multi-range
                    min-val="600000"
                    max-val="12000000"
                    step-val="1000"
                    desc-val="л.с."
                    name-range="Мощность"/>
            </div>
            <div class="filter__head-item" v-if="viewFull">
                <drop
                    block-style="block"
                    list-title="Двигатель"
                    list-name="models"/>
            </div>
            <div class="filter__head-item" v-if="viewFull">
                <drop
                    block-style="block"
                    list-title="Привод"
                    list-name="models"/>
            </div>
            <div class="filter__head-item" v-if="viewFull">
                <drop
                    block-style="block"
                    list-title="Кузов"
                    list-name="models"/>
            </div>
            <div class="filter__head-item" style="padding: 0; height: 40px;" v-if="viewFull">
                <multi-range
                    min-val="1970"
                    max-val="2022"
                    step-val="1"
                    desc-val=""
                    name-range="Год выпуска"/>
            </div>
            <div class="filter__head-item" v-if="viewFull">
                <drop
                    block-style="block"
                    list-title="Автосалон"
                    list-name="models"/>
            </div>
            <div class="filter__head-item" v-if="viewFull">
                <drop
                    block-style="block"
                    list-title="Цвет"
                    list-name="models"/>
            </div>
            <div class="filter__head-item" v-if="viewFull" style="padding: 0; height: 40px;">
                <button-cancel />
            </div>
            <div class="filter__head-item" style="padding: 0; height: 40px;">
                <button-apply car-count="1246" />
            </div>
        </div>
        <div class="filter__list">
            <list-item item-name="Cadillac" item-count="5" item-link="cadillac"/>
        </div>
        <div class="filter__sort">
            <div class="filter__sort-item">
                <drop
                    block-style="block"
                    list-title="Сортировка"
                    list-name="mode"/>
            </div>
            <div class="filter__sort-item">
                <div class="filter__sort-item_box">
                    <button class="filter__sort-item__button active">
                        <span>Все</span>
                    </button>
                    <button class="filter__sort-item__button">
                        <span>Со скидкой</span>
                    </button>
                    <button class="filter__sort-item__button">
                        <span>В наличии</span>
                    </button>
                    <button class="filter__sort-item__button">
                        <span>В пути</span>
                    </button>
                </div>
                <div class="filter__sort-item__switch">
                    <div class="filter__sort-item__switch-radio">
                        <label>
                            <input type="radio" name="radio_grid" value="grid" checked="checked">
                            <span>
                                <icon-base icon-name="viewplates"><icon-viewplates /></icon-base>
                            </span>
                        </label>
                    </div>
                    <div class="filter__sort-item__switch-radio">
                        <label>
                            <input type="radio" name="radio_grid" value="line">
                            <span>
                                <icon-base icon-name="viewlines"><icon-viewlines /></icon-base>
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue'
import IconViewplates from '@/components/icons/IconViewplates.vue'
import IconViewlines from '@/components/icons/IconViewlines.vue'


import Drop from '@/components/base/Drop.vue'
import MultiRange from '@/components/base/MultiRange.vue'
import ButtonCancel from '@/components/searchfilter/ButtonCancel.vue'
import ButtonApply from '@/components/searchfilter/ButtonApply.vue'
import ListItem from '@/components/searchfilter/ListItem.vue'

export default {
    name: 'SearchFilter',
    components: {
		IconBase, IconViewlines, IconViewplates,
        Drop,
        MultiRange,
        ButtonApply,
        ButtonCancel,
        ListItem
    },
    data() {
        return {
            viewFull: true,
        }
    },
    mounted: function() {

    }
}
</script>


<style scoped>
.filter {
    margin-bottom: 4rem;
    user-select: none;
}
.filter__head {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(235px, 1fr));
    gap: 20px;
    align-items: center;
    margin-bottom: 2em;
}
.filter__head-item {
    border: 1px solid var(--yadarkblue);
    padding: 12px 20px 10px;
    border-radius: 3px;
    color: var(--yablack) !important;
    height: 20px;
}

.filter__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(235px, 1fr));
    gap: 20px;
    align-items: center;
    margin-bottom: 2rem;
}

.filter__sort {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2rem;
}
.filter__sort-item:nth-child(1) {
    width: 205px;
    border: 1px solid var(--yagray);
    padding: 12px 20px 10px;
    border-radius: 3px;
    color: var(--yablack) !important;
    height: 20px;
}
.filter__sort-item:nth-last-child(1) {
    display: flex;
    gap: 2rem;
    align-items: center;
}
.filter__sort-item__button {
    background: transparent;
    border: 0;
    margin-right: 2em;
}
.filter__sort-item__button span{
    font-size: 14px;
    font-weight: 400;
    line-height: 1em;
    cursor: pointer;
    display: block;
    transition: 200ms;
}
.filter__sort-item__button span:hover {
    color: var(--yadarkblue);
}
.filter__sort-item__button:nth-last-child(1) {
    margin-right: 0;
}
.active span{
    padding: 10px 15px;
    background: transparent;
    border: solid 1px var(--yayellow) !important;
    border-radius: 3px !important;
    color: var(--yadarkblue);
}
.filter__sort-item__switch-radio svg {
    --icon-size: 20px;
    width: var(--icon-size);
    height: var(--icon-size);
    fill: var(--black);
    vertical-align: bottom;
}
.filter__sort-item__switch {
    display: flex;
}
.filter__sort-item__switch-radio {

}
.filter__sort-item__switch-radio input {
    display: none;
}
.filter__sort-item__switch-radio span {
    padding: 10px;
    border: solid 1px var(--radio-grid-color);
    border-radius: 3px;
    cursor: pointer;
    display: block;
    box-sizing: border-box;
}
.filter__sort-item__switch-radio:nth-child(1) span {
    border-right: solid 1px var(--yayellow);
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
}
.filter__sort-item__switch-radio:nth-child(2) span {
    border-left: solid 1px var(--yayellow);
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
}
.filter__sort-item__switch-radio input:checked + span {
    border: solid 1px var(--yayellow);
}
</style>
