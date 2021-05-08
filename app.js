const app = Vue.createApp({
  data() {
    return{
      playerHealth: 100,
      monsterHealth: 100,
      specialCount: 0,
      winner: null,
      attackList: []
    }
  },
  computed: {
    monsterBarStyle() {
      if(this.monsterHealth < 0){
        return {width: '0%'}
      }
      return {width: this.monsterHealth + '%'}
    },
    playerBarStyle() {
      if(this.playerHealth < 0){
        return {width: '0%'}
      }
      return {width: this.playerHealth + '%'}
    },
    playerSpecialAttack() {
      return this.specialCount % 3 !== 0
    },
    treatment() {
      return this.specialCount % 2 != 0
    }
  },
  watch: {
    playerHealth(value) {
      if(value <= 0 && this.monsterHealth <= 0){
        this.winner = 'draw'
      }else if(value <= 0){
        this.winner = 'maxluq'
      }
    },
    monsterHealth(value) {
      if(value <= 0 && this.playerHealth <= 0){
        this.winner = 'draw'
      }else if(value <= 0){
        this.winner = 'player'
      }
    }
  },
  methods: {
    StartNewGame() {
      this.playerHealth = 100,
      this.monsterHealth = 100,
      this.specialCount = 0,
      this.winner = null,
      this.attackList = 0
    },
    MonsterHujumi() {
      this.specialCount ++
      const hujumValue = Math.floor(Math.random() * (10-5)) + 5
      this.monsterHealth = this.monsterHealth - hujumValue
      this.AddListAttack('player', 'attack', hujumValue)
      this.PlayerHujumi()
    },
    PlayerHujumi() {
      const hujumValue = Math.floor(Math.random() * (10-8)) + 8
      this.playerHealth = this.playerHealth - hujumValue
      this.AddListAttack('monster', 'attack', hujumValue)
    },
    MaxsusHujum() {
      this.specialCount ++
      const hujumValue = Math.floor(Math.random() * (15-5)) + 5
      this.monsterHealth = this.monsterHealth - hujumValue
      this.AddListAttack('player', 'attack', hujumValue)
      this.PlayerHujumi()
    },
    Davolash() {
      this.specialCount ++
      const hujumValue = Math.floor(Math.random() * (17-6)) + 6
      if(this.playerHealth > 100){
        this.playerHealth = 100
      }else{
        this.playerHealth = this.playerHealth + hujumValue
      }
      this.AddListAttack('player', 'heal', hujumValue)
      this.PlayerHujumi()
    },
    Surrender() {
      this.winner = 'maxluq'
    },
    AddListAttack(who, what, value ) {
      this.attackList.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
      })
    }
  }
})

app.mount('#game')