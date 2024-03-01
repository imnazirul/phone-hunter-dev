const cardContainer = document.getElementById("card-container");
const searchInput = document.getElementById("search-input");
const showAllBtn = document.getElementById("showall-btn");

const getApiResponse = async (brand) => {
  const responseText = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${brand}`
  );
  const responseData = await responseText.json();
  showCard(responseData.data);
};

const showCard = (data) => {
  cardContainer.innerHTML = "";

  if (data.length > 15) {
    data = data.slice(0, 15);
    // console.log(data);
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }
  data.forEach((phone) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card bg-base-100 shadow-xl";

    cardDiv.innerHTML = `
    <figure class="px-10 pt-10">
      <img
        src="${phone.image}"
        alt="Shoes"
        class="rounded-xl"
      />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="text-[#403F3F] font-bold text-2xl">
       ${phone.phone_name}
      </h2>
      <p class="text-[#706F6F]">
        There are many variations of passages of available, but the
        majority have suffered
      </p>
      <p class="price text-[#403F3F] font-bold text-2xl">$999</p>
      <div class="card-actions">
        <button class="btn hover:text-black bg-[#0D6EFD] text-white" >
          Show Details
        </button>
      </div>
    </div>
  `;

    cardContainer.appendChild(cardDiv);
  });
};

getApiResponse("samsung");

const handleSearch = () => {
  let searchInputValue = searchInput.value;

  getApiResponse(searchInputValue);
};

const handleShowAll = () => {};
