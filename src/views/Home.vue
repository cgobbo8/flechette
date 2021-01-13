<template>
  <div id="app">
    <div class="main-container">
      <div class="main-container-home">
        <div class="container-home">
          <div class="container-inputs">
            <h2>Entrez les joueurs</h2>
            <form class="form-home" ref="test" @submit.prevent="savePlayers">
              <div class="inputs-home">
                <div v-for="(input,i) in inputs" :key="input.placeholder">
                  <input @keydown="checkValidate" type="text" v-model="input.name" :placeholder="input.placeholder">
                  <span class="buttons-input">
                    <span v-if="i == inputs.length -1  " @click="addPlayer();moreThanOne();checkValidate()">
                      <v-icon class="v-icon" name="plus"></v-icon>
                    </span>
                    <span v-if="i == inputs.length -1 && i != 0 "
                      @click.prevent="removePlayer(input); moreThanOne();checkValidate()">
                      <v-icon class="v-icon remove" name="minus"></v-icon>
                    </span>
                  </span>

                </div>
              </div>

              <div class="buttons-toggle-home" v-if="!solo && !duo">
                <button @click.prevent="toggleTeam" class="primaire" :disabled="!team">Par équipe</button>
                <button @click.prevent="toggleTeam" class="primaire" :disabled="team">Bagarre</button>
              </div>

              <button :disabled="!inputsOk" class="large primaire" type="submit">Ok</button>
            </form>
          </div>

        </div>
        <div v-if="showequipes || showbigFight" class="dernieres-parties">
          <div v-if="showequipes"  class="card">
            <h3 class="stat-title">Derniere partie en équipe</h3>
            <br>
            <h4>Equipe 1</h4>
            <p class="stat-item" v-for="joueur in $store.state.equipes[0]" :key="joueur">{{joueur}}</p>
            <h4>Equipe 2</h4>
            <p class="stat-item" v-for="joueur in $store.state.equipes[1]" :key="joueur">{{joueur}}</p>
            <button @click="reprendreEquipe" class="large primaire">Reprendre</button>
          </div>
          <div v-if="showbigFight" class="card">
            <h3 class="stat-title">Dernier<span v-if="$store.state.bigFight.length > 1">e</span> <span
                v-if="$store.state.bigFight.length > 1">bagarre</span><span v-else>entrainement</span></h3>
            <br>
            <p class="stat-item" v-for="joueur in $store.state.bigFight" :key="joueur.placeholder">{{joueur.name}}</p>
            <button @click="reprendreBagarre" class="large primaire">Reprendre</button>
          </div>
        </div>
      </div>
    </div>






  </div>
</template>

<script>
  export default {
    name: 'App',
    created() {
      console.log(this.$store.state.bigFight );
      console.log(this.$store.state.equipes );

      this.$store.state.bigFight.length == 0 ? this.showbigFight = false : this.showbigFight = true
      this.$store.state.equipes.length == 0 ? this.showequipes = false : this.showequipes = true
      

    },
    data() {
      return {
        inputs: [{
          placeholder: "Joueur 1",
          name: ""
        }],
        cptPlayers: 1,
        solo: true,
        duo: false,
        team: false,
        inputsOk: false,
        showbigFight : false,
        showequipes : false

      }
    },
    methods: {
      addPlayer() {
        this.cptPlayers++;
        this.inputs = [...this.inputs, {
          placeholder: `Joueur ${this.cptPlayers}`,
          name: ""
        }]
      },
      removePlayer(player) {
        if (this.inputs.length > 1) {
          this.cptPlayers--;
          this.inputs = this.inputs.filter(i => i != player)
        }
      },
      toggleTeam() {
        this.team = !this.team
      },
      moreThanOne() {
        this.solo = this.inputs.length == 1
        this.duo = this.inputs.length == 2
      },
      savePlayers() {
        // console.log(this.inputs);
        if (this.solo) {
          this.$store.commit("updateBigFight", this.inputs)
          this.$router.push({
            name: "Fight",
            params: {
              from: 'Home'
            }
          })
        } else if (this.duo) {
          this.$store.commit("updateBigFight", this.inputs)
          this.$router.push({
            name: "Fight",
            params: {
              from: 'Home'
            }
          })
        } else if (!(this.team && !this.duo && !this.solo)) {
          this.$store.commit("updatePlayers", this.inputs)
          this.$router.push({
            name: "CreateTeam",
            params: {
              from: 'Home'
            }
          })
        } else {
          this.$store.commit("updateBigFight", this.inputs)
          this.$router.push({
            name: "Fight",
            params: {
              from: 'Home'
            }
          })
        }

      },
      reprendreEquipe() {
        this.$router.push({
          name: "TeamFight",
          params: {
            from: 'Home'
          }
        })
      },
      reprendreBagarre() {
        this.$router.push({
          name: "Fight",
          params: {
            from: 'Home'
          }
        })
      },
      checkValidate() {
        this.inputsOk = true
        this.inputs.forEach(({
          name
        }) => {
          if (name == "") {
            this.inputsOk = false
          }
        });
      }
    }
  }
</script>

<style>
  .container-home {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .buttons-toggle-home {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    width: 100%;
  }

  .container-inputs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .form-home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  input {
    text-align: center;
    background: none;
    border: none;
    font-weight: 600;
    font-size: 1.5rem;
    margin-top: 10px;

  }

  .buttons-input {
    position: absolute;
    margin-top: 10px;
  }

  .v-icon {
    margin-top: 5px;
    width: 30px;
    color: blueviolet;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
  }

  .v-icon:hover {
    transform: scale(0.95);
  }

  .v-icon.remove {
    color: rgb(255, 0, 0);
  }

  .inputs-home {
    margin: 50px 0;
  }

  button:disabled {
    cursor: default;
    background: none;
    opacity: 0.3;
    background: transparent !important;
    color: black !important;
    box-shadow: none;
  }

  button:disabled:hover {
    transform: none;
  }

  .main-container-home {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100vh;
    width: 80vw;
  }

  .main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  /* .dernieres-parties {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 50px;
  } */
</style>