<template>
    <div class="drop-container">
		<div class="drop-content">
			<ul>
				<li
                    v-for="(item, indx) in lists[listName]"
                    :key="indx"
                    >
                    <a :href="item.link" :alt="item.text" v-if="!item.router">{{ item.text }}</a>
                    <router-link :to="item.link" v-if="item.router">{{ item.text }}</router-link>
                </li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
    name: 'Drop',
    props: ['listName', 'listIndex'],
    data() {
        return {
            lists: this.$store.state.filter.dropLists
        }
    },
    mounted: function() {
        
    }
}
</script>

<style scoped>
.drop-container {
    position: absolute;
    width: calc(100% - 10px);
    background-color: var(--yawhite);
    padding: 1rem 1.5rem;
    font-size: var(--p);
	-webkit-box-shadow: 2px 4px 8px 0px rgba(189, 192, 194, 0.5);
	-moz-box-shadow: 2px 4px 8px 0px rgba(189, 192, 194, 0.5);
	box-shadow: 2px 4px 8px 0px rgba(189, 192, 194, 0.5);
	transition: .2s;
    left: -20px;
    top: 31px;
    line-height: 1.8rem;
    z-index: 10;
}
ul {
    list-style: none;
    padding: 0;
}
a, a:visited {
	color: var(--yadarkblue);
	transition: .2s;
    text-decoration: none;
}
a:hover, a:active, a:focus {
	color: var(--yablue);
	transition: .2s;
}
</style>