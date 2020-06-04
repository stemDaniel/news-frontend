<template>
    <div class="logo" @click="$router.push({name: 'news'})">
        <div class="news-api-logo">
            News
            <span class="news-api-title">API</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Logo'
}
</script>

<style>
    .logo{
        cursor: pointer;
        background-color: #4CA1AF;
        filter: brightness(0.95);
        grid-area: logo;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .news-api-logo{
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