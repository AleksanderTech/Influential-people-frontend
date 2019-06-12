const BASEURL = "http://localhost:8080/";

async function getUsersAW() {
    try {
        const result = await

            fetch(`${BASEURL}user`);
        const data = await result.json();
        console.log(data);
        console.log(data[0].nickname);
        for (let i = 0; i < data.length; i++) {
            let newDiv = document.createElement("li");
            newDiv.innerHTML=`<div class ='user'>${data[i].nickname}</div>`;
            // newDiv.appendChild(ne);
            document.getElementById("usersList").appendChild(newDiv);
        }

        return data;
    } catch (error) {
        console.log(error + '  hehe');

    }
};

getUsersAW();
