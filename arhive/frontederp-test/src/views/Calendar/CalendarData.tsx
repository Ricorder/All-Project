import React from 'react';

var today = new Date();
var y = today.getFullYear();
var m = today.getMonth();
var d = today.getDate();

const events = [
//   {
//     title: "All Day Event",
//     allDay: true,
//     start: new Date(y, m, 1),
//     end: new Date(y, m, 1),
//     color: "default", "green", "red", "azure","orange","rose"
//   },
  {
    title: "EWUB - Стратегическая сессия",
    description: "10, Boulevard Joseph II, Luxembourg (ВКС с Моховой)",
    start: new Date(2020, 6, 9, 12, 0),
    end: new Date(2020, 6, 9, 16, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "Аэромакс - Стратегическая сессия",
    description: "г. Москва, ул. Малая Дмитровка д.5 стр. 9, 2-й этаж, переговорная No 26",
    start: new Date(2020, 6, 14, 12, 0),
    end: new Date(2020, 6, 14, 16, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "SVC - Стратегическая сессия",
    description: "г. Москва, ул. Щепкина д. 51/4 стр. 1, офис Sistema Venture Capital",
    start: new Date(2020, 6, 15, 15, 0),
    end: new Date(2020, 6, 15, 18, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "МТС - Стратегическая сессия",
    description: "г. Москва, Серебряный бор, 2-я линия, Владение 51, Дом приемов МТС",
    start: new Date(2020, 6, 17, 10, 0),
    end: new Date(2020, 6, 17, 19, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "Холдинг Аква - Стратегическая сессия",
    description: "г. Москва, ул. Твардовского д.8 к.1",
    start: new Date(2020, 7, 7, 11, 0),
    end: new Date(2020, 7, 7, 16, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "УК «Система капитал» - Стратегическая сессия",
    description: "г. Москва, Серебряный бор, 2-я линия, Владение 51, Дом приемов МТС",
    start: new Date(2020, 6, 21, 14, 30),
    end: new Date(2020, 5, 21, 19, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "УК «Космос Групп» - Стратегическая сессия",
    description: "г. Москва, проспект Мира, 150 (преимущественно участие по ВКС)",
    start: new Date(2020, 6, 22, 9, 0),
    end: new Date(2020, 6, 22, 18, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "Алиум/Синтез - Стратегическая сессия",
    description: "г. Москва, Тверская улица, 26/1, Марриотт Гранд Отель",
    start: new Date(2020, 6, 23, 11, 0),
    end: new Date(2020, 6, 23, 18, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "Ситроникс - Стратегическая сессия",
    description: "г. Москва, ул. Мельникова, д. 29, офис Ситроникс",
    start: new Date(2020, 6, 24, 11, 0),
    end: new Date(2020, 6, 24, 15, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "Концепт груп - Стратегическая сессия",
    description: "г. Санкт-Петербург, ул. Казанская, д. 25",
    start: new Date(2020, 6, 29, 9, 0),
    end: new Date(2020, 6, 29, 14, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "Бизнес-Недвижемость - Стратегическая сессия",
    description: "г. Москва, Серебряный бор, ул. Таманская, 75, Дом приемов.",
    start: new Date(2020, 6, 27, 10, 30),
    end: new Date(2020, 6, 27, 17, 30),
    allDay: false,
    color: "green"
  },
  {
    title: "Мост - Стратегическая сессия",
    description: "г. Москва, ул. Моховая, д. 13, стр. 1",
    start: new Date(2020, 6, 28, 11, 0),
    end: new Date(2020, 6, 28, 14, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "Система-БиоТех - Стратегическая сессия",
    description: "г. Москва, ул. Моховая, д. 13, стр. 1",
    start: new Date(2020, 6, 28, 14, 0),
    end: new Date(2020, 6, 28, 18, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "ГК «Кронштадт» - Стратегическая сессия",
    description: "ВКС с Моховой",
    start: new Date(2020, 6, 29, 15, 0),
    end: new Date(2020, 6, 29, 18, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "Детский мир - Стратегическая сессия",
    description: "г. Клин, Эко-отель Изумрудный лес",
    start: new Date(2020, 6, 30, 10, 0),
    end: new Date(2020, 6, 30, 18, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "МТС - Стратегическая сессия",
    description: "г. Москва, Серебряный бор, владение 51, дача МТС",
    start: new Date(2020, 6, 31, 10, 0),
    end: new Date(2020, 6, 31, 19, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "РТИ - Стратегическая сессия",
    description: "Место проведения уточняется.",
    start: new Date(2020, 7, 1, 12, 0),
    end: new Date(2020, 7, 1, 15, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "Вотекс - Стратегическая сессия",
    description: "г. Вологда, Советский Проспект д. 135Б",
    start: new Date(2020, 7, 3, 10, 0),
    end: new Date(2020, 7, 3, 17, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "Сегежа - Стратегическая сессия",
    description: "г. Клин, Эко-отель Изумрудный лес",
    start: new Date(2020, 7, 4, 10, 0),
    end: new Date(2020, 7, 4, 18, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "Эталон - Стратегическая сессия",
    description: "г. Москва, ул Новоалексеевская, д. 16, стр. 1, площадка проекта Серебряный фонтан",
    start: new Date(2020, 7, 5, 11, 0),
    end: new Date(2020, 7, 5, 18, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "БЭСК - Стратегическая сессия",
    description: "г. Уфа, ул. Комсомольская, д. 126, офис БЭСК (ВКС с Моховой)",
    start: new Date(2020, 7, 6, 10, 0),
    end: new Date(2020, 7, 6, 16, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "ТелекомКапСтрой - Стратегическая сессия",
    description: "г. Москва, ул. Моховая, д. 13, стр. 1",
    start: new Date(2020, 7, 6, 16, 0),
    end: new Date(2020, 7, 6, 19, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "Агрохолдинг «СТЕПЬ» - Стратегическая сессия",
    description: "Место проведения уточняется.",
    start: new Date(2020, 6, 20, 10, 0),
    end: new Date(2020, 6, 20, 19, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "Медси - Стратегическая сессия",
    description: "Место проведения уточняется.",
    start: new Date(2020, 7, 10, 10, 0),
    end: new Date(2020, 7, 10, 19, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "SCP Group - Стратегическая сессия",
    description: "г.Москва,ул.Моховая,д.13,стр.1",
    start: new Date(2020, 7, 11, 12, 0),
    end: new Date(2020, 7, 11, 16, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "Элемент - Стратегическая сессия",
    description: "г. Москва, Пресненская наб., 12, Башня Федерация «Восток», 20-й этаж",
    start: new Date(2020, 7, 12, 11, 0),
    end: new Date(2020, 7, 12, 18, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "Sistema Asia Fund - Стратегическая сессия",
    description: "офис SAF - Block 77 Ayer Rajah Crescent, #03- 32, Singapore (ВКС с Моховой)",
    start: new Date(2020, 7, 13, 11, 0),
    end: new Date(2020, 7, 13, 15, 0),
    allDay: false,
    color: "green"
  },
  {
    title: "Архыз - Стратегическая сессия",
    description: "г. Москва, ул. Моховая, д. 13, стр. 1",
    start: new Date(2020, 7, 14, 11, 30),
    end: new Date(2020, 7, 14, 15, 0),
    allDay: false,
    color: "green"
  },
  //Коллегиальные органы
  {
    title: "№07-20 Комитет по аудиту, финансам и рискам",
    description: "Москва, ул. Моховая, д.13/1 (Переговорная 102)",
    start: new Date(2020, 5, 8, 11, 0),
    end: new Date(2020, 5, 8, 12, 0),
    allDay: false,
    color: "red"
  },
  {
    title: "№03-20 Экспертный совет при Комитете по финансам и инвестициям",
    description: "Москва, ул. Моховая, д.13/1 (Переговорная 102)",
    start: new Date(2020, 5, 8, 14, 0),
    end: new Date(2020, 5, 8, 16, 0),
    allDay: false,
    color: "red"
  },
  {
    title: "№06 Правление",
    description: "Москва, ул. Моховая, д.13/1 (Переговорная 412)",
    start: new Date(2020, 5, 11, 10, 30),
    end: new Date(2020, 5, 11, 12, 0),
    allDay: false,
    color: "red"
  },
  {
    title: "№08-20 Комитет по аудиту, финансам и рискам",
    description: "Москва, ул. Моховая, д.13/1 (Переговорная 102)",
    start: new Date(2020, 5, 11, 16, 30),
    end: new Date(2020, 5, 11, 18, 30),
    allDay: false,
    color: "red"
  },
  {
    title: "№12 КФИ",
    description: "Москва, ул. Моховая, д.13/1 (Переговорная 412)",
    start: new Date(2020, 5, 15, 11, 0),
    end: new Date(2020, 5, 15, 13, 0),
    allDay: false,
    color: "red"
  },
  {
    title: '№05-20 СД ПАО АФК "Система"',
    description: "Внеочередное, заочное",
    start: new Date(2020, 5, 15, 0, 0),
    end: new Date(2020, 5, 15, 0, 0),
    allDay: true,
    color: "red"
  },
  {
    title: "№6 Подготовка к СД",
    description: "Москва, ул. Моховая, д.13/1 (Переговорная 102)",
    start: new Date(2020, 5, 15, 15, 0),
    end: new Date(2020, 5, 15, 18, 0),
    allDay: false,
    color: "red"
  },
  {
    title: "№7 Правление",
    description: "Москва, ул. Моховая, д.13/1 (Переговорная 412)",
    start: new Date(2020, 5, 18, 10, 30),
    end: new Date(2020, 5, 18, 12, 0),
    allDay: false,
    color: "red"
  },
  {
    title: "№09-20 Комитет по аудиту, финансам и рискам",
    description: "Москва, ул. Моховая, д.13/1 (Переговорная 102)",
    start: new Date(2020, 5, 26, 16, 0),
    end: new Date(2020, 5, 26, 18, 0),
    allDay: false,
    color: "red"
  },
  {
    title: '№06-20 СД ПАО АФК "Система"',
    description: "Москва, ул. Моховая, д.13/1 (Переговорная 102)",
    start: new Date(2020, 5, 27, 12, 0),
    end: new Date(2020, 5, 27, 16, 0),
    allDay: false,
    color: "red"
  },
  {
    title: "№1 Комитет по стратегии",
    description: "Москва, ул. Моховая, д.13/1 (Переговорная 102)",
    start: new Date(2020, 6, 8, 12, 0),
    end: new Date(2020, 6, 8, 13, 0),
    allDay: false,
    color: "red"
  },
  {
    title: "№2 Комитет по стратегии",
    description: "Москва, ул. Моховая, д.13/1 (Переговорная 102)",
    start: new Date(2020, 6, 15, 12, 0),
    end: new Date(2020, 6, 15, 13, 0),
    allDay: false,
    color: "red"
  },
  {
    title: "№3 Комитет по стратегии",
    description: "Москва, ул. Моховая, д.13/1 (Переговорная 102)",
    start: new Date(2020, 6, 22, 12, 0),
    end: new Date(2020, 6, 22, 13, 0),
    allDay: false,
    color: "red"
  },
  {
    title: '№07-20 СД ПАО АФК "Система"',
    description: "Москва, ул. Моховая, д.13/1 (Переговорная 102)",
    start: new Date(2020, 8, 12, 12, 0),
    end: new Date(2020, 8, 12, 16, 0),
    allDay: false,
    color: "red"
  },
  {
    title: '№08-20 СД ПАО АФК "Система"',
    description: "Москва, ул. Моховая, д.13/1 (Переговорная 102)",
    start: new Date(2020, 9, 17, 12, 0),
    end: new Date(2020, 9, 17, 16, 0),
    allDay: false,
    color: "red"
  },
  {
    title: '№09-20 СД ПАО АФК "Система"',
    description: "Москва, ул. Моховая, д.13/1 (Переговорная 102)",
    start: new Date(2020, 10, 21, 12, 0),
    end: new Date(2020, 10, 21, 16, 0),
    allDay: false,
    color: "red"
  },
  {
    title: '№10-20 СД ПАО АФК "Система"',
    description: "Москва, ул. Моховая, д.13/1 (Переговорная 102)",
    start: new Date(2020, 11, 19, 12, 0),
    end: new Date(2020, 11, 19, 16, 0),
    allDay: false,
    color: "red"
  },
  {
    title: 'Годовое собрание Акционеров (ГОСА)',
    description: "Москва, ул. Моховая, д.13/1 (Переговорная 102)",
    start: new Date(2020, 5, 27, 10, 0),
    end: new Date(2020, 5, 27, 12, 0),
    allDay: false,
    color: "azure"
  },
];

export {
    events
    };