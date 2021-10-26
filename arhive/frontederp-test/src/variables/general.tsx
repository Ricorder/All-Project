import React from 'react';

import Build from "@material-ui/icons/Build";
import CardTravel from "@material-ui/icons/CardTravel";
import Extension from "@material-ui/icons/Extension";
import Fingerprint from "@material-ui/icons/Fingerprint";
import FlightLand from "@material-ui/icons/FlightLand";

import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

// ##############################
// // // stories for Widgets view
// #############################

const widgetStories = [
  {
    // First story
    inverted: true,
    badgeColor: "danger",
    badgeIcon: CardTravel,
    title: "Some Title",
    titleColor: "danger",
    body: (
      <p>
        Wifey made the best Father{"'"}s Day meal ever. So thankful so happy so
        blessed. Thank you for making my family We just had fun with the
        “future” theme !!! It was a fun night all together ... The always rude
        Kanye Show at 2am Sold Out Famous viewing @ Figueroa and 12th in
        downtown.
      </p>
    ),
    footerTitle: "11 hours ago via Twitter"
  },
  {
    // Second story
    inverted: true,
    badgeColor: "success",
    badgeIcon: Extension,
    title: "Another One",
    titleColor: "success",
    body: (
      <p>
        Thank God for the support of my wife and real friends. I also wanted to
        point out that it’s the first album to go number 1 off of streaming!!! I
        love you Ellen and also my number one design rule of anything I do from
        shoes to music to homes is that Kim has to like it....
      </p>
    )
  },
  {
    // Third story
    inverted: true,
    badgeColor: "info",
    badgeIcon: Fingerprint,
    title: "Another Title",
    titleColor: "info",
    body: (
      <div>
        <p>
          Called I Miss the Old Kanye That’s all it was Kanye And I love you
          like Kanye loves Kanye Famous viewing @ Figueroa and 12th in downtown
          LA 11:10PM
        </p>
        <p>
          What if Kanye made a song about Kanye Royère doesn{"'"}t make a Polar
          bear bed but the Polar bear couch is my favorite piece of furniture we
          own It wasn’t any Kanyes Set on his goals Kanye
        </p>
      </div>
    ),
    footer: (
      <CustomDropdown
        buttonIcon={Build}
        buttonProps={{
          round: true,
          style: { marginBottom: "0" },
          color: "info"
        }}
        dropdownList={[
          "Action",
          "Another action",
          "Something else here",
          { divider: true },
          "Separated link"
        ]}
      />
    )
  }
];

// ##############################
// // // stories for Timeline view
// #############################

const stories = [
  {
    // First story
    inverted: true,
    badgeColor: "danger",
    badgeIcon: CardTravel,
    title: "Some Title",
    titleColor: "danger",
    body: (
      <p>
        Wifey made the best Father{"'"}s Day meal ever. So thankful so happy so
        blessed. Thank you for making my family We just had fun with the
        “future” theme !!! It was a fun night all together ... The always rude
        Kanye Show at 2am Sold Out Famous viewing @ Figueroa and 12th in
        downtown.
      </p>
    ),
    footerTitle: "11 hours ago via Twitter"
  },
  {
    // Second story
    inverted: true,
    badgeColor: "success",
    badgeIcon: Extension,
    title: "Another One",
    titleColor: "success",
    body: (
      <p>
        Thank God for the support of my wife and real friends. I also wanted to
        point out that it’s the first album to go number 1 off of streaming!!! I
        love you Ellen and also my number one design rule of anything I do from
        shoes to music to homes is that Kim has to like it....
      </p>
    )
  },
  {
    // Third story
    inverted: true,
    badgeColor: "info",
    badgeIcon: Fingerprint,
    title: "Another Title",
    titleColor: "info",
    body: (
      <div>
        <p>
          Called I Miss the Old Kanye That’s all it was Kanye And I love you
          like Kanye loves Kanye Famous viewing @ Figueroa and 12th in downtown
          LA 11:10PM
        </p>
        <p>
          What if Kanye made a song about Kanye Royère doesn{"'"}t make a Polar
          bear bed but the Polar bear couch is my favorite piece of furniture we
          own It wasn’t any Kanyes Set on his goals Kanye
        </p>
      </div>
    ),
    footer: (
      <CustomDropdown
        buttonIcon={Build}
        buttonProps={{
          round: true,
          style: { marginBottom: "0" },
          color: "info"
        }}
        dropdownList={[
          "Action",
          "Another action",
          "Something else here",
          { divider: true },
          "Separated link"
        ]}
      />
    )
  },
  {
    // Fourth story
    badgeColor: "warning",
    badgeIcon: FlightLand,
    title: "Another One",
    titleColor: "warning",
    body: (
      <p>
        Tune into Big Boy{"'"}s 92.3 I{"'"}m about to play the first single from
        Cruel Winter also to Kim’s hair and makeup Lorraine jewelry and the
        whole style squad at Balmain and the Yeezy team. Thank you Anna for the
        invite thank you to the whole Vogue team
      </p>
    )
  }
];

// ##############################
// // // data for populating the calendar in Calendar view
// #############################

var today = new Date();
var y = today.getFullYear();
var m = today.getMonth();
var d = today.getDate();

const events = [
  {
    title: "All Day Event",
    allDay: true,
    start: new Date(y, m, 1),
    end: new Date(y, m, 1),
    color: "default"
  },
  {
    title: "Meeting",
    start: new Date(y, m, d - 1, 10, 30),
    end: new Date(y, m, d - 1, 11, 30),
    allDay: false,
    color: "green"
  },
  {
    title: "Lunch",
    start: new Date(y, m, d + 7, 12, 0),
    end: new Date(y, m, d + 7, 14, 0),
    allDay: false,
    color: "red"
  },
  {
    title: "Nud-pro Launch",
    start: new Date(y, m, d - 2),
    end: new Date(y, m, d - 2),
    allDay: true,
    color: "azure"
  },
  {
    title: "Birthday Party",
    start: new Date(y, m, d + 1, 19, 0),
    end: new Date(y, m, d + 1, 22, 30),
    allDay: false,
    color: "azure"
  },
  {
    title: "Click for Creative Tim",
    start: new Date(y, m, 21),
    end: new Date(y, m, 22),
    color: "orange"
  },
  {
    title: "Click for Google",
    start: new Date(y, m, 21),
    end: new Date(y, m, 22),
    color: "rose"
  }
];

// ##############################
// // // Tasks for TasksCard - see Widget view
// #############################

var bugs = [
  'Sign contract for "What are conference organizers afraid of?"',
  "Lines From Great Russian Literature? Or E-mails From My Boss?",
  "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
  "Create 4 Invisible User Experiences you Never Knew About"
];
var website = [
  "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
  'Sign contract for "What are conference organizers afraid of?"'
];
var server = [
  "Lines From Great Russian Literature? Or E-mails From My Boss?",
  "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
  'Sign contract for "What are conference organizers afraid of?"'
];

// ##############################
// // // data for datatables.net in DataTables view
// #############################

const dataTable = {
  headerRow: ["Name", "Position", "Office", "Age", "Actions"],
  footerRow: ["Name", "Position", "Office", "Age", "Actions"],
  dataRows: [
    ["Tiger Nixon", "System Architect", "Edinburgh", "61"],
    ["Garrett Winters", "Accountant", "Tokyo", "63"],
    ["Ashton Cox", "Junior Technical Author", "San Francisco", "66"],
    ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "22"],
    ["Airi Satou", "Accountant", "Tokyo", "33"],
    ["Brielle Williamson", "Integration Specialist", "New York", "61"],
    ["Herrod Chandler", "Sales Assistant", "San Francisco", "59"],
    ["Rhona Davidson", "Integration Specialist", "Tokyo", "55"],
    ["Colleen Hurst", "Javascript Developer", "San Francisco", "39"],
    ["Sonya Frost", "Software Engineer", "Edinburgh", "23"],
    ["Jena Gaines", "Office Manager", "London", "30"],
    ["Quinn Flynn", "Support Lead", "Edinburgh", "22"],
    ["Charde Marshall", "Regional Director", "San Francisco", "36"],
    ["Haley Kennedy", "Senior Marketing Designer", "London", "43"],
    ["Tatyana Fitzpatrick", "Regional Director", "London", "19"],
    ["Michael Silva", "Marketing Designer", "London", "66"],
    ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "64"],
    ["Gloria Little", "Systems Administrator", "New York", "59"],
    ["Bradley Greer", "Software Engineer", "London", "41"],
    ["Dai Rios", "Personnel Lead", "Edinburgh", "35"],
    ["Jenette Caldwell", "Development Lead", "New York", "30"],
    ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "40"],
    ["Caesar Vance", "Pre-Sales Support", "New York", "21"],
    ["Doris Wilder", "Sales Assistant", "Sidney", "23"],
    ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "47"],
    ["Gavin Joyce", "Developer", "Edinburgh", "42"],
    ["Jennifer Chang", "Regional Director", "Singapore", "28"],
    ["Brenden Wagner", "Software Engineer", "San Francisco", "28"],
    ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "48"],
    ["Shou Itou", "Regional Marketing", "Tokyo", "20"],
    ["Michelle House", "Integration Specialist", "Sidney", "37"],
    ["Suki Burks", "Developer", "London", "53"],
    ["Prescott Bartlett", "Technical Author", "London", "27"],
    ["Gavin Cortez", "Team Leader", "San Francisco", "22"],
    ["Martena Mccray", "Post-Sales support", "Edinburgh", "46"],
    ["Unity Butler", "Marketing Designer", "San Francisco", "47"],
    ["Howard Hatfield", "Office Manager", "San Francisco", "51"],
    ["Hope Fuentes", "Secretary", "San Francisco", "41"],
    ["Vivian Harrell", "Financial Controller", "San Francisco", "62"],
    ["Timothy Mooney", "Office Manager", "London", "37"],
    ["Jackson Bradshaw", "Director", "New York", "65"],
    ["Olivia Liang", "Support Engineer", "Singapore", "64"]
  ]
};

const dataTableInvestProject = {
  headerRow: [
    "Название",
    "Статус",
    "Подразделение АФК",
    "География",
    "Реализующая компания",
    "Объем Инвестиций",
    "Cтадия",
    "Ответственный",
    "Индустрия",
    "Номер",
    "Доля АФК"
  ],
  footerRow: [
    "Название",
    "Статус",
    "Подразделение АФК",
    "География",
    "Реализующая компания",
    "Объем Инвестиций",
    "Cтадия",
    "Ответственный",
    "Индустрия",
    "Номер",
    "Доля АФК"
  ],
  dataRows: [
    [
      "Приобретение МЦ Лотос",
      "1. В работе",
      "УП Сиразутдинов",
      "Россия, Челябинск. ",
      'АО "ГК Медси"',
      "400,00",
      "3. Структурирование сделки",
      "Колпаков Виталий Алексеевич",
      "Медицинские услуги",
      "6",
      "0,00"
    ],
["Внедрение ERP","1. В работе","Департамент стратегии","Россия, Москва. Моховая","ПАО АФК \"Система\"","0,02","3. Выполнение","Трещалин Петр Николаевич","Информационные технологии","4","0,00"],
["Продажа части доли в МТС","3. Постконтроль","Президент","Россия, Москва. Таганская","ПАО АФК \"Система\"","0,00","5. Исполнение проекта","Горбунов Александр Евгеньевич","Мобильная связь","7","0,00"],
["Инвестиционный проект \"Umbrella factory\"","3. Постконтроль","Заместитель председателя Совета Директоров Евтушенков Ф.В.","США","Sistema Finance S.A.","4189,13","5. Исполнение проекта","Дроздов Сергей Алексеевич","Строительство","8","0,00"],
["Rimac","4. Отменен / Прекращен","Заместитель председателя Совета Директоров Евтушенков Ф.В.","Хорватия","ПАО АФК \"Система\"","0,00","1. Инвестидея","Молчанова Анна Владимировна","Автомобильная промышленность","11","0,00"],
["Петрарко","4. Отменен / Прекращен","Заместитель председателя Совета Директоров Евтушенков Ф.В.","Россия, Оренбург. ","ПАО АФК \"Система\"","0,00","1. Инвестидея","Евтушенков Феликс Владимирович","Нефтегазовое оборудование и сервисы","12","0,00"],
["Гипрогазоочистка","4. Отменен / Прекращен","Заместитель председателя Совета Директоров Евтушенков Ф.В.","Россия, Москва. Моховая 13с1","ПАО АФК \"Система\"","0,00","2. Первичный анализ","Белошицкий Андрей Сергеевич","Нефтегазовое оборудование и сервисы","13","0,00"],
["Реновация объекта Новый Арбат, д. 2","1. В работе","Департамент корпоративного управления и правовых вопросов","Россия, Москва. Новый Арбат","Бизнес - Недвижимость","1123,00","5. Исполнение проекта","Тепляков Евгений Юрьевич","Строительство","15","0,00"],
["Группа Висма","3. Постконтроль","УП Узденов","Россия, Ставрополь. ","ПАО АФК \"Система\"","750,00","5. Исполнение проекта","Узденов Али Муссаевич","Пищевая продукция","18","0,00"],
["Приобретение АПК Возрождение","3. Постконтроль","УП Узденов","Россия, Ставрополь. ","Агрохолдинг \"СТЕПЬ\"","1930,00","6. Проект завершен","Дроздова Юлия Игоревна","Сельское хозяйство","23","0,00"],
["Покупка National Paper Products","2. Приостановлен","УП Узденов","Египет","ГК Сегежа","0,00","1. Инвестидея","Куденко Василий Юрьевич","Целлюлозно-бумажная промышленность ","32","0,00"],
["РКС","1. В работе","Департамент стратегии","Россия, Москва. ","ПАО АФК \"Система\"","0,00","2. Выбор поставщика / проведение закупки","Ляпунов Владимир Сергеевич","Software & Computer Services : Other","166","0,00"],
["Инвестиционный проект \"Gienanth\"","3. Постконтроль","Заместитель председателя Совета Директоров Евтушенков Ф.В.","Германия. ","Sistema Finance S.A.","0,00","5. Исполнение проекта","Дроздов Сергей Алексеевич","Металлургия","10","0,00"],
["Развитие Серебряного Бора: реконструкция","1. В работе","Департамент корпоративного управления и правовых вопросов","Россия, Москва. Серебряный бор","Бизнес - Недвижимость","0,00","5. Исполнение проекта","Тепляков Евгений Юрьевич","Строительство","22","0,00"],
["Медицинский кластер в Отрадном","1. В работе","УП Сиразутдинов","Россия, Москва. Отрадное","АО \"ГК Медси\"","118,00","5. Исполнение проекта","Хабаров Никита Владимирович","Медицинские услуги","27","0,00"],
["Металлы из углеводородов","4. Отменен / Прекращен","Департамент стратегии","Россия, Москва","ПАО АФК \"Система\"","0,00","1. Инвестидея","Землянский Сергей Александрович","Металлургия","19","0,00"],
["Laserpas","3. Постконтроль","УП Мубаракшин","Латвия","ПАО АФК \"Система\"","0,00","6. Проект завершен","Белошицкий Андрей Сергеевич","Аэрокосмическая промышленность","26","214,46"],
["Лесообеспечение (Обновление парка техники 2-й этап)","3. Постконтроль","УП Узденов","Россия, Петрозаводск. ","ГК Сегежа","1156,00","5. Исполнение проекта","Куденко Василий Юрьевич","Деревообрабатывающая промышленность","38","0,00"],
["Строительство многофункционального медицинского центра на Мичуринском","1. В работе","УП Сиразутдинов","Россия, Москва. Мичуринский, 56","АО \"ГК Медси\"","0,00","5. Исполнение проекта","Колпаков Виталий Алексеевич","Медицинские услуги","41","0,00"],
["Реконструкция ГК Космос","2. Приостановлен","Департамент корпоративного управления и правовых вопросов","Россия, Москва. ","Космос Групп","7500,00","3. Структурирование сделки","Тепляков Евгений Юрьевич","Гостиничный бизнес","34","0,00"],
["Новое строительство и капитальный ремонт в Серебряном бору (уч. 157)","1. В работе","Департамент корпоративного управления и правовых вопросов","Россия, Москва. Серебряный бор","Бизнес - Недвижимость","46,00","5. Исполнение проекта","Тепляков Евгений Юрьевич","Строительство","36","0,00"],
["Гостиница в аэропорту Домодедово","4. Отменен / Прекращен","УП Сиразутдинов","Россия, Москва. Домодедово","Космос Групп","1193,00","2. Первичный анализ","Романова Дарья Дмитриевна","Гостиничный бизнес","37","1193,00"],
["Создание клиники на Ленинском пр-те","3. Постконтроль","УП Сиразутдинов","Россия, Москва. Ленинский пр","АО \"ГК Медси\"","893,00","5. Исполнение проекта","Колпаков Виталий Алексеевич","Медицинские услуги","39","0,00"],
["ООО \"БСХП\"","4. Отменен / Прекращен","УП Узденов","Россия, Горно-Алтайск. ","ПАО АФК \"Система\"","497,00","6. Проект завершен","Узденов Али Муссаевич","Сельское хозяйство","40","0,00"],
["Продажа ЗАО «Комсомольский» (офис)","1. В работе","УП Узденов","Россия, Москва. Комсомольский пр 42","ПАО АФК \"Система\"","0,00","3. Структурирование сделки","Мельников Никита Романович","Строительство","43","0,00"],
["Приобретение клиники MEDEM","3. Постконтроль","УП Сиразутдинов","Россия, Санкт-Петербург. ","АО \"ГК Медси\"","468,00","5. Исполнение проекта","Колпаков Виталий Алексеевич","Медицинские услуги","45","0,00"],
["Единое ИТ решение Медси","1. В работе","УП Сиразутдинов","Россия, Москва. Красная пресня","АО \"ГК Медси\"","806,00","5. Исполнение проекта","Колпаков Виталий Алексеевич","Медицинские услуги","56","0,00"],
["Медлайф","3. Постконтроль","УП Сиразутдинов","Россия, Пермь. ","АО \"ГК Медси\"","291,00","5. Исполнение проекта","Колпаков Виталий Алексеевич","Медицинские услуги","47","0,00"],
["Инвестиции в станкостроение","1. В работе","УП Сиразутдинов","Россия, Рязань. ","ПАО АФК \"Система\"","0,00","3. Структурирование сделки","Колбасин Сергей Юрьевич","Промышленное оборудование","48","0,00"],
["Инвестиции в текстильное производство","3. Постконтроль","УП Сиразутдинов","Россия, Вологда. ","ПАО АФК \"Система\"","224,00","5. Исполнение проекта","Колбасин Сергей Юрьевич","Одежда","49","2200,00"],
["Детский многопрофильный стационар в Отрадном","1. В работе","УП Сиразутдинов","Россия, Москва. Отрадное","АО \"ГК Медси\"","1122,00","2. Первичный анализ","Колпаков Виталий Алексеевич","Медицинские услуги","51","0,00"],
["Дооснащение КБ-2 диагностическим оборудованием","3. Постконтроль","УП Сиразутдинов","Россия, Москва. 2-й боткинский 5","АО \"ГК Медси\"","131,00","5. Исполнение проекта","Колпаков Виталий Алексеевич","Медицинские услуги","58","0,00"],
["Приобретение доли в Concept Club","3. Постконтроль","УП Сиразутдинов","Россия, Санкт-Петербург. ","ПАО АФК \"Система\"","6754,75","5. Исполнение проекта","Колбасин Сергей Юрьевич","Розничная торговля","60","50,00"],
["Приобретение Кондопожского ЦБК","4. Отменен / Прекращен","УП Узденов","Россия, Петрозаводск. ","ГК Сегежа","0,00","3. Структурирование сделки","Куденко Василий Юрьевич","Целлюлозно-бумажная промышленность ","64","0,00"],
["Ульяновец&Заветное","3. Постконтроль","УП Узденов","Россия, Ставрополь. ","Агрохолдинг \"СТЕПЬ\"","1840,00","5. Исполнение проекта","Дроздова Юлия Игоревна","Сельское хозяйство","65","0,00"],
["Мосавтогаз","3. Постконтроль","УП Узденов","Россия, Москва. ","ПАО АФК \"Система\"","220,00","6. Проект завершен","Мельников Никита Романович","Нефтегазовое оборудование и сервисы","66","0,00"],
["Прогресс","3. Постконтроль","УП Узденов","Россия, Ростов-на-Дону. ","Агрохолдинг \"СТЕПЬ\"","488,00","6. Проект завершен","Недужко Андрей Михайлович","Сельское хозяйство","69","0,00"],
["Радионуклидный центр в Отрадном","4. Отменен / Прекращен","УП Сиразутдинов","Россия, Москва. Отрадное","АО \"ГК Медси\"","699,00","2. Первичный анализ","Колпаков Виталий Алексеевич","Медицинские услуги","50","0,00"],
["Инвестиции в Окей совместно с Интерторгом","4. Отменен / Прекращен","УП Сиразутдинов","Россия, Москва. Моховая 13с1","ПАО АФК \"Система\"","12000,00","3. Структурирование сделки","Колпаков Виталий Алексеевич","Розничная торговля","52","12000,00"],
["Приобретение с/х активов АО «имени В.О. Мацкевич»","3. Постконтроль","УП Узденов","Россия, Ростов-на-Дону. ","Агрохолдинг \"СТЕПЬ\"","606,00","6. Проект завершен","Недужко Андрей Михайлович","Сельское хозяйство","67","0,00"],
["Приобретение с/х активов \"Коломийцевское\"","3. Постконтроль","УП Узденов","Россия, Ростов-на-Дону. ","Агрохолдинг \"СТЕПЬ\"","630,00","6. Проект завершен","Недужко Андрей Михайлович","Сельское хозяйство","70","0,00"],
["Приобретение 100% акций в ОАО \"Новотроицкое\"","3. Постконтроль","УП Узденов","Россия, Ставрополь. ","Агрохолдинг \"СТЕПЬ\"","562,90","6. Проект завершен","Недужко Андрей Михайлович","Сельское хозяйство","72","0,00"],
["Инвестлеспром","3. Постконтроль","УП Узденов","Россия, Петрозаводск. ","ПАО АФК \"Система\"","12000,00","6. Проект завершен","Куденко Василий Юрьевич","Целлюлозно-бумажная промышленность ","74","0,00"],
["Приобретение сельскохозяйственных активов Glencore","3. Постконтроль","УП Узденов","Россия, Ростов-на-Дону. ","Агрохолдинг \"СТЕПЬ\"","4267,76","6. Проект завершен","Недужко Андрей Михайлович","Сельское хозяйство","75","0,00"],
["Лесообеспечение","3. Постконтроль","УП Узденов","Россия, Петрозаводск. ","ГК Сегежа","1242,00","6. Проект завершен","Куденко Василий Юрьевич","Деревообрабатывающая промышленность","78","0,00"],
["Создание SPV в рамках структуры RZ Agro Holding Ltd ","4. Отменен / Прекращен","УП Узденов","Россия, Ростов-на-Дону. ","РЗ Агро","296,26","5. Исполнение проекта","Дроздова Юлия Игоревна","Сельское хозяйство","79","0,00"],
["Строительство фанерного завода в г. Сокол","2. Приостановлен","УП Узденов","Россия, Вологда. ","ГК Сегежа","0,00","2. Первичный анализ","Куденко Василий Юрьевич","Деревообрабатывающая промышленность","84","0,00"],
["Строительство КДЦ на Красной Пресне","3. Постконтроль","УП Сиразутдинов","Россия, Москва. Красная пресня","АО \"ГК Медси\"","4581,00","5. Исполнение проекта","Сиразутдинов Артем Геннадьевич","Медицинские услуги","54","0,00"],
["Расширение клиники в Красногорске","3. Постконтроль","УП Сиразутдинов","Россия, Москва. Красногорск","АО \"ГК Медси\"","85,00","5. Исполнение проекта","Колпаков Виталий Алексеевич","Медицинские услуги","55","0,00"],
  ]
};

export {
events,
  // stories for Widgets view
  widgetStories,
  // stories for Timeline view
  stories,
  // these 3 are used to create the tasks lists in TasksCard - Widget view
  bugs, website, server,
  // data for datatables.net in DataTables view
  dataTable, dataTableInvestProject
};

