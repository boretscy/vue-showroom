<template>
    <button class="button grid">
        <span>Сбросить все</span>
        <icon-base icon-name="cross"><icon-cross /></icon-base>
    </button>
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
    methods: {
         Format(q) {
			
            var Price = new Intl.NumberFormat('ru', { currency: 'RUR' });
            return Price.format(q);	
        }
    }
}
</script>

<style scoped>
.button {
    --ui-color: var(--yalightgray);
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
    color: var(--white);
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

    width: 100%;
    color: var(--yablack);
}
.button:active {
    box-shadow: inset 0 0 3px 2px #00000020;
}
.button:hover {
    --ui-color: var(--yagray);
    color: var(--black);
    background: var( --ui-color);
    border: solid 1px var(--border-color);
    /*
     Создать медиа запрос на кастомный скрин вот так
     */
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
    --padding-top-bottom: 12px;
    display: grid;
    grid-template-columns: 1fr calc(var(--icon-size) * 2);
    justify-content: space-between;
    align-items: center;
    padding: 0;
    justify-items: center;
}
.grid span {
    margin: 0;
    padding: var(--padding-top-bottom) var(--padding-left-right);
    border-right: solid 1px var(--yablack);
}
.grid svg {
    --background-color: var(--yablack);
    fill: var(--background-color);
    width: var( --icon-size);
    height: var( --icon-size);
}
.grid:hover svg {
    fill: var(--black);
}

.hovered-t {
    --ui-color: var(--yalightgray);
    position: relative;
    overflow: hidden;
    transition: 300ms;
    background: transparent;
    color: var(--ui-color);
}
.hovered-t:hover {
    --ui-color: var(--main);
    background: transparent;
    color: var(--ui-color);
    border: solid 1px var(--ui-color);
}
.hovered-t::before {
    content: "";
    background-color: var(--yagray);
    border-radius: 50%;
    width: 300px;
    height: 300px;
    position: absolute;
    bottom: -300px;
    left: -300px;
    transition: .2s;
    z-index: 0;
}
.hovered-t:hover::before{
    bottom: -199px;
    left: -240px;
}
.question {
    --icon-size: 10px;
    --padding-top-bottom: 0;
    --padding-left-right: 0;
    --ui-color: var(--yamiddlegray);
    border-radius: 50%;
    width: calc(var(--icon-size) * 2);
    height: calc(var(--icon-size) * 2);
    background: var(--ui-color);
    border: solid 1px var(--ui-color);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.question:hover {
    background: var(--yalightgray);
    border: solid 1px var(--yalightgray);
}
.question svg {
    fill: var(--yablack);
    width: var(--icon-size);
    height: var(--icon-size);
}
</style>