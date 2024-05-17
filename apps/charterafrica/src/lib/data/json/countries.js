const countries = [
  {
    name: "Afghanistan",
    label: {
      pt: "Afeganistão",
      en: "Afghanistan",
      fr: "Afghanistan",
    },
    value: "Afghanistan",
    continent: "Asia",
  },
  {
    name: "Albania",
    label: {
      pt: "Albânia",
      en: "Albania",
      fr: "Albanie",
    },
    value: "Albania",
    continent: "Europe",
  },
  {
    name: "Algeria",
    label: {
      pt: "Argélia",
      en: "Algeria",
      fr: "Algérie",
    },
    value: "Algeria",
    continent: "Africa",
  },
  {
    name: "Andorra",
    label: {
      pt: "Andorra",
      en: "Andorra",
      fr: "Andorre",
    },
    value: "Andorra",
    continent: "Europe",
  },
  {
    name: "Angola",
    label: {
      pt: "Angola",
      en: "Angola",
      fr: "Angola",
    },
    value: "Angola",
    continent: "Africa",
  },
  {
    name: "Antigua and Barbuda",
    label: {
      pt: "Antígua e Barbuda",
      en: "Antigua and Barbuda",
      fr: "Antigua-et-Barbuda",
    },
    value: "Antigua and Barbuda",
    continent: "North America",
  },
  {
    name: "Argentina",
    label: {
      pt: "Argentina",
      en: "Argentina",
      fr: "Argentine",
    },
    value: "Argentina",
    continent: "South America",
  },
  {
    name: "Armenia",
    label: {
      pt: "Armênia",
      en: "Armenia",
      fr: "Arménie",
    },
    value: "Armenia",
    continent: "Asia",
  },
  {
    name: "Australia",
    label: {
      pt: "Austrália",
      en: "Australia",
      fr: "Australie",
    },
    value: "Australia",
    continent: "Oceania",
  },
  {
    name: "Austria",
    label: {
      pt: "Áustria",
      en: "Austria",
      fr: "Autriche",
    },
    value: "Austria",
    continent: "Europe",
  },
  {
    name: "Azerbaijan",
    label: {
      pt: "Azerbaijão",
      en: "Azerbaijan",
      fr: "Azerbaïdjan",
    },
    value: "Azerbaijan",
    continent: "Asia",
  },
  {
    name: "Bahamas",
    label: {
      pt: "Bahamas",
      en: "Bahamas",
      fr: "Bahamas",
    },
    value: "Bahamas",
    continent: "North America",
  },
  {
    name: "Bahrain",
    label: {
      pt: "Bahrein",
      en: "Bahrain",
      fr: "Bahreïn",
    },
    value: "Bahrain",
    continent: "Asia",
  },
  {
    name: "Bangladesh",
    label: {
      pt: "Bangladesh",
      en: "Bangladesh",
      fr: "Bangladesh",
    },
    value: "Bangladesh",
    continent: "Asia",
  },
  {
    name: "Barbados",
    label: {
      pt: "Barbados",
      en: "Barbados",
      fr: "Barbade",
    },
    value: "Barbados",
    continent: "North America",
  },
  {
    name: "Belarus",
    label: {
      pt: "Belarus",
      en: "Belarus",
      fr: "Biélorussie",
    },
    value: "Belarus",
    continent: "Europe",
  },
  {
    name: "Belgium",
    label: {
      pt: "Bélgica",
      en: "Belgium",
      fr: "Belgique",
    },
    value: "Belgium",
    continent: "Europe",
  },
  {
    name: "Belize",
    label: {
      pt: "Belize",
      en: "Belize",
      fr: "Belize",
    },
    value: "Belize",
    continent: "North America",
  },
  {
    name: "Benin",
    label: {
      pt: "Benin",
      en: "Benin",
      fr: "Bénin",
    },
    value: "Benin",
    continent: "Africa",
  },
  {
    name: "Bhutan",
    label: {
      pt: "Butão",
      en: "Bhutan",
      fr: "Bhoutan",
    },
    value: "Bhutan",
    continent: "Asia",
  },
  {
    name: "Bolivia",
    label: {
      pt: "Bolívia",
      en: "Bolivia",
      fr: "Bolivie",
    },
    value: "Bolivia",
    continent: "South America",
  },
  {
    name: "Bosnia and Herzegovina",
    label: {
      pt: "Bósnia e Herzegovina",
      en: "Bosnia and Herzegovina",
      fr: "Bosnie-Herzégovine",
    },
    value: "Bosnia and Herzegovina",
    continent: "Europe",
  },
  {
    name: "Botswana",
    label: {
      pt: "Botsuana",
      en: "Botswana",
      fr: "Botswana",
    },
    value: "Botswana",
    continent: "Africa",
  },
  {
    name: "Brazil",
    label: {
      pt: "Brasil",
      en: "Brazil",
      fr: "Brésil",
    },
    value: "Brazil",
    continent: "South America",
  },
  {
    name: "Brunei",
    label: {
      pt: "Brunei",
      en: "Brunei",
      fr: "Brunéi",
    },
    value: "Brunei",
    continent: "Asia",
  },
  {
    name: "Bulgaria",
    label: {
      pt: "Bulgária",
      en: "Bulgaria",
      fr: "Bulgarie",
    },
    value: "Bulgaria",
    continent: "Europe",
  },
  {
    name: "Burkina Faso",
    label: {
      pt: "Burquina Faso",
      en: "Burkina Faso",
      fr: "Burkina Faso",
    },
    value: "Burkina Faso",
    continent: "Africa",
  },
  {
    name: "Burundi",
    label: {
      pt: "Burundi",
      en: "Burundi",
      fr: "Burundi",
    },
    value: "Burundi",
    continent: "Africa",
  },
  {
    name: "Cabo Verde",
    label: {
      pt: "Cabo Verde",
      en: "Cabo Verde",
      fr: "Cap-Vert",
    },
    value: "Cabo Verde",
    continent: "Africa",
  },
  {
    name: "Cambodia",
    label: {
      pt: "Camboja",
      en: "Cambodia",
      fr: "Cambodge",
    },
    value: "Cambodia",
    continent: "Asia",
  },
  {
    name: "Cameroon",
    label: {
      pt: "Camarões",
      en: "Cameroon",
      fr: "Cameroun",
    },
    value: "Cameroon",
    continent: "Africa",
  },
  {
    name: "Canada",
    label: {
      pt: "Canadá",
      en: "Canada",
      fr: "Canada",
    },
    value: "Canada",
    continent: "North America",
  },
  {
    name: "Central African Republic",
    label: {
      pt: "República Centro-Africana",
      en: "Central African Republic",
      fr: "République centrafricaine",
    },
    value: "Central African Republic",
    continent: "Africa",
  },
  {
    name: "Chad",
    label: {
      pt: "Chade",
      en: "Chad",
      fr: "Tchad",
    },
    value: "Chad",
    continent: "Africa",
  },
  {
    name: "Chile",
    label: {
      pt: "Chile",
      en: "Chile",
      fr: "Chili",
    },
    value: "Chile",
    continent: "South America",
  },
  {
    name: "China",
    label: {
      pt: "China",
      en: "China",
      fr: "Chine",
    },
    value: "China",
    continent: "Asia",
  },
  {
    name: "Colombia",
    label: {
      pt: "Colômbia",
      en: "Colombia",
      fr: "Colombie",
    },
    value: "Colombia",
    continent: "South America",
  },
  {
    name: "Comoros",
    label: {
      pt: "Comores",
      en: "Comoros",
      fr: "Comores",
    },
    value: "Comoros",
    continent: "Africa",
  },
  {
    name: "Congo (Brazzaville)",
    label: {
      pt: "Congo (Brazzaville)",
      en: "Congo (Brazzaville)",
      fr: "Congo (Brazzaville)",
    },
    value: "Congo (Brazzaville)",
    continent: "Africa",
  },
  {
    name: "Congo (Kinshasa)",
    label: {
      pt: "Congo (Kinshasa)",
      en: "Congo (Kinshasa)",
      fr: "Congo (Kinshasa)",
    },
    value: "Congo (Kinshasa)",
    continent: "Africa",
  },
  {
    name: "Costa Rica",
    label: {
      pt: "Costa Rica",
      en: "Costa Rica",
      fr: "Costa Rica",
    },
    value: "Costa Rica",
    continent: "North America",
  },
  {
    name: "Croatia",
    label: {
      pt: "Croácia",
      en: "Croatia",
      fr: "Croatie",
    },
    value: "Croatia",
    continent: "Europe",
  },
  {
    name: "Cuba",
    label: {
      pt: "Cuba",
      en: "Cuba",
      fr: "Cuba",
    },
    value: "Cuba",
    continent: "North America",
  },
  {
    name: "Cyprus",
    label: {
      pt: "Chipre",
      en: "Cyprus",
      fr: "Chypre",
    },
    value: "Cyprus",
    continent: "Asia",
  },
  {
    name: "Czech Republic",
    label: {
      pt: "República Tcheca",
      en: "Czech Republic",
      fr: "République tchèque",
    },
    value: "Czech Republic",
    continent: "Europe",
  },
  {
    name: "Côte d'Ivoire",
    label: {
      pt: "Costa do Marfim",
      en: "Côte d'Ivoire",
      fr: "Côte d'Ivoire",
    },
    value: "Côte d'Ivoire",
    continent: "Africa",
  },
  {
    name: "Denmark",
    label: {
      pt: "Dinamarca",
      en: "Denmark",
      fr: "Danemark",
    },
    value: "Denmark",
    continent: "Europe",
  },
  {
    name: "Djibouti",
    label: {
      pt: "Djibuti",
      en: "Djibouti",
      fr: "Djibouti",
    },
    value: "Djibouti",
    continent: "Africa",
  },
  {
    name: "Dominica",
    label: {
      pt: "Dominica",
      en: "Dominica",
      fr: "Dominique",
    },
    value: "Dominica",
    continent: "North America",
  },
  {
    name: "Dominican Republic",
    label: {
      pt: "República Dominicana",
      en: "Dominican Republic",
      fr: "République dominicaine",
    },
    value: "Dominican Republic",
    continent: "North America",
  },
  {
    name: "Ecuador",
    label: {
      pt: "Equador",
      en: "Ecuador",
      fr: "Équateur",
    },
    value: "Ecuador",
    continent: "South America",
  },
  {
    name: "Egypt",
    label: {
      pt: "Egito",
      en: "Egypt",
      fr: "Égypte",
    },
    value: "Egypt",
    continent: "Africa",
  },
  {
    name: "El Salvador",
    label: {
      pt: "El Salvador",
      en: "El Salvador",
      fr: "El Salvador",
    },
    value: "El Salvador",
    continent: "North America",
  },
  {
    name: "Equatorial Guinea",
    label: {
      pt: "Guiné Equatorial",
      en: "Equatorial Guinea",
      fr: "Guinée équatoriale",
    },
    value: "Equatorial Guinea",
    continent: "Africa",
  },
  {
    name: "Eritrea",
    label: {
      pt: "Eritreia",
      en: "Eritrea",
      fr: "Érythrée",
    },
    value: "Eritrea",
    continent: "Africa",
  },
  {
    name: "Estonia",
    label: {
      pt: "Estônia",
      en: "Estonia",
      fr: "Estonie",
    },
    value: "Estonia",
    continent: "Europe",
  },
  {
    name: "Eswatini",
    label: {
      pt: "Eswatini",
      en: "Eswatini",
      fr: "Eswatini",
    },
    value: "Eswatini",
    continent: "Africa",
  },
  {
    name: "Ethiopia",
    label: {
      pt: "Etiópia",
      en: "Ethiopia",
      fr: "Éthiopie",
    },
    value: "Ethiopia",
    continent: "Africa",
  },
  {
    name: "Fiji",
    label: {
      pt: "Fiji",
      en: "Fiji",
      fr: "Fidji",
    },
    value: "Fiji",
    continent: "Oceania",
  },
  {
    name: "Finland",
    label: {
      pt: "Finlândia",
      en: "Finland",
      fr: "Finlande",
    },
    value: "Finland",
    continent: "Europe",
  },
  {
    name: "France",
    label: {
      pt: "França",
      en: "France",
      fr: "France",
    },
    value: "France",
    continent: "Europe",
  },
  {
    name: "Gabon",
    label: {
      pt: "Gabão",
      en: "Gabon",
      fr: "Gabon",
    },
    value: "Gabon",
    continent: "Africa",
  },
  {
    name: "Gambia",
    label: {
      pt: "Gâmbia",
      en: "Gambia",
      fr: "Gambie",
    },
    value: "Gambia",
    continent: "Africa",
  },
  {
    name: "Georgia",
    label: {
      pt: "Geórgia",
      en: "Georgia",
      fr: "Géorgie",
    },
    value: "Georgia",
    continent: "Asia",
  },
  {
    name: "Germany",
    label: {
      pt: "Alemanha",
      en: "Germany",
      fr: "Allemagne",
    },
    value: "Germany",
    continent: "Europe",
  },
  {
    name: "Ghana",
    label: {
      pt: "Gana",
      en: "Ghana",
      fr: "Ghana",
    },
    value: "Ghana",
    continent: "Africa",
  },
  {
    name: "Greece",
    label: {
      pt: "Grécia",
      en: "Greece",
      fr: "Grèce",
    },
    value: "Greece",
    continent: "Europe",
  },
  {
    name: "Grenada",
    label: {
      pt: "Granada",
      en: "Grenada",
      fr: "Grenade",
    },
    value: "Grenada",
    continent: "North America",
  },
  {
    name: "Guatemala",
    label: {
      pt: "Guatemala",
      en: "Guatemala",
      fr: "Guatemala",
    },
    value: "Guatemala",
    continent: "North America",
  },
  {
    name: "Guinea",
    label: {
      pt: "Guiné",
      en: "Guinea",
      fr: "Guinée",
    },
    value: "Guinea",
    continent: "Africa",
  },
  {
    name: "Guinea-Bissau",
    label: {
      pt: "Guiné-Bissau",
      en: "Guinea-Bissau",
      fr: "Guinée-Bissau",
    },
    value: "Guinea-Bissau",
    continent: "Africa",
  },
  {
    name: "Guyana",
    label: {
      pt: "Guiana",
      en: "Guyana",
      fr: "Guyana",
    },
    value: "Guyana",
    continent: "South America",
  },
  {
    name: "Haiti",
    label: {
      pt: "Haiti",
      en: "Haiti",
      fr: "Haïti",
    },
    value: "Haiti",
    continent: "North America",
  },
  {
    name: "Honduras",
    label: {
      pt: "Honduras",
      en: "Honduras",
      fr: "Honduras",
    },
    value: "Honduras",
    continent: "North America",
  },
  {
    name: "Hungary",
    label: {
      pt: "Hungria",
      en: "Hungary",
      fr: "Hongrie",
    },
    value: "Hungary",
    continent: "Europe",
  },
  {
    name: "Iceland",
    label: {
      pt: "Islândia",
      en: "Iceland",
      fr: "Islande",
    },
    value: "Iceland",
    continent: "Europe",
  },
  {
    name: "India",
    label: {
      pt: "Índia",
      en: "India",
      fr: "Inde",
    },
    value: "India",
    continent: "Asia",
  },
  {
    name: "Indonesia",
    label: {
      pt: "Indonésia",
      en: "Indonesia",
      fr: "Indonésie",
    },
    value: "Indonesia",
    continent: "Asia",
  },
  {
    name: "Iran",
    label: {
      pt: "Irã",
      en: "Iran",
      fr: "Iran",
    },
    value: "Iran",
    continent: "Asia",
  },
  {
    name: "Iraq",
    label: {
      pt: "Iraque",
      en: "Iraq",
      fr: "Irak",
    },
    value: "Iraq",
    continent: "Asia",
  },
  {
    name: "Ireland",
    label: {
      pt: "Irlanda",
      en: "Ireland",
      fr: "Irlande",
    },
    value: "Ireland",
    continent: "Europe",
  },
  {
    name: "Israel",
    label: {
      pt: "Israel",
      en: "Israel",
      fr: "Israël",
    },
    value: "Israel",
    continent: "Asia",
  },
  {
    name: "Italy",
    label: {
      pt: "Itália",
      en: "Italy",
      fr: "Italie",
    },
    value: "Italy",
    continent: "Europe",
  },
  {
    name: "Jamaica",
    label: {
      pt: "Jamaica",
      en: "Jamaica",
      fr: "Jamaïque",
    },
    value: "Jamaica",
    continent: "North America",
  },
  {
    name: "Japan",
    label: {
      pt: "Japão",
      en: "Japan",
      fr: "Japon",
    },
    value: "Japan",
    continent: "Asia",
  },
  {
    name: "Jordan",
    label: {
      pt: "Jordânia",
      en: "Jordan",
      fr: "Jordanie",
    },
    value: "Jordan",
    continent: "Asia",
  },
  {
    name: "Kazakhstan",
    label: {
      pt: "Cazaquistão",
      en: "Kazakhstan",
      fr: "Kazakhstan",
    },
    value: "Kazakhstan",
    continent: "Asia",
  },
  {
    name: "Kenya",
    label: {
      pt: "Quênia",
      en: "Kenya",
      fr: "Kenya",
    },
    value: "Kenya",
    continent: "Africa",
  },
  {
    name: "Kiribati",
    label: {
      pt: "Kiribati",
      en: "Kiribati",
      fr: "Kiribati",
    },
    value: "Kiribati",
    continent: "Oceania",
  },
  {
    name: "Kuwait",
    label: {
      pt: "Kuwait",
      en: "Kuwait",
      fr: "Koweït",
    },
    value: "Kuwait",
    continent: "Asia",
  },
  {
    name: "Kyrgyzstan",
    label: {
      pt: "Quirguistão",
      en: "Kyrgyzstan",
      fr: "Kirghizistan",
    },
    value: "Kyrgyzstan",
    continent: "Asia",
  },
  {
    name: "Laos",
    label: {
      pt: "Laos",
      en: "Laos",
      fr: "Laos",
    },
    value: "Laos",
    continent: "Asia",
  },
  {
    name: "Latvia",
    label: {
      pt: "Letônia",
      en: "Latvia",
      fr: "Lettonie",
    },
    value: "Latvia",
    continent: "Europe",
  },
  {
    name: "Lebanon",
    label: {
      pt: "Líbano",
      en: "Lebanon",
      fr: "Liban",
    },
    value: "Lebanon",
    continent: "Asia",
  },
  {
    name: "Lesotho",
    label: {
      pt: "Lesoto",
      en: "Lesotho",
      fr: "Lesotho",
    },
    value: "Lesotho",
    continent: "Africa",
  },
  {
    name: "Liberia",
    label: {
      pt: "Libéria",
      en: "Liberia",
      fr: "Libéria",
    },
    value: "Liberia",
    continent: "Africa",
  },
  {
    name: "Libya",
    label: {
      pt: "Líbia",
      en: "Libya",
      fr: "Libye",
    },
    value: "Libya",
    continent: "Africa",
  },
  {
    name: "Liechtenstein",
    label: {
      pt: "Liechtenstein",
      en: "Liechtenstein",
      fr: "Liechtenstein",
    },
    value: "Liechtenstein",
    continent: "Europe",
  },
  {
    name: "Lithuania",
    label: {
      pt: "Lituânia",
      en: "Lithuania",
      fr: "Lituanie",
    },
    value: "Lithuania",
    continent: "Europe",
  },
  {
    name: "Luxembourg",
    label: {
      pt: "Luxemburgo",
      en: "Luxembourg",
      fr: "Luxembourg",
    },
    value: "Luxembourg",
    continent: "Europe",
  },
  {
    name: "Madagascar",
    label: {
      pt: "Madagáscar",
      en: "Madagascar",
      fr: "Madagascar",
    },
    value: "Madagascar",
    continent: "Africa",
  },
  {
    name: "Malawi",
    label: {
      pt: "Malawi",
      en: "Malawi",
      fr: "Malawi",
    },
    value: "Malawi",
    continent: "Africa",
  },
  {
    name: "Malaysia",
    label: {
      pt: "Malásia",
      en: "Malaysia",
      fr: "Malaisie",
    },
    value: "Malaysia",
    continent: "Asia",
  },
  {
    name: "Maldives",
    label: {
      pt: "Maldivas",
      en: "Maldives",
      fr: "Maldives",
    },
    value: "Maldives",
    continent: "Asia",
  },
  {
    name: "Mali",
    label: {
      pt: "Mali",
      en: "Mali",
      fr: "Mali",
    },
    value: "Mali",
    continent: "Africa",
  },
  {
    name: "Malta",
    label: {
      pt: "Malta",
      en: "Malta",
      fr: "Malte",
    },
    value: "Malta",
    continent: "Europe",
  },
  {
    name: "Marshall Islands",
    label: {
      pt: "Ilhas Marshall",
      en: "Marshall Islands",
      fr: "Îles Marshall",
    },
    value: "Marshall Islands",
    continent: "Oceania",
  },
  {
    name: "Mauritania",
    label: {
      pt: "Mauritânia",
      en: "Mauritania",
      fr: "Mauritanie",
    },
    value: "Mauritania",
    continent: "Africa",
  },
  {
    name: "Mauritius",
    label: {
      pt: "Maurício",
      en: "Mauritius",
      fr: "Maurice",
    },
    value: "Mauritius",
    continent: "Africa",
  },
  {
    name: "Mexico",
    label: {
      pt: "México",
      en: "Mexico",
      fr: "Mexique",
    },
    value: "Mexico",
    continent: "North America",
  },
  {
    name: "Micronesia",
    label: {
      pt: "Micronésia",
      en: "Micronesia",
      fr: "Micronésie",
    },
    value: "Micronesia",
    continent: "Oceania",
  },
  {
    name: "Moldova",
    label: {
      pt: "Moldávia",
      en: "Moldova",
      fr: "Moldavie",
    },
    value: "Moldova",
    continent: "Europe",
  },
  {
    name: "Monaco",
    label: {
      pt: "Mônaco",
      en: "Monaco",
      fr: "Monaco",
    },
    value: "Monaco",
    continent: "Europe",
  },
  {
    name: "Mongolia",
    label: {
      pt: "Mongólia",
      en: "Mongolia",
      fr: "Mongolie",
    },
    value: "Mongolia",
    continent: "Asia",
  },
  {
    name: "Montenegro",
    label: {
      pt: "Montenegro",
      en: "Montenegro",
      fr: "Monténégro",
    },
    value: "Montenegro",
    continent: "Europe",
  },
  {
    name: "Morocco",
    label: {
      pt: "Marrocos",
      en: "Morocco",
      fr: "Maroc",
    },
    value: "Morocco",
    continent: "Africa",
  },
  {
    name: "Mozambique",
    label: {
      pt: "Moçambique",
      en: "Mozambique",
      fr: "Mozambique",
    },
    value: "Mozambique",
    continent: "Africa",
  },
  {
    name: "Myanmar",
    label: {
      pt: "Myanmar",
      en: "Myanmar",
      fr: "Myanmar",
    },
    value: "Myanmar",
    continent: "Asia",
  },
  {
    name: "Namibia",
    label: {
      pt: "Namíbia",
      en: "Namibia",
      fr: "Namibie",
    },
    value: "Namibia",
    continent: "Africa",
  },
  {
    name: "Nauru",
    label: {
      pt: "Nauru",
      en: "Nauru",
      fr: "Nauru",
    },
    value: "Nauru",
    continent: "Oceania",
  },
  {
    name: "Nepal",
    label: {
      pt: "Nepal",
      en: "Nepal",
      fr: "Népal",
    },
    value: "Nepal",
    continent: "Asia",
  },
  {
    name: "Netherlands",
    label: {
      pt: "Países Baixos",
      en: "Netherlands",
      fr: "Pays-Bas",
    },
    value: "Netherlands",
    continent: "Europe",
  },
  {
    name: "New Zealand",
    label: {
      pt: "Nova Zelândia",
      en: "New Zealand",
      fr: "Nouvelle-Zélande",
    },
    value: "New Zealand",
    continent: "Oceania",
  },
  {
    name: "Nicaragua",
    label: {
      pt: "Nicarágua",
      en: "Nicaragua",
      fr: "Nicaragua",
    },
    value: "Nicaragua",
    continent: "North America",
  },
  {
    name: "Niger",
    label: {
      pt: "Níger",
      en: "Niger",
      fr: "Niger",
    },
    value: "Niger",
    continent: "Africa",
  },
  {
    name: "Nigeria",
    label: {
      pt: "Nigéria",
      en: "Nigeria",
      fr: "Nigeria",
    },
    value: "Nigeria",
    continent: "Africa",
  },
  {
    name: "North Korea",
    label: {
      pt: "Coreia do Norte",
      en: "North Korea",
      fr: "Corée du Nord",
    },
    value: "North Korea",
    continent: "Asia",
  },
  {
    name: "North Macedonia",
    label: {
      pt: "Macedônia do Norte",
      en: "North Macedonia",
      fr: "Macédoine du Nord",
    },
    value: "North Macedonia",
    continent: "Europe",
  },
  {
    name: "Norway",
    label: {
      pt: "Noruega",
      en: "Norway",
      fr: "Norvège",
    },
    value: "Norway",
    continent: "Europe",
  },
  {
    name: "Oman",
    label: {
      pt: "Omã",
      en: "Oman",
      fr: "Oman",
    },
    value: "Oman",
    continent: "Asia",
  },
  {
    name: "Pakistan",
    label: {
      pt: "Paquistão",
      en: "Pakistan",
      fr: "Pakistan",
    },
    value: "Pakistan",
    continent: "Asia",
  },
  {
    name: "Palau",
    label: {
      pt: "Palau",
      en: "Palau",
      fr: "Palaos",
    },
    value: "Palau",
    continent: "Oceania",
  },
  {
    name: "Panama",
    label: {
      pt: "Panamá",
      en: "Panama",
      fr: "Panama",
    },
    value: "Panama",
    continent: "North America",
  },
  {
    name: "Papua New Guinea",
    label: {
      pt: "Papua-Nova Guiné",
      en: "Papua New Guinea",
      fr: "Papouasie-Nouvelle-Guinée",
    },
    value: "Papua New Guinea",
    continent: "Oceania",
  },
  {
    name: "Paraguay",
    label: {
      pt: "Paraguai",
      en: "Paraguay",
      fr: "Paraguay",
    },
    value: "Paraguay",
    continent: "South America",
  },
  {
    name: "Peru",
    label: {
      pt: "Peru",
      en: "Peru",
      fr: "Pérou",
    },
    value: "Peru",
    continent: "South America",
  },
  {
    name: "Philippines",
    label: {
      pt: "Filipinas",
      en: "Philippines",
      fr: "Philippines",
    },
    value: "Philippines",
    continent: "Asia",
  },
  {
    name: "Poland",
    label: {
      pt: "Polônia",
      en: "Poland",
      fr: "Pologne",
    },
    value: "Poland",
    continent: "Europe",
  },
  {
    name: "Portugal",
    label: {
      pt: "Portugal",
      en: "Portugal",
      fr: "Portugal",
    },
    value: "Portugal",
    continent: "Europe",
  },
  {
    name: "Qatar",
    label: {
      pt: "Catar",
      en: "Qatar",
      fr: "Qatar",
    },
    value: "Qatar",
    continent: "Asia",
  },
  {
    name: "Republic of the Congo",
    label: {
      pt: "República do Congo",
      en: "Republic of the Congo",
      fr: "République du Congo",
    },
    value: "Republic of the Congo",
    continent: "Africa",
  },
  {
    name: "Romania",
    label: {
      pt: "Romênia",
      en: "Romania",
      fr: "Roumanie",
    },
    value: "Romania",
    continent: "Europe",
  },
  {
    name: "Russia",
    label: {
      pt: "Rússia",
      en: "Russia",
      fr: "Russie",
    },
    value: "Russia",
    continent: "Europe",
  },
  {
    name: "Rwanda",
    label: {
      pt: "Ruanda",
      en: "Rwanda",
      fr: "Rwanda",
    },
    value: "Rwanda",
    continent: "Africa",
  },
  {
    name: "Saint Kitts and Nevis",
    label: {
      pt: "São Cristóvão e Nevis",
      en: "Saint Kitts and Nevis",
      fr: "Saint-Christophe-et-Niévès",
    },
    value: "Saint Kitts and Nevis",
    continent: "North America",
  },
  {
    name: "Saint Lucia",
    label: {
      pt: "Santa Lúcia",
      en: "Saint Lucia",
      fr: "Sainte-Lucie",
    },
    value: "Saint Lucia",
    continent: "North America",
  },
  {
    name: "Saint Vincent and the Grenadines",
    label: {
      pt: "São Vicente e Granadinas",
      en: "Saint Vincent and the Grenadines",
      fr: "Saint-Vincent-et-les Grenadines",
    },
    value: "Saint Vincent and the Grenadines",
    continent: "North America",
  },
  {
    name: "Samoa",
    label: {
      pt: "Samoa",
      en: "Samoa",
      fr: "Samoa",
    },
    value: "Samoa",
    continent: "Oceania",
  },
  {
    name: "San Marino",
    label: {
      pt: "San Marino",
      en: "San Marino",
      fr: "Saint-Marin",
    },
    value: "San Marino",
    continent: "Europe",
  },
  {
    name: "Sao Tome and Principe",
    label: {
      pt: "São Tomé e Príncipe",
      en: "Sao Tome and Principe",
      fr: "Sao Tomé-et-Principe",
    },
    value: "Sao Tome and Principe",
    continent: "Africa",
  },
  {
    name: "Saudi Arabia",
    label: {
      pt: "Arábia Saudita",
      en: "Saudi Arabia",
      fr: "Arabie saoudite",
    },
    value: "Saudi Arabia",
    continent: "Asia",
  },
  {
    name: "Senegal",
    label: {
      pt: "Senegal",
      en: "Senegal",
      fr: "Sénégal",
    },
    value: "Senegal",
    continent: "Africa",
  },
  {
    name: "Serbia",
    label: {
      pt: "Sérvia",
      en: "Serbia",
      fr: "Serbie",
    },
    value: "Serbia",
    continent: "Europe",
  },
  {
    name: "Seychelles",
    label: {
      pt: "Seychelles",
      en: "Seychelles",
      fr: "Seychelles",
    },
    value: "Seychelles",
    continent: "Africa",
  },
  {
    name: "Sierra Leone",
    label: {
      pt: "Serra Leoa",
      en: "Sierra Leone",
      fr: "Sierra Leone",
    },
    value: "Sierra Leone",
    continent: "Africa",
  },
  {
    name: "Singapore",
    label: {
      pt: "Singapura",
      en: "Singapore",
      fr: "Singapour",
    },
    value: "Singapore",
    continent: "Asia",
  },
  {
    name: "Slovakia",
    label: {
      pt: "Eslováquia",
      en: "Slovakia",
      fr: "Slovaquie",
    },
    value: "Slovakia",
    continent: "Europe",
  },
  {
    name: "Slovenia",
    label: {
      pt: "Eslovênia",
      en: "Slovenia",
      fr: "Slovénie",
    },
    value: "Slovenia",
    continent: "Europe",
  },
  {
    name: "Solomon Islands",
    label: {
      pt: "Ilhas Salomão",
      en: "Solomon Islands",
      fr: "Îles Salomon",
    },
    value: "Solomon Islands",
    continent: "Oceania",
  },
  {
    name: "Somalia",
    label: {
      pt: "Somália",
      en: "Somalia",
      fr: "Somalie",
    },
    value: "Somalia",
    continent: "Africa",
  },
  {
    name: "South Africa",
    label: {
      pt: "África do Sul",
      en: "South Africa",
      fr: "Afrique du Sud",
    },
    value: "South Africa",
    continent: "Africa",
  },
  {
    name: "South Korea",
    label: {
      pt: "Coreia do Sul",
      en: "South Korea",
      fr: "Corée du Sud",
    },
    value: "South Korea",
    continent: "Asia",
  },
  {
    name: "South Sudan",
    label: {
      pt: "Sudão do Sul",
      en: "South Sudan",
      fr: "Soudan du Sud",
    },
    value: "South Sudan",
    continent: "Africa",
  },
  {
    name: "Spain",
    label: {
      pt: "Espanha",
      en: "Spain",
      fr: "Espagne",
    },
    value: "Spain",
    continent: "Europe",
  },
  {
    name: "Sri Lanka",
    label: {
      pt: "Sri Lanka",
      en: "Sri Lanka",
      fr: "Sri Lanka",
    },
    value: "Sri Lanka",
    continent: "Asia",
  },
  {
    name: "Sudan",
    label: {
      pt: "Sudão",
      en: "Sudan",
      fr: "Soudan",
    },
    value: "Sudan",
    continent: "Africa",
  },
  {
    name: "Suriname",
    label: {
      pt: "Suriname",
      en: "Suriname",
      fr: "Suriname",
    },
    value: "Suriname",
    continent: "South America",
  },
  {
    name: "Sweden",
    label: {
      pt: "Suécia",
      en: "Sweden",
      fr: "Suède",
    },
    value: "Sweden",
    continent: "Europe",
  },
  {
    name: "Switzerland",
    label: {
      pt: "Suíça",
      en: "Switzerland",
      fr: "Suisse",
    },
    value: "Switzerland",
    continent: "Europe",
  },
  {
    name: "Syria",
    label: {
      pt: "Síria",
      en: "Syria",
      fr: "Syrie",
    },
    value: "Syria",
    continent: "Asia",
  },
  {
    name: "Taiwan",
    label: {
      pt: "Taiwan",
      en: "Taiwan",
      fr: "Taïwan",
    },
    value: "Taiwan",
    continent: "Asia",
  },
  {
    name: "Tajikistan",
    label: {
      pt: "Tajiquistão",
      en: "Tajikistan",
      fr: "Tadjikistan",
    },
    value: "Tajikistan",
    continent: "Asia",
  },
  {
    name: "Tanzania",
    label: {
      pt: "Tanzânia",
      en: "Tanzania",
      fr: "Tanzanie",
    },
    value: "Tanzania",
    continent: "Africa",
  },
  {
    name: "Thailand",
    label: {
      pt: "Tailândia",
      en: "Thailand",
      fr: "Thaïlande",
    },
    value: "Thailand",
    continent: "Asia",
  },
  {
    name: "Timor-Leste",
    label: {
      pt: "Timor-Leste",
      en: "Timor-Leste",
      fr: "Timor oriental",
    },
    value: "Timor-Leste",
    continent: "Asia",
  },
  {
    name: "Togo",
    label: {
      pt: "Togo",
      en: "Togo",
      fr: "Togo",
    },
    value: "Togo",
    continent: "Africa",
  },
  {
    name: "Tonga",
    label: {
      pt: "Tonga",
      en: "Tonga",
      fr: "Tonga",
    },
    value: "Tonga",
    continent: "Oceania",
  },
  {
    name: "Trinidad and Tobago",
    label: {
      pt: "Trinidad e Tobago",
      en: "Trinidad and Tobago",
      fr: "Trinidad-et-Tobago",
    },
    value: "Trinidad and Tobago",
    continent: "North America",
  },
  {
    name: "Tunisia",
    label: {
      pt: "Tunísia",
      en: "Tunisia",
      fr: "Tunisie",
    },
    value: "Tunisia",
    continent: "Africa",
  },
  {
    name: "Turkey",
    label: {
      pt: "Turquia",
      en: "Turkey",
      fr: "Turquie",
    },
    value: "Turkey",
    continent: "Asia",
  },
  {
    name: "Turkmenistan",
    label: {
      pt: "Turcomenistão",
      en: "Turkmenistan",
      fr: "Turkménistan",
    },
    value: "Turkmenistan",
    continent: "Asia",
  },
  {
    name: "Tuvalu",
    label: {
      pt: "Tuvalu",
      en: "Tuvalu",
      fr: "Tuvalu",
    },
    value: "Tuvalu",
    continent: "Oceania",
  },
  {
    name: "Uganda",
    label: {
      pt: "Uganda",
      en: "Uganda",
      fr: "Ouganda",
    },
    value: "Uganda",
    continent: "Africa",
  },
  {
    name: "Ukraine",
    label: {
      pt: "Ucrânia",
      en: "Ukraine",
      fr: "Ukraine",
    },
    value: "Ukraine",
    continent: "Europe",
  },
  {
    name: "United Arab Emirates",
    label: {
      pt: "Emirados Árabes Unidos",
      en: "United Arab Emirates",
      fr: "Émirats arabes unis",
    },
    value: "United Arab Emirates",
    continent: "Asia",
  },
  {
    name: "United Kingdom",
    label: {
      pt: "Reino Unido",
      en: "United Kingdom",
      fr: "Royaume-Uni",
    },
    value: "United Kingdom",
    continent: "Europe",
  },
  {
    name: "United States",
    label: {
      pt: "Estados Unidos",
      en: "United States",
      fr: "États-Unis",
    },
    value: "United States",
    continent: "North America",
  },
  {
    name: "Uruguay",
    label: {
      pt: "Uruguai",
      en: "Uruguay",
      fr: "Uruguay",
    },
    value: "Uruguay",
    continent: "South America",
  },
  {
    name: "Uzbekistan",
    label: {
      pt: "Uzbequistão",
      en: "Uzbekistan",
      fr: "Ouzbékistan",
    },
    value: "Uzbekistan",
    continent: "Asia",
  },
  {
    name: "Vanuatu",
    label: {
      pt: "Vanuatu",
      en: "Vanuatu",
      fr: "Vanuatu",
    },
    value: "Vanuatu",
    continent: "Oceania",
  },
  {
    name: "Vatican City",
    label: {
      pt: "Cidade do Vaticano",
      en: "Vatican City",
      fr: "Cité du Vatican",
    },
    value: "Vatican City",
    continent: "Europe",
  },
  {
    name: "Venezuela",
    label: {
      pt: "Venezuela",
      en: "Venezuela",
      fr: "Venezuela",
    },
    value: "Venezuela",
    continent: "South America",
  },
  {
    name: "Vietnam",
    label: {
      pt: "Vietnã",
      en: "Vietnam",
      fr: "Viêt Nam",
    },
    value: "Vietnam",
    continent: "Asia",
  },
  {
    name: "Yemen",
    label: {
      pt: "Iêmen",
      en: "Yemen",
      fr: "Yémen",
    },
    value: "Yemen",
    continent: "Asia",
  },
  {
    name: "Zambia",
    label: {
      pt: "Zâmbia",
      en: "Zambia",
      fr: "Zambie",
    },
    value: "Zambia",
    continent: "Africa",
  },
  {
    name: "Zimbabwe",
    label: {
      pt: "Zimbábue",
      en: "Zimbabwe",
      fr: "Zimbabwe",
    },
    value: "Zimbabwe",
    continent: "Africa",
  },
  {
    name: "Africa",
    label: {
      pt: "África",
      en: "Africa",
      fr: "Afrique",
    },
    value: "Africa",
    continent: "Africa",
  },
];

export const countriesByContinent = (continent) => {
  return countries
    .filter((country) => continent === country.continent)
    .map(({ continent: cntnt, name, ...c }) => c);
};

export const allCountries = countries.map(
  ({ continent: cntnt, name, ...c }) => c,
);
