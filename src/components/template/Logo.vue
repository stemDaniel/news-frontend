<template>
    <div class="logo">
        <i @click="toggleMenu" class="fa fa-bars drawer-button"></i>
        <div class="news-api-logo"  @click="$router.push({name: 'news'})">
            News
            <span class="news-api-title">API</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Logo',
    displayDrawer(){
        return this.$store.state.displayDrawer
    },
    methods: {
        toggleMenu(){
            this.$store.commit("toggleMenu")
        }
    }
}
</script>

<style>
    .logo{
        background-color: #4CA1AF;
        filter: brightness(0.95);
        grid-area: logo;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .drawer-button{
        visibility: hidden;
        display: none;
        cursor: pointer;
        font-size: 1.5rem;
        margin: 0 25px;
        color: #fff;
        transition: transform 0.1s linear;
    }

    .drawer-button:active{
        transform: rotate(90deg);
    }

    .news-api-logo{
        cursor: pointer;
        display: flex;
        justify-content: flex-start;
        color: #fff;
    }

    .news-api-title{
        color: #4CA1AF;
        background-color: #fff;
        padding: 0 8px;
    }

    .news-api-title, .news-api-logo{
        letter-spacing: -1px;
        font-weight: 500;
        font-size: 2.25rem;
        font-family: 'Lato';
    }

    .logo img{
        width: 100%;
    }

    @media(max-width: 980px){
        .news-api-logo{
            flex: 1;
        }
        .drawer-button{
            visibility: visible;
            display: block;
        }
    }

    @media(max-width: 700px){
        .news-api-logo{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
		.news-api-logo, .news-api-title{
			font-size: 1.5rem;
		}
	}
</style>