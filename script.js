const cardContainer = document.getElementById("card-container");
const searchInput = document.getElementById("search-input");
const showAllBtn = document.getElementById("showall-btn");
const modalContainer = document.getElementById("my_modal_5");

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
    let phone_slug = phone.slug;

    // console.log(typeof phone_slug);
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
        <button onclick='handleShowDetails("${phone_slug}")' class="btn hover:text-black bg-[#0D6EFD] text-white" >
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

const handleShowAll = () => {
  console.log("handle show is not shown in video");
};

const handleShowDetails = async (id) => {
  const responseText = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const responseData = await responseText.json();
  const phoneDetails = responseData.data;

  modalContainer.innerHTML = `<div class="modal-box">
  <div class="flex justify-center">
    <img src="${phoneDetails.image}" alt="" />
  </div>
  <h3 class="font-bold text-xl">${phoneDetails.name}</h3>
  <p class="py-4">
    It is a long established fact that a reader will be distracted by
    the readable content of a page when looking at its layout.
  </p>

  <div class="phone-info">
    <p>
      <span class="text-lg font-bold">Storage: </span> ${phoneDetails.mainFeatures.storage}
    </p>
    <p>
      <span class="text-lg font-bold">Display Size :</span> : ${phoneDetails.mainFeatures.displaySize}
    </p>
    <p>
      <span class="text-lg font-bold">Chipset :</span> : ${phoneDetails.mainFeatures.chipSet}
    </p>
    <p>
      <span class="text-lg font-bold">Memory :</span> : ${phoneDetails.mainFeatures.memory}
    </p>
    <p>
      <span class="text-lg font-bold">Slug :</span> :
      ${phoneDetails.slug}
    </p>
    <p>
      <span class="text-lg font-bold">Release date :</span> :  ${phoneDetails.releaseDate}
    </p>
    <p><span class="text-lg font-bold">Brand : </span>  ${phoneDetails.brand}</p>
    <p>
      <span class="text-lg font-bold">GPS :</span>  ${phoneDetails.others.GPS}
    </p>
    <p>
      <span class="text-lg font-bold">WLAN :</span>  ${phoneDetails.others.WLAN}
    </p>
    <p>
      <span class="text-lg font-bold">Bluetooth :</span>  ${phoneDetails.others.Bluetooth}
    </p>
    <p>
      <span class="text-lg font-bold">NFC :</span>  ${phoneDetails.others.NFC}
    </p>
    <p>
      <span class="text-lg font-bold">Radio :</span>  ${phoneDetails.others.Radio}
    </p>
    <p>
      <span class="text-lg font-bold">USB :</span>  ${phoneDetails.others.USB}
    </p>
  </div>
  <div class="modal-action">
    <form method="dialog">
   
      <button class="btn bg-[#DC3545] text-white hover:text-black">
        Close
      </button>
    </form>
  </div>
</div>`;
  console.log(phoneDetails);
  my_modal_5.showModal();
};
