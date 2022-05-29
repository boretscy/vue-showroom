<template>
	<div class="yapps-cis">
		<div class="title">
			1 225 автомобилей в 
			<drop
				block-style="inline"
				list-title="Краснодаре"
				list-name="cities"
				title-color="yadarkblue"/>
		</div>
		<search-filter/>
	</div>
</template>

<script>
// @ is an alias to /src
// import IconBase from '@/components/IconBase.vue'
// import IconCorner from '@/components/icons/IconCorner.vue'

import SearchFilter from '@/components/SearchFilter.vue'
import Drop from '@/components/base/Drop.vue'

export default {
	name: 'Brands',
	components: {
		// IconBase, IconCorner,
		SearchFilter, Drop
	},
	data() {
		return {
			dropsStyles: {
				cities: false
			}
		}
	}
}
</script>

<style scoped>
.title {
    font-size: var(--h1);
    font-weight: 400;
    line-height: 1em;
    margin-bottom: 2rem;
	position: relative;
	user-select: none;
}
</style>
