<template>
    <div class="news-item">
        <a :href="news.url" target="_blank">
            <div class="news-item-image">
                <img height="auto" width="225" v-if="news.urlToImage" :src="news.urlToImage" alt="Imagem da notícia">
                <img height="auto" width="225" v-else src="@/assets/news.png"  alt="Imagem da notícia">
            </div>
            <div class="news-item-info">
                <span class="news-item-title"><strong>{{news.title}}</strong></span>
                <span class="news-item-font">{{getDate(news.publishedAt)}} - Fonte <strong>{{news.source.name}}</strong></span>
                <span class="news-item-description">{{news.description}}</span>
            </div>
        </a>
    </div>
</template>

<script>
export default {
    name: 'NewsItem',
    props: ['news'],
    methods: {
        getDate(date){
            const ymd = date.split('T')[0].split('-')
            return `${ymd[2]}/${ymd[1]}/${ymd[0]}`
        }
    }
}
</script>

<style>
    .news-item{
        margin-top: 20px;
    }

    .news-item a{
        display: flex;
        flex-direction: row;
        text-decoration: none;
        color: #000;

        border-radius: 8px;
        background-color: #FFF;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
        transition: transform 0.1s linear;
    }

    .news-item a:hover{
        text-decoration: none;
        color: #000;
        transform: scale(1.02);
    }

    .news-item-image{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .news-item-info{
        margin-left: 10px;
        padding-left: 10px;
        border-left: 1px solid rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
    }

    .news-item-title{
        font-size: 1.3rem;
    }

    .news-item-font, .news-item-description{
        margin-top: 8px;
    }

    @media(max-width: 700px){
        .news-item a{
            flex-direction: column;
        }
        .news-item-info{
            border: none;
            padding-top: 20px;
        }
	}
</style>