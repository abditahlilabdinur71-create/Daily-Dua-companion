
import { Dua, Reflection } from './types';

export const REFLECTIONS: Reflection[] = [
  {
    id: '1',
    category: 'Purpose',
    prompt: 'If today was your last day, what one act of kindness or worship would you prioritize above all else, and why?',
    explanation: 'This prompt focuses on mortality (Dhikr al-Mawt) to help you prioritize meaningful actions over trivial distractions and live with intentionality.'
  },
  {
    id: '2',
    category: 'Forgiveness',
    prompt: 'Think of someone you find difficult to forgive. What quality of the Divine (e.g., The Most Merciful, The All-Forgiving) can you reflect upon to help soften your heart towards them?',
    explanation: 'This encourages emulating divine attributes in human relationships, fostering emotional healing, humility, and a more compassionate heart.'
  },
  {
    id: '3',
    category: 'Mindfulness',
    prompt: 'Recall a moment today when you felt truly present. Was there a sense of divine presence in that stillness, or did it pass unnoticed?',
    explanation: 'This develops "Muraqabah" (mindfulness of God), helping you find the sacred in the mundane and recognize the divine presence in every moment.'
  },
  {
    id: '4',
    category: 'Knowledge',
    prompt: 'What is one spiritual truth or verse you learned recently that changed how you see the world? How can you live that truth tomorrow?',
    explanation: 'This prompt bridges the gap between intellectual knowledge and practical application (Amal), encouraging you to embody the wisdom you acquire.'
  },
  {
    id: '5',
    category: 'Trust',
    prompt: 'Identify one worry currently weighing on your heart. How would your perspective change if you fully surrendered its outcome to the Best of Planners?',
    explanation: 'This strengthens "Tawakkul" (reliance on God), helping to reduce anxiety and increase inner peace by trusting in a wisdom greater than your own.'
  },
  {
    id: '6',
    category: 'Patience',
    prompt: 'Reflect on a recent delay or disappointment. Can you find a hidden blessing or a lesson in patience that this experience offered you?',
    explanation: 'This cultivates "Sabr" (patience), helping you see trials as opportunities for growth and recognizing that divine timing is always perfect.'
  },
  {
    id: '7',
    category: 'Community',
    prompt: 'Who is one person in your life you often take for granted? How can you show them sincere appreciation or make a small dua for them today?',
    explanation: 'This fosters "Silat al-Rahim" (maintaining ties) and gratitude for the people God has placed in your life, strengthening communal bonds.'
  },
  {
    id: '8',
    category: 'Sincerity',
    prompt: 'Think of a good deed you did recently. Was it done purely for the sake of the Divine, or was there a desire for recognition? How can you purify your intention next time?',
    explanation: 'This focuses on "Ikhlas" (sincerity), ensuring your actions are spiritually grounded and free from the desire for worldly praise.'
  },
  {
    id: '9',
    category: 'Nature',
    prompt: 'Look at a piece of nature today (a tree, a bird, the sky). What does its existence tell you about the creativity and care of the Creator?',
    explanation: 'This encourages "Tafakkur" (reflection on creation), using the natural world as a sign (Ayah) to connect more deeply with the Divine.'
  },
  {
    id: '10',
    category: 'Humility',
    prompt: 'Recall a mistake you made recently. Instead of self-criticism, can you view it as a reminder of your human limitation and a call to return to the All-Sufficient?',
    explanation: 'This transforms failure into "Inabah" (turning back to God), fostering humility and reducing the ego\'s grip on your self-worth.'
  },
  {
    id: '11',
    category: 'Time',
    prompt: 'How much of your day was spent on things that will matter in ten years? How can you reclaim just ten minutes tomorrow for something eternal?',
    explanation: 'This encourages "Muhasabah" (self-accounting) regarding the gift of time, helping you align your daily schedule with your ultimate purpose.'
  },
  {
    id: '12',
    category: 'Speech',
    prompt: 'Reflect on your words today. Did they build others up or tear them down? How can you use your gift of speech more intentionally tomorrow?',
    explanation: 'This focuses on "Hifz al-Lisan" (guarding the tongue), recognizing that our words have a profound impact on our own soul and the souls of others.'
  },
  {
    id: '13',
    category: 'Wealth',
    prompt: 'What is one "luxury" you enjoyed today that many others lack? How can you use a portion of your resources (time, money, or skill) to serve someone in need?',
    explanation: 'This cultivates "Shukr" (gratitude) and "Sadaqah" (charity), reminding you that wealth is a trust to be shared, not just a possession to be kept.'
  },
  {
    id: '14',
    category: 'Inner Peace',
    prompt: 'When your heart feels restless, what is the one "distraction" you usually turn to? What would happen if you turned to "Dhikr" (remembrance) instead?',
    explanation: 'This explores the Quranic truth that "in the remembrance of God do hearts find rest," helping you identify and replace shallow coping mechanisms.'
  },
  {
    id: '15',
    category: 'Legacy',
    prompt: 'If you were to leave this world tomorrow, what is the one positive trait or lesson you would want people to remember you for? Are you living that trait today?',
    explanation: 'This encourages a long-term perspective on character (Akhlaq), motivating you to build a legacy that outlasts your physical presence.'
  }
];

export const DUAS: Dua[] = [
  {
    id: '1',
    title: 'Morning Prayer',
    category: 'Morning',
    arabic: 'اللّهُـمَّ بِكَ أَصْـبَحْنا وَبِكَ أَمْسَـينا، وَبِكَ نَحْـيا وَبِكَ نَمُـوتُ وَإِلَـيْكَ النُّـشُور',
    transliteration: 'Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu wa ilaykan-nushur.',
    translation: 'O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the Final Return.',
    reference: 'Abu Dawud, At-Tirmidhi'
  },
  {
    id: '2',
    title: 'Before Sleeping',
    category: 'Sleep',
    arabic: 'بِاسْمِكَ اللّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismika Allahumma amutu wa ahya.',
    translation: 'In Your Name, O Allah, I die and I live.',
    reference: 'Al-Bukhari'
  },
  {
    id: '3',
    title: 'For Travel',
    category: 'Travel',
    arabic: 'سُبْحانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
    transliteration: 'Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinina. Wa inna ila Rabbina lamunqalibun.',
    translation: 'Glory is to Him Who has subjected this to us, as we could never have done it by our own efforts. And surely, to our Lord we are returning.',
    reference: 'Muslim'
  },
  {
    id: '4',
    title: 'In Times of Grief',
    category: 'Hardship',
    arabic: 'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي، وَأَخْلِفْ لِي خَيْرًا مِنْهَا',
    transliteration: 'Inna lillahi wa inna ilayhi rajiun. Allahumma-jurni fi musibati, wakhluf li khayran minha.',
    translation: 'To Allah we belong and unto Him is our return. O Allah, recompense me for my affliction and replace it for me with something better.',
    reference: 'Muslim'
  },
  {
    id: '5',
    title: 'For Increasing Knowledge',
    category: 'General',
    arabic: 'رَّبِّ زِدْنِي عِلْمًا',
    transliteration: 'Rabbi zidni ilman.',
    translation: 'My Lord, increase me in knowledge.',
    reference: 'Surah Ta-Ha 20:114'
  },
  {
    id: '6',
    title: 'Evening Prayer',
    category: 'Evening',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration: 'Amsayna wa amsal-mulku lillahi, wal-hamdu lillahi, la ilaha illallahu wahdahu la sharika lahu.',
    translation: 'We have entered the evening and at this very time the whole kingdom belongs to Allah. All praise is due to Allah. There is no god but Allah, the One, having no partner with Him.',
    reference: 'Muslim'
  },
  {
    id: '7',
    title: 'After Waking Up',
    category: 'Sleep',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Alhamdu lillahil-ladhi ahyana ba\'da ma amatana wa ilayhin-nushur.',
    translation: 'Praise is to Allah Who gives us life after He has caused us to die and to Him is the return.',
    reference: 'Al-Bukhari'
  },
  {
    id: '8',
    title: 'For Parents',
    category: 'General',
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbi irhamhuma kama rabbayani saghira.',
    translation: 'My Lord, have mercy upon them as they brought me up [when I was] small.',
    reference: 'Surah Al-Isra 17:24'
  },
  {
    id: '9',
    title: 'For Forgiveness',
    category: 'General',
    arabic: 'رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
    transliteration: 'Rabbana-ghfir li wa liwalidayya wa lil-mu\'minina yawma yaqumul-hisab.',
    translation: 'Our Lord, forgive me and my parents and the believers the Day the account is established.',
    reference: 'Surah Ibrahim 14:41'
  },
  {
    id: '10',
    title: 'For Gratitude',
    category: 'Gratitude',
    arabic: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ',
    transliteration: 'Rabbi awzi\'ni an ashkura ni\'matakal-lati an\'amta \'alayya wa \'ala walidayya.',
    translation: 'My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents.',
    reference: 'Surah Al-Ahqaf 46:15'
  },
  {
    id: '11',
    title: 'Before Eating',
    category: 'General',
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillah.',
    translation: 'In the Name of Allah.',
    reference: 'Abu Dawud, At-Tirmidhi'
  },
  {
    id: '12',
    title: 'After Eating',
    category: 'Gratitude',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    transliteration: 'Alhamdu lillahil-ladhi at\'amana wa saqana wa ja\'alana muslimin.',
    translation: 'Praise is to Allah Who has fed us and given us drink and made us Muslims.',
    reference: 'Abu Dawud, At-Tirmidhi'
  },
  {
    id: '13',
    title: 'Entering the Mosque',
    category: 'General',
    arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    transliteration: 'Allahumma-ftah li abwaba rahmatik.',
    translation: 'O Allah, open the gates of Your mercy for me.',
    reference: 'Muslim'
  },
  {
    id: '14',
    title: 'Leaving the Mosque',
    category: 'General',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
    transliteration: 'Allahumma inni as\'aluka min fadlik.',
    translation: 'O Allah, I ask You from Your favor.',
    reference: 'Muslim'
  },
  {
    id: '15',
    title: 'For Protection',
    category: 'General',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Bismillahil-ladhi la yadurru ma\'as-mihi shay\'un fil-ardi wa la fis-sama\'i wa Huwas-Sami\'ul-\'Alim.',
    translation: 'In the Name of Allah, Who with His Name nothing can cause harm in the earth nor in the heavens, and He is the All-Hearing, the All-Knowing.',
    reference: 'Abu Dawud, At-Tirmidhi'
  },
  {
    id: '16',
    title: 'Entering the Home',
    category: 'General',
    arabic: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
    transliteration: 'Bismillahi walajna, wa bismillahi kharajna, wa \'ala-llahi Rabbina tawakkalna.',
    translation: 'In the Name of Allah we enter, and in the Name of Allah we leave, and upon our Lord we rely.',
    reference: 'Abu Dawud'
  },
  {
    id: '17',
    title: 'Leaving the Home',
    category: 'General',
    arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'Bismillahi tawakkaltu \'alallahi, la hawla wa la quwwata illa billah.',
    translation: 'In the Name of Allah, I have placed my trust in Allah, there is no might and no power except by Allah.',
    reference: 'Abu Dawud, At-Tirmidhi'
  },
  {
    id: '18',
    title: 'Entering the Toilet',
    category: 'General',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
    transliteration: 'Allahumma inni a\'udhu bika minal-khubuthi wal-khaba\'ith.',
    translation: 'O Allah, I seek refuge with You from the male and female devils.',
    reference: 'Al-Bukhari, Muslim'
  },
  {
    id: '19',
    title: 'Leaving the Toilet',
    category: 'General',
    arabic: 'غُفْرَانَكَ',
    transliteration: 'Ghufranak.',
    translation: 'I ask You for Your forgiveness.',
    reference: 'Abu Dawud, At-Tirmidhi'
  },
  {
    id: '20',
    title: 'After Adhan',
    category: 'General',
    arabic: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ',
    transliteration: 'Allahumma Rabba hadhihid-da\'watit-tammah, was-salatil-qa\'imah, ati Muhammadan al-wasilata wal-fadhilah, wab\'ath-hu maqaman mahmudan al-ladhi wa\'adtah.',
    translation: 'O Allah, Lord of this perfect call and established prayer, grant Muhammad the intercession and favor, and raise him to the honored station You have promised him.',
    reference: 'Al-Bukhari'
  },
  {
    id: '21',
    title: 'For Anxiety and Stress',
    category: 'Hardship',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
    transliteration: 'Allahumma inni a\'udhu bika minal-hammi wal-hazani, wal-\'ajzi wal-kasali, wal-bukhli wal-jubni, wa dala\'id-dayni wa ghalabatir-rijal.',
    translation: 'O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men.',
    reference: 'Al-Bukhari'
  },
  {
    id: '22',
    title: 'For Good in Both Worlds',
    category: 'General',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina \'adhaban-nar.',
    translation: 'Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.',
    reference: 'Surah Al-Baqarah 2:201'
  },
  {
    id: '23',
    title: 'For Guidance',
    category: 'General',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى',
    transliteration: 'Allahumma inni as\'alukal-huda wat-tuqa wal-\'afafa wal-ghina.',
    translation: 'O Allah, I ask You for guidance, piety, chastity and self-sufficiency.',
    reference: 'Muslim'
  },
  {
    id: '24',
    title: 'For Protection from Debt',
    category: 'Hardship',
    arabic: 'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
    transliteration: 'Allahumma-kfini bihalalika \'an haramika, wa aghnini bifadlika \'amman siwak.',
    translation: 'O Allah, suffice me with Your lawful self-sufficiency from Your unlawful, and make me independent by Your grace from anyone other than You.',
    reference: 'At-Tirmidhi'
  },
  {
    id: '25',
    title: 'For Ease in All Matters',
    category: 'General',
    arabic: 'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا',
    transliteration: 'Allahumma la sahla illa ma ja\'altahu sahlan, wa Anta taj\'alul-hazna idha shi\'ta sahlan.',
    translation: 'O Allah, there is no ease except in that which You have made easy, and You make the difficulty, if You wish, easy.',
    reference: 'Ibn Hibban'
  },
  {
    id: '26',
    title: 'Entering the Market',
    category: 'General',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: 'La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu, yuhyi wa yumitu, wa Huwa hayyun la yamutu, biyadihil-khayru, wa Huwa \'ala kulli shay\'in Qadir.',
    translation: 'There is no god but Allah, alone, without partner. His is the sovereignty and His is the praise. He gives life and He gives death, and He is Ever-Living and does not die. In His Hand is all good and He is over all things powerful.',
    reference: 'At-Tirmidhi'
  },
  {
    id: '27',
    title: 'Wearing New Clothes',
    category: 'General',
    arabic: 'اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ',
    transliteration: 'Allahumma lakal-hamdu Anta kasawtanihi, as\'aluka min khayrihi wa khayri ma suni\'a lahu, wa a\'udhu bika min sharrihi wa sharri ma suni\'a lahu.',
    translation: 'O Allah, praise is to You. You have clothed me with it. I ask You for its goodness and the goodness of what it was made for, and I seek Your refuge from its evil and the evil of what it was made for.',
    reference: 'Abu Dawud, At-Tirmidhi'
  },
  {
    id: '28',
    title: 'Breaking the Fast',
    category: 'General',
    arabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ',
    transliteration: 'Dhahabaz-zama\'u wabtallatil-\'uruqu, wa thabatal-ajru in sha\' Allah.',
    translation: 'The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills.',
    reference: 'Abu Dawud'
  },
  {
    id: '29',
    title: 'Visiting the Sick',
    category: 'General',
    arabic: 'لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ',
    transliteration: 'La ba\'sa tahurun in sha\' Allah.',
    translation: 'Do not worry, it will be a purification (for you), Allah willing.',
    reference: 'Al-Bukhari'
  },
  {
    id: '30',
    title: 'For Rain',
    category: 'General',
    arabic: 'اللَّهُمَّ اسْقِنَا غَيْثًا مُغِيثًا مَرِيئًا مَرِيعًا نَافِعًا غَيْرَ ضَارٍّ عَاجِلًا غَيْرَ آجِلٍ',
    transliteration: 'Allahummas-qina ghaythan mughithan mari\'an mari\'an nafi\'an ghayra darrin \'ajilan ghayra ajilin.',
    translation: 'O Allah, bless us with a rain that is helpful, pleasant, productive, beneficial and not harmful, immediately and not delayed.',
    reference: 'Abu Dawud'
  },
  {
    id: '31',
    title: 'When it Thunders',
    category: 'General',
    arabic: 'سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ',
    transliteration: 'Subhanal-ladhi yusabbihur-ra\'du bihamdihi wal-mala\'ikatu min khifatih.',
    translation: 'Glory is to Him Whom the thunder glorifies with His praise and the angels from fear of Him.',
    reference: 'Muwatta Malik'
  },
  {
    id: '32',
    title: 'When it is Windy',
    category: 'General',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّهَا',
    transliteration: 'Allahumma inni as\'aluka khayraha, wa a\'udhu bika min sharriha.',
    translation: 'O Allah, I ask You for its goodness and I seek Your refuge from its evil.',
    reference: 'Abu Dawud, Ibn Majah'
  },
  {
    id: '33',
    title: 'Entering a Graveyard',
    category: 'General',
    arabic: 'السَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ، وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَاحِقُونَ، أَسْأَلُ اللَّهَ لَنَا وَلَكُمُ الْعَافِيَةَ',
    transliteration: 'Assalamu \'alaykum ahlad-diyari minal-mu\'minina wal-muslimina, wa inna in sha\' Allahu bikum lahiquna, as\'alullaha lana wa lakumul-\'afiyah.',
    translation: 'Peace be upon you, O inhabitants of the abodes, from the believers and the Muslims. And we, if Allah wills, are joining you. I ask Allah for well-being for us and for you.',
    reference: 'Muslim'
  },
  {
    id: '34',
    title: 'When Sneezing',
    category: 'General',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdu lillah.',
    translation: 'Praise is to Allah.',
    reference: 'Al-Bukhari'
  },
  {
    id: '35',
    title: 'When Someone Else Sneezes',
    category: 'General',
    arabic: 'يَرْحَمُكَ اللَّهُ',
    transliteration: 'Yarhamukallah.',
    translation: 'May Allah have mercy on you.',
    reference: 'Al-Bukhari'
  }
];

export const SALAH_NAMES = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'tahajjud'] as const;
