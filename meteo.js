// create variable link json
const url = "https://www.prevision-meteo.ch/services/json/";
// for requet
function requestApi(event) {
    event.preventDefault();

    const city = document.querySelector("form input[name = 'city']");
    console.log(city.value);

    fetch(`${url}${city.value}`)

        .then(response => response.json())

        .then(data => {
            console.log('success:', data);
            //----------------- day today-----------------------/
            let day = document.createElement("div");

            day.textContent = "";
            day.textContent = `today is ${data.current_condition.date}`, `${data.current_condition.hour}`;
            display.appendChild(day);

            // ----------------------------------- image-------------------------------/
            let img = document.createElement("img");
            img.src = data.current_condition.icon;
            display.appendChild(img);
            //---------------------------------------temperature--------------------------/
            let temp = document.createElement("div");
            temp.textContent = `temperatue min is : ${data.fcst_day_0.tmin} °C, and max is ${data.fcst_day_0.tmax}`;
            display.appendChild(temp);

            //---------------------------------heur today--------------------------/

            let heur = document.createElement("p");
            heur.textContent = `at ${data.current_condition.hour} h`;
            display.appendChild(heur);


            let days = [data.fcst_day_1, data.fcst_day_2, data.fcst_day_3, data.fcst_day_4];

            for (i = 0; i < days.length; i++) {

                let dat = document.createElement("div");
                dat.textContent = `${days[i].date}`;
                display.appendChild(dat);
                //----------------- day futur-----------------------/
                let dayf = document.createElement("div");

                dayf.textContent = "";
                dayf.textContent = `tomorrow is ${days[i].date}`, `${data.current_condition.hour}`;
                display.appendChild(dayf);
                // ----------------------------------- image futur-------------------------------/
                let img = document.createElement("img");
                img.src = days[i].icon;
                display.appendChild(img);
                //---------------------------------------temperature futur-------------------------/
                let temp = document.createElement("div");
                temp.textContent = `temperatue min is : ${days[i].tmin} °C, and max is ${days[i].tmax}`;
                display.appendChild(temp);
                //---------------------------------------heur futur-------------------------/
                let heurMouv = document.createElement("p");
                heurMouv.textContent = "evolution hour by hour";
                
                for (let j = 0; j < 23; j++) {
                    let h = document.createElement("p");
                    h.textContent = `${j}H00`;
                    heurMouv.appendChild(h);

                    let img = document.createElement("img");
                    img.setAttribute('src', `${days[i].hourly_data[`${j}H00`].ICON}`);
                    heurMouv.appendChild(img);

                    let cond = document.createElement("p");
                    cond.textContent =`${days[i].hourly_data[`${j}H00`].CONDITION}`;
                    heurMouv.appendChild(cond);

                    let temp1 = document.createElement("p");
                    temp1.textContent=`${days[i].hourly_data[`${j}H00`].TMP2m}`;
                    heurMouv.appendChild(temp1);

                }
                display.appendChild(heurMouv);
            }
        })

        .catch((error) => {
            console.error('Error:', error);
        });
}

var btn = document.getElementById("btn");

btn.addEventListener("click", function (event) {
    event.preventDefault();
    var ville = document.getElementById("ville").value;
    requestApi(event);
    console.log(ville);
});

function getValue() {
    //selectionner l'element input et recuperer sa valeur
    var ville = document.getElementById("ville").value;
    console.log(getValue);
}




