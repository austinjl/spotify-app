<template>
  <div class="spotify">
    <v-snackbar
     v-model="status.statusType"
     :color="status.color"
     :multi-line="true"
     :right="true"
     :timeout="5000"
     :top="true"
     :vertical="true"
   >
     <v-card-title headline color="white">
       <span class="headline">{{ status.statusMessage }}</span>
     </v-card-title>
     <v-btn color="white" text @click="clearStatus">
       Close
     </v-btn>
   </v-snackbar>

    <h2>Search and Queue a Song</h2>

    <v-row class="px-3">
      <v-text-field
        v-model="artist"
        label="Search Artist"
        class="px-3"
      ></v-text-field>
      <v-btn @click="querySongsByArtist()">Search Songs</v-btn>
    </v-row>

    <v-row class="px-3">
      <v-autocomplete
        v-model="selectedSong"
        label="Search Song"
        :items="songs"
        :disabled="this.songs.length <= 0"
        item-color="gray"
        clearable
        deletable-chips
        single-line
        class="px-3"
      >
      </v-autocomplete>
      <v-btn @click="queueSong()" :disabled="this.songs.length <= 0">Add to Queue</v-btn>
    </v-row>

    <!-- <v-btn @click="refreshQueue()"> -->
    <v-btn @click="refresh()">
      <v-icon name="sync-alt"></v-icon>
    </v-btn>
    <br />
    <br />
    <h3>Currently Playing:</h3>
    <p>{{ this.currentSong }}</p>

    <v-dialog v-model="dialog" persistent>
      <v-card class="pa-8">
        <v-row>
          <v-text-field
            v-model="accessToken"
            label="Access Token"
            class="px-3"
          ></v-text-field>

          <v-btn @click="refresh()">Go</v-btn>
        </v-row>
      </v-card>

    </v-dialog>
  </div>

</template>

<script>
const axios = require("axios");
const _ = require("lodash");

const MY_IPHONE = "ec0a8123b4ad3cda228d8e7b3cf1929642277267";


//let accessToken = "BQBhrahNNzx3EITY1NvrhckhXKQf4LvfKQqHdmCiQtC5XRxEjUo0IchiLYHzLZxXjkkgRV5P2HCttsrtww_x3hR5w_6rD-CYb94pQZrJ98Z1MBLczDggamJugxxk_e8v5xq-SFj0LeZcOuTUTdeURYWzx1SnWa379lX7B5XDR3iEz5eZkOoW61XQBX0x9IqXU1BSUJhCNHl_DxW_peU8SMy_rejMw8gN1nfswJ7gPccj1rJWkeHm2wCahZIj8MKE_edvIZScXUzLIG0";
// let this.accessToken =
//   "BQDOXp5NtqpFkZmKML5ayzvHpAUCdSlU80muXg1mAU5YCKQgJ1GmtcAoPWvuA2lyaiYJu090xdOpAuc69DUdcmfouTMKilo3I67e-3kNZY5CMy8O0bHVoEzCRcqi15zyiKRaVcCWm7VLXe-WTQdJWpe9X-sqEfUwAbMxQQ13-jsaXFimMGXpyr1J-bHqJHrm5FEX136oi9yDHsB1JNcRk6N8xkYJwHzvGx7T5ndL2GxCXwZxnAItxSRb0naClvkW_V3AXCP6BkJdbX8";

async function setDeviceId() {
  let deviceOptions = {
    method: "GET",
    url: "https://api.spotify.com/v1/me/player/devices",
    headers: {
      Authorization: `Bearer ${this.accessToken}`
    }
  };
  let deviceResponse;
  try {
    deviceResponse = await axios(deviceOptions);
    this.dialog = false;
  } catch (err) {
    this.dialog = true;
  }
  if (!this.dialog) {
    let devices = deviceResponse.data.devices;
    let activeDevice = _.find(devices, ['is_active', true]);
    if (activeDevice) {
      this.deviceId = activeDevice.id;
    } else {
      let device = null;// _.find(devices, ['id', MY_IPHONE]);
      if (device) {
        this.deviceId = MY_IPHONE;
      } else {
        throw this.handleError('Cannot find device');
      }
    }
  }
}

function handleError(msg) {
  this.$set(this.status, 'statusType', 'ERROR');
  this.$set(this.status, 'statusMessage', msg);
  this.$set(this.status, 'color', 'red');
  return msg;
}

async function querySongsByArtist() {
  this.songs = [];
  let artistOptions = {
    method: "GET",
    url: "https://api.spotify.com/v1/search",
    params: {
      q: this.artist,
      type: "artist",
      limit: 50
    },
    headers: {
      Authorization: `Bearer ${this.accessToken}`
    }
  };
  let artistReponse;
  try {
    artistReponse = await axios(artistOptions);
  } catch(err) {
    throw this.handleError('Error finding artist');
  }

  let artists = artistReponse.data.artists.items;
  _.forEach(artists, async artist => {
    let artistURL = "https://api.spotify.com/v1/artists/" + artist.id + "/albums";
    let albumOptions = {
      method: "GET",
      url: artistURL,
      params: {
        limit: "50"
      },
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    };
    let albumResponse;
    try {
      albumResponse = await axios(albumOptions);
    } catch(err) {
      throw this.handleError('Error finding albums');
    }
    let albums = albumResponse.data.items;
    albums = _.uniqBy(albums, 'name');
    _.forEach(albums, async album => {
      let tracksURL = "https://api.spotify.com/v1/albums/" + album.id + "/tracks";
      let tracksOptions = {
        method: "GET",
        url: tracksURL,
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      };
      let trackResponse;
      try {
        trackResponse = await axios(tracksOptions);
      } catch(err) {
        throw this.handleError('Error finding tracks');
      }
      let tracks = trackResponse.data.items;
      tracks = _.uniqBy(tracks, 'name');
      _.forEach(tracks, async track => {
        track.arist = artist.name;
        this.songs.push({
          text: track.name,
          value: track
        })
      })
    });
  });
}

async function queueSong() {
  await this.setDeviceId();
  if (!this.selectedSong) {
    throw this.handleError('No song selected');
  }
  let queueSongOptions = {
    method: "POST",
    url: "https://api.spotify.com/v1/me/player/queue",
    params: {
      uri: this.selectedSong.uri,
      device_id: this.deviceId
    },
    headers: {
      Authorization: `Bearer ${this.accessToken}`
    }
  };
  try {
    await axios(queueSongOptions);
    this.queue.push(this.selectedSong);
    this.alertSongQueued(this.selectedSong);
  } catch (err) {
    try {
      throw this.handleError(`Error queueing song ${getSongNameAndArtists(this.selectedSong)}`);
    } catch(err) {
      throw this.handleError(`Error queueing song`);
    }

  }
}

async function refresh() {
  this.setDeviceId();
  if (!this.dialog) {
    let getCurrSongOptions = {
        method: "GET",
        url: "https://api.spotify.com/v1/me/player",
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      };
      let currSongResponse = await axios(getCurrSongOptions);
      this.setCurrentSong(currSongResponse.data.item);
  }
}

function getSongNameAndArtists(song) {
  let artistsStr = '';
  let artists = song.artists;
  let i;
  for (i = 0; i < artists.length - 1; i++) {
    artistsStr += `${artists[i].name}, `;
  }
  if (artists.length > 1) {
    artistsStr += "and "
  }
  artistsStr += artists[i].name;
  return `${song.name} By ${artistsStr}`;
}

function setCurrentSong(song) {
  this.currentSong = getSongNameAndArtists(song)
}

function alertSongQueued(song) {
  this.$set(this.status, 'statusType', 'SUCCESS');
  this.$set(this.status, 'statusMessage', `${this.getSongNameAndArtists(song)} added to Queue`);
  this.$set(this.status, 'color', 'green');
}

function clearStatus() {
  this.$set(this.status, 'statusType', undefined);
  this.$set(this.status, 'statusMessage', '');
  this.$set(this.status, 'color', '');
}

// async function refreshQueue() {
//   let getCurrSong = {
//     method: "GET",
//     url: "https://api.spotify.com/v1/me/player",
//     headers: {
//       Authorization: `Bearer ${this.accessToken}`
//     }
//   };
//   let currSongResponse = await axios(getCurrSong);
//   let songId = currSongResponse.data.item.id;
//   console.log('currsongid', currSongResponse.data.item.id);
//   console.log('queue2', this.queue);
//   let indexOfSong = _.findIndex(this.queue, ['id', songId]);
//   console.log(indexOfSong);
// }

async function created() {
  this.refresh();
}

export default {
  data() {
    return {
      accessToken: null,
      dialog: true,
      deviceId: null,
      artist: '',
      songs: [],
      selectedSong: null,
      queue: [],
      currentSong: null,
      status: {
        statusType: undefined,
        statusMessage: '',
        color: ''
      }
    };
  },
  methods: {
    clearStatus,
    alertSongQueued,
    handleError,
    querySongsByArtist,
    queueSong,
    refresh,
    // refreshQueue,
    setDeviceId,
    setCurrentSong,
    getSongNameAndArtists
  },
  created
};
</script>
