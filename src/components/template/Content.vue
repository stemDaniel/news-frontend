<template>
    <div class="content">
        <router-view></router-view>
    </div>
    
</template>

<script>
export default {
    name: 'Content'
}
</script>

<style>
    .content{
        background-color: #fafafa;
        grid-area: content;
        padding: 20px 20px 0px 20px;
    }
</style>