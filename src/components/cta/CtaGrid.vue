<template>
    <div class="available__grid-item grid__icon-form" @click="show(cta.code)">
        <div class="grid-item__head">
            <div class="grid-item__head-img">
                <icon-base icon-name="ctacredit" v-if="cta.code == 'credit'" ><icon-ctacredit :dark-color="$store.state.styles['--yadarkblue']"  :light-color="$store.state.styles['--yalightyellow']" /></icon-base>
                <icon-base icon-name="ctatradein" v-if="cta.code == 'trade-in'"><icon-ctatradein :dark-color="$store.state.styles['--yadarkblue']"  :light-color="$store.state.styles['--yalightyellow']" /></icon-base>
                <icon-base icon-name="ctasell" v-if="cta.code == 'sell'"><icon-ctasell :dark-color="$store.state.styles['--yadarkblue']"  :light-color="$store.state.styles['--yalightyellow']" /></icon-base>
                <icon-base icon-name="ctaselect" v-if="cta.code == 'offer'"><icon-ctaselect :dark-color="$store.state.styles['--yadarkblue']"  :light-color="$store.state.styles['--yalightyellow']" /></icon-base>
            </div>
        </div>
        <div class="head_items">
            <div class="grid-item__title">{{ cta.title }}</div>
        </div>
        <div class="button transparent"><span style="z-index: 50;">{{ cta.button }}</span></div>
    </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue'
import IconCtacredit from '@/components/icons/IconCtacredit.vue'
import IconCtatradein from '@/components/icons/IconCtatradein.vue'
import IconCtasell from '@/components/icons/IconCtasell.vue'
import IconCtaselect from '@/components/icons/IconCtaselect.vue'

export default {
    name: 'ModelItem',
    props: ['cta'],
    components: {
        IconBase, IconCtacredit, IconCtatradein, IconCtasell,IconCtaselect
    },
    mounted: function() {
    },
    methods: {
        show(modal) {
            this.$modal.show('form-'+modal)
        }
    }
}
</script>

<style scoped>
.available__grid-item {
    text-decoration: none;
    display: block;
    padding: 2rem 2rem;
    user-select: none;
    transition: 200ms;
    border-radius: 3px;
    background: var(--yalightgray);
    min-height: 400px;
}
.available__grid-item .button {
    --padding-left-right: 20px;
    position: relative;
    overflow: hidden;
    transition: 300ms;
    margin-top: 33px;
    background: var(--yawhite);
}
.available__grid-item .button::before {
    content: "";
    background-color: var(--yayellow);
    border-radius: 50%;
    width: 300px;
    height: 300px;
    position: absolute;
    bottom: -300px;
    left: -300px;
    transition: .2s;
    z-index: 0;
}
.available__grid-item:hover .button::before {
    bottom: -199px;
    left: -240px;
}
.available__grid-item .button span {
    z-index: 50;
    margin: 0;
}
.available__grid-item .button:hover {
    background: transparent;
    color: var(--ui-color);
}

.button {
    --ui-color: var(--yadarkblue);
    --border-color: var(--ui-color);
    --background: transparen;
    --color: var(--ui-color);
    --font-size: 14px;
    --padding-top-bottom: 12px;
    --padding-left-right: 50px;
    --margin-inner: 15px;
    --icon-size: calc(1em * 1.2);
    --transition: 100ms;
    line-height: calc(1em * 1);
    display: inline-flex;
    border: 1px solid var(--border-color);
    color: var(--yawhite);
    background: var(--color);
    font-size: var(--font-size);
    padding: var(--padding-top-bottom) var(--padding-left-right);
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    /*margin-bottom: 10px;*/
    align-content: space-between;
    transition: var(--transition);
    text-decoration: none;
    /*box-shadow: inset 0 0 1px 1px #00000038, 0px 1px 0px 0px #0000002b;*/
}
.button:active {
    box-shadow: inset 0 0 3px 2px #00000020;
}
.button:hover {
    --ui-color: var(--yayellow);
    color: var(--yablack);
    background: var( --ui-color);
    border: solid 1px var(--border-color);
    /*
     Создать медиа запрос на кастомный скрин вот так
     */
}
.button .icon {
    width: var(--icon-size);
    height: var(--icon-size);
    --fill: var(--color);
    fill: var(--color);
    margin: 0 calc(var(--margin-inner) / 2.5);
    box-sizing: border-box;
    transition: var(--transition);
}
.button span {
    font-size: var(--font-size);
    margin: 0 calc(var(--margin-inner) / 2.5);
}
.transparent {
    background: transparent;
    color: var(--ui-color);
    border: solid 1px var(--border-color);
}
.transparent:hover {
    --ui-color: var(--yadarkblue);
    background: var(--ui-color);
    color: var(--white);
}
.transparent:active {
    box-shadow: inset 0 0 3px 2px #00000020;
}
.w100 {
    width: 100%;
}

.grid__icon-form {
    --icon-size: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    height: 100%;
}
.grid__icon-form .grid-item__title {
    line-height: 1.3em;
    margin-bottom: 0;
}
.grid__icon-form .grid-item__sub {
    margin-bottom: 0;
}
.model__grid .grid__icon-form {
    --icon-size: 120px;
}
.grid__icon-form svg {
    width: var(--icon-size);
    height: var(--icon-size);
}
.grid__icon-form .head_items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
.model__grid .head_items {
    display: block;
}
.grid__icon-form .grid-item__sub {}
.grid-item__head {
    position: relative;
}
.grid-item__head-img {
    background-color: unset;
    --heigth: 100px;
    min-height: var(--heigth);
    height: 100%;
    display: flex;
    align-items: flex-start;
    width: 100%;
    justify-content: flex-start;
}
.grid-item__head-img img {
    width: 100%;
    object-fit: unset;
}
.grid-item__head-discont {
    position: absolute;
    top: 0;
    left: 0;
    border: solid 1px var(--yayellow);
    padding: 5px 30px;
    border-radius: 3px;
    font-size: 12px;
    line-height: 1em;
    color: var(--yadarkblue);
}
.grid-item__title {
    text-decoration: none;
    text-transform: none;
    font-size: 22px;
    font-weight: 600;
    line-height: 1em;
    margin-bottom: 1em;
    display: block;
    color: var(--yablack);
}
.grid-item__sub {
    font-size: 14px;
    font-weight: 300;
    line-height: 1em;
    margin-bottom: 2em;
    color: var(--yamiddlegray);
   /* display: grid;
    grid-template-columns: repeat(2, 1fr);*/
    gap: 10px;
}
.grid-item__sub--items::before {
    content: '\2022';
    color: var(--yadarkblue);
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    font-size: 20px;
    vertical-align: middle;
}
.grid-item__sub--items:nth-child(1)::before {
    content: '';
    margin-left: 0;
    margin-right: 0;
}
</style>