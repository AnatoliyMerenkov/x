/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Griefing_DOBRIAK.ts":
/*!*********************************!*\
  !*** ./src/Griefing_DOBRIAK.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

let Griefing_DOBRIAK = {};
var intellectualInsult;
(function (intellectualInsult) {
    const path = ['Custom Scripts', 'Griefing'];
    let myHero, myPlayer;
    let ENABLE = Menu.AddToggle([...path, 'DOBRIAK'], 'Enable', false)
        .SetNameLocale('ru', 'Включить')
        .OnChange(state => {
        ENABLE = state.newValue;
    })
        .GetValue();
    let ENABLE_DieEnemy = Menu.AddToggle([...path, 'DOBRIAK'], 'Send when killing (enemy)', false)
        .SetNameLocale('ru', 'Отправлять при смерти (врага)')
        .SetTip('Всегда Общий чат', 'ru')
        .SetTip('Always a General Chat', 'en')
        .OnChange(state => {
        ENABLE_DieEnemy = state.newValue;
    })
        .GetValue();
    let ENABLE_DieAlly = Menu.AddToggle([...path, 'DOBRIAK'], 'Send at death', false)
        .SetNameLocale('ru', 'Отправлять при смерти (Союзника)')
        .SetTip('Всегда Союзный чат', 'ru')
        .SetTip('Always a Ally Chat', 'en')
        .OnChange(state => {
        ENABLE_DieAlly = state.newValue;
    })
        .GetValue();
    let Bind = Menu.AddKeyBind([...path, 'DOBRIAK'], 'Bind (All Chat)', Enum.ButtonCode.KEY_NONE).SetNameLocale('ru', 'Бинд');
    let SendToChat = Menu.AddComboBox([...path, 'DOBRIAK'], 'Which chat should I send to', ['General', 'Ally'], 1)
        .SetNameLocale('ru', 'В какой чат отправлять')
        .SetComboBoxLocale('ru', ['Общий', 'Союзный'])
        .OnChange(state => SendToChat = state.newValue)
        .GetValue();
    Griefing_DOBRIAK.OnUpdate = () => {
        if (!myHero || !ENABLE)
            return;
        if (Bind.IsKeyDownOnce()) {
            SendPhrases();
        }
    };
    Griefing_DOBRIAK.OnFireEvent = (e) => {
        if (!myHero || !ENABLE)
            return;
        if (e.name == 'dota_player_kill') {
            if (ENABLE_DieEnemy) {
                let enemy = EntitySystem.GetPlayersList().find(x => !myHero.IsSameTeam(x) && x.GetPlayerID() == e.GetInt('victim_userid'));
                if (enemy)
                    SendPhrases(false);
            }
            if (ENABLE_DieAlly) {
                let enemy = EntitySystem.GetPlayersList().find(x => myHero.IsSameTeam(x) && x.GetPlayerID() == e.GetInt('victim_userid'));
                if (enemy)
                    SendPhrases(true);
            }
        }
    };
    Griefing_DOBRIAK.OnScriptLoad = Griefing_DOBRIAK.OnGameStart = () => {
        myHero = EntitySystem.GetLocalHero();
        if (myHero) {
            myPlayer = EntitySystem.GetLocalPlayer();
        }
    };
    Griefing_DOBRIAK.OnGameEnd = () => {
        myHero = null;
    };
    RegisterScript(Griefing_DOBRIAK);
    function SendPhrases(allyChat = SendToChat == 1, index = null) {
        Chat.Say(allyChat ? 'DOTAChannelType_GameAllies' : 'DOTAChannelType_GameAll', dobriakPhrases[index ? index : Math.floor(Math.random() * dobriakPhrases.length)]);
    }
    let dobriakPhrases = [
        'Я всегда буду на твоей стороне, если тебе нужна моя помощь, то только дай знать.',
        'Мне очень жаль, что все так вышло. Но ты очень сильный человек, который сможет справиться с этим.',
        'Царь Соломон говорил: «Всё проходит. И это пройдёт».',
        'Просто держись и со временем все станет лучше, пусть сегодня это тяжело.',
        'Как же тебе тяжело. Но пройдут дни и месяцы, как улыбка снова будет на твоем лице.',
        'Ты обязательно справишься и пройдешь через все это. Тебе очень тяжело, но крепись.',
        'Я даже не представляю, как тебе плохо сейчас. Пожалуйся прими мою поддержку и руку помощи.',
        'Через месяцы и годы горечь уйдет, а ты будешь счастливым, а все наладится.',
        'Безвыходных ситуаций не бывает. Мы сможем все решить и когда-то будет вспоминать эти времена с улыбкой.',
        'Сейчас это тебя тревожит и волнует, но через год ты над этим рассмеешься. Зачем тратить время, если посмеяться можно уже сейчас?',
        'Никто не может изменить прошлое и переписать начало жизни. Но каждый может изменить текущую жизнь и изменить финал истории. Все у тебя будет замечательно.',
        'Тебе тяжело, то ты очень сильный. Купи себе большую биту, чтобы у твоих проблем были проблемы с тобой. Жизнь продолжается.',
        'У тебя были трудные моменты, но они остались позади. Спустя какое-то время все эти неприятности останутся позади в прошлом размытым пятном.',
        'Сейчас тебе сложно, но обязательно в будущем твое изменится. Твоя душа и тело постепенно восстановятся.',
        'Беспокойство не освобождает от будущих неприятностей. Оно только лишает тебя сил.',
        'Я верю в то, что все будет хорошо. Ты справишься, а неприятности останутся позади.',
        'Цель каждого человека стать счастливым. У тебя обязательно получится со временем, когда горести немного позабудутся.',
        'Драгоценный камень не может стать таким без трения, а человек без испытаний. Держись.',
        'Есть много примеров, кто сталкивался с подобным. В конце концов они все находили себя и выбирались из этой тяжелой ситуации.',
        'Я уже давно не переживаю из-за ситуаций, которые лежат вне моего контроля. Просто отпусти ситуацию и двигайся дальше.',
        'Я горжусь тобой, как ты держишься после того, что перенес. Ты сильный человек, который сможет побороть все горести и неприятности.',
        'Даже если ты споткнулся на пути к мечте, ты продвинулся вперед.',
        'Для счастья человеку многое не нужно. Требуется только яркое солнце, свежий воздух и немного отдыха. Просто возьми паузу и немногого отдохни. У тебя все наладится.',
        'Сочувствую твоим потерям. Я не знаю, как облегчить боль, но желаю тебе душевной силы. Жизнь продолжается.',
        'Лучший способ избавиться от боли – это почувствовать и принять ее. Выйди за нее пределы.',
        'Если проблемы нельзя решить, то о ней не стоит беспокоиться. Расслабься и плыви по течению.',
        'Все, что не делается – то к лучшему. А что не произошло, то на пользу.',
        'У нас нет защитного панциря от проблем, но мы должны уметь прощать и отпускать все слои печали. Ты можешь смириться и отпустить все прошлое.',
        'Не отчаивайся. Тебя впереди ждет только самое лучшее. Ты мне веришь?',
        'Не смей сдаваться и отчаиваться. Каждый день появляются новые возможности и технологии двигаются вперед. Что еще сегодня кажется невозможным, завтра станет реальностью.',
        'Какие слова поддержки сказать тебе? Мы приложим все усилия для борьбы с этой проблемой. Все будет супер.',
        'Каждое поражение несет в себе семена будущей победы. Я в тебя верю.',
        'Если ты споткнулся и упал – это не беда. Беда, если ты сдался и не пошел дальше.',
        'Такое случалось у многих других, но все в конце образовывалось. У тебя все наладится.',
        'Пока мы крутим педали к цели, порой цепь соскальзывает и колеса пробиваются. Но ты не должен забывать о прекрасном, что открывается каждый день за новым поворотом дороги.',
        'Не переживай ты так. Когда уходят одни возможности, всегда появляются другие.',
        'Жизнь нам наносит болезненные удар, но нужно учиться держать удар.',
        'Я буду на твоей стороне, а значит мы победим все сложности.',
        'Помни о том, что любой минус можно превратить в плюс.',
        'Слова поддержки в трудную минуту тебя не утешат, но знай, что я всегда будут рядом с тобой.',
        'Хватит тратить жизнь на горести и печали. Время улыбнуться и идти по жизни дальше.',
        'Ты заслуживаешь лучшей доли, а значит все что случилось – к лучшему.',
        'Жизнь иногда похожа на страдание, но она бесценна. Давай радоваться и наслаждаться ей.',
        'Пройдет время, а ты даже не вспомнишь об этом. Все горести унесет песок времени.',
        'Попробуй посмотреть на ситуацию с другой стороны. Ты имеешь то, что не дано всем. У тебя есть здоровье, внешность, ум, характер, чувство юмора. С такими качествами тебе море по колено.',
        'Направь свою печаль и грев на что-то позитивное.',
        'Если радость на всех одна, на всех и беда одна. Я всегда подставлю свое плечо, мой друг.',
        'Проблемы всегда предшествуют большим переменам. Значит тебе ждет много прекрасного и невероятного.',
        'Важное не то что позади тебя, а что внутри. Ты сможешь побороть это.',
        'Сейчас у тебя проблемы, но завтра в дверь обязательно постучат радость и счастье.',
        'Дорогу осилит идущий. Я помогу пройти тебе дорогу, чтобы она оказалась как можно приятнее и веселее. Вдвоем всегда легче.',
        'Не стоит себя винить в том, что произошло. Чувство вины мешает исправлять проблемы, а значит не стоит впадать в депрессию.',
        'Это неприятности для всех нас стали потрясением. Но я надеюсь, что мы стойко перенесем выпавшие на нашу судьбу горести.',
        'Держи нос выше. Не погружайся в уныние, ведь оптимистам всегда приходит удача на помощь.',
        'Когда совсем плохо, то просто нужно поднять голову. Ты увидишь свет.',
        'Жизненные неудачи? Ты можешь уже быть близким успеху, а поэтому не сдавайся.',
        'Сейчас сложно принять этим мысли, но ты избавишься от всех проблем в самом ближайшем будущем.',
        'Теперь острая фаза неприятностей пройдена, а значит нужно двигаться дальше.',
        'Нельзя найти место, где тебе будет хорошо. Нужно создавать хорошо самому в любом месте.',
        'Сила воли, положительные мысли и оптимизм способны на многое. У тебя все наладится.',
        'Вспомни о своих прошлых проблемах. Тогда тебе казалось, что жизнь кончена, но сейчас это воспринимается как мелкая неприятность. Так будет и с сегодняшними бедами.',
        'Слова поддержки сложно найти. Но стоит помнить о том, что жизнь продолжается даже тогда, когда все против тебя. Ты сможешь двинуться дальше несмотря ни на что.',
        'Я не могу оставить тебя в таком состоянии. Я переживаю и желаю тебе всего самого лучшего.',
        'Используй камни, что в тебя кидают недоброжелатели для фундамента своего светлого будущего.',
        'Не смей отчаиваться и сдаваться. Все решаемо.',
        'Если ты не можешь изменить ситуацию, то просто переступи через нее и иди дальше.',
        'Самые сильные люди – это те, кто не сдается в даже самых сложных битвах. Ты один из них.',
        'С твоим опытом, умом и способностями ты найдешь себе место под солнцем. Я не удивлюсь, если через год ты будешь счастлив, что все так случилось.',
        'Самая большая ошибка в жизни – это боязнь ошибаться. Ты был смелый, что хотя бы попробовал.',
        'Завтра опять взойдет солнце, несмотря ни на что.',
        'Что случилось, то случилось. Здесь ничего поделать нельзя. Смирись с этим и двигайся дальше.',
        'Все проблемы несоизмеримы малы в сравнении с нашей внутренней силой.',
        'Все, что мы оставили в прошлом, нам совсем ненужно в будущем.',
        'Если ты будешь волноваться, то проблемы только ухудшаться и здоровье тоже. Направь свои силы и мысли на что-то более приятное. У тебя много талантов и возможностей, чтобы не скучать.',
        'Выше нос. Твоя грустная рожица не способствуют светлому будущему. У тебя все обязательно образуется, а я помогу тебе в этом.',
        'Давай придумаем вместе повод для улыбки.',
        'Не стоит беспокоиться из-за вещей, которые уже произошли. Нужно жить настоящим и двигаться дальше.',
        'Избавься от несчастных мыслей и сожалений. Это будет актом доброты и заботы к себе.',
        'Будут времена, когда все будет хорошо. Главное немного потерпеть.',
        'Никто не бывает слишком старым или плохим для того, чтобы начать все сначала.',
        'сли ты грустишь, то можешь упустить чудо, которое постучится тебе в дверь.',
        'Крепись. Не знает силы своей тот, кто не встретил невзгод.',
        'Я всегда рядом. У тебя есть я. Ты всегда можешь рассчитывать на мою помощь. Мы справимся.',
        'В трудную минуту сложно трезво воспринимать величину горестей. Давай хорошо подумаем, как можно решить твои сложности и перипетии.',
        'Проблемы уже свершились, а значит мы не сможем на них повлиять. Это словно пепел, который уже нельзя поджечь. Давай отпустим все это.',
        'Твои горести и проблемы не смогут уйти быстро. Но мы можем принять их и смириться с ними. Давай изменим наше отношение к неприятностям.',
        'Проблемы нам даются свыше, чтобы мы научились преодолевать их.',
        'Не замыкайся в себе и не варись в своем соку. У тебя нелегкие времена, но в эту трудную минуту я готов подставить тебе свое плечо помощи.',
        'Молись не о легкой жизни, а о силе вынести тяжелую.',
        'Любая проблема может оказаться тем, что поможет тебе перейти на новый жизненный этап.',
        'Не впадай в депрессию. Ты намного сильнее, чем думаешь. Все трудности тебя только закалят, словно ты кремень или алмаз.',
        'Очень грустно, что все так произошло, но это в прошлом. Давай подумаем над тем, как изменить ситуацию в настоящем.',
        'Давай верить лучшее. Все тучи быстро развеются и выйдет солнце.',
        'Каждый финиш, пусть даже неудачный, будет стартом для чего-то нового.',
        'Я всегда восхищался тобой и тем, как ты выходил из сложных ситуаций. Я верю в твои силы и внутренние ресурсы.',
        'Трудные времена создают для нас возможности. Я в тебя верю.',
        'Люди несчастливы и счастливы настолько, насколько они решили быть. Давай будет на стороне счастья?',
        'Помни о том, что даже в самые худшие дни всего 24 часа.',
        'Никто не знает, как так вышло. Если я могу чем-то помочь, то скажи мне.',
        'Судьба человека, который сидит на одном месте, тоже с места не сдвигается.',
        'Я вместе с тобой, а значит помогу приблизить светлые времена. Через год мы будем улыбаться, вспоминая этот вечер.',
        'Как поддержать приятеля, если у него грустное настроение? Давай я куплю пива или чего покрепче, а затем будет болтать по душам?',
        'Все что произошло с тобой совсем несправедливо. Но тебе нужно двигаться дальше, чтобы найти себя в другом месте.',
        'Поверь в то, что тебе есть ради чего жить, а твоя вера поможет стать этому реальностью.',
        'Ты попадал и в худшие ситуации, а значит сможешь выбраться.',
        'Надо посмотреть на ситуацию с д другой стороны. Для гусеницы – это может быть концом, а для бабочки – это самое начало.',
        'Тебе очень не повезло, а я сожалею. Но в эту сложную минуту всегда есть слова поддержки.',
        'Ты никогда не узнаешь, насколько силен, пока не попробуешь.',
        'Даже сложности и проблемы бывают нужны нам для того, чтобы понять самые важные вещи в жизни.',
        'Тебе очень тяжело сейчас. Я могу тебе чем-то помочь?',
        'Мне очень жаль, что у тебя такие неприятности. Но не стоит падать духом. Борись, друг. Если ты чего-то захочешь, то сама Вселенная придет тебе на помощь.',
        'Прощение не изменит твоего прошлого, но изменит твое будущее. Прости себя.',
        'Данная трудная ситуация – это только глава твоей жизни, а не вся ее книга.',
        'Все эти трудности временные, а ты это прекрасно знаешь. Когда-то и на нашей улице перевернется самосвал с пряниками.',
        'Тебе нечего грустить и бояться. Проблемы – это не остановки, а только рекомендации.',
        'Чем выше трудности, тем больше славы в преодолении тяжестей.',
        'Сколько возможностей и прекрасного упустишь, если будешь загоняться по этому поводу?',
        'Судьба знала, что тебе понадобится помощь, а поэтому послала тебя мне на помощь. Ты можешь рассчитывать на меня в любых вопросах.',
        'Твои волнения совершенно бессмысленны. Ты оказался в ситуации, которую не сможешь изменить, а значит лучше отпустить.',
        'У тебя не должно быть времени на печаль, раздумья и беспокойство, когда нужно действовать!',
        'Не разрешай себе сдаваться и впадать в депрессию. Ты верь в лучшее, а оно обязательно придет.',
        'Чему быть, тому не миновать. Все это мешало тебе раскрыть потенциал, а в теперь ты свободен.',
        'Это беда, но ты забыл считать хорошие вещи в твоей жизни. Их гораздо больше, чем ты думаешь.',
        'Неважно насколько медленно ты двигаешься. Важно направление и постоянство движения.',
        'Мои слова не облегчат твою ношу, но я всегда с тобой. Помни об этом.',
        'Не отчаивайся. Тебя впереди ждет только самое лучшее. Ты мне веришь?',
        'Сложно даже представить, что испытываешь и чувствуешь ты. Если понадобится моя поддержка, только скажи.',
        'Твоя неудача – это только трамплин к успеху.',
        'Падай 9 раз, а вставай 10. Не теряй веры в себя.',
        'Никогда, никогда, никогда не сдавайся.',
        'Мне жаль, что тебе пришлось с толкнуться с этим, но это воля судьбы.',
        'Иногда ты не осознаешь свою собственную силу и свою мощь. Не сдавайся, ведь если это тебя не убивает, то определенно делает сильнее.',
        'Будет ли иметь это значение через год или пять лет? Если нет, то не стоит переживать почем зря.',
        'Кто угодно может сдаться, но вот встретиться со сложностями лицом к лицу могут немногие.',
        'Жизнь иногда бросает нам вызовы, которые приходится принимать. Это жизнь, но мы становимся сильнее.',
        'Сложности должны мотивировать, а не обескураживать. Ты растешь, когда тяготы жизни пытаются тебя сломить.',
        'Тяжелые и сложные времена не длятся вечно, а за темными временами приходят светлые и счастливые.',
        'Когда-то ты вспомнишь об этом времени с улыбкой. Так что не затягивай, а улыбнись прямо сейчас.',
        'Оставайся сильным, ведь так или иначе все уже в прошлом.',
        'Все лучшее приходит через изменения и борьбу.',
        'За любой зимой всегда придет теплое и солнечное лето.',
        'Тебе дана жизнь, а ты достаточно силен, чтобы перенести все ее тяготы. Это все пройдет и останется в прошлом.',
        'Мечтай, как будто будешь жить вечно. А живи и действуй так, словно ты умрешь уже сегодня вечером.',
        'Бог дал, бог взял. Все согласно его воле.',
        'Временя страданий становятся, в конце концов, твоей сильной стороной.',
        'Нет ничего прекрасней улыбки, которую мы делаем сквозь слезы.',
        'Проблема – это возможность сделать всевозможное.',
        'Твоя сила внутри тебя, погрусти и затем двигайся дальше.',
        'То, что гусеница называет концом света, бабочка называет началом новой жизни.',
        'Беспокойство не освобождает от сложностей, оно лишь отнимает силы.',
        'Прими достойно то, что происходит. Все что не случается, все к лучшему.',
        'Терпения тебе, мой друг. Пусть пребудет с тобой мудрость и умение воспринимать судьбу как должное.',
        'Мне сложно найти слова поддержки и утешения, но помни о том, что я всегда на твоей стороне и помогу тебе.',
        'Все что не убивает, то делает нас сильнее, мудрее, опытнее, лучше. Не вешай нос, ведь лучшее и счастливое всегда впереди.',
        'Порой кажется, что небеса упали на тебя и все плохо плачевно. Но не думай об этом так. Это в жизни каждый за себя, а Бог за всех.'
    ];
})(intellectualInsult || (intellectualInsult = {}));


/***/ }),

/***/ 0:
/*!***************************************!*\
  !*** multi ./src/Griefing_DOBRIAK.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/Griefing_DOBRIAK.ts */"./src/Griefing_DOBRIAK.ts");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dyaWVmaW5nX0RPQlJJQUsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnREFBZ0QiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIifQ==