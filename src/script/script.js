function ChangeBtn()
      {
        let btn=document.getElementById("strtBtn");
        btn.innerHTML="Let's Go...";
        btn.style.transform="0.5s";
      }

      function bodyLoad()
      {
        loadProduct();
        
      }

      function loadProduct()
      {
        fetch("https://fakestoreapi.com/products")
        .then(function (response){
          return response.json();
        })
        .then(function(data){

          for(let categories of data)
          {
            let div=document.createElement("div");
            div.className="card p-2 m-5";
            div.style.width="250px";
            div.innerHTML=`
            <img src="${categories.image}" height=250px>
            <div class="card-header m-2">
              ${categories.title}
            </div>
            <div class="card-body">
              <dl>
                <dt>Price</dt>
                <dd>
                 ${categories.price}$
                </dd>
                <dt>Rating</dt>
                <dd>
                   <span class="bi bi-star-fill">${categories.rating.rate}</span>
                   [${categories.rating.count}]
                </dd>
              </dl>
            </div>
            <div>
              <button class="btn btn-danger w-100" onclick="addCartClick(${categories.id})"><span class="bi bi-cart"></span>Add to Cart</button>
            </div>`;

            document.querySelector("main").appendChild(div);
          }
        })
      }

      let count=0;

      function addCartClick(id)
      {
        
        //alert("Alert Working");
        //console.log(id);
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then(function (response){
          return response.json();
        })
        .then(function (data){
           let tr=document.createElement("tr");
            let tdName=document.createElement("td");
            let tdPrice=document.createElement("td");
            let tdPic=document.createElement("td");

            tdName.innerHTML=data.title;
            tdPrice.innerHTML=`$ ${data.price}`;
            tdPic.innerHTML=`
            <img src="${data.image}" height=80px alt="API not Loading">`;

            tr.appendChild(tdName);
            tr.appendChild(tdPrice);
            tr.appendChild(tdPic);

            alert(`Adding ${data.title} into Cart List`);
            
            let badge=document.getElementById("badgeNum");
            badge.innerHTML=`${++count}`;

            document.querySelector("tbody").appendChild(tr);

        })

      }
