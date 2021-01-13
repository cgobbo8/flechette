<template>
    <div class="card-team-container">

        <div :class="{ teamActive: team1Playing }" class="card-team">
            <div class="card-title">
                <h1>Equipe 1</h1>
            </div>
            <div class="card-body">
                <div class="card-body-players">
                    <h2 class="card-body-players-section-title">Joueur<span v-if="equipes[1].length > 1">s</span></h2>
                    <p class="joueurs" :class="{ active: i == cptTeam1 && team1Playing}"
                        v-for="(joueur,i) in equipes[0]" :key="joueur">
                        {{ joueur }} </p>
                </div>
                <div class="card-body-score">
                    <h2>Score</h2>
                    <h1>{{scoreTeam1}}</h1><br>
                </div>
            </div>
            <h2 class="stat-title">Statistiques</h2>
            <div v-for="joueur in joueursStatsTeam1" :key="joueur.nom">
                <h4>{{joueur.nom}}</h4>
                <p>Scores : <span class="stat-item"><span v-for="(cp,i) in joueur.scores" :key="i">{{cp}} <span
                                v-if="i != joueur.scores.length -1 "> | </span></span></span></p>
                <p>Coups joués : <span class="stat-item">{{joueur.scores.length}}</span></p>
                <p>Moyenne joueur : <span class="stat-item">{{joueur.moyenne}}</span></p> <br>
            </div>
            <h4>Moyenne générale : <span
                    v-if="!isNaN(Math.round((moyenneTeam1.reduce((a, b) => a + b, 0)) / moyenneTeam1.length))">{{ Math.round((moyenneTeam1.reduce((a, b) => a + b, 0)) / moyenneTeam1.length) }}</span>
            </h4>

        </div>

        <div class="input-section">
            <p style="font-size : 1.7rem" class="input-section-title">Au tour de l'équipe <span
                    v-if="team1Playing">1<br>{{equipes[0][cptTeam1]}}</span><span
                    v-else>2<br>{{equipes[1][cptTeam2]}}</span>
            </p>
            <input @keyup.enter="play" class="inputScore" type="number" placeholder="Score" v-model="currentScore">
            <div class="button-section">
                <button class="primaire large" :disabled="currentScore.length == 0" @click="play">Ajouter score</button>
                <button class="secondaire large" @click="recommencer">Recommencer</button>
            </div>
        </div>


        <div :class="{ teamActive: !team1Playing }" class="card-team">
            <div class="card-title">
                <h1>Equipe 2</h1>
            </div>
            <div class="card-body">
                <div class="card-body-players-section">
                    <h2 class="card-body-players-section-title">Joueur<span v-if="team2.length > 1">s</span></h2>
                    <p class="joueurs" :class="{ active: i == cptTeam2 && !team1Playing}"
                        v-for="(joueur,i) in equipes[1]" :key="joueur">
                        {{ joueur }} </p>
                </div>
                <div class="card-body-score">
                    <h2>Score</h2>
                    <h1>{{scoreTeam2}}</h1><br>
                </div>
            </div>
            <h2 class="stat-title">Statistiques</h2>
            <div v-for="joueur in joueursStatsTeam2" :key="joueur.nom">
                <h4>{{joueur.nom}}</h4>
                <p>Scores : <span class="stat-item"><span v-for="(cp,i) in joueur.scores" :key="i">{{cp}} <span
                                v-if="i != joueur.scores.length -1 "> | </span></span></span></p>
                <p>Coups joués : <span class="stat-item">{{joueur.scores.length}}</span></p>
                <p>Moyenne joueur : <span class="stat-item">{{joueur.moyenne}}</span></p>
                <br>
            </div>
            <h4>Moyenne générale : <span
                    v-if="!isNaN(Math.round((moyenneTeam2.reduce((a, b) => a + b, 0)) / moyenneTeam2.length))">{{ Math.round((moyenneTeam2.reduce((a, b) => a + b, 0)) / moyenneTeam2.length) }}</span>
            </h4>
        </div>

        <modal name="example">
            <div class="modal">
                <h1>Bravo ! </h1>
                <h3>L'équipe {{winningTeam}} a gagné !</h3>
                <p v-for="joueur in equipes[winningTeam-1]" :key="joueur">{{joueur}}</p>
                <div class="modal-buttons">
                    <button class="primaire" @click="recommencer">Recommencer</button>
                    <button class="secondaire" @click="toHome">Retour au menu</button>
                </div>

            </div>

        </modal>

        <button  @click="changeTeam" class="btn-change-team secondaire">Changer les équipes</button>


    </div>
</template>

<script>
    import Vue from 'vue'
    import VueConfetti from 'vue-confetti'
    import VModal from 'vue-js-modal'

    Vue.use(VueConfetti)
    Vue.use(VModal, {
        dynamicDefault: {
            dialog: 'basic'
        }
    })


    export default {
        data() {
            return {
                team1: [],
                team2: [],
                cptTeam1: 0,
                cptTeam2: 0,
                scoreTeam1: 501,
                scoreTeam2: 501,
                currentScore: "",
                team1Playing: 1,
                winningTeam: 0,
                equipes: [],
                joueursStatsTeam1: [],
                joueursStatsTeam2: [],
                moyenneTeam1: [],
                moyenneTeam2: []
            }
        },
        created() {
            console.log(this.$store.state);
            this.equipes = [...this.$store.state.equipes]
            this.equipes[0].forEach(j => {
                this.joueursStatsTeam1.push({
                    nom: j,
                    scores: [],
                    moyenne: 0
                })
            })
            this.equipes[1].forEach(j => {
                this.joueursStatsTeam2.push({
                    nom: j,
                    scores: [],
                    moyenne: 0
                })
            })
            this.team1 = [...this.$store.state.equipes[0]]
            this.team2 = [...this.$store.state.equipes[1]]

        },
        methods: {
            play() {
                console.log(this.currentScore);
                if (this.team1Playing) {

                    if (this.scoreTeam1 - this.currentScore < 0) {
                        alert("Vous avez dépassé !")
                    } else {
                        let oldCpt = this.cptTeam1
                        this.cptTeam1 = (this.cptTeam1 + 1) % (this.equipes[0].length)
                        this.joueursStatsTeam1.forEach(j => {
                            if (this.equipes[0][oldCpt] == j.nom) {
                                j.scores.push(parseInt(this.currentScore))
                                j.moyenne = Math.round((j.scores.reduce((a, b) => a + b, 0)) / j.scores.length)
                            }
                        });
                        this.moyenneTeam1.push(parseInt(this.currentScore))
                        this.scoreTeam1 -= this.currentScore
                        this.team1Playing = !this.team1Playing
                        this.currentScore = ""
                    }

                    console.log(this.joueursStats);

                } else {

                    if (this.scoreTeam2 - this.currentScore < 0) {
                        alert("Vous avez dépassé !")
                    } else {
                        let oldCpt = this.cptTeam2
                        this.cptTeam2 = (this.cptTeam2 + 1) % (this.equipes[1].length)
                        this.joueursStatsTeam2.forEach(j => {
                            if (this.equipes[1][oldCpt] == j.nom) {
                                j.scores.push(parseInt(this.currentScore))
                                j.moyenne = Math.round((j.scores.reduce((a, b) => a + b, 0)) / j.scores.length)
                            }
                        });
                        this.moyenneTeam2.push(parseInt(this.currentScore))
                        this.scoreTeam2 -= this.currentScore
                        this.team1Playing = !this.team1Playing
                        this.currentScore = ""
                    }
                }


                console.log(this.scoreTeam1);
                console.log(this.scoreTeam2);
                if (this.scoreTeam1 == 0) {
                    this.$confetti.start();
                    this.winningTeam = 1
                    this.$modal.show('example')
                }
                if (this.scoreTeam2 == 0) {
                    this.winningTeam = 2
                    this.$confetti.start();
                    this.$modal.show('example')
                }

            },
            recommencer() {
                this.$confetti.stop()
                this.$modal.hide("example")
                this.currentScore = ""
                this.scoreTeam1 = 501
                this.scoreTeam2 = 501
                this.cptTeam1 = 0
                this.cptTeam2 = 0
                this.moyenneTeam1 = []
                this.moyenneTeam2 = []
                this.joueursStatsTeam1.forEach(j => {
                    j.scores = []
                    j.moyenne = 0
                });
                this.joueursStatsTeam2.forEach(j => {
                    j.scores = []
                    j.moyenne = 0
                });
            },
            toHome() {
                this.$modal.hide()
                this.$confetti.stop()
                this.$router.push("/")
            },
            changeTeam() {
                this.$router.push("/createteam")
            }

        }
    }
</script>

<style>

    .btn-change-team {
        position: absolute;
        right: 335px;
        top: 24px;
        width: 260px;

    }

    .card-team-container {
        height: 100vh;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .card-team {
        width: 400px;
        padding: 40px;
        border-radius: 20px;
        flex-direction: column;
        box-shadow: 0 7px 47px 4px rgba(32, 32, 149, .05);
        background: none;
    }

    .stat-title {
        border: top solid rgb(19, 19, 19);
        padding-top: 15px;
        color: rgba(0, 0, 151, 0.815);
    }

    .input-section {
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
        max-width: 350px;
    }

    .inputScore {
        padding: 20px 0px;
        text-align: center;
        font-size: 2em;
        border: none;
        box-shadow: none;
    }

    .joueurs {
        opacity: .2;
        font-weight: 600;
        color: #3b3b3b;
    }

    .card-title {
        padding-bottom: 15px;
    }

    .stat-item {
        opacity: 0.3;
    }

    .card-body {
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
        justify-content: space-between;
        align-items: flex-start;
    }

    .card-body-players {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .card-body-score {
        border: 1px solid #292929;
        border-radius: 20px;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .card-body-players-section-title {
        align-self: flex-start;
        justify-self: start;
        padding-bottom: 15px;
        color: rgba(0, 0, 151, 0.815);
    }

    .active {
        opacity: .8;
    }

    .teamActive {
        transition: 0.3s;
        box-shadow: 0 6px 18px 0 rgba(32, 32, 149, .1);
    }

    .input-section-title {
        text-align: center;
    }

    button {
        border: none;
        padding: 15px 30px;
        font-weight: 600;
        border-radius: 15px;
        font-size: 1em;
        margin-top: 15px;
        width: 200px;
        cursor: pointer;
        transition: .3s;
    }

    button:hover {
        transform: scale(.97);
        box-shadow: 0 0 0 rgba(0, 0, 151, 0);

    }

    button.primaire {
        background: rgba(0, 0, 151, 0.815);
        color: white;
        box-shadow: 0px 5px 10px rgba(0, 0, 151, 0.1);
    }

    button.secondaire {
        border: solid 2px rgba(0, 0, 151, 0.815);
        background: transparent;
        color: rgba(0, 0, 151, 0.815);
    }

    button.large {
        width: 100%;
    }

    .modal {
        padding: 50px;
    }

    .modal-buttons {
        display: flex;
        justify-content: space-between;
    }
</style>