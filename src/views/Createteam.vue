<template>
  <div class="choose-team-container">

    <div class="sub-container">
      <h1>Composez les équipes </h1>
      <div class="container-drag">

        <div>
          <div v-for="(li,i) in liste" :key="i">
            <input class="team-name" type="text" :value="`Equipe ${i+1}`" />
            <draggable :emptyInsertThreshold="100" :movable="li.length == 1 ? false : true" class="list-group"
              v-bind="dragOptions" :list="li" group="people" @start="drag=true" :move="checkMove" @end="drag=false">
              <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                <div :movable="li.length == 1 ? false : true" class="list-group-item" v-for="(element,i) in li"
                  :key="i">
                  {{element}}</div>
              </transition-group>
            </draggable>
          </div>

        </div>          
      </div>
      <button class="large primaire" @click="startTeamGame">C'est bon !</button>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    components: {
      draggable,
    },
    display: "Transitions",
    computed: {
      dragOptions() {
        return {
          animation: 200,
          group: "people",
          disabled: false,
          ghostClass: "ghost"
        };
      }
    },
    data() {
      return {
        joueurs: this.$store.state.joueurs,
        liste: [
          [],
          []
        ],
        drag: false
      }
    },
    mounted() {
      console.log(this.$route);
      // if (!this.$route.params.from) {
      //   this.$router.push({
      //     path: "/",
      //     params: {
      //       error: 'createteam'
      //     }
      //   })
      // }
      for (let i = 0; i < this.$store.state.joueurs.length; i++) {
        i % 2 == 0 ? this.liste[0].push(this.$store.state.joueurs[i].name) : this.liste[1].push(this.$store.state
          .joueurs[i].name)
      }
    },
    methods: {
      test() {
        console.log(this.myArray)
      },
      startTeamGame() {
        this.$store.commit("updateTeams", this.liste)
        this.$router.push({
          name: "TeamFight",
          params: {
            equipes: this.liste,
            from : 'createTeam'
          }
        })
      },
      addTeam() {
        this.liste = [...this.liste, [""]]
      },
      checkMove(evt) {
        if (evt.dragged.attributes.movable) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style>
  .button {
    margin-top: 35px;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }

  .list-group {
    min-height: 20px;
  }

  .list-group-item {
    cursor: move;
  }

  .list-group-item i {
    cursor: pointer;
  }

  .test {
    padding: 30px;
    max-width: 300px;
  }

  .container-drag {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 40px 0 ;
  }

  .drag-area {
    min-height: 100px;
    min-width: 100px;
    border: 2px blue dashed;
  }

  .team-name {
    border: none;
    box-shadow: none;
    text-align: center;
  }

  .choose-team-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .sub-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>