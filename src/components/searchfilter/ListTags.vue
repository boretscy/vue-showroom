<template>
    <div class="list-tags">
        <span
            v-for="(tag, i) in tags"
            :key="i"
            @click="clearTag(tag)"
            >
            {{tag.name}} 
            <icon-base icon-name="cross"><icon-cross /></icon-base>
        </span>
        <span class="clear" @click="$emit('reset')">Сбросить <icon-base icon-name="cross"><icon-cross /></icon-base></span>
    </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue'
import IconCross from '@/components/icons/IconCross.vue'

export default {
    name: 'ListTags',
    components: {
        IconBase, IconCross
    }, 
    props: ['tags'],
    mounted: function() {
    },
    methods: {
        clearTag(tag) {
            this.$parent[tag.list].splice(tag.indx, 1)
        }
    }

}
</script>

<style scoped>
.list-tags {
    margin-bottom: 30px;
}
.list-tags span {
    cursor: pointer;
    background-color: var(--yamiddlegray);
    margin-right: 10px;
    padding: 5px 29px 5px 10px;
    color: var(--yawhite);
    border-radius: 5px;
    position: relative;
}
.list-tags span svg {
    width: 14px;
    height: 14px;
    fill: var(--yawhite);
    position: absolute;
    right: 5px;
    top: calc(50% - 7px);
}
.list-tags span.clear {
    background-color: var(--yalightgray);
    color: var(--yablack);
}
.list-tags span.clear svg {
    fill: var(--yablack);
}
</style>