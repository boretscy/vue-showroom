<template>
    <router-link :to="link" class="filter__list-item">
        <div class="filter__list-item__name">{{ item.name }}</div>
        <div class="filter__list-item__count">{{ item.vehicles }}</div>
    </router-link>
</template>

<script>
export default {
    name: 'ListItem',
    props: ['item'],
    computed: {
        link: function() {
            let res = '/'
            // if ( this.$store.state.mode == 'used' ) {
            //     res += '?'
            //     res += 'brand='+((this.item.brand)?this.item.brand:this.item.code)
            //     if ( this.item.brand ) res += '&model='+this.item.code
            //     if (this.query) res += this.query.slice(1)
            // } else {
            //     res += ((this.item.brand)?this.item.brand.code:this.item.code)
            //     if ( this.item.brand ) res += '/'+this.item.code
            //     if (this.query) res += this.query
            // }
            if ( this.$route.query.brand ) {
                res += '?brand='+this.$route.query.brand
                if ( this.item.brand ) res += '&model='+this.item.code
                if (this.query) res += this.query
            } else {
                res += ((this.item.brand)?this.item.brand.code:this.item.code)
                if ( this.item.brand ) res += '/'+this.item.code
                if (this.query) res += this.query
            }
            
            return res
        }
    }
}
</script>

<style scoped>
.filter__list-item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    text-decoration: none;
}
.filter__list-item:hover .filter__list-item__name{
    color: var(--yadarkblue);
}
.filter__list-item__name {
    font-size: 14px;
    font-weight: 400;
    line-height: 1em;
    color: var(--yamiddlegray);
    transition: 200ms;
}
.filter__list-item__count {
    background: var(--yalightgray);
    color: var(--yalightblack);
    font-weight: 600;
    border-radius: 5px;
    justify-self: baseline;
    min-width: 40px;
    text-align: center;
    transition: 200ms;
}
.filter__list-item:hover .filter__list-item__count {
    background-color: var(--yayellow);
}
</style>