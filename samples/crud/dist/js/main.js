(function (virtualDom) {
'use strict';

var data = [
  {
    "code": "AF",
    "name": "Afghanistan"
  },
  {
    "code": "AX",
    "name": "Åland Islands"
  },
  {
    "code": "AL",
    "name": "Albania"
  },
  {
    "code": "DZ",
    "name": "Algeria"
  },
  {
    "code": "AS",
    "name": "American Samoa"
  },
  {
    "code": "AD",
    "name": "Andorra"
  },
  {
    "code": "AO",
    "name": "Angola"
  },
  {
    "code": "AI",
    "name": "Anguilla"
  },
  {
    "code": "AQ",
    "name": "Antarctica"
  },
  {
    "code": "AG",
    "name": "Antigua and Barbuda"
  },
  {
    "code": "AR",
    "name": "Argentina"
  },
  {
    "code": "AM",
    "name": "Armenia"
  },
  {
    "code": "AW",
    "name": "Aruba"
  },
  {
    "code": "AU",
    "name": "Australia"
  },
  {
    "code": "AT",
    "name": "Austria"
  },
  {
    "code": "AZ",
    "name": "Azerbaijan"
  },
  {
    "code": "BS",
    "name": "Bahamas"
  },
  {
    "code": "BH",
    "name": "Bahrain"
  },
  {
    "code": "BD",
    "name": "Bangladesh"
  },
  {
    "code": "BB",
    "name": "Barbados"
  },
  {
    "code": "BY",
    "name": "Belarus"
  },
  {
    "code": "BE",
    "name": "Belgium"
  },
  {
    "code": "BZ",
    "name": "Belize"
  },
  {
    "code": "BJ",
    "name": "Benin"
  },
  {
    "code": "BM",
    "name": "Bermuda"
  },
  {
    "code": "BT",
    "name": "Bhutan"
  },
  {
    "code": "BO",
    "name": "Bolivia, Plurinational State of"
  },
  {
    "code": "BQ",
    "name": "Bonaire, Sint Eustatius and Saba"
  },
  {
    "code": "BA",
    "name": "Bosnia and Herzegovina"
  },
  {
    "code": "BW",
    "name": "Botswana"
  },
  {
    "code": "BV",
    "name": "Bouvet Island"
  },
  {
    "code": "BR",
    "name": "Brazil"
  },
  {
    "code": "IO",
    "name": "British Indian Ocean Territory"
  },
  {
    "code": "BN",
    "name": "Brunei Darussalam"
  },
  {
    "code": "BG",
    "name": "Bulgaria"
  },
  {
    "code": "BF",
    "name": "Burkina Faso"
  },
  {
    "code": "BI",
    "name": "Burundi"
  },
  {
    "code": "KH",
    "name": "Cambodia"
  },
  {
    "code": "CM",
    "name": "Cameroon"
  },
  {
    "code": "CA",
    "name": "Canada"
  },
  {
    "code": "CV",
    "name": "Cape Verde"
  },
  {
    "code": "KY",
    "name": "Cayman Islands"
  },
  {
    "code": "CF",
    "name": "Central African Republic"
  },
  {
    "code": "TD",
    "name": "Chad"
  },
  {
    "code": "CL",
    "name": "Chile"
  },
  {
    "code": "CN",
    "name": "China"
  },
  {
    "code": "CX",
    "name": "Christmas Island"
  },
  {
    "code": "CC",
    "name": "Cocos (Keeling) Islands"
  },
  {
    "code": "CO",
    "name": "Colombia"
  },
  {
    "code": "KM",
    "name": "Comoros"
  },
  {
    "code": "CG",
    "name": "Congo"
  },
  {
    "code": "CD",
    "name": "Congo, the Democratic Republic of the"
  },
  {
    "code": "CK",
    "name": "Cook Islands"
  },
  {
    "code": "CR",
    "name": "Costa Rica"
  },
  {
    "code": "CI",
    "name": "Côte d'Ivoire"
  },
  {
    "code": "HR",
    "name": "Croatia"
  },
  {
    "code": "CU",
    "name": "Cuba"
  },
  {
    "code": "CW",
    "name": "Curaçao"
  },
  {
    "code": "CY",
    "name": "Cyprus"
  },
  {
    "code": "CZ",
    "name": "Czech Republic"
  },
  {
    "code": "DK",
    "name": "Denmark"
  },
  {
    "code": "DJ",
    "name": "Djibouti"
  },
  {
    "code": "DM",
    "name": "Dominica"
  },
  {
    "code": "DO",
    "name": "Dominican Republic"
  },
  {
    "code": "EC",
    "name": "Ecuador"
  },
  {
    "code": "EG",
    "name": "Egypt"
  },
  {
    "code": "SV",
    "name": "El Salvador"
  },
  {
    "code": "GQ",
    "name": "Equatorial Guinea"
  },
  {
    "code": "ER",
    "name": "Eritrea"
  },
  {
    "code": "EE",
    "name": "Estonia"
  },
  {
    "code": "ET",
    "name": "Ethiopia"
  },
  {
    "code": "FK",
    "name": "Falkland Islands (Malvinas)"
  },
  {
    "code": "FO",
    "name": "Faroe Islands"
  },
  {
    "code": "FJ",
    "name": "Fiji"
  },
  {
    "code": "FI",
    "name": "Finland"
  },
  {
    "code": "FR",
    "name": "France"
  },
  {
    "code": "GF",
    "name": "French Guiana"
  },
  {
    "code": "PF",
    "name": "French Polynesia"
  },
  {
    "code": "TF",
    "name": "French Southern Territories"
  },
  {
    "code": "GA",
    "name": "Gabon"
  },
  {
    "code": "GM",
    "name": "Gambia"
  },
  {
    "code": "GE",
    "name": "Georgia"
  },
  {
    "code": "DE",
    "name": "Germany"
  },
  {
    "code": "GH",
    "name": "Ghana"
  },
  {
    "code": "GI",
    "name": "Gibraltar"
  },
  {
    "code": "GR",
    "name": "Greece"
  },
  {
    "code": "GL",
    "name": "Greenland"
  },
  {
    "code": "GD",
    "name": "Grenada"
  },
  {
    "code": "GP",
    "name": "Guadeloupe"
  },
  {
    "code": "GU",
    "name": "Guam"
  },
  {
    "code": "GT",
    "name": "Guatemala"
  },
  {
    "code": "GG",
    "name": "Guernsey"
  },
  {
    "code": "GN",
    "name": "Guinea"
  },
  {
    "code": "GW",
    "name": "Guinea-Bissau"
  },
  {
    "code": "GY",
    "name": "Guyana"
  },
  {
    "code": "HT",
    "name": "Haiti"
  },
  {
    "code": "HM",
    "name": "Heard Island and McDonald Islands"
  },
  {
    "code": "VA",
    "name": "Holy See (Vatican City State)"
  },
  {
    "code": "HN",
    "name": "Honduras"
  },
  {
    "code": "HK",
    "name": "Hong Kong"
  },
  {
    "code": "HU",
    "name": "Hungary"
  },
  {
    "code": "IS",
    "name": "Iceland"
  },
  {
    "code": "IN",
    "name": "India"
  },
  {
    "code": "ID",
    "name": "Indonesia"
  },
  {
    "code": "IR",
    "name": "Iran, Islamic Republic of"
  },
  {
    "code": "IQ",
    "name": "Iraq"
  },
  {
    "code": "IE",
    "name": "Ireland"
  },
  {
    "code": "IM",
    "name": "Isle of Man"
  },
  {
    "code": "IL",
    "name": "Israel"
  },
  {
    "code": "IT",
    "name": "Italy"
  },
  {
    "code": "JM",
    "name": "Jamaica"
  },
  {
    "code": "JP",
    "name": "Japan"
  },
  {
    "code": "JE",
    "name": "Jersey"
  },
  {
    "code": "JO",
    "name": "Jordan"
  },
  {
    "code": "KZ",
    "name": "Kazakhstan"
  },
  {
    "code": "KE",
    "name": "Kenya"
  },
  {
    "code": "KI",
    "name": "Kiribati"
  },
  {
    "code": "KP",
    "name": "Korea, Democratic People's Republic of"
  },
  {
    "code": "KR",
    "name": "Korea, Republic of"
  },
  {
    "code": "KW",
    "name": "Kuwait"
  },
  {
    "code": "KG",
    "name": "Kyrgyzstan"
  },
  {
    "code": "LA",
    "name": "Lao People's Democratic Republic"
  },
  {
    "code": "LV",
    "name": "Latvia"
  },
  {
    "code": "LB",
    "name": "Lebanon"
  },
  {
    "code": "LS",
    "name": "Lesotho"
  },
  {
    "code": "LR",
    "name": "Liberia"
  },
  {
    "code": "LY",
    "name": "Libya"
  },
  {
    "code": "LI",
    "name": "Liechtenstein"
  },
  {
    "code": "LT",
    "name": "Lithuania"
  },
  {
    "code": "LU",
    "name": "Luxembourg"
  },
  {
    "code": "MO",
    "name": "Macao"
  },
  {
    "code": "MK",
    "name": "Macedonia, the Former Yugoslav Republic of"
  },
  {
    "code": "MG",
    "name": "Madagascar"
  },
  {
    "code": "MW",
    "name": "Malawi"
  },
  {
    "code": "MY",
    "name": "Malaysia"
  },
  {
    "code": "MV",
    "name": "Maldives"
  },
  {
    "code": "ML",
    "name": "Mali"
  },
  {
    "code": "MT",
    "name": "Malta"
  },
  {
    "code": "MH",
    "name": "Marshall Islands"
  },
  {
    "code": "MQ",
    "name": "Martinique"
  },
  {
    "code": "MR",
    "name": "Mauritania"
  },
  {
    "code": "MU",
    "name": "Mauritius"
  },
  {
    "code": "YT",
    "name": "Mayotte"
  },
  {
    "code": "MX",
    "name": "Mexico"
  },
  {
    "code": "FM",
    "name": "Micronesia, Federated States of"
  },
  {
    "code": "MD",
    "name": "Moldova, Republic of"
  },
  {
    "code": "MC",
    "name": "Monaco"
  },
  {
    "code": "MN",
    "name": "Mongolia"
  },
  {
    "code": "ME",
    "name": "Montenegro"
  },
  {
    "code": "MS",
    "name": "Montserrat"
  },
  {
    "code": "MA",
    "name": "Morocco"
  },
  {
    "code": "MZ",
    "name": "Mozambique"
  },
  {
    "code": "MM",
    "name": "Myanmar"
  },
  {
    "code": "NA",
    "name": "Namibia"
  },
  {
    "code": "NR",
    "name": "Nauru"
  },
  {
    "code": "NP",
    "name": "Nepal"
  },
  {
    "code": "NL",
    "name": "Netherlands"
  },
  {
    "code": "NC",
    "name": "New Caledonia"
  },
  {
    "code": "NZ",
    "name": "New Zealand"
  },
  {
    "code": "NI",
    "name": "Nicaragua"
  },
  {
    "code": "NE",
    "name": "Niger"
  },
  {
    "code": "NG",
    "name": "Nigeria"
  },
  {
    "code": "NU",
    "name": "Niue"
  },
  {
    "code": "NF",
    "name": "Norfolk Island"
  },
  {
    "code": "MP",
    "name": "Northern Mariana Islands"
  },
  {
    "code": "NO",
    "name": "Norway"
  },
  {
    "code": "OM",
    "name": "Oman"
  },
  {
    "code": "PK",
    "name": "Pakistan"
  },
  {
    "code": "PW",
    "name": "Palau"
  },
  {
    "code": "PS",
    "name": "Palestine, State of"
  },
  {
    "code": "PA",
    "name": "Panama"
  },
  {
    "code": "PG",
    "name": "Papua New Guinea"
  },
  {
    "code": "PY",
    "name": "Paraguay"
  },
  {
    "code": "PE",
    "name": "Peru"
  },
  {
    "code": "PH",
    "name": "Philippines"
  },
  {
    "code": "PN",
    "name": "Pitcairn"
  },
  {
    "code": "PL",
    "name": "Poland"
  },
  {
    "code": "PT",
    "name": "Portugal"
  },
  {
    "code": "PR",
    "name": "Puerto Rico"
  },
  {
    "code": "QA",
    "name": "Qatar"
  },
  {
    "code": "RE",
    "name": "Réunion"
  },
  {
    "code": "RO",
    "name": "Romania"
  },
  {
    "code": "RU",
    "name": "Russian Federation"
  },
  {
    "code": "RW",
    "name": "Rwanda"
  },
  {
    "code": "BL",
    "name": "Saint Barthélemy"
  },
  {
    "code": "SH",
    "name": "Saint Helena, Ascension and Tristan da Cunha"
  },
  {
    "code": "KN",
    "name": "Saint Kitts and Nevis"
  },
  {
    "code": "LC",
    "name": "Saint Lucia"
  },
  {
    "code": "MF",
    "name": "Saint Martin (French part)"
  },
  {
    "code": "PM",
    "name": "Saint Pierre and Miquelon"
  },
  {
    "code": "VC",
    "name": "Saint Vincent and the Grenadines"
  },
  {
    "code": "WS",
    "name": "Samoa"
  },
  {
    "code": "SM",
    "name": "San Marino"
  },
  {
    "code": "ST",
    "name": "Sao Tome and Principe"
  },
  {
    "code": "SA",
    "name": "Saudi Arabia"
  },
  {
    "code": "SN",
    "name": "Senegal"
  },
  {
    "code": "RS",
    "name": "Serbia"
  },
  {
    "code": "SC",
    "name": "Seychelles"
  },
  {
    "code": "SL",
    "name": "Sierra Leone"
  },
  {
    "code": "SG",
    "name": "Singapore"
  },
  {
    "code": "SX",
    "name": "Sint Maarten (Dutch part)"
  },
  {
    "code": "SK",
    "name": "Slovakia"
  },
  {
    "code": "SI",
    "name": "Slovenia"
  },
  {
    "code": "SB",
    "name": "Solomon Islands"
  },
  {
    "code": "SO",
    "name": "Somalia"
  },
  {
    "code": "ZA",
    "name": "South Africa"
  },
  {
    "code": "GS",
    "name": "South Georgia and the South Sandwich Islands"
  },
  {
    "code": "SS",
    "name": "South Sudan"
  },
  {
    "code": "ES",
    "name": "Spain"
  },
  {
    "code": "LK",
    "name": "Sri Lanka"
  },
  {
    "code": "SD",
    "name": "Sudan"
  },
  {
    "code": "SR",
    "name": "Suriname"
  },
  {
    "code": "SJ",
    "name": "Svalbard and Jan Mayen"
  },
  {
    "code": "SZ",
    "name": "Swaziland"
  },
  {
    "code": "SE",
    "name": "Sweden"
  },
  {
    "code": "CH",
    "name": "Switzerland"
  },
  {
    "code": "SY",
    "name": "Syrian Arab Republic"
  },
  {
    "code": "TW",
    "name": "Taiwan, Province of China"
  },
  {
    "code": "TJ",
    "name": "Tajikistan"
  },
  {
    "code": "TZ",
    "name": "Tanzania, United Republic of"
  },
  {
    "code": "TH",
    "name": "Thailand"
  },
  {
    "code": "TL",
    "name": "Timor-Leste"
  },
  {
    "code": "TG",
    "name": "Togo"
  },
  {
    "code": "TK",
    "name": "Tokelau"
  },
  {
    "code": "TO",
    "name": "Tonga"
  },
  {
    "code": "TT",
    "name": "Trinidad and Tobago"
  },
  {
    "code": "TN",
    "name": "Tunisia"
  },
  {
    "code": "TR",
    "name": "Turkey"
  },
  {
    "code": "TM",
    "name": "Turkmenistan"
  },
  {
    "code": "TC",
    "name": "Turks and Caicos Islands"
  },
  {
    "code": "TV",
    "name": "Tuvalu"
  },
  {
    "code": "UG",
    "name": "Uganda"
  },
  {
    "code": "UA",
    "name": "Ukraine"
  },
  {
    "code": "AE",
    "name": "United Arab Emirates"
  },
  {
    "code": "GB",
    "name": "United Kingdom"
  },
  {
    "code": "US",
    "name": "United States"
  },
  {
    "code": "UM",
    "name": "United States Minor Outlying Islands"
  },
  {
    "code": "UY",
    "name": "Uruguay"
  },
  {
    "code": "UZ",
    "name": "Uzbekistan"
  },
  {
    "code": "VU",
    "name": "Vanuatu"
  },
  {
    "code": "VE",
    "name": "Venezuela, Bolivarian Republic of"
  },
  {
    "code": "VN",
    "name": "Viet Nam"
  },
  {
    "code": "VG",
    "name": "Virgin Islands, British"
  },
  {
    "code": "VI",
    "name": "Virgin Islands, U.S."
  },
  {
    "code": "WF",
    "name": "Wallis and Futuna"
  },
  {
    "code": "EH",
    "name": "Western Sahara"
  },
  {
    "code": "YE",
    "name": "Yemen"
  },
  {
    "code": "ZM",
    "name": "Zambia"
  },
  {
    "code": "ZW",
    "name": "Zimbabwe"
  }
]
;

var data$1 = Object.freeze({
	default: data
});

var data$2 = ( data$1 && data ) || data$1;

'use strict';



/**
 * Precompute name and code lookups.
 */
var nameMap = {};
var codeMap = {};
data$2.forEach(function (country) {
  nameMap[country.name.toLowerCase()] = country.code;
  codeMap[country.code.toLowerCase()] = country.name;
});

var countryList = CountryList;
function CountryList () {
  if (!(this instanceof CountryList)) return new CountryList()
}

CountryList.prototype.getCode = function getCode (name) {
  return nameMap[name.toLowerCase()]
};

CountryList.prototype.getName = function getName (code) {
  return codeMap[code.toLowerCase()]
};

CountryList.prototype.getNames = function getNames () {
  return data$2.map(function (country) {
    return country.name
  })
};

CountryList.prototype.getCodes = function getCodes () {
  return data$2.map(function (country) {
    return country.code
  })
};

CountryList.prototype.getCodeList = function () {
  return codeMap
};

CountryList.prototype.getNameList = function () {
  return nameMap
};

CountryList.prototype.getData = function getData () {
  return data$2
};

const users = R.range(0, 16*4).map(function (idx) {
  return {
    id: idx + 1,
    name: chance.name(),
    age: '' + chance.age(),
    gender: chance.pick(['male', 'female']),
    nation: chance.pick(new countryList().getNames()),
    email: chance.email(),
  };
});

if (!sessionStorage.getItem('users')) {
  sessionStorage.setItem('users', JSON.stringify(users));
}


var userStore = {
  get list() {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(JSON.parse(sessionStorage.getItem('users')).reverse());
      }, 1000);
    });
  },
  fetchList({ page, pageSize }) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve({
          data: JSON.parse(sessionStorage.getItem('users')).reverse()
          .slice( (page - 1) * pageSize, page * pageSize ),
          totalCnt: users.length,
        });
      }, 300);
    });
  },
  get(id) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(R.find(it => it.id == id)(JSON.parse(sessionStorage.getItem('users'))));
      }, 300);
    });
  },
  save(obj) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        let users = JSON.parse(sessionStorage.getItem('users'));
        if (obj.id) {
          let target = R.find(it => it.id == obj.id)(users);
          Object.assign(target, obj);
          sessionStorage.setItem('users', JSON.stringify(users));
        } else {
          obj.id = users.length + 1;
          sessionStorage.setItem('users', JSON.stringify(users.concat(obj)));
        }
        resolve(obj);
      }, 300);
    });
  }
};

const router = new Navigo(null);

'use strict';
var _1_1_0_strictUriEncode = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};



var _1_1_0_strictUriEncode$2 = Object.freeze({
	default: _1_1_0_strictUriEncode,
	__moduleExports: _1_1_0_strictUriEncode
});

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var _4_1_1_objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};



var _4_1_1_objectAssign$2 = Object.freeze({
	default: _4_1_1_objectAssign,
	__moduleExports: _4_1_1_objectAssign
});

'use strict';
var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

var _0_2_0_decodeUriComponent = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};



var _0_2_0_decodeUriComponent$2 = Object.freeze({
	default: _0_2_0_decodeUriComponent,
	__moduleExports: _0_2_0_decodeUriComponent
});

var strictUriEncode = ( _1_1_0_strictUriEncode$2 && _1_1_0_strictUriEncode ) || _1_1_0_strictUriEncode$2;

var objectAssign = ( _4_1_1_objectAssign$2 && _4_1_1_objectAssign ) || _4_1_1_objectAssign$2;

var decodeComponent = ( _0_2_0_decodeUriComponent$2 && _0_2_0_decodeUriComponent ) || _0_2_0_decodeUriComponent$2;

'use strict';




function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

var extract = function (str) {
	var queryStart = str.indexOf('?');
	if (queryStart === -1) {
		return '';
	}
	return str.slice(queryStart + 1);
};

var parse = function (str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^[?#&]/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeComponent(val);

		formatter(decodeComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
};

var stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};

var _5_0_1_queryString = {
	extract: extract,
	parse: parse,
	stringify: stringify
};

const $$list = $$([]).tag('list');
const $$loading = $$('.loading');
const $$paginator = $$('');

const paginator = function ({ page, pageSize, totalCnt }) {
  return virtualDom.h('.paginator', R.range(1, Math.floor((totalCnt - 1) / pageSize) + 2).map(function (idx) {
    let href = '/users?page=' + idx + '&pageSize=16';
    return virtualDom.h('a.link' + (page == idx? '.active': ''), {
      href,
      onclick() {
        router.navigate(href);
        return false;
      }
    }, '' + idx);
  }));
};

var listApp = {
  get $$view() {
    return $$(function ([loading, list, paginator]) {
      return virtualDom.h('.list.app' + loading, [
        virtualDom.h('h2', [
          'list of users',
          virtualDom.h('a.new', {
            href: '/user' ,
          }, 'create user')
        ]),
        virtualDom.h('table.table', [
          virtualDom.h('thead', virtualDom.h('tr', [
            virtualDom.h('th', 'name'),
            virtualDom.h('th', 'age'),
            virtualDom.h('th', 'nation'),
            virtualDom.h('th', 'gender'),
            virtualDom.h('th', 'email'),
          ])),
          virtualDom.h('tbody', list.map(function ({ id, name, age, nation, gender, email }) {
            let href = '/user/' + id;
            return virtualDom.h('tr', [
              virtualDom.h('td', virtualDom.h('a', {
                href,
                onclick() {
                  router.navigate(href);
                  return false;
                }
              }, name)),
              virtualDom.h('td', age),
              virtualDom.h('td', nation),
              virtualDom.h('td', gender),
              virtualDom.h('td', email)
            ]);
          }))
        ]),
        paginator,
      ]);
    }, [$$loading, $$list, $$paginator])
    .tag('list-view');
  },
  onMount() {
    let { page=1, pageSize=16 } = _5_0_1_queryString.parse(location.search);
    $$loading.val('.loading');
    userStore.fetchList({ page, pageSize })
    .then(function ({ totalCnt, data }) {
      $$.update([
        [$$loading, ''],
        [$$list, data],
        [$$paginator, paginator({ page, pageSize, totalCnt })]
      ]);
    });
  }
};

var countryStore = {
  get list() {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(new countryList().getNames());
      }, 300);
    });
  }
};

const $$loading$1 = $$('.loading');
const $$obj = $$({});
const $$nations = $$([]);
const $$message = $$('');

const onsubmit = function onsubmit() {
  $$loading$1.val('.loading');
  let obj = $$obj.val();
  userStore.save(obj)
  .then(function () {
    $$.update([
      [$$loading$1, ''],
      [$$message, 'submit succeeded!'],
    ]);
    $$loading$1.val('');
    setTimeout(function () {
      $$message.val('');
    }, 2000);
    router.navigate('/user/' + obj.id);
  });
  return false;
};

var objectApp = {
  get $$view() {
    return $$(function ([loading, obj, nations, message]) {
      let { name, age, nation, gender, email } = obj;
      return virtualDom.h('.app' + loading, [
        virtualDom.h('h2', obj.id && 'editing user: ' + obj.name || 'creating user'),
        virtualDom.h('.message' + (message?  '': '.hidden'), message),
        virtualDom.h('form.form', {
          onsubmit,
        }, [
          virtualDom.h('.field', [
            virtualDom.h('label', 'Name'),
            virtualDom.h('input', {
              oninput() {
                $$obj.patch({ name: this.value });
              },
              value: name
            }),
          ]),
          virtualDom.h('.field', [
            virtualDom.h('label', 'Age'),
            virtualDom.h('input', {
              oninput() {
                $$obj.patch({ age: this.value });
              },
              value: age,
              type: 'number'
            })
          ]),
          virtualDom.h('.field', [
            virtualDom.h('input', {
              type: 'radio',
              name: 'gender',
              value: 'male',
              checked: {
                male: 'true'
              }[gender],
              onclick() {
                $$obj.patch({ gender: 'male' });
              }
            }),
            virtualDom.h('label', 'male'),
            virtualDom.h('input', {
              type: 'radio',
              name: 'gender',
              value: 'female',
              checked: {
                female: 'true'
              }[gender],
              onclick() {
                $$obj.patch({ gender: 'female' });
              }
            }),
            virtualDom.h('label', 'female'),
          ]),
          virtualDom.h('.field', [
            virtualDom.h('label', 'nation'),
            virtualDom.h('select', {
              onchange() {
                $$obj.patch({ nation: this.value });
              }
            }, [''].concat(nations).map(function (_nation) {
              return virtualDom.h('option', {
                value: _nation,
                selected: nation == _nation? 'true': ''
              }, _nation || '---');
            })),
          ]),
          virtualDom.h('.field', [
            virtualDom.h('label', 'email'),
            virtualDom.h('input', {
              type: 'email',
              oninput() {
                $$obj.patch({ email: this.value });
              },
              value: email,
            })
          ]),
          virtualDom.h('hr'),
          virtualDom.h('input', {
            type: 'submit',
            value: 'Submit',
          }),
          virtualDom.h('button', {
            onclick() {
              router.navigate('/users');
              return false;
            }
          }, 'back')
        ]),
      ]);
    }, [$$loading$1, $$obj, $$nations, $$message]);
  },
  init({ id }={}) {
    Promise.all([
      countryStore.list,
      id? userStore.get(id): Promise.resolve({})
    ])
    .then(function ([countries, obj]) {
      $$.update([
        [$$loading$1, ''],
        [$$nations, countries],
        [$$obj, obj],
      ]);
    });

  }
};

let mountMap = {};

let uniqueId = function () {
  let id = new Date().getTime();
  return function () {
    return '' + id++;
  };
}();

const mount = function mount($$view, container, opts) {
  let timestamp = $$view.val();
  let rootNode = virtualDom.create(timestamp);
  if (typeof container === 'string') {
    container = document.querySelector(container);
  }
  let mountId = container.getAttribute('data-mount-id');
  if (!mountId) {
    mountId = uniqueId();
    container.setAttribute('data-mount-id', mountId);
  } else {
    unmount(mountId);
  }
  container.innerHTML = '';
  container.appendChild(rootNode);
  let { onMount, onUpdated } = opts;
  let onChange = function onChange(vnode) {
    rootNode = virtualDom.patch(rootNode, virtualDom.diff(timestamp, vnode));
    timestamp = vnode;
    onUpdated && onUpdated.apply($$view, [rootNode]);
  };
  $$view.change(onChange);
  if (typeof onMount == 'function') {
    onMount.apply($$view, [rootNode]);
  }
  mountMap[mountId] = {
    container,
    $$view,
    onChange,
    onUnmount: opts.onUnmount,
  };
};

const unmount = function unmount(mountId) {
  // it should be unmounted only once after mounted
  if (mountMap[mountId]) {
    let { $$view, onChange, onUnmount, rootNode } = mountMap[mountId];
    $$view.offChange(onChange);
    typeof onUnmount === 'function' && onUnmount.apply(this, [rootNode]);
  }
};

router.on(function () {
  router.navigate('/users');
})
.on('/users', function () {
  mount(listApp.$$view, '.container', {
    onMount: listApp.onMount,
  });
})
.on('/user', function () {
  mount(objectApp.$$view, '.container', {
    onMount: function () {
      objectApp.init.apply(null);
    }
  });
})
.on('/user/:id', function (params) {
  mount(objectApp.$$view, '.container', {
    onMount: function () {
      objectApp.init.apply(null, [params]);
    }
  });
})
.resolve();

}(virtualDom));

//# sourceMappingURL=main.js.map
