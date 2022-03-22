/*
design by Voicu Apostol.
design: https://dribbble.com/shots/3533847-Mini-Music-Player
*/

new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Poppin",
          artist: "YEAT",
          cover: "https://i1.sndcdn.com/artworks-mKINXUlMy1ka-0-t500x500.jpg",
          source: "https://raw.githubusercontent.com/TheKingChow/Music-app/main/mp3/Yeat%20-%20Poppin.mp3",
          url: "https://www.youtube.com/watch?v=6j7V8xyis4U&list=LL&index=5",
          favorited: false
        },
        {
          name: "Trademark USA Remix",
          artist: "Baby Keem",
          cover: "https://i1.sndcdn.com/artworks-92e1Nms9jsgx-0-t500x500.jpg",
          source: "https://raw.githubusercontent.com/TheKingChow/Music-app/main/mp3/baby%20keem%20trademark%20usa%20first%20beat%20with%20the%20twitter%20wistle%20(1).mp3",
          url: "https://www.youtube.com/watch?v=MZLOliT8zXM&list=LL&index=14",
          favorited: false
        },
        {
          name: "Diet Coke",
          artist: "Pusha T",
          cover: "https://i.ytimg.com/vi/HFrwm6oRYJg/maxresdefault.jpg",
          source: "https://raw.githubusercontent.com/TheKingChow/Music-app/main/mp3/Pusha%20T%20-%20Diet%20Coke.mp3",
          url: "https://www.youtube.com/watch?v=HFrwm6oRYJg&list=LL&index=18",
          favorited: false
        },
        {
          name: "Brooklyn Anthem",
          artist: "Vybz Kartel",
          cover: "https://urbanislandz.com/wp-content/uploads/2011/11/vybz-kartel-prison-2011.jpg",
          source: "https://raw.githubusercontent.com/TheKingChow/Music-app/main/mp3/Vybz%20Kartel%20-%20Brooklyn%20Anthem.mp3",
          url: "https://www.youtube.com/watch?v=7VraVmAShQU",
          favorited: false
        },
        {
          name: "It Bend Like Banana",
          artist: "Vybz Kartel",
          cover: "https://images.genius.com/197b198a5660465512cf90c6381ec1b0.500x500x1.jpg",
          source: "https://raw.githubusercontent.com/TheKingChow/Music-app/main/mp3/It%20Bend%20Like%20Banana.mp3",
          url: "https://www.youtube.com/watch?v=gJJjSlXOs-8",
          favorited: true
        },
        {
          name: "Rubbers",
          artist: "Frisco Kid",
          cover: "https://i.discogs.com/H8W9OFfw1WKtgRZWOvO_OeCS4fJQ1uz32V2M6eI_vo0/rs:fit/g:sm/q:90/h:605/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQxNjQx/ODctMTYyMTM2Mzc0/Ny01MDE3LmpwZWc.jpeg",
          source: "https://raw.githubusercontent.com/TheKingChow/Music-app/main/mp3/Frisco%20Kid%20-%20Rubbers%20(Joy%20Ride%20Riddim)%20%5BHD%5D.mp3",
          url: "https://www.youtube.com/watch?v=0tdS1jAwtS8&list=PLCqF6vRNw7IR7kTI3X3f0j44iha6hYI6b&index=7",
          favorited: false
        },
        {
          name: "Bashment Lady",
          artist: "Mega Banton",
          cover: "https://cdn.shopify.com/s/files/1/1377/6983/products/81aec5e15a4109e181317cdf87324b0aa1eaed6e_1200x1200.jpg?v=1507652066",
          source: "https://raw.githubusercontent.com/TheKingChow/Music-app/main/mp3/Mega%20Banton%20-%20Bashment%20Lady%20(Joy%20Ride%20Riddim)%20%5BHD%5D.mp3",
          url: "https://www.youtube.com/watch?v=qtNh9N6Ris8&list=PLCqF6vRNw7IR7kTI3X3f0j44iha6hYI6b&index=23",
          favorited: true
        },
        {
          name: "She Got A Thing",
          artist: "Pop Smoke",
          cover: "https://preview.redd.it/qb7lycok0k551.jpg?auto=webp&s=a368647c1dcef0ba114726df5f8f8083b97fd9c4",
          source: "https://raw.githubusercontent.com/TheKingChow/Music-app/main/mp3/POP%20SMOKE%20-%20SHE%20GOT%20A%20THING%20(Official%20Lyric%20Video).mp3",
          url: "https://www.youtube.com/watch?v=dyZFHzOyz-c",
          favorited: false
        },
        {
          name: "Long Live Dolph",
          artist: "Gucci Mane",
          cover: "https://media.pitchfork.com/photos/61dc401ae5e3cbd18cf32c72/1:1/w_600/LLD%20Cover%20Final%201%20Updated.jpg",
          source: "https://raw.githubusercontent.com/TheKingChow/Music-app/main/mp3/Gucci%20Mane%20-%20Long%20Live%20Dolph%20%5BMusic%20Video%5D.mp3",
          url: "https://www.youtube.com/watch?v=aQXV92_1UwM&list=LL&index=35",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
