<template>
    <div>
        <div class="super-container">
            <div class="card-container">
                <card-player :ref="`card`" v-for="(joueur,i) in joueurs" :key="i"  :name="joueur.name"></card-player>

            </div>
            <modal name="example">
                <div class="modal">
                    <h1>Bravo ! </h1>
                    <br>
                    <h3>{{ gagnant }} a gagné !</h3>
                    <br>
                    <div class="modal-buttons">
                        <button class="primaire" @click="recommencer">Recommencer</button>
                        <button class="secondaire" @click="toHome">Retour au menu</button>
                    </div>
                </div>

            </modal>
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
        created() {
            this.joueurs = this.$store.state.bigFight
        },
        mounted() {
            this.$refs.card[0].active = true
        },
        data() {
            return {
                joueurs: [],
                gagnant: "",
                cpt : 0
            }
        },
        methods: {
            win(name) {
                console.log(name);
                this.$confetti.start();
                this.gagnant = name
                this.$modal.show('example')
            },
            toHome() {
                this.$modal.hide()
                this.$confetti.stop()
                this.$router.push("/")
            },
            recommencer() {
                this.$refs.card.forEach(j => {
                    j.reset()
                })
                this.$modal.hide('example')
                this.$confetti.stop()
            },
            next() {
                this.$refs.card[this.cpt].active = false
            this.cpt = (this.cpt + 1) % this.$refs.card.length
            this.$refs.card[this.cpt].active = true
            
            }
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