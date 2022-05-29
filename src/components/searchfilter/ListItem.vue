<template>
    <router-link :to="itemLink" class="filter__list-item">
        <div class="filter__list-item__name">{{ itemName }}</div>
        <div class="filter__list-item__count">{{ itemCount }}</div>
    </router-link>
</template>

<script>
export default {
    name: 'ListItem',
    props: ['itemName', 'itemCount', 'itemLink']
}
</script>

<style scoped>
.filter__list-item {
    display: grid;
    grid-template-columns: 1fr 50px;
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
    color: var(--yamiddlegray);
    font-weight: 500;
    border: solid 1px var(--yayellow);
    border-radius: 3px;
    padding: 5px;
    justify-self: baseline;
    min-width: 50px;
    text-align: center;
}
</style>