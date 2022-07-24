<template>
    <div class="form-close">
        <span @click="close"><icon-base icon-name="cross"><icon-cross /></icon-base></span>
    </div>
</template>
<script>
import IconBase from '@/components/IconBase.vue'
import IconCross from '@/components/icons/IconCross.vue'

export default {
    name: 'Close',
    components: {
        IconCross, IconBase
    },
    props: ['modal'],
    methods: {
        close() {
            this.$modal.hide(this.modal)
        }
    }
}
</script>

<style scoped>
.form-close {
    text-align: right;
}
.form-close span {
    cursor: pointer;
}
.form-close svg {  
    width: 30px;
    height: 30px;
    fill: var(--yamiddlegray);
}
</style>