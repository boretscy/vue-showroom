<template>
    <div class="yapps-cis">
        <detail-item
            :vehicle="vehicle"
			v-if="vehicle"
            />
	</div>
</template>

<script>
import DetailItem from '@/components/DetailItem.vue'

export default {
	name: 'Item',
	components: {
        DetailItem
	},
	data() {
		return {
			vehicle: null
		}
	},
	computed: {
		viewMode: function() {
			return this.$store.state.viewMode
		}
	},
	watch: {
		'$route.params': {
            immediate: true,
            handler(value) {
				this.vehicle = null
                let url = this.$store.state.apiUrl+'item/'+this.$store.state.mode+'/'+value.item+'?token='+this.$store.state.apiToken
				if (this.$store.state.brand) url += '&brand='+this.$store.state.brand

				this.axios.get(url).then((response) => {
					this.vehicle = response.data
					this.$cookies.set('CIS_DEALERSHIP', response.data.dealership.id)
					this.$cookies.set('CIS_BRAND', response.data.brand.code)
					this.$store.state.form_dealership = response.data.dealership.name
					this.$cookies.set('CIS_VEHICLE_ID', this.vehicle.id)
					this.$cookies.set('CIS_VEHICLE_NAME', this.vehicle.brand_name+' '+((this.vehicle.ref_model_name)?this.vehicle.ref_model_name:this.vehicle.model_name))
					this.$cookies.set('CIS_DETAIL_PAGE', 1)
				}).catch( (e) => {
					if (e.response.status == 404) window.location.href = '/404.php'
				})
            }
        },
	},
	mounted: function() {
	},
}
</script>

