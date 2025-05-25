// register js

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const snapBtn = document.getElementById('snap');
const submitBtn = document.getElementById('submit');

// Access webcam
// navigator.mediaDevices.getUserMedia({ video: true })
//     .then(stream => { video.srcObject = stream; })
//     .catch(err => alert('Error accessing webcam: ' + err));
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    video.play();
  })
  .catch(error => {
    console.error("Error accessing webcam:", error);
  });
  
snapBtn.onclick = () => {
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/jpeg');
    photo.src = dataURL;
};

submitBtn.onclick = () => {
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const number = document.getElementById('number').value.trim();
    const gender = document.getElementById('gender').value.trim();
    const address = document.getElementById('address').value.trim();
    const postal = document.getElementById('postal-code').value.trim();
    const state = document.getElementById('state').value.trim();
    const city = document.getElementById('city').value.trim();
    const country = document.getElementById('country').value.trim();
    const college = document.getElementById('college').value.trim();
    const branch = document.getElementById('branch').value.trim();

    const image = photo.src;

    if (!name || !age || !number || !gender || !address || !state || !city || !country || !postal || !college || !branch) {
        alert('Please enter name and age.');
        return;
    }
    if (!image || image === '') {
        alert('Please take a picture first.');
        return;
    }

    fetch('/register_user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age, number, gender, address, state, city, country, postal, college, branch, image })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Registration successful!');
                window.location.href = '/recognize'; // redirect after register
            } else {
                alert('Registration failed: ' + data.message);
            }
        })
        .catch(err => alert('Error: ' + err));
};

// Code for handling form country
const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon",
    "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo",
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland",
    "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
    "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
    "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
    "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
    "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria",
    "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru",
    "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
    "Samoa", "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
    "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sudan", "Suriname",
    "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga",
    "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
    "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen",
    "Zambia", "Zimbabwe"
];
const countrySelect = document.getElementById("country");
countries.forEach(country => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    countrySelect.appendChild(option);
});
// code for handling form state

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry"
];


const stateSelect = document.getElementById('state');

states.forEach(state => {
  const option = document.createElement('option');
  option.value = state;
  option.textContent = state;
  stateSelect.appendChild(option);
});


// handling user information academic details

const colleges = [
  "B.C.E. BAKHTIYARPUR",
  "B.C.E. BHAGALPUR",
  "B.P.M.C.E. MADHEPURA",
  "CIPET:IPT, BIHTA, PATNA",
  "COLLEGE OF AGRICULTURAL",
  "D.C.E. DARBHANGA",
  "DR. APJ ABDUL KALAM WOMENS INST. OF TECH.",
  "G.C.E. GAYA",
  "GOVT ENGG COLLEGE W. CHAMPARAN",
  "GOVT ENGG. COLLEGE SHEOHAR",
  "GOVT. ENGG. COLLEGE OF LAKHISARAI",
  "GOVT. ENGG. COLLEGE OF SAMASTIPUR",
  "GOVT. ENGG. COLLEGE, ARWAL",
  "GOVT. ENGG. COLLEGE, AURANGABAD",
  "GOVT. ENGG. COLLEGE, BANKA",
  "GOVT. ENGG. COLLEGE, BHOJPUR",
  "GOVT. ENGG. COLLEGE, BUXAR",
  "GOVT. ENGG. COLLEGE, GOPALGANJ",
  "GOVT. ENGG. COLLEGE, JAMUI",
  "GOVT. ENGG. COLLEGE, JEHANABAD",
  "GOVT. ENGG. COLLEGE, KAIMUR",
  "GOVT. ENGG. COLLEGE, KHAGARIA",
  "GOVT. ENGG. COLLEGE, MADHUBANI",
  "GOVT. ENGG. COLLEGE, NAWADA",
  "GOVT. ENGG. COLLEGE, SHEIKHPURA",
  "GOVT. ENGG. COLLEGE, SIWAN",
  "GOVT. ENGG. COLLEGE, VAISHALI",
  "GOVT. ENGG.COLLEGE MUNGER",
  "GOVT.ENGG. COLLEGE KISHANGANJ",
  "K.C.E., KATIHAR",
  "L.N.J.P.I.T. TECHNOLOGY. CHAPRA",
  "M..C.E. MOTIHARI",
  "M.I.T. MUZAFFARPUR",
  "NALANDA COLLEGE. OF ENGG,CHANDI",
  "PURNEA COLLEGE OF ENGG.",
  "R.R.D.C.E. BEGUSARAI",
  "S.C.E SASARAM",
  "S.G.I.D.T. PATNA",
  "S.I.T. SITAMARHI",
  "SAHARSA COLLEGE OF ENGG.",
  "SHRI PHANISHWAR NATH RENU ENGG. COLLEGE,",
  "SUPAUL ENGG. COLLEGE, SUPAUL"
];

const collegeBranchMap = {
  "B.C.E. BAKHTIYARPUR": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "COMPUTER SCIENCE & ENGG (INTERNET OF THINGS)", "ELECTRICAL & ELECTRONICS ENGINEERING", "FIRE TECHNOLOGY & SAFETY", "MECHANICAL ENGINEERING"],
  "B.C.E. BHAGALPUR": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "ELECTRICAL ENGINEERING", "ELECTRO & COMMUNICATION ENGINEERING", "MECHANICAL ENGINEERING"],
  "B.P.M.C.E. MADHEPURA": ["3-D ANIMATION & GRAPHICS", "CIVIL ENGG WITH COMPUTER APPLICATION", "CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "COMPUTER SCIENCE & ENGG (ARTIFICAL INTELLIGENCE &", "ELECTRICAL & ELECTRONICS ENGINEERING", "MECHANICAL ENGINEERING"],
  "CIPET:IPT, BIHTA, PATNA": ["CHEMICAL ENGINEERING (PLASTIC AND POLYMER)", "MECHANICAL ENGINEERING", "PETROCHEMICAL ENGINEERING", "WASTE MANAGEMENT"],
  "COLLEGE OF AGRICULTURAL": ["AGRICULTURE ENGINEERING"],
  "D.C.E. DARBHANGA": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "COMPUTER SCIENCE & ENGG (CYBER SECURITY)", "ELECTRICAL & ELECTRONICS ENGINEERING", "FIRE TECHNOLOGY & SAFETY", "MECHANICAL ENGINEERING"],
  "DR. APJ ABDUL KALAM WOMENS INST. OF TECH.": ["BIOINFORMATICS (BI)", "I.T."],
  "G.C.E. GAYA": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "ELECTRICAL & ELECTRONICS ENGINEERING", "MECHANICAL ENGINEERING"],
  "GOVT ENGG COLLEGE W. CHAMPARAN": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "COMPUTER SCIENCE & ENGG (CYBER SECURITY)", "ELECTRICAL ENGINEERING", "ELECTRO & COMMUNICATION ENGINEERING", "ELECTRONICS ENGG. (VLSI DESIGN & TECHNOLOGY)", "MECHANICAL ENGINEERING"],
  "GOVT ENGG. COLLEGE SHEOHAR": ["CIVIL ENGG WITH COMPUTER APPLICATION", "CIVIL ENGINEERING", "COMPUTER SCIENCE & ENGG (DATA SCIENCE)", "ELECTRICAL ENGINEERING", "ELECTRO & COMMUNICATION ENGINEERING", "MECHANICAL ENGINEERING"],
  "GOVT. ENGG. COLLEGE OF LAKHISARAI": ["CIVIL ENGINEERING", "COMPUTER SCIENCE & ENGG (ARTIFICAL INTELLIGENCE)", "COMPUTER SCIENCE & ENGG (DATA SCIENCE)", "ELECTRICAL ENGINEERING", "MECHANICAL ENGINEERING"],
  "GOVT. ENGG. COLLEGE OF SAMASTIPUR": ["CIVIL ENGINEERING", "COMPUTER SCIENCE & ENGG (ARTIFICAL INTELLIGENCE &", "COMPUTER SCIENCE & ENGG (CYBER SECURITY)", "ELECTRICAL ENGINEERING", "ELECTRO & COMMUNICATION ENGINEERING", "MECHANICAL ENGINEERING"],
  "GOVT. ENGG. COLLEGE, ARWAL": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "COMPUTER SCIENCE & ENGG (DATA SCIENCE)", "ELECTRICAL ENGINEERING", "MECHANICAL ENGINEERING", "ROBOTICS AND AUTOMATION"],
  "GOVT. ENGG. COLLEGE, AURANGABAD": ["ARTIFICIAL INTELLIGENCE & MACHINE LEARNING", "CIVIL ENGINEERING", "COMPUTER SC AND ENGG (DATA SCIENCE)", "ELECTRICAL ENGINEERING", "ELECTRO & COMMUNICATION ENGINEERING", "MECHANICAL ENGINEERING"],
  "GOVT. ENGG. COLLEGE, BANKA": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "COMPUTER SCIENCE & ENGG (INTERNET OF THINGS)", "ELECTRICAL ENGINEERING", "ELECTRO & COMMUNICATION ENGINEERING", "MECHANICAL ENGINEERING"],
  "GOVT. ENGG. COLLEGE, BHOJPUR": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "ELECTRICAL ENGINEERING", "ELECTRO & COMMUNICATION ENGINEERING", "INSTRUMENTATION ENGINEERING", "MECHANICAL ENGINEERING"],
  "GOVT. ENGG. COLLEGE, BUXAR": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "ELECTRICAL ENGINEERING", "ELECTRO & COMMUNICATION ENGINEERING", "MECHANICAL ENGINEERING"],
  "GOVT. ENGG. COLLEGE, GOPALGANJ": ["AERONAUTICAL ENGG", "CIVIL ENGINEERING", "COMPUTER SCIENCE & ENGG (ARTIFICAL INTELLIGENCE)", "COMPUTER SCIENCE & ENGG (INTERNET OF THINGS & CYBER", "ELECTRICAL ENGINEERING", "ELECTRONICS ENGG. (VLSI DESIGN & TECHNOLOGY)", "MECHANICAL ENGINEERING"],
  "GOVT. ENGG. COLLEGE, JAMUI": ["CIVIL ENGINEERING", "COMPUTER SCIENCE & ENGG (ARTIFICAL INTELLIGENCE &", "COMPUTER SCIENCE & ENGG (DATA SCIENCE)", "COMPUTER SCIENCE & ENGG (INTERNET OF THINGS)", "ELECTRICAL ENGINEERING", "ELECTRO & COMMUNICATION ENGINEERING", "MECHANICAL ENGINEERING"],
  "GOVT. ENGG. COLLEGE, JEHANABAD": ["CIVIL ENGINEERING", "COMPUTER SCIENCE & ENGG (CYBER SECURITY)", "ELECTRICAL ENGINEERING", "ELECTRO & COMMUNICATION ENGINEERING", "MECHANICAL ENGINEERING"],
  "GOVT. ENGG. COLLEGE, KAIMUR": ["CIVIL ENGINEERING", "COMPUTER SCIENCE & ENGG (CYBER SECURITY)", "COMPUTER SCIENCE & ENGG (NETWORKS)", "ELECTRICAL ENGINEERING", "ELECTRO & COMMUNICATION ENGINEERING", "MECHANICAL ENGINEERING"],
  "GOVT. ENGG. COLLEGE, KHAGARIA": ["CIVIL ENGINEERING", "COMPUTER SCIENCE & ENGG (ARTIFICAL INTELLIGENCE &", "COMPUTER SCIENCE & ENGG (INTERNET OF THINGS)", "ELECTRICAL ENGINEERING", "MECHANICAL ENGINEERING"],
  "GOVT. ENGG. COLLEGE, MADHUBANI": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "COMPUTER SCIENCE & ENGG (INTERNET OF THINGS)", "ELECTRICAL ENGINEERING", "MECHANICAL ENGINEERING"],
  "GOVT. ENGG. COLLEGE, NAWADA": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "ELECTRICAL ENGINEERING", "ELECTRO & COMMUNICATION ENGINEERING", "MECHANICAL ENGINEERING"],
  "GOVT. ENGG. COLLEGE, SHEIKHPURA": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "ELECTRICAL ENGINEERING", "ELECTRO & COMMUNICATION ENGINEERING", "MECHANICAL ENGINEERING", "MECHATRONICS ENGG"],
  "GOVT. ENGG. COLLEGE, SIWAN": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "COMPUTER SCIENCE & ENGG (INTERNET OF THINGS)", "ELECTRICAL ENGINEERING", "ELECTRONICS ENGG. (VLSI DESIGN & TECHNOLOGY)", "MECHANICAL ENGINEERING"],
  "GOVT. ENGG. COLLEGE, VAISHALI": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "COMPUTER SCIENCE & ENGG (INTERNET OF THINGS)", "ELECTRICAL ENGINEERING", "ELECTRO & COMMUNICATION ENGINEERING", "ELECTRO AND COMMUNICATION ENGINEERING (ACT)", "MECHANICAL ENGINEERING"],
  "GOVT. ENGG.COLLEGE MUNGER": ["CIVIL ENGINEERING", "COMPUTER SCIENCE & ENGG (ARTIFICAL INTELLIGENCE)", "COMPUTER SCIENCE & ENGG (DATA SCIENCE)", "ELECTRICAL ENGINEERING", "MECHANICAL ENGINEERING"],
  "GOVT.ENGG. COLLEGE KISHANGANJ": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "COMPUTER SCIENCE & ENGG (ARTIFICAL INTELLIGENCE &", "ELECTRICAL ENGINEERING", "ELECTRO & COMMUNICATION ENGINEERING", "MECHANICAL ENGINEERING"],
  "K.C.E., KATIHAR": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "ELECTRICAL & ELECTRONICS ENGINEERING", "ELECTRONICS ENGG. (VLSI DESIGN & TECHNOLOGY)", "FOOD PROCESSING & PRESERVATION", "MECHANICAL AND SMART MANUFACTURING", "MECHANICAL ENGINEERING"],
  "L.N.J.P.I.T. TECHNOLOGY. CHAPRA": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "ELECTRICAL & ELECTRONICS ENGINEERING", "FOOD PROCESSING & PRESERVATION", "MECHANICAL ENGINEERING"],
  "M..C.E. MOTIHARI": ["CIVIL ENGG WITH COMPUTER APPLICATION", "CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "COMPUTER SCIENCE & ENGG (ARTIFICAL INTELLIGENCE)", "ELECTRICAL & ELECTRONICS ENGINEERING", "MECHANICAL ENGINEERING"],
  "M.I.T. MUZAFFARPUR": ["BIOMEDICAL ROBOTIC ENGG", "CHEMICAL TECHNOLOGY (LEATHER TECH)", "CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "ELECTRICAL ENGINEERING", "ELECTRO & COMMUNICATION ENGINEERING", "I.T.", "MECHANICAL ENGINEERING"],
  "NALANDA COLLEGE. OF ENGG,CHANDI": ["AERONAUTICAL ENGG", "ARTIFICIAL INTELLIGENCE & MACHINE LEARNING", "CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "ELECTRICAL & ELECTRONICS ENGINEERING", "MECHANICAL ENGINEERING"],
  "PURNEA COLLEGE OF ENGG.": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "COMPUTER SCIENCE & ENGG (ARTIFICAL INTELLIGENCE)", "ELECTRICAL ENGINEERING", "ELECTRO & COMMUNICATION ENGINEERING", "MECHANICAL ENGINEERING", "MECHATRONICS ENGG"],
  "R.R.D.C.E. BEGUSARAI": ["CHEMICAL ENGG", "CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "COMPUTER SCIENCE & ENGG (DATA SCIENCE)", "ELECTRICAL & ELECTRONICS ENGINEERING", "MECHANICAL ENGINEERING"],
  "S.C.E SASARAM": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "ELECTRICAL & ELECTRONICS ENGINEERING", "ELECTRONICS ENGG. (VLSI DESIGN & TECHNOLOGY)", "MECHANICAL ENGINEERING", "MINING ENGG"],
  "S.G.I.D.T. PATNA": ["DAIRY TECH (OPEN)", "DAIRY TECH NRI", "DAIRY TECH SELF FINANCE"],
  "S.I.T. SITAMARHI": ["CIVIL ENGG WITH COMPUTER APPLICATION", "CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "COMPUTER SCIENCE & ENGG (ARTIFICAL INTELLIGENCE &", "ELECTRICAL ENGINEERING", "MECHANICAL ENGINEERING"],
  "SAHARSA COLLEGE OF ENGG.": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "COMPUTER SCIENCE & ENGG (DATA SCIENCE)", "ELECTRICAL ENGINEERING", "ELECTRO & COMMUNICATION ENGINEERING", "MECHANICAL ENGINEERING"],
  "SHRI PHANISHWAR NATH RENU ENGG. COLLEGE,": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "ELECTRICAL ENGINEERING", "ELECTRO & COMMUNICATION ENGINEERING", "MECHANICAL ENGINEERING", "MECHATRONICS ENGG"],
  "SUPAUL ENGG. COLLEGE, SUPAUL": ["CIVIL ENGINEERING", "COMPUTER SC. & ENGINEERING", "COMPUTER SCIENCE & ENGG (ARTIFICAL INTELLIGENCE)", "ELECTRICAL ENGINEERING", "ELECTRO & COMMUNICATION ENGINEERING", "MECHANICAL ENGINEERING"],
};

  const collegeSelect = document.getElementById('college');
  const branchSelect = document.getElementById('branch');

  // Populate college dropdown
  colleges.forEach(college => {
    const option = document.createElement('option');
    option.value = college;
    option.textContent = college;
    collegeSelect.appendChild(option);
  });

  // Update branches based on selected college
  collegeSelect.addEventListener('change', () => {
    const selectedCollege = collegeSelect.value;
    branchSelect.innerHTML = '<option value="">Select Branch</option>';
    if (collegeBranchMap[selectedCollege]) {
      collegeBranchMap[selectedCollege].forEach(branch => {
        const option = document.createElement('option');
        option.value = branch;
        option.textContent = branch;
        branchSelect.appendChild(option);
      });
    }
  });