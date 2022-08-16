<template>
    <div class="form-field" @click="$emit('check')">
        <span :class="{'error': !check}">
            <icon-base icon-name="check" v-if="check"><icon-check /></icon-base>
            <div class="uncheck" v-else></div>
        </span>
        Даю согласие на обработку своих <a :href="$store.state.global.personalLink">персональных данных</a> и соглашаюсь с <a :href="$store.state.global.personalLink">политикой обработки персональных данных</a>.
    </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue'
import IconCheck from '@/components/icons/IconCheck.vue'

export default {
    name: 'RulesField',
    components: {
        IconBase, IconCheck
    },
    props: ['check']
}
</script>

<style scoped>
.form-field {
    margin-bottom: 15px;
    font-size: 12px;
    cursor: pointer;
}
.form-field span {
    background: var(--yalightyellow);
    padding: 1px 1px;
    box-sizing: border-box;
    justify-self: start;
    border-radius: 3px;
    border: solid 1px var(--yalightyellow);
    width: 20px;
    height: 20px;
    text-align: center;
    margin-right: 15px;
    display: inline-block;
}
.form-field span.error {
    border: solid 1px var(--yared);
}
.form-field span svg {
    width: 10px;
    height: 10px;
    fill: var(--yadarkblue);
}
.form-field span .uncheck {
    width: 10px;
    height: 10px;
    display: inline-block;
}
.form-field a {
    color: var(--yadarkblue);
    text-decoration: underline;
}

</style>