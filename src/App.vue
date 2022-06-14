<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

export default {
    name: 'App',
    mounted: function() {
        this.$store.state.viewMode = this.$cookies.get('CIS_VIEW_MODE') || 'grid'
    },
    methods: {
    }
}
</script>


<style scoped>
@import '/assets/fonts/font.css';
#app {
    --yalightgray: #f3f5f6;
	--yagray: #bdc0c2;
	--yamiddlegray: #7b8284;
	--yadarkgray: #565b5d;
	--yablackgray: #1c232c;
    --yalightblack: #5C5D5E;
	
	--yablack: #000000;
	--yawhite: #ffffff;
	
	--yalightblue: #87cefa;
	--yablue: #0048a9;
	--yadarkblue: #003375;
	
	--yalightyellow: #ffe687;
	--yayellow: #fdba4d;
	--yadarkyellow: #fdaa25;

    font-family: 'Roboto', Helvetica, sans-serif;
    font-size: 14px;

    --h1: 32px;
    --h2: 24px;
    --h3: 18px;
    --h4: 16px;
    --p: 14px
}
</style>
