<template>
    <router-link to="/" class="button grid" @click="cancelFilter">
        <span>
            Сбросить все
        </span>
        <span>
            <icon-base icon-name="cross"><icon-cross /></icon-base>
        </span>
        
    </router-link>
</template>

<script>
import IconBase from '@/components/IconBase.vue'
import IconCross from '@/components/icons/IconCross.vue'

export default {
    name: 'ButtonApply',
    components: {
        IconBase, IconCross
    },
    props: ['carCount'],
    data() {
        return {
            link: this.$route.path
        }
    },
    methods: {
        cancelFilter() {
            this.$emit('cancel')
        },
        Format(q) {
			
            var Price = new Intl.NumberFormat('ru', { currency: 'RUR' });
            return Price.format(q);	
        }
    }
}
</script>

<style scoped>
.button {
    --ui-color: var(--yalighgray);
    --border-color: var(--ui-color);
    --background: transparen;
    --color: var(--ui-color);
    --font-size: 14px;
    --padding-top-bottom: 12px;
    --padding-left-right: 50px;
    --margin-inner: 15px;
    --icon-size: calc(1em * 1.2);
    --transition: 100ms;
    display: inline-flex;
    border: 1px solid var(--border-color);
    color: var(--yablack);
    background: var(--color);
    font-size: var(--font-size);
    padding: var(--padding-top-bottom) var(--padding-left-right);
    border-radius: 3px;
    justify-content: center;
    align-items: center;
    align-content: space-between;
    transition: var(--transition);
    text-decoration: none;

    width: 100%;
}
.button:active {
    box-shadow: inset 0 0 3px 2px #00000020;
}
.button:hover {
    --ui-color: var(--yagray);
    color: var(--black);
    background: var( --ui-color);
    border: solid 1px var(--border-color);
}
.button svg {
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
    cursor: pointer;
}
.button a, .button a:hover, .button a:focus, .button a:active, .button a:visited {
    color: var(--yablack);
    text-decoration: none;
    line-height: 1;
}
.button:hover a, .button:hover a:hover, .button:hover a:focus, .button:hover a:active, .button:hover a:visited {
    color: var(--yablack);
}
.--white {
    fill: var(--white);
}
.transparent {
    background: transparent;
    color: var(--ui-color);
    border: solid 1px var(--border-color);
}
.transparent:hover {
    --ui-color: var(--main);
    background: var(--ui-color);
    color: var(--white);
}
.transparent:active {
    box-shadow: inset 0 0 3px 2px #00000020;
}
.grid {
    --icon-size: 20px;
    --padding-left-right: 20px;
    --padding-top-bottom: 11px;
    display: grid;
    grid-template-columns: 1fr calc(var(--icon-size) * 2);
    justify-content: space-between;
    align-items: center;
    padding: 0;
}
.grid span {
    margin: 0;
    padding: var(--padding-top-bottom) var(--padding-left-right);
    border-right: solid 1px var(--yawhite);
    text-align: center;
}
.grid span:nth-last-child(1) {
    justify-self: center;
}
.grid svg {
    --background-color: var(--yablack);
    fill: var(--background-color);
    width: var( --icon-size);
    height: var( --icon-size);
    justify-self: center;
    display: block;
}
.grid:hover svg {
    fill: var(--black);
}
</style>