export const props = {
  en: {
    isActive: true,
    categories: ['Language', 'Image sourse', 'Blocks'],

    lang: {
      title: 'Language',
      props: [
        { text: 'English', checked: true, id: 'lang-en' },
        { text: 'Russian', checked: false, id: 'lang-ru' },
      ],
    },
    img: {
      title: 'Image sourse',
      props: [
        { text: 'Github', checked: true, id: 'img-git' },
        {
          text: 'Unsplash API',
          checked: false,
          id: 'img-unsp',
          tags: true,
          addText: 'Add your own tags. Enter tags with spaces or commas.',
          errorMes:
            'Invalid value. Enter tags in English with spaces or commas.',
        },
        {
          text: 'Flickr API',
          checked: false,
          id: 'img-fli',
          tags: true,
          addText: 'Add your own tags. Enter tags with spaces or commas.',
          errorMes:
            'Invalid value. Enter tags in English with spaces or commas.',
        },
      ],
    },
    block: {
      title: 'Blocks',
      props: [
        { text: 'Time', checked: true, id: 'block-time' },
        { text: 'Date', checked: true, id: 'block-date' },
        { text: 'Greeting', checked: true, id: 'block-greet' },
        { text: 'Day quote', checked: true, id: 'block-quote' },
        { text: 'Weather', checked: true, id: 'block-weather' },
        { text: 'Player', checked: true, id: 'block-play' },
        { text: 'Todo', checked: true, id: 'block-todo' },
      ],
    },
  },
  ru: {
    isActive: false,

    categories: ['Язык', 'Изображения', 'Блоки'],
    lang: {
      title: 'Язык',
      props: [
        { text: 'Английский', checked: false, id: 'lang-en' },
        { text: 'Русский', checked: true, id: 'lang-ru' },
      ],
    },
    img: {
      title: 'Изображения',
      props: [
        { text: 'Github', checked: true, id: 'img-git', tags: true },
        {
          text: 'Unsplash API',
          checked: false,
          id: 'img-unsp',
          tags: true,
          addText: 'Добавьте теги. Введите теги через пробел или запятую.',
          errorMes:
            'Неверное значение. Введите теги на английском через пробел или запятую.',
        },
        {
          text: 'Flickr API',
          checked: false,
          id: 'img-fli',
          tags: true,
          addText: 'Добавьте теги. Введите теги через пробел или запятую.',
          errorMes:
            'Неверное значение. Введите теги на английском через пробел или запятую.',
        },
      ],
    },
    block: {
      title: 'Блоки',
      props: [
        { text: 'Время', checked: true, id: 'block-time' },
        { text: 'Дата', checked: true, id: 'block-date' },
        { text: 'Приветствие', checked: true, id: 'block-greet' },
        { text: 'Цитата', checked: true, id: 'block-quote' },
        { text: 'Погода', checked: true, id: 'block-weather' },
        { text: 'Проигрыватель', checked: true, id: 'block-play' },
        { text: 'Задачи', checked: true, id: 'block-todo' },
      ],
    },
  },
};
