<template>
    <svg
        xmlns="http://www.w3.org/2000/svg" 
        :width="width" 
        :height="height" 
        viewBox="0 0 74 74" 
        :aria-labelledby="iconName" 
        role="presentation"
        :class="iconRotate"
    >
        <!-- <title
            :id="iconName"
            lang="en"
            >{{ iconName }} icon</title> -->
        <slot />
    </svg>
</template>

<script>
export default {
    props: {
        iconName: {
            type: String,
            default: 'yappswidgetsmainbutton'
        },
        width: {
            type: [Number, String],
            default: 200
        },
        height: {
            type: [Number, String],
            default: 90
        },
        iconColor: {
            type: String,
            default: 'currentColor'
        },
        darkColor: {
            type: String,
            default: ''
        },
        lightColor: {
            type: String,
            default: ''
        },
        iconRotate: {
            type: String,
            default: 'down'
        }
    },
    mounted: function() {
        // console.log( this.darkColor, this.lightColor )
    }
}
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
}
svg.down {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transition: .2s;
}
svg.up {
    transform: rotate(-180deg);
    -webkit-transform: rotate(-180deg);
    transition: .2s;
}
svg.right {
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    transition: .2s;
}
svg.left {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    transition: .2s;
}
</style>