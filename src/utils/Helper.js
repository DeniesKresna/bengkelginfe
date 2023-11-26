import moment, { max } from "moment";
import "moment-timezone";

export const convertPaginationFromApi = (data) => {
  let returnData = {};
  for (const key in data) {
    returnData[key.toLowerCase()] = data[key];
  }
  return returnData;
};

export const convertArrayDataFromApi = (datas, settings, additional = {}) => {
  let datasReturn = [];
  datas.forEach((elem) => {
    datasReturn.push(convertDataFromApi(elem, settings, additional));
  });
  return datasReturn;
};

export const convertDataFromApi = (data, settings, additional = {}) => {
  let dataReturn = {};
  for (const key in settings) {
    if (key == "Status") dataReturn[settings[key]] = STATUS[data[key]];
    else if (key == "CreatedAt" || key == "created_at")
      dataReturn[settings[key]] = moment(data[key])
        .utc()
        .format("DD/MM/YYYY HH:mm:ss");
    else if (key == "role_id") dataReturn[settings[key]] = ROLES[data[key]];
    else dataReturn[settings[key]] = data[key];
  }
  if (Object.keys(additional).length > 0) {
    dataReturn = { ...dataReturn, ...additional };
  }
  return dataReturn;
};

/* Ambil list object dari array of object sesuai kondisi field
  Contoh: arrayObject = [{id: 2, name:"andre"}, {id: 3, name:"boy"}, {id: 4, name:"cynthia"}]

  getArrayOfObjectFromArrayOfField(arrayObject, ["andre","boy"], "name")
  akan menghasilkan [{id: 2, name:"andre"}, {id: 3, name:"boy"}]

  kalo ga dikasih payload ke 3, otomatis akan ambil dari key "id". contoh
  getArrayOfObjectFromArrayOfField(arrayObject, [2,3], "name") akan menghasilkan
  akan menghasilkan [{id: 2, name:"andre"}, {id: 3, name:"boy"}]
*/
export const getArrayOfObjectFromArrayOfField = (
  arrayObject = [],
  arrayId = [],
  key = "id"
) => {
  let listObject = [];
  arrayObject.map((obj) => {
    if (arrayId.includes(obj[key])) {
      listObject.push(obj);
    }
  });
  return listObject;
};

export const convertApiDateToWebDate = (theDate = "") => {
  if (theDate != "" && theDate != null)
    return moment(theDate).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
  return "";
};

export const convertApiDateToWebDateWithoutTime = (theDate = "") => {
  if (theDate != "" && theDate != null)
    return moment(theDate).tz("Asia/Jakarta").format("YYYY-MM-DD");
  return "";
};

export const convertApiDateToHumanDate = (theDate = "") => {
  if (theDate != "" && theDate != null){
    moment.locale('id');
    return moment(theDate).tz("Asia/Jakarta").format("DD MMMM YYYY");
  }
  return "";
};

/*
  mengubah tanggal ke format YYYY-MM-DD HH:mm:ss
  jika tidak ada payload yang dikirim, akan mengembalikan tanggal sekarang
*/
export const convertToWebDate = (theDate = "") => {
  let jsDate = new Date();
  if (/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(theDate)) {
    jsDate = new Date(theDate);
  }
  return moment(jsDate).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
};

/*
  mengubah tanggal ke format yang dipakai oleh API
  gunakan ini untuk kirim tanggal ke backend
*/
export const convertToApiDate = (theDate) => {
  let jsDate = new Date(theDate);

  return moment(jsDate).tz("Asia/Jakarta").toISOString();
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const convertToWebDateMonthName = (theDate = "") => {
  const monthNames = months;
  let jsDate = new Date();
  if (!isVariableEmpty(theDate)) {
    jsDate = new Date(theDate);
  }
  return monthNames[jsDate.getMonth()] + ", " + jsDate.getFullYear();
};

/*
konversi format tanggal yang akan dikirim ke backend
*/

export const convertToComponentFormatDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
};

/*
  konversi string ke format angka
  contoh: 1000000 jadi 1.000.000
*/
export const convertMoneyNominalFormat = (value) => {
  return (value + "").replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

/* Convert gambar ke base64
  dibutuhkan biasanya oleh API untuk post gambar
  payload: url gambar (string)
  return base64 nya
*/
export const getBase64Image = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};

// export const getBase64Image = async (url) => {
//   try {
//     const response = await fetch(url);
//     const blob = await response.blob();
//     const reader = new FileReader();

//     return new Promise((resolve) => {
//       reader.onloadend = () => {
//         const base64data = reader.result;
//         resolve(base64data);
//       };
      
//       reader.readAsDataURL(blob);
//     });
//   } catch (error) {
//     console.error('Error fetching base64 image:', error);
//     throw new Error('Failed to get base64 image');
//   }
// };

/* Validasi resolusi dan ukuran gambar
  payload = e adalah event gambar
    ratio = string. contoh= "1:1" atau "500:200"
    maxsize = integer dalam kilobyte. contoh = 1048576

  return berupa objek response = {
    message: String,
    theImage: gambarnya,
    isOk: Boolean berhasil atau tidaknya validasi
  }
*/
export const validatePicture = (e, ratio, maxSize) => {
  return new Promise(function (resolve) {
    const reader = new FileReader();
    const picFile = e.target.files[0];
    reader.readAsDataURL(picFile);
    reader.onload = (e) => {
      const image = new Image();
      const theImage = e.target.result;
      image.src = e.target.result;
      image.onload = (e) => {
        let validationResponse = {
          theImage: null,
          isOk: false,
        };
        const height = e.target.height;
        const width = e.target.width;

        var ratioSisi = ratio.split(":");
        var resultDevideRatio =
          parseFloat(ratioSisi[0]) / parseFloat(ratioSisi[1]);
        if (width / height != resultDevideRatio) {
          validationResponse.message =
            "Maaf ratio gambar yang dipilih tidak " + ratio;
          resolve(validationResponse);
        }
        if (picFile.size > maxSize) {
          const maxSizeToMb = (maxSize / 1048576).toFixed(2);
          validationResponse.message =
            "Maaf ukuran maksimal " + maxSizeToMb + " mb";
          resolve(validationResponse);
        }
        validationResponse = {
          message: "Berhasil memilih gambar",
          theImage: theImage,
          isOk: true,
        };
        resolve(validationResponse);
      };
    };
  });
};

/* Ambil array of key dari array of object
  Contoh: obj = [{id: 2, name:"andre"}, {id: 3, name:"boy"}]

  getArrayOfObjectField(obj, "name") akan menghasilkan ["andre","boy"]

  kalo ga dikasih payload ke 2, otomatis akan ambil dari key "id". contoh
  getArrayOfObjectField(obj) akan menghasilkan [2,3]
*/
export const getArrayOfObjectField = (objArray = [], column = "id") => {
  let result = objArray.map((a) => a[column]);
  return result;
};

// Cek kalo objek nya kosong, return true/false
export const isObjectEmpty = (obj = {}) => {
  if (obj == null) {
    return true;
  }
  if (Object.keys(obj).length === 0 && obj.constructor === Object) {
    return true;
  }
  return false;
};

export const getObjectValue = (object, defaultValue = {}) => {
  if (typeof object === "undefined") {
    return defaultValue;
  }
  return object;
};

export const isVariableEmpty = (payload) => {
  switch (typeof payload) {
    case "string":
      if (payload === "") {
        return true;
      }
      break;
    case "number":
      if (payload === 0) {
        return true;
      }
      break;
    case "object":
      return isObjectEmpty(payload);
    case "undefined":
      return true;
    default:
      if (Array.isArray(payload)) {
        if (payload.length === 0) {
          return true;
        }
      }
      break;
  }
  return false;
};

export const formatCurrency = (number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
}

export const convertRawIntToRupiah = (rawInt) => {
  return "Rp" + rawInt.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const copyLinkToClipboard = () => {
  const dummyInput = document.createElement('input');
  dummyInput.value = window.location.href;
  document.body.appendChild(dummyInput);
  dummyInput.select();
  document.execCommand('copy');
  document.body.removeChild(dummyInput);
}

export const convertLayananDipilih = (value) =>{
  if (value === "recruitment") {
    return "Rekrut Expert";
  } else if (value === "invitation"){
    return "Undang Expert"
  }  else if (value === "consultation"){
    return "Konsultasi"
  }  else if (value === "training"){
    return "Pelatihan"
  }else {
    return "";
  }
}

export const convertExpertServices = (value) =>{
  if (value === "recruit-expert") {
    return "Rekrut Expert";
  } else if (value === "invite-expert"){
    return "Undang Expert"
  }  else if (value === "consultation"){
    return "Konsultasi"
  }  else if (value === "training"){
    return "Pelatihan"
  }else {
    return "";
  }
}

export const convertServiceStatus = (value)=>{
  if(value == "Belum dimulai"){
    return "Belum dimulai"
  } else if (value == "Sedang berjalan"){
    return "Sedang berjalan"
  } else if (value == "Selesai"){
    return "Selesai"
  }
}

export const convertPaymentStatus = (value) => {
  if (value == "Belum dibayar"){
    return "Belum dibayar"
  } else if (value == "Belum lunas"){
    return "Belum lunas"
  } else if (value == "Selesai"){
    return "Selesai"
  }
  return value
}

export function convertActiveToStatus(data, activeTemporary) {
  const { active, ...rest } = data
  const status = getStatusFromActive(active, activeTemporary)

  return {
    ...rest,
    active: status
  };
}

export function getStatusFromActive(active, activeTemporary) {
  const statusList = (activeTemporary === "STATUS_TEMPORARY") ? STATUS_TEMPORARY : STATUS
  if (active >= 0 && active < statusList.length) {
    return statusList[active]
  }
  return "Unknown"
}

export function capitalizeWord(input) {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function downloadFileFromBase64(base64String="", filename=""){
  if(base64String=="" || filename==""){
    return
  }
  // Convert base64 to binary
  var binaryString = atob(base64String);

  // Convert binary to ArrayBuffer
  var arrayBuffer = new ArrayBuffer(binaryString.length);
  var uint8Array = new Uint8Array(arrayBuffer);
  for (var i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
  }

  // Create a Blob from ArrayBuffer
  var blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Create a link element and trigger the download
  var link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename; // Specify the desired file name
  link.click();
}

const STATUS = ["Pending", "Unpublish", "Publish", "Ditolak"]
const STATUS_TEMPORARY = ["Pending", "Diterima", "Diterima", "Ditolak"]

export const ROLES = ["Public", "Administrator", "Pengguna", "Expert"]
