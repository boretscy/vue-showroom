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
    border-radius: 3px;
    padding: 5px;
    justify-self: baseline;
    min-width: 40px;
    text-align: center;
    transition: 200ms;
}
.filter__list-item:hover .filter__list-item__count {
    background-color: var(--yayellow);
}
</style>