(()=>{"use strict";class t{static timeUpdate(t){setTimeout(t,1e3)}static getTimeOfDay(){const t=(new Date).getHours();return{0:"night",1:"morning",2:"afternoon",3:"evening"}[Math.floor(t/6)]}static getGreeting(t,e){return{en:{night:"Good night",morning:"Good morning",afternoon:"Good afternoon",evening:"Good evening"},ru:{night:"Спокойной ночи",morning:"Доброе утро",afternoon:"Добрый день",evening:"Добрый вечер"}}[t][e]}static getRandomNum(t){const e=Math.round(Math.random()*t);return 0===e?1:e}static getLandscapeOrientationImg(t){return t.filter((t=>t.width_k>t.height_k&&2048===t.width_k&&1365===t.height_k))}static getId(){const t=new Date;return Math.round(1e5*Math.random())+t.getTime()}}class e{constructor(t,e){this.eventType=t,this.callbacks=[e]}}const s=new class{constructor(){this.eventCallbacksPairs=[]}subscribe(t,s){const i=this.findEventCallbacksPair(t);i?i.callbacks.push(s):this.eventCallbacksPairs.push(new e(t,s))}unSubscribe(t){const e=this.eventCallbacksPairs.find((e=>e.eventType===t)),s=this.eventCallbacksPairs.indexOf(e);this.eventCallbacksPairs.splice(s,1)}post(t,e){const s=this.findEventCallbacksPair(t);s&&s.callbacks.forEach((t=>t(e)))}findEventCallbacksPair(t){return this.eventCallbacksPairs.find((e=>e.eventType===t))}},i=new class{constructor(){this.dateContainer=document.querySelector(".date-js"),this.timeContainer=document.querySelector(".time-js")}renderTime(t){this.timeContainer.innerText=t}renderDate(t){this.dateContainer.innerText=t}hideBlockTime(){this.timeContainer.classList.add("hidden")}showBlockTime(){this.timeContainer.classList.remove("hidden")}hideBlockDate(){this.dateContainer.classList.add("hidden")}showBlockDate(){this.dateContainer.classList.remove("hidden")}},o=new class{constructor(){this.optionsDate={weekday:"long",month:"long",day:"numeric"},this.optionsTime={hour12:!1},this.lang="en",this.locale={en:"en-US",ru:"ru-RU"}}getCurrentDate(){return(new Date).toLocaleDateString(this.locale[this.lang],this.optionsDate)}getCurrentTime(){return(new Date).toLocaleTimeString([],this.optionsTime)}setLang(t="en"){this.lang=t}},n=new class{constructor(t,e){this.model=t,this.view=e,this.isShownDate=null,this.isShownTime=null}init(){s.subscribe("block-date-changed",(t=>{this.isShownDate=t,t?this.view.showBlockDate():this.view.hideBlockDate()})),s.subscribe("block-time-changed",(t=>{this.isShownTime=t,t?this.view.showBlockTime():this.view.hideBlockTime()})),s.subscribe("lang-changed",(t=>{this.model.setLang(t[1]),this.showTime()}))}showTime(){this.isShownDate?this.view.renderDate(this.model.getCurrentDate()):(this.view.hideBlockDate(),setTimeout((()=>this.view.renderDate(this.model.getCurrentDate())),1e3)),this.isShownTime?this.view.renderTime(this.model.getCurrentTime()):(this.view.hideBlockTime(),setTimeout((()=>this.view.renderTime(this.model.getCurrentTime())),1e3)),t.timeUpdate(this.showTime.bind(this))}}(o,i);n.init();const a=new class{constructor(){this.prefix="tetianaMas-LS-prop-"}set(t,e){localStorage.setItem(this.prefix+t,JSON.stringify(e))}get(t){return JSON.parse(localStorage.getItem(this.prefix+t))}},r=new class{constructor(){this.greetingContainer=document.querySelector(".greeting-js"),this.greetingWrapper=document.querySelector(".greeting-container-js"),this.inputName=document.querySelector(".input-name-js")}render(t){this.greetingContainer.innerText=t}hideBlock(){this.greetingWrapper.classList.add("hidden")}showBlock(){this.greetingWrapper.classList.remove("hidden")}},l=new class{constructor(){this.lang="en",this.langProperties={en:{placeholder:"[Enter name]"},ru:{placeholder:"[Введите имя]"}}}getGreeting(){let e=t.getTimeOfDay();return`${t.getGreeting(this.lang,e)}, `}getName(){return a.get("nameVal")||""}getPlaceholder(){return this.langProperties[this.lang].placeholder}saveName(t){a.set("nameVal",t)}setLang(t="en"){this.lang=t}},h=new class{constructor(t,e){this.model=t,this.view=e,this.isShown=null}init(){s.subscribe("block-greet-changed",(t=>{this.isShown=t,t?this.view.showBlock():this.view.hideBlock()})),s.subscribe("lang-changed",(t=>{this.model.setLang(t[1]),this.isShown?this.showGreeting():(this.view.hideBlock(),setTimeout((()=>this.showGreeting()),1e3))}))}showGreeting(){this.view.render(this.model.getGreeting()),this.model.getName()?this.view.inputName.value=this.model.getName():this.view.inputName.setAttribute("placeholder",this.model.getPlaceholder()),this.view.inputName.addEventListener("input",(()=>{this.model.saveName(this.view.inputName.value)})),t.timeUpdate(this.showGreeting.bind(this))}}(l,r);h.init();const c="&w=1650&h=1100&fit=crop&crop=edges&auto=format&fm=avif&q=60",d="VtXyeAcvzOtVBYmcGjjkCCRehaLExVj6IJS6_Y3on7o",g={afternoon:"https://api.unsplash.com/collections/bNlTXWIcjOg/photos?per_page=20",evening:"https://api.unsplash.com/collections/Bbd1C35us8E/photos?per_page=20",night:"https://api.unsplash.com/collections/r_VMD1ROz9Q/photos?per_page=20",morning:"https://api.unsplash.com/collections/vwy7HxJfm2Y/photos?per_page=20"};class u{constructor(){this.collection=[],this.randomNum=t.getRandomNum(20)}loadImages(){const t=this.collection;this.removeCollection(),t.forEach((t=>{new Promise((e=>{const s=new Image;s.src=t,s.addEventListener("load",(()=>{e(s)}))})).then((t=>{this.collection.push(t.src)})).catch((t=>console.log(t)))}))}getRandomImage(){return this.randomNum=t.getRandomNum(this.collection.length-1),this.collection[this.randomNum]}getImage(){return this.collection[this.randomNum]}getNextImg(){this.randomNum++,this.randomNum>this.collection.length-1&&(this.randomNum=0),this.getImage()}getPrevImg(){this.randomNum--,this.randomNum<0&&(this.randomNum=this.collection.length-1),this.getImage()}removeCollection(){this.collection=[]}}class m extends u{constructor(t){super(),this.api="https://raw.githubusercontent.com/tetianamas/stage1-tasks/assets/images/",this.imagesAmount=t}createLinks(){const e=t.getTimeOfDay();for(let t=this.randomNum;t<=this.imagesAmount;t++)this.collection.push(this.getLink("",e,t));for(let t=1;t<=this.randomNum-1;t++)this.collection.push(this.getLink("",e,t))}getLink(e,s=t.getTimeOfDay(),i=this.randomNum){return`${this.api}${s}/${i<10?"0"+i:i}.jpg`}getCollection(){return this.collection}}const p=new class{async get(t){try{const e=await fetch(t);return await e.json()}catch(t){console.log(t.message)}}};class v extends u{constructor(){super(),this.api=g,this.key=d,this.unspQuery=c}async createLinks(){const e=t.getTimeOfDay();this.removeCollection();const s=this.api[e]+"&client_id="+this.key;await p.get(s).then((t=>{t.forEach((t=>{this.collection.push(t.urls.raw+this.unspQuery)}))})).catch((t=>console.log(t)))}async getLink(){return this.collection.length||await this.createLinks(),this.collection[this.randomNum]}}class w extends u{constructor(){super(),this.api="https://api.unsplash.com/search/photos?orientation=landscape&page=1&per_page=20",this.key=d,this.unspQuery=c}async createSearchLinks(t){this.removeCollection();const e=t?"&query="+t.join(","):"",s=this.api+"&client_id="+this.key+e;await p.get(s).then((t=>{t.results.length||this.noResults(),t.results.forEach((t=>{this.collection.push(t.urls.raw+this.unspQuery)}))})).catch((t=>console.log(t)))}async getSearchLink(t){return this.collection.length||await this.createSearchLinks(t),this.collection[this.randomNum]}noResults(){s.post("no-serch-results")}}const k=new class{constructor(){this.nextSliderBtn=document.querySelector(".slide-next-js"),this.prevSliderBtn=document.querySelector(".slide-prev-js"),this.bgImg=document.getElementById("bg-img")}setBg(t){const e=new Image;e.src=t,e.addEventListener("load",(()=>{const t=`url("${e.src}")`;this.bgImg.style.backgroundImage!==t&&(this.bgImg.style.backgroundImage=t,this.bgImg.classList.remove("visible"),this.bgImg.classList.add("visible")),setTimeout((()=>{this.removeBtnDisabled(),this.removeBlur()}),300)}))}setBtnDisabled(){this.nextSliderBtn.classList.add("disabled"),this.prevSliderBtn.classList.add("disabled")}removeBtnDisabled(){this.nextSliderBtn.classList.remove("disabled"),this.prevSliderBtn.classList.remove("disabled")}setBlur(){this.bgImg.style.filter="blur(10px)"}removeBlur(){this.bgImg.style.filter="none"}},y=new class{constructor(){this.sourse="git",this.tags=[],this.apiLinks={git:new m(20),unsp:new v}}getBgLink(){return this.apiLinks[this.sourse].getLink()}getSearchLink(){const t=this.apiLinks.unsp.getSearchLink(this.getTags());return this.apiLinks.unsp.loadImages(),t}async loadImages(){for(let t of Object.values(this.apiLinks))t.removeCollection(),await t.createLinks(),t.loadImages()}async loadSearchImages(){this.apiLinks.unsp.loadImages()}getBgImage(){return this.apiLinks[this.sourse].getImage()}setSourse(t){this.sourse=t}setTags(t){this.tags=t,this.saveTags()}useApiWithTag(){"unsp"===this.sourse&&(this.apiLinks.unsp=new w)}useDefaulApi(){"unsp"===this.sourse&&(this.apiLinks.unsp=new v)}saveTags(){a.set("tags",this.tags)}getTags(){const t=a.get("tags");return t&&(this.tags=t),this.tags}getNextImg(){this.apiLinks[this.sourse].getNextImg()}getPrevImg(){this.apiLinks[this.sourse].getPrevImg()}},T=new class{constructor(t,e){this.model=t,this.view=e}async init(){s.subscribe("img-changed",(async t=>{const[,e]=t;this.model.setSourse(e),this.model.getTags().length&&"unsp"===this.model.sourse?s.post("add-tags",this.model.getTags()):await this.updateBg()})),s.subscribe("add-tags",(t=>{this.model.setTags(t),this.view.setBlur(),""===t.join("")?(this.model.useDefaulApi(),this.updateBg()):(this.model.useApiWithTag(),this.updateSearchBg()),s.post("post-tags",this.model.getTags())})),s.subscribe("get-tags",(()=>{s.post("post-tags",this.model.getTags())})),s.subscribe("no-serch-results",this.noResultsFound.bind(this)),this.view.nextSliderBtn.addEventListener("click",(()=>{this.model.getNextImg(),this.setBgImage()})),this.view.prevSliderBtn.addEventListener("click",(()=>{this.model.getPrevImg(),this.setBgImage()}))}async updateBg(){this.view.setBtnDisabled(),this.view.setBlur();const t=await this.model.getBgLink();this.view.setBg(await t),this.model.loadImages()}setBgImage(){this.view.setBtnDisabled(),this.view.setBlur();const t=this.model.getBgImage();this.view.setBg(t)}async updateSearchBg(){this.view.setBtnDisabled();const t=await this.model.getSearchLink();this.view.setBg(await t),this.model.loadSearchImages()}noResultsFound(){this.model.useDefaulApi(),this.updateBg()}}(y,k);T.init();const b={en:"Warsaw",ru:"Варшава"},L={en:{windUnits:"m/s",humidity:"Humidity: ",windSpeed:"Wind speed: ",error:"Error! No city found for ",empty:"empty value"},ru:{windUnits:"м/с",humidity:"Влажность: ",windSpeed:"Скорость ветра: ",error:"Ошибка! Не найден город для ",empty:"пустого значения"}},C=new class{constructor(){this.weatherContainer=document.querySelector(".weather-js"),this.iconContainer=this.weatherContainer.querySelector(".weather-icon-js"),this.temperatureContainer=this.weatherContainer.querySelector(".temperature-js"),this.descrContainer=this.weatherContainer.querySelector(".weather-description-js"),this.cityContainer=this.weatherContainer.querySelector(".city-js"),this.windContainer=this.weatherContainer.querySelector(".wind-js"),this.humidityContainer=this.weatherContainer.querySelector(".humidity-js"),this.errorContainer=this.weatherContainer.querySelector(".weather-error-js")}render(t,e){this.errorContainer.textContent="",this.iconContainer.className="weather-icon owf weather-icon-js",this.iconContainer.classList.add(`owf-${t.weather[0].id}`),this.temperatureContainer.textContent=`${Math.round(t.main.temp)}°C`,this.descrContainer.textContent=t.weather[0].description,this.cityContainer.value=t.name,this.windContainer.textContent=`${e.windSpeed}${Math.round(t.wind.speed)} ${e.windUnits}`,this.humidityContainer.textContent=`${e.humidity}${t.main.humidity} %`}renderError(t){this.errorContainer.textContent=`${t.error} ${this.cityContainer.value.trim().length>0?this.cityContainer.value:t.empty}.`,this.iconContainer.className="",this.temperatureContainer.textContent="",this.descrContainer.textContent="",this.cityContainer.value="",this.windContainer.textContent="",this.humidityContainer.textContent=""}hideBlock(){this.weatherContainer.classList.add("hidden")}showBlock(){this.weatherContainer.classList.remove("hidden")}},B=new class{constructor(){this.weatherData=null,this.lang="en",this.api="https://api.openweathermap.org/data/2.5/weather",this.key="6656deed8868e8248f8b58046cc29976",this.defaultCity=b,this.units="metric",this.langProperties=L}setWeatherData(t){t&&(this.data=t)}setCity(t){t&&(this.city=t,a.set("city",t))}setLang(t=this.lang){this.lang=t}getDefaultCity(){return this.defaultCity[this.lang]}getWeatherData(){const t=this.api+"?appid="+this.key+"&q="+this.getCity()+"&lang="+this.lang+"&units="+this.units;return p.get(t)}getCity(){return this.getCityFromStorage()?this.getCityFromStorage().trim():this.getDefaultCity()}getCityFromStorage(){return a.get("city")}getLangProperties(){return this.langProperties[this.lang]}},S=new class{constructor(t,e){this.model=t,this.view=e,this.isShown=null}init(){s.subscribe("block-weather-changed",(t=>{this.isShown=t,t?this.view.showBlock():this.view.hideBlock()})),s.subscribe("lang-changed",(t=>{const[,e]=t;this.model.setLang(e),this.isShown?this.getWeather():(this.view.hideBlock(),setTimeout((()=>this.getWeather()),1e3))})),this.view.cityContainer.addEventListener("change",(()=>{let t=this.view.cityContainer.value;t&&(this.model.setCity(t),this.getWeather())}))}getWeather(){this.model.getWeatherData().then((t=>{this.view.render(t,this.model.getLangProperties()),this.model.setWeatherData(t)})).catch((()=>{this.model.setCity(this.model.getDefaultCity()),this.view.renderError(this.model.getLangProperties())}))}}(B,C);S.init();const f=new class{constructor(){this.container=document.querySelector(".quote-container-js"),this.quoteContainer=document.querySelector(".quote-js"),this.quoteWrapper=document.querySelector(".quote-wrapper-js"),this.authorContainer=document.querySelector(".author-js"),this.randomBtn=document.querySelector(".change-quote-js")}render(t){this.quoteContainer.textContent=t.quote,this.authorContainer.textContent=t.author}hideBlock(){this.container.classList.add("hidden")}showBlock(){this.container.classList.remove("hidden")}animate(){this.quoteWrapper.classList.add("animate"),this.randomBtn.classList.add("animate-btn","disabled"),this.randomBtn.setAttribute("disabled",""),this.randomBtn.addEventListener("animationend",(()=>{setTimeout((()=>{this.randomBtn.classList.remove("animate-btn","disabled"),this.randomBtn.removeAttribute("disabled")}),300)})),setTimeout((()=>this.quoteWrapper.classList.remove("animate")),1e3)}},P=new class{constructor(){this.lang="en",this.langProperties={en:"assets/quotes/quotes_eng.json",ru:"assets/quotes/quotes_ru.json"}}async getQuotes(){return(await fetch(this.getQuotesLink())).json()}getQuotesLink(){return this.langProperties[this.lang]}getRandomQuote(e){return e[t.getRandomNum(e.length-1)]}setLang(t="en"){this.lang=t}},j=new class{constructor(t,e){this.model=t,this.view=e,this.isShown=null}init(){s.subscribe("block-quote-changed",(t=>{this.isShown=t,t?this.view.showBlock():this.view.hideBlock()})),s.subscribe("lang-changed",(t=>{const[,e]=t;this.model.setLang(e),this.isShown?this.setQuote():(this.view.hideBlock(),setTimeout((()=>this.setQuote()),1e3))})),this.view.randomBtn.addEventListener("click",this.setQuote.bind(this))}setQuote(){this.view.animate(),this.model.getQuotes().then((t=>{const e=this.model.getRandomQuote(t);this.view.render(e)})).catch((t=>console.log(t.message)))}}(P,f);j.init();const x=[{title:"Dream Piano",src:"assets/sounds/Dream-Piano.mp3",duration:"02:09"},{title:"Melody of Nature",src:"assets/sounds/Melody-of-Nature.mp3",duration:"03:01"},{title:"Nightlife",src:"assets/sounds/Nightlife.mp3",duration:"03:46"},{title:"Simple Piano Melody",src:"assets/sounds/Simple-Piano-Melody.mp3",duration:"01:31"}],E=new class{constructor(){this.playerContainer=document.querySelector(".player-js"),this.playBtn=document.querySelector(".play-js"),this.nextBtn=document.querySelector(".play-next-js"),this.prevBtn=document.querySelector(".play-prev-js"),this.playList=document.querySelector(".play-list-js"),this.trackTitle=document.querySelector(".player-title-js"),this.fullTime=document.querySelector(".full-time-js"),this.currentTime=document.querySelector(".current-time-js"),this.progressBar=document.querySelector(".player-progress-js"),this.timeline=document.querySelector(".timeline-js"),this.volumeBar=document.querySelector(".volume-progress-js"),this.volumeButton=document.querySelector(".volume-btn-js")}renderPlaylist(t){let e="";t.forEach(((t,s)=>{e+=`<li class="play-item play-item-js" id="track-${s}">\n        <button class="play-item-btn"></button>\n        ${t.title}\n      </li>`})),this.playList.innerHTML=e}togglePlayBtn(){this.playBtn.classList.toggle("pause")}activePlayBtn(){this.playBtn.classList.add("pause")}deactivePlayBtn(){this.playBtn.classList.remove("pause")}setPauseBtn(){this.playBtn.classList.add("pause")}setActiveTrack(t){const e=document.querySelectorAll(".play-item-js");e.forEach((t=>t.classList.remove("played","active-track"))),e[t].classList.add("played","active-track")}setPauseToActiveTrack(t){document.getElementById(t).classList.remove("played")}removePauseToActiveTrack(t){document.getElementById(t).classList.add("played")}setTrackTitle(t){this.trackTitle.textContent=t}setCurrentTime(t){this.currentTime.textContent=t}setFullTime(t){this.fullTime.textContent=t}setUpProgressBar(t){this.progressBar.style.width=t}setAudioDuration(t){this.progressBar.setAttribute("max",t)}changeTimelineBg(t,e){this.progressBar.style.background=`linear-gradient(to right, rgba(70, 70, 70, 0.8) 0%, rgba(70, 70, 70, 0.8) ${t/e*100}%, rgba(255, 255, 255, 0.8) ${t/e*100}%, rgba(255, 255, 255, 0.8) 100%)`}changeVolumeBarBg(t){this.volumeBar.style.background=`linear-gradient(to right, rgba(70, 70, 70, 0.8) 0%, rgba(70, 70, 70, 0.8) ${100*t}%, rgba(255, 255, 255, 0.8) ${100*t}%, rgba(255, 255, 255, 0.8) 100%)`}setMuted(){this.volumeButton.classList.add("muted")}removeMuted(){this.volumeButton.classList.remove("muted")}hideBlock(){this.playerContainer.classList.add("hidden")}showBlock(){this.playerContainer.classList.remove("hidden")}},I=new class{constructor(t){this.trackNum=0,this.playList=t||x,this.audio=new Audio,this.isPlaying=!1,this.volume=.5}initAudio(){this.audio.src=this.getAudioSrc(),this.audio.load()}increaseTrackNum(){this.trackNum++,this.trackNum>this.playList.length-1&&(this.trackNum=0)}decreaseTrackNum(){this.trackNum--,this.trackNum<0&&(this.trackNum=this.playList.length-1)}getPlaylist(){return this.playList}getAudioSrc(){return this.playList[this.trackNum].src}getAudio(){return this.audio}getTrackNum(){return this.trackNum}setTrackNum(t){this.trackNum=t}getTrackTitle(){return this.playList[this.trackNum].title}getTrackFullTime(){return this.playList[this.trackNum].duration}getTrackDuration(){return this.audio.duration}getTrackCurrentTime(){return this.audio.currentTime}getTimeCode(){return this.getTimeCodeFromNum(this.getTrackCurrentTime())}getTimeCodeFromNum(t){let e=parseInt(t,10),s=parseInt(e/60,10);e-=60*s;const i=parseInt(s/60,10);return s-=60*i,0===i?`${s}:${String(e%60).padStart(2,0)}`:`${String(i).padStart(2,0)}:${s}:${String(e%60).padStart(2,0)}`}setTrackCurrentTime(t){this.audio.currentTime=t}setTrackVolume(t){this.audio.volume=t}playAudio(){this.isPlaying?this.audio.pause():this.audio.play(),this.isPlaying=!this.isPlaying}},q=new class{constructor(t,e){this.model=t,this.view=e,this.isShown=null}init(){s.subscribe("block-play-changed",(t=>{this.isShown=t,t&&!this.model.isPlaying?(this.view.renderPlaylist(this.model.getPlaylist()),this.view.setTrackTitle(this.model.getTrackTitle()),this.view.setFullTime(this.model.getTrackFullTime()),this.model.initAudio(),this.view.showBlock()):t&&this.model.isPlaying?this.view.showBlock():this.view.hideBlock()})),this.model.getAudio().addEventListener("loadeddata",(()=>{const t=this.model.getTrackDuration();this.view.setAudioDuration(t)})),this.view.progressBar.addEventListener("input",(()=>{const t=this.view.progressBar.value;this.model.setTrackCurrentTime(t)})),this.view.volumeBar.addEventListener("input",this.changeVolume.bind(this)),this.view.volumeButton.addEventListener("click",this.toggleMute.bind(this)),this.model.getAudio().addEventListener("timeupdate",(()=>{this.view.progressBar.value=this.model.getTrackCurrentTime(),this.view.changeTimelineBg(this.model.getTrackCurrentTime(),this.model.getTrackDuration())})),this.view.playBtn.addEventListener("click",(()=>{this.view.togglePlayBtn();const t=`track-${this.model.getTrackNum()}`;this.model.getTrackCurrentTime()>0?(this.model.playAudio(),this.model.isPlaying?this.view.removePauseToActiveTrack(t):this.view.setPauseToActiveTrack(t)):(this.view.activePlayBtn(),this.view.removePauseToActiveTrack(t),this.play())})),this.view.nextBtn.addEventListener("click",(()=>{this.model.increaseTrackNum(),this.view.setPauseBtn(),this.model.isPlaying=!1,this.play()})),this.view.prevBtn.addEventListener("click",(()=>{this.model.decreaseTrackNum(),this.view.setPauseBtn(),this.model.isPlaying=!1,this.play()})),this.model.getAudio().addEventListener("ended",(()=>{this.model.isPlaying=!1,this.model.increaseTrackNum(),this.play()})),this.view.playList.addEventListener("click",(t=>{if("LI"===t.target.tagName||"BUTTON"===t.target.tagName){let e;e="LI"===t.target.tagName?t.target:t.target.closest("LI");const s=parseInt(e.id.replace("track-",""),10);this.view.togglePlayBtn(),this.view.setActiveTrack(s),this.model.getTrackNum()===s?this.model.playAudio():(this.model.setTrackNum(s),this.model.isPlaying=!1,this.view.activePlayBtn(),this.play()),!1===this.model.isPlaying?this.view.setPauseToActiveTrack(e.id):this.view.removePauseToActiveTrack(e.id)}}))}play(){this.view.changeTimelineBg(0,1),this.model.initAudio(),this.view.setAudioDuration(this.model.getTrackDuration()),this.model.playAudio(),this.initCurrentTime(),this.model.setTrackVolume(this.model.volume),this.view.setActiveTrack(this.model.getTrackNum()),this.view.setTrackTitle(this.model.getTrackTitle()),this.view.setFullTime(this.model.getTrackFullTime())}initCurrentTime(){setInterval((()=>{const t=this.model.getTimeCode();this.view.setCurrentTime(t)}),500)}changeVolume(){const t=parseFloat(this.view.volumeBar.value,10);0===t?(this.view.setMuted(),this.model.getAudio().muted=!0):(this.view.removeMuted(),this.model.getAudio().muted=!1),this.model.setTrackVolume(t),this.model.volume=t,this.view.changeVolumeBarBg(t)}toggleMute(){this.model.getAudio().muted?(this.model.getAudio().muted=!1,this.model.setTrackVolume(this.model.volume),this.view.volumeBar.value=this.model.volume,this.view.removeMuted(),this.view.changeVolumeBarBg(this.model.volume)):(this.model.volume=this.model.getAudio().volume,this.model.getAudio().muted=!0,this.model.setTrackVolume(0),this.view.volumeBar.value=0,this.view.setMuted(),this.view.changeVolumeBarBg(0))}}(I,E);q.init();const N={en:{todoTitle:"todo",doneTitle:"done",placeholder:"New todo",props:[]},ru:{todoTitle:"Задачи",doneTitle:"Сделано",placeholder:"Новая задача",props:[]}},A=new class{constructor(){this.todoContainer=document.querySelector(".todo-container-js"),this.todoBtn=document.querySelector(".todo-btn-js"),this.todoList=document.querySelector(".todo-list-js"),this.doneList=document.querySelector(".done-list-js"),this.todoTitle=document.querySelector(".todo-title-js"),this.doneTitle=document.querySelector(".todo-title-done-js"),this.input=document.querySelector(".todo-input-js"),this.todoTab=document.querySelector(".tab-todo-js"),this.doneTab=document.querySelector(".tab-done-js")}render(t){let e="",s="";this.todoTitle.textContent=t.todoTitle,this.doneTitle.textContent=t.doneTitle,this.input.setAttribute("placeholder",t.placeholder),t.props.length&&(t.props.forEach((t=>{t.isActive?e+=this.getTaskTemplate(t.text,t.id,t.isActive):s+=this.getTaskTemplate(t.text,t.id,t.isActive)})),this.todoList.innerHTML=e,this.doneList.innerHTML=s)}getTaskTemplate(t,e,s=!0){return`<li class="todo-item ${s?"":"todo-item-done"}" id="${e}">\n      <input class="todo-item-checkbox todo-item-checkbox-js" type="checkbox" name="todo" ${s?"":"checked disabled"}>\n      <div class="todo-item-text todo-item-text-js">\n        <input class="todo-item-input todo-item-input-js" type="text" value="${t}" disabled>\n      </div>\n      <div class="btn-container btn-container-js">\n      ${s?'<button class="todo-edit-btn todo-edit-btn-js"></button>':""}\n        \n        <button class="todo-delete-btn todo-delete-btn-js"></button>\n      </div>\n    </li>`}renderTask(t){const[e,s]=t;this.todoList.insertAdjacentHTML("beforeend",this.getTaskTemplate(e,s,!0))}setEvents(){this.todoBtn.addEventListener("click",(()=>{this.toggleContainer(),this.toggleBtn()})),document.addEventListener("click",(t=>{t.target.classList.contains("todo-btn-js")||t.target.closest(".todo-container-js")||this.closeContainer()})),this.todoTab.addEventListener("click",(()=>{this.doneTab.classList.remove("active"),this.todoTab.classList.add("active"),this.todoList.classList.remove("d-none"),this.doneList.classList.add("d-none"),this.input.removeAttribute("disabled")})),this.doneTab.addEventListener("click",(()=>{this.todoTab.classList.remove("active"),this.doneTab.classList.add("active"),this.todoList.classList.add("d-none"),this.doneList.classList.remove("d-none"),this.input.setAttribute("disabled","")})),this.input.addEventListener("change",(e=>{const i=this.input.value;if(i){const e=t.getId();s.post("add-todo",[i,e]),this.input.value=""}})),this.todoContainer.addEventListener("click",(t=>{if(t.stopPropagation(),t.target.classList.contains("todo-delete-btn-js")){const e=t.target.closest(".todo-item").id;s.post("remove-todo",e)}if(t.target.classList.contains("todo-edit-btn-js")){const e=t.target.closest(".todo-item").id;s.post("edit-todo",e)}if(t.target.classList.contains("todo-item-checkbox-js")){const e=t.target.closest(".todo-item").id;s.post("done-todo",e)}}))}removeTask(t){document.getElementById(t).remove()}editTask(t){const e=document.getElementById(t),i=e.querySelector(".btn-container-js"),o=e.querySelector(".todo-item-input-js"),n=o.value;i.classList.add("hidden"),o.removeAttribute("disabled"),o.scrollLeft=o.scrollWidth,o.setSelectionRange(o.value.length,o.value.length),o.focus(),o.addEventListener("change",(()=>{const e=o.value;e!==n&&s.post("save-task-text",[e,t]),i.classList.remove("hidden"),o.blur()}))}hideBlock(){this.todoContainer.classList.add("hidden"),this.todoBtn.classList.add("hidden")}showBlock(){this.todoContainer.classList.remove("hidden"),this.todoBtn.classList.remove("hidden")}toggleContainer(){this.todoContainer.classList.toggle("open"),this.todoContainer.classList.toggle("closed")}toggleBtn(){this.todoBtn.classList.toggle("active-btn")}closeContainer(){this.todoContainer.classList.remove("open"),this.todoContainer.classList.add("closed")}},D=new class{constructor(){this.lang="en",this.props=N}setLang(t){this.lang=t}getProps(){const t=a.get("todos");return t&&(this.props=t),this.props[this.lang]}addTodo(t){const[e,s]=t;for(let t of Object.values(this.props))t.props.push({text:e,isActive:!0,id:s});a.set("todos",this.props)}removeTodo(t){for(let e of Object.values(this.props)){const s=e.props.find((e=>String(e.id)===String(t)));s&&e.props.splice(e.props.indexOf(s),1)}a.set("todos",this.props)}editTodo(t){const[e,s]=t;for(let t of Object.values(this.props))t.props.find((t=>String(t.id)===String(s))).text=e;a.set("todos",this.props)}doneTodo(t){for(let e of Object.values(this.props))e.props.find((e=>String(e.id)===String(t))).isActive=!1;a.set("todos",this.props)}},$=new class{constructor(t,e){this.model=t,this.view=e}init(){s.subscribe("lang-changed",(t=>{this.model.setLang(t[1]),this.view.render(this.model.getProps())})),s.subscribe("block-todo-changed",(t=>{t?this.view.showBlock():this.view.hideBlock()})),s.subscribe("add-todo",(t=>{this.model.addTodo(t),this.view.renderTask(t)})),s.subscribe("remove-todo",(t=>{this.model.removeTodo(t),this.view.removeTask(t)})),s.subscribe("edit-todo",(t=>{this.view.editTask(t)})),s.subscribe("save-task-text",(t=>this.model.editTodo(t))),s.subscribe("done-todo",(t=>{this.model.doneTodo(t),this.view.render(this.model.getProps())})),this.view.setEvents()}}(D,A);$.init();const M={en:{isActive:!0,categories:["Language","Image sourse","Blocks"],noResultsError:"Nothing found. Please, consider using another tag.",lang:{title:"Language",props:[{text:"English",checked:!0,id:"lang-en"},{text:"Russian",checked:!1,id:"lang-ru"}]},img:{title:"Image sourse",props:[{text:"Github",checked:!0,id:"img-git"},{text:"Unsplash API",checked:!1,id:"img-unsp",tags:!0,addText:"Add your own tags. Enter tags with spaces or commas.",errorMes:"Invalid value. Enter tags in English with spaces or commas."}]},block:{title:"Blocks",props:[{text:"Time",checked:!0,id:"block-time"},{text:"Date",checked:!0,id:"block-date"},{text:"Greeting",checked:!0,id:"block-greet"},{text:"Day quote",checked:!0,id:"block-quote"},{text:"Weather",checked:!0,id:"block-weather"},{text:"Player",checked:!0,id:"block-play"},{text:"Todo",checked:!0,id:"block-todo"}]}},ru:{isActive:!1,categories:["Язык","Изображения","Блоки"],noResultsError:"Ничего не найдено. Пожалуйста, используйте другой тег.",lang:{title:"Язык",props:[{text:"Английский",checked:!1,id:"lang-en"},{text:"Русский",checked:!0,id:"lang-ru"}]},img:{title:"Изображения",props:[{text:"Github",checked:!0,id:"img-git",tags:!0},{text:"Unsplash API",checked:!1,id:"img-unsp",tags:!0,addText:"Добавьте теги. Введите теги через пробел или запятую.",errorMes:"Неверное значение. Введите теги на английском через пробел или запятую."}]},block:{title:"Блоки",props:[{text:"Время",checked:!0,id:"block-time"},{text:"Дата",checked:!0,id:"block-date"},{text:"Приветствие",checked:!0,id:"block-greet"},{text:"Цитата",checked:!0,id:"block-quote"},{text:"Погода",checked:!0,id:"block-weather"},{text:"Проигрыватель",checked:!0,id:"block-play"},{text:"Задачи",checked:!0,id:"block-todo"}]}}},R=new class{constructor(){this.settingsContainer=document.querySelector(".settings-container-js"),this.settingsBtn=document.querySelector(".settings-btn-js"),this.propsTitle=document.querySelector(".props-title-js"),this.propsList=document.querySelector(".list-js"),this.categoriesContainer=document.querySelector(".categories-js"),this.tagsInput=null,this.errorMes=""}initEvents(){document.addEventListener("click",(t=>{t.target.classList.contains("settings-btn-js")||t.target.closest(".settings-container-js")||this.closeContainer()}))}renderProps(t,e){this.propsTitle.textContent=t.title;let s=!1,i=!1,o="",n="";t.props.forEach((t=>{n+=`<li class="list-item ${t.checked?"checked":""}" id="${t.id}">${t.text}<span class="toggle-slider ${t.checked?"toggle-slider-active":""}"></span></li>`,t.checked&&"img-git"===t.id&&(i=!0),t.tags&&(s=!0,o=t.addText,this.errorMes=t.errorMes)})),s&&(n+=`<p class="settings-addtext settings-addtext-js ${i?"hidden":""}">${o}</p>\n      <p class="message message-js hidden">${this.errorMes}</p>\n      <input class="tags tags-js" maxlength="15" type="text" ${i?"disabled":""} value="${e.join(" ")}">`),this.propsList.innerHTML=n,this.setUpInput()}setUpInput(){this.tagsInput=document.querySelector(".tags-js"),this.tagsInput&&(this.tagsInput.addEventListener("change",(()=>{if(this.isValidTags(this.tagsInput.value)){const t=this.tagsInput.value.split(" ");s.post("add-tags",t)}else this.showInvalidMessage()})),this.tagsInput.addEventListener("input",(()=>{this.removeInvalidMessage()})))}isValidTags(t){return/^[a-zA-Z\s,]*$/.test(t)}showInvalidMessage(){this.tagsInput.classList.add("invalid");const t=document.querySelector(".message-js");t.textContent=this.errorMes,t.classList.remove("hidden")}removeInvalidMessage(){this.tagsInput.classList.remove("invalid"),document.querySelector(".message-js").classList.add("hidden")}renderCategories(t){const e=document.querySelectorAll(".categories-item-js");t.forEach(((t,s)=>{e[s].textContent=t}))}toggleContainer(){this.settingsContainer.classList.toggle("open"),this.settingsContainer.classList.toggle("closed")}toggleBtn(){this.settingsBtn.classList.toggle("active-btn")}closeContainer(){this.settingsContainer.classList.remove("open"),this.settingsContainer.classList.add("closed")}toggleCategories(t){document.querySelectorAll(".categories-item-js").forEach((t=>t.classList.remove("active"))),t.classList.add("active")}toggleProps(t){const e=document.querySelector(".tags-js");e&&"img-git"!==t?(document.querySelector(".settings-addtext-js").classList.remove("hidden"),e.removeAttribute("disabled")):e&&(document.querySelector(".settings-addtext-js").classList.add("hidden"),e.setAttribute("disabled",""));const s=document.getElementById(t).firstElementChild;document.querySelectorAll(".toggle-slider").forEach((t=>t.classList.remove("toggle-slider-active"))),s.classList.add("toggle-slider-active")}toggleBlock(t){const e=document.getElementById(t);e.classList.toggle("checked"),e.firstElementChild.classList.toggle("toggle-slider-active")}renderNoResultsError(t){const e=document.querySelector(".message-js");e.textContent=t.noResultsError,e.classList.remove("hidden")}},O=new class{constructor(){this.lang="en",this.langProperties=M,this.tags=[]}initSettings(){const t=a.get("settings");t&&(this.langProperties=t),this.setProps()}setProps(){const t=this.getActiveProps("lang"),e=this.getActiveProps("img");this.getActiveProps("block").props.forEach((t=>s.post(`${t.id}-changed`,t.checked))),[e,t].forEach((t=>{t.props.filter((t=>!0===t.checked)).forEach((t=>this.postEvent(t.id)))}))}getProps(){return this.langProperties[this.lang]}getTags(){const t=a.get("tags");return t&&(this.tags=t),this.tags?this.tags:""}setTags(t){this.tags=t}getCategories(){return this.langProperties[this.lang].categories}setLang(t="en"){this.lang=t}getActiveProps(t="lang"){return this.langProperties[this.lang][t]}setActiveProp(t){const e=t.split("-")[0],s=t.split("-")[1];for(let[i,o]of Object.entries(this.langProperties)){o.isActive=i===s;const n=o[e].props,a=n.find((e=>e.id===t));n.forEach((t=>t.checked=!1)),a.checked=!0}this.postEvent(t)}setActiveBlockProp(t){const e=t.split("-")[0];let i=!1;for(let s of Object.values(this.langProperties)){const o=s[e].props.find((e=>e.id===t));o.checked=!o.checked,i=o.checked}s.post(`${t}-changed`,i)}postEvent(t){const e=t.split("-")[0],i=t.split("-")[1];s.post(`${e}-changed`,[e,i])}saveToStorage(){a.set("settings",this.langProperties)}},W=new class{constructor(t,e){this.model=t,this.view=e}init(){s.subscribe("post-tags",(t=>{this.model.setTags(t)})),s.post("get-tags"),s.subscribe("lang-changed",(t=>{this.model.setLang(t[1]),this.view.renderProps(this.model.getActiveProps(t[0]),this.model.getTags()),this.view.renderCategories(this.model.getCategories())})),s.subscribe("no-serch-results",this.noResultsFound.bind(this)),this.model.initSettings(),this.view.initEvents(),this.view.settingsBtn.addEventListener("click",(t=>{t.stopPropagation(),this.view.toggleContainer(),this.view.toggleBtn()})),this.view.categoriesContainer.addEventListener("click",(t=>{t.stopPropagation(),"LI"===t.target.tagName&&(this.view.toggleCategories(t.target),this.view.renderProps(this.model.getActiveProps(t.target.id),this.model.getTags()))})),this.view.propsList.addEventListener("click",(t=>{if(t.stopPropagation(),"LI"===t.target.tagName||"SPAN"===t.target.tagName){const e=t.target.id||t.target.parentElement.id;"block"===e.split("-")[0]?(this.view.toggleBlock(e),this.model.setActiveBlockProp(e)):(this.view.toggleProps(e),this.model.setActiveProp(e)),this.model.saveToStorage()}}))}noResultsFound(){this.view.renderNoResultsError(this.model.getProps())}}(O,R);W.init()})();