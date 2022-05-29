<template>
    <div>
        <h1>{{ $route.params.brand }} / {{ $route.params.model }} / {{ $route.params.item }}</h1>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'Item',
    components: {
    }
}
</script>
