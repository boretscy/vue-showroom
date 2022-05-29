<template>
    <div
        class="drop-button"
        :class="blockStyle"
        :style="'color: var(--'+titleColor+');'"
        @click.prevent="dropsStyle= !dropsStyle">
        {{ listTitle }} 
        <icon-base icon-name="corner" :iconRotate="dropsStyle ? 'up' : 'down'"><icon-corner /></icon-base>
        <drop-container 
			:listName="listName" 
			v-if="dropsStyle"/>
    </div>
</template>

<script>
import DropContainer from '@/components/base/drop/DropContainer.vue'
import IconBase from '@/components/IconBase.vue'
import IconCorner from '@/components/icons/IconCorner.vue'

export default {
    name: 'Drop',
    props: [
        'blockStyle',
        'listName',
        'listTitle',
        'titleColor'
    ],
    components: {
        DropContainer,
        IconBase, IconCorner,
    },
    data() {
        return {
            dropsStyle: false
        }
    }
}
</script>

<style scoped>
.inline {
    display: inline-block;
}
.block {
    display: block;
}

.drop-button {
	transition: .2s;
	cursor: pointer;
	position: relative;
}
.drop-button:hover {
	color: var(--yadarkblue);
	transition: .2s;
}
.drop-button svg {
    position: absolute;
	width: 20px;
	height: 20px;
	fill: var(--yablue);
	transition: .2s;
}
.drop-button:hover svg {
	fill: var(--yablue);
	transition: .2s;
}
.drop-button.inline svg {
    right: -30px;
    bottom: 5px;
}
.drop-button.block svg {
    right: 0;
    bottom: 0;
}
</style>