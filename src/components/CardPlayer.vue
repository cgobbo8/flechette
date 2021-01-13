<template>
    <div :class="{nonactive : !active}" class="card">
        <div :class="{nonactive : !active}" class="card-header">
            <h1 :class="{nonactive : !active}" class="stat-title"> {{ name }} </h1>
            <div :class="{nonactive : !active}" class="score-container">
                <h3 :class="{nonactive : !active}">Score</h3>
                <h2 :class="{nonactive : !active}"> {{score}} </h2>
            </div>
        </div>
        <input :disabled="!active" :class="{nonactive : !active}" @keypress.enter="play" type="number"
            class="input-fight" name="score" v-model="scoreInput" placeholder="Score" id="">
        <button :class="{nonactive : !active}" class="primaire large" :disabled="isNaN(parseInt(scoreInput))"
            @click="play">Ajouter score</button>

        <h2 :class="{nonactive : !active}" class="stat-title">Statistiques</h2>
        <p :class="{nonactive : !active}">Moyenne : <span v-if="historique.length > 0">{{moyenne}}</span> </p>
        <p :class="{nonactive : !active}">Scores : <span v-for="(score,i) in historique" :key="i"> {{score}} <span
                    v-if="i != historique.length - 1">|</span> </span></p>
        <p :class="{nonactive : !active}">Coups joués : {{historique.length}} </p>


    </div>

</template>

<script>
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
        props: ["name"],
        data() {
            return {
                score: 501,
                scoreInput: "",
                historique: [],
                moyenne: 0,
                win: false,
                active: false
            }
        },
        methods: {
            play() {
                if (!isNaN(parseInt(this.scoreInput))) {
                    if (this.score - this.scoreInput < 0) {
                        alert("Le score final doit être de 0 !")
                    } else if (parseInt(this.scoreInput) > 180) {
                        alert("Score max 180 !")
                    }
                    else {
                        this.$parent.next()
                        if (!isNaN(this.scoreInput)) {
                            this.score -= this.scoreInput
                            this.historique.push(parseInt(this.scoreInput))
                            this.moyenne = Math.round((this.historique.reduce((a, b) => a + b, 0)) / this.historique
                                .length)
                            this.scoreInput = ""
                        }

                    }

                    if (this.score == 0) {
                        this.$parent.win(this.name)

                    }
                }


            },

            reset() {
                this.score = 501
            },

        }
    }
</script>

<style>
    .card {
        width: 350px;
        padding: 40px;
        border-radius: 20px;
        flex-direction: column;
        box-shadow: 0 0px 47px 4px rgba(32, 32, 149, .05);
        background: none;
        margin: 20px;
        background: transparent !important;
        background: none !important;
        display: flex;
    }

    .card.winner {
        background: rgb(136, 179, 136);
    }


    .card-header {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
    }

    .score-container {
        border: solid 1px black;
        border-radius: 20px;
        padding: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .nonactive {
        opacity: .7;
    }
</style>