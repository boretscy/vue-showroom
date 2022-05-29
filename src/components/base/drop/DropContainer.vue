<template>
    <div class="drop-container">
		<div class="drop-content">
			<ul>
				<li
                    v-for="(item, indx) in lists[listName]"
                    :key="indx"
                    >
                    <a href="#">{{ item }}</a>
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
            lists: {
                cities: [
                    'Краснодар',
                    'Яблоновский',
                    'Новороссийск',
                    'Майкоп'
                ],
                mode: [
                    'Новые',
                    'С пробегом'
                ],
                brands: [
                    'Cadillac',
                    'Chevrolet',
                    'Suzuki',
                    'Suzuki',
                    'Suzuki',
                    'Suzuki',
                    'Suzuki'
                ],
                models: [
                    'asfdkja',
                    'askfjahksf'
                ]
            }
        }
    },
    mounted: function() {
        
    }
}
</script>

<style scoped>
.drop-container {
    position: absolute;
    width: calc(100% - 40px);
    background-color: var(--yawhite);
    padding: 1rem 1.5rem;
    font-size: var(--p);
	-webkit-box-shadow: 2px 4px 8px 0px rgba(189, 192, 194, 0.5);
	-moz-box-shadow: 2px 4px 8px 0px rgba(189, 192, 194, 0.5);
	box-shadow: 2px 4px 8px 0px rgba(189, 192, 194, 0.5);
	transition: .2s;
    left: 0;
    top: 40px;
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
}
a:hover, a:active, a:focus {
	color: var(--yablue);
	transition: .2s;
}
</style>