<template>
    <div>
        <div class="super-container">
            <div class="card-container">
                <card-player v-for="(joueur,i) in joueurs" :key="i" :name="joueur.name"></card-player>

            </div>
        </div>

    </div>
</template>

<script>
    import CardPlayer from '../components/CardPlayer.vue'
    import VueConfetti from 'vue-confetti'
    import VModal from 'vue-js-modal'
    import Vue from 'vue'

    Vue.use(VueConfetti)
    Vue.use(VModal, {
        dynamicDefault: {
            dialog: 'basic'
        }
    })


    export default {
        components: {
            CardPlayer
        },
        date() {
            return {
                joueurs: []
            }
        },
        created() {
            this.joueurs = this.$store.state.bigFight

        }
    }
</script>

<style>
    .super-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100%;
    }

    .card-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        max-width: 90vw;
        margin-top: 200px;
        margin-bottom: 100px;
    }
</style>