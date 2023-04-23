const provincewiseDistrict = new Map<string, Array<string>>();

provincewiseDistrict.set("Province No.1", [
  "Bhojpur",
  "Dhankuta",
  "Ilam",
  "Jhapa",
  "Khotang",
  "Morang",
  "Okhaldhunga",
  "Panchthar",
  "Sankhuwasabha",
  "Solukhumbu",
  "Sunsari",
  "Taplejung",
  "Terhathum",
  "Udayapur",
]);
provincewiseDistrict.set("Madhesh Pradesh", [
  "Bara",
  "Dhanusa",
  "Mahottari",
  "Parsa",
  "Rautahat",
  "Saptari",
  "Sarlahi",
  "Siraha",
]);
provincewiseDistrict.set("Bagmati Pradesh", [
  "Kathmandu",
  "Bhaktapur",
  "Lalitpur",
  "Nuwakot",
  "Chitwan",
  "Dhading",
  "Dolakha",
  "Kavrepalanchok",
  "Makwanpur",
  "Ramechhap",
  "Rasuwa",
  "Sindhuli",
  "Sindhupalchok",
]);
provincewiseDistrict.set("Gandaki Pradesh", [
  "Baglung",
  "Gorkha",
  "Kaski",
  "Lamjung",
  "Manang",
  "Mustang",
  "Myagdi",
  "Nawalpur",
  "Parbat",
  "Syangja",
  "Tanahun",
]);
provincewiseDistrict.set("Lumbini Pradesh", [
  "Banke	",
  "Arghakhanchi",
  "Bardiya",
  "Dang",
  "Eastern Rukum",
  "Gulmi",
  "Kapilvastu",
  "Palpa",
  "Parasi",
  "Pyuthan",
  "Rolpa",
  "Rupandehi",
]);
provincewiseDistrict.set("Karnali Pradesh", [
  "Dailekh",
  "Dailekh",
  "Humla",
  "Jajarkot",
  "Jumla",
  "Kalikot",
  "Mugu",
  "Salyan",
  "Surkhet",
  "Western Rukum",
]);
provincewiseDistrict.set("Sudurpashchim Pradesh", [
  "Achham",
  "Baitadi",
  "Bajhang",
  "Bajura",
  "Dadeldhura",
  "Darchula",
  "Doti",
  "Kailali",
  "Kanchanpur",
]);

const country: string[] = [
  "India",
  "China",
  "USA/Canada",
  "Japan",
  "Korea",
  "Australia",
  "Germany",
  "Italy",
  "France",
];

const filter = (): any => {
  let province: string[] = new Array();
  let district: string[] = new Array();
  provincewiseDistrict.forEach((value, key) => {
    province.push(key);
    value.map((value) => {
      district.push(value);
    });
  });
  return { province, district };
};
const districtByProvince = (district: string): string[] | undefined => {
  return provincewiseDistrict.get(district);
};
const { province, district } = filter();

export {
  provincewiseDistrict,
  province as provinceList,
  district as districtList,
  districtByProvince,
  country as countryList,
};
