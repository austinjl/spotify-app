<template>
  <div class="mx-2 mt-2">
    <v-card
      flat
      color="#40a798"
    >

      <v-card-title>504 10th Street Northwest <br/> Washington, DC 20004</v-card-title>

      <v-card-text>
        <v-row
          align="center"
          class="mx-4 mb-2"
        >
          <div class="subtitle-1 mx-2 mb-4">
            <v-btn text :ripple="false" max-width="130px" :href="directionsURL" target="_blank">
              <v-icon name="directions" class="mr-1" color="black"/>
              <span class="subheading mr-2">Directions</span>
            </v-btn>
          </div>
          <v-spacer></v-spacer>
          <div class="subtitle-1 mx-2 mb-4">
              <v-icon name="phone-alt" class="mr-1" color="black"/>
              <span class="subheading mr-2" style="color: black">202-638-4008</span>
          </div>
        </v-row>


        <div class="subtitle-1">Mon-Fri: 5:30 AM - 4:30 PM</div>
        <div class="subtitle-1">Sat-Sun: 5:30 AM - 3:00 PM</div>

      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title class="pb-0">
        <div class="subtitle-1">Dine-In/Carry-Out All Day</div>
      </v-card-title>

      <v-card-text>
        <div>Visa and Master Cards accepted</div>
      </v-card-text>
    </v-card>

    <!-- <v-card class="my-3" flat color="#f1f1f1">
      <v-row class="mx-4">
        <v-col xs="6" md="12" class="pa-0">
          <v-card flat color="#f1f1f1">
            <v-card-title class="socialMedia py-3">
              <v-icon name="brands/facebook-square" scale="3" class="mr-3"/> facebook
            </v-card-title>
          </v-card>
        </v-col>
        <v-col xs="6" md="12" class="pa-0">
          <v-card flat color="#f1f1f1">
            <v-card-title class="socialMedia py-3">
              <v-icon name="brands/yelp" scale="3" class="mr-3"/> yelp
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-card> -->

    <v-card class="my-0" flat color="#f5e1da">
      <v-card-text class="py-3">
        <v-row
          align="center"
        >
          <v-card class="socialMedia" flat color="#f5e1da" :href="facebook" target="_blank" style="width: 100%">
            <v-card-title class="socialMediaText py-2">
              <v-icon name="brands/facebook-square" scale="3" class="mr-3"/> facebook
            </v-card-title>
          </v-card>
          <v-spacer></v-spacer>
            <v-card class="socialMedia" flat color="#f5e1da" :href="yelp" target="_blank" style="width: 100%">
              <v-card-title class="socialMediaText py-2">
                <v-icon name="brands/yelp" scale="3" class="mr-3"/> yelp
              </v-card-title>
            </v-card>
        </v-row>
      </v-card-text>
    </v-card>

  </div>
</template>

<script>
const image1 = require('../assets/images/Image-1.jpeg');

export default {
  data () {
    return {
      directionsURL: 'https://www.google.com/maps/dir//Lincoln\'s+Waffle+Shop,+10th+Street+Northwest,+Washington,+DC/@38.8966475,-77.0962452,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x89b7b790c1f654af:0xcf7a92cab429d586!2m2!1d-77.0262047!2d38.8965348',
      facebook: 'https://www.facebook.com/LincolnsWaffleShop',
      image1: image1,
      yelp: 'https://www.yelp.com/biz/lincolns-waffle-shop-washington'
    }
  }
}
</script>

<style scoped>
.theme--light.v-btn:hover:before {
  opacity: 0 !important;
}

</style>
