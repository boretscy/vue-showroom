<template>
    <div id="app" :key="GlobalIter">
        <router-view/>
    </div>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            GlobalIter: 0
        }
    },
    mounted: function() {
        this.$store.state.viewMode = this.$cookies.get('CIS_VIEW_MODE') || 'grid'
        this.$cookies.set('CIS_DETAIL_PAGE', 0)

        let url = this.$store.state.apiUrl+'brands/'+this.$store.state.mode+'/?token='+this.$store.state.apiToken
		this.axios.get(url).then((response) => {
			this.$store.state.global.brands = response.data.dropLists.brands
		})

        if ( this.$store.state.brand ) this.$router.push( this.$store.state.brand )
    },
    methods: {

        // getDefaultFilter() {
        //     let url = this.$store.state.apiUrl+'filter/'+this.$store.state.mode+'/?token='+this.$store.state.apiToken
        //     this.axios.get(url).then((response) => {
        //         response.data.dropLists.bodies.sort((a, b) => a.name > b.name ? 1 : -1);
        //         response.data.dropLists.dealerships.sort((a, b) => a.name > b.name ? 1 : -1);
        //         response.data.dropLists.colors.sort((a, b) => a.name > b.name ? 1 : -1);
        //         response.data.dropLists.engines.sort((a, b) => a.name > b.name ? 1 : -1);
        //         response.data.dropLists.transmitions.sort((a, b) => a.name > b.name ? 1 : -1);
        //         response.data.dropLists.drives.sort((a, b) => a.name > b.name ? 1 : -1);
        //         return response.data
        //     })
        // }
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
	
	--yalightyellow: #fce0b2;
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
