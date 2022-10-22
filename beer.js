

const Beers = {
    data() {
        return {
            beers: [],
            count: 1,
            visible: true
        }
    },
    created() {
        getBeerData(this.count).then( response => this.beers = response);
     },
     methods: {
        site_back() {
            this.count--
            getBeerData(this.count).then( response => this.beers = response);
        },
        site_forward() {
            this.count++
            getBeerData(this.count).then( response => this.beers = response);
        },
        popup() {
            this.visible = !this.visible;
        }
     }
}

/**
 * Lade Biere über das API.
 */
function getBeerData(page) {
    return fetch(`https://api.punkapi.com/v2/beers?page=${page}`)
        .then(response => response.json());
}

Vue.createApp(Beers).mount('#beers')

/**
 * Berechne die Farbe des Biers anhand seines SRM-Werts (@link{https://en.wikipedia.org/wiki/Standard_Reference_Method}).
 * Formel adaptiert nach @link{http://brew-engine.com/engines/beer_color_calculator.html}
 * 
 * @param {number} srm SRM-Wert des Biers 
 * @returns 
 */
function srmToRGB(srm) {
    let red = 0, green = 0, blue = 0;

    if (srm >= 0 && srm <= 1) {
        red = 240;
        green = 239;
        blue = 181;
    } else if (srm > 1 && srm <= 2) {
        red = 233;
        green = 215;
        blue = 108;
    } else if (srm > 2) {
        // Set red decimal
        if (srm < 70.6843) {
            red = 243.8327 - 6.4040 * srm + 0.0453 * srm * srm;
        } else {
            red = 17.5014;
        }
        // Set green decimal
        if (srm < 35.0674) {
            green = 230.929 - 12.484 * srm + 0.178 * srm * srm;
        } else {
            green = 12.0382;
        }
        // Set blue decimal
        if (srm < 4) {
            blue = -54 * srm + 216;
        } else if (srm >= 4 && srm < 7) {
            blue = 0;
        } else if (srm >= 7 && srm < 9) {
            blue = 13 * srm - 91;
        } else if (srm >= 9 && srm < 13) {
            blue = 2 * srm + 8;
        } else if (srm >= 13 && srm < 17) {
            blue = -1.5 * srm + 53.5;
        } else if (srm >= 17 && srm < 22) {
            blue = 0.6 * srm + 17.8;
        } else if (srm >= 22 && srm < 27) {
            blue = -2.2 * srm + 79.4;
        } else if (srm >= 27 && srm < 34) {
            blue = -0.4285 * srm + 31.5714;
        } else {
            blue = 17;
        }
    }

    let color = (red * 0.299 + green * 0.587 + blue * 0.114) > 186 ? 'black' : 'white';

    return {
        color,
        backgroundColor: `rgb(${red}, ${green}, ${blue})`
    }
}
