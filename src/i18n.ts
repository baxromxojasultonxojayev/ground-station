import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  uz: {
    translation: {
      app: {
        unknownArea: 'Nomaʼlum hudud',
        detecting: 'Aniqlanmoqda...',
        target: 'NISHON',
        active: 'Faol',
        errorNetwork: 'Xatolik (Tarmoq)',
        targetDestroyed: 'NISHON YO\'Q QILINDI',
        dronesHit: '{{count}} ta drondan {{count}} tasi nishonga borib tegdi va nishon muvaffaqiyatli yo\'q qilindi.',
        confirmOk: 'TASDIQLASH (OK)',
        page: 'SAHIFA',
        underConstruction: 'Ushbu sahifa hozirda ishlab chiqilmoqda...'
      },
      topbar: {
        alt: 'BAL',
        spd: 'TEZ',
        sys: 'SIST',
        gnss: 'GNSS',
        sign: 'SIGN',
        com: 'ALOQ',
        eng: 'MOT',
        aux: 'YORD',
        loc: 'JOY',
        man: 'QO\'L',
        autonomous: 'AVTONOM',
        routeTracking: 'YO\'NALISH KUZATUV',
        circle: 'AYLANA'
      },
      footer: {
        missionControl: 'MISSIYA BOSHQARUVI',
        danger: 'XAVF',
        path: 'YO\'L',
        orbit: 'ORBITA',
        pist: 'PIST',
        msn: 'MSN',
        home: 'UYGA',
        flar: 'FLAR',
        pass: 'O\'TISH',
        appr: 'APPR',
        quick: 'TEZKOR',
        engine: 'DVIGATEL',
        throttle: 'GAZ',
        temp: 'TEMP',
        pressure: 'BOSIM',
        env: 'MUHIT',
        kmh: 'KM/SOAT',
        humidity: 'NAMLIK',
        visibility: 'KO\'RINISH',
        airspeed: 'TEZLIK',
        roll: 'EGILISH',
        pitch: 'TANGA',
        altitude: 'BALANDLIK',
        commEnergy: 'ALOQA VA ENERGIYA',
        power: 'QUVVAT',
        signalQuality: 'SIGNAL SIFATI',
        nav: 'NAVIGATSIYA',
        north: 'SH',
        northeast: 'SHQ',
        south: 'J',
        west: 'G',
        status: 'HOLAT',
        vspeed: 'V.TEZLIK',
        server: 'SERVER',
        unauthorizedTracking: 'RUXSATSIZ KUZATUV'
      },
      warehouse: {
        title: 'DRONLAR OMBORI',
        stock: 'ZAXIRA',
        selectedCount: '{{count}} TA TANLANDI',
        selected: 'TANLANGAN',
        select: 'TANLASH',
        missionPlan: 'MISSIYA REJALASHTIRISH',
        selectTargetCoord: 'Xaritadan nishon kordinatasini belgilang',
        droneCount_one: '{{count}} TA DRON',
        droneCount_other: '{{count}} TA DRON',
        launchDrones_one: '{{count}} TA DRONNI UCHIRISH',
        launchDrones_other: '{{count}} TA DRONNI UCHIRISH',
        noDroneSelected: 'DRON TANLANMAGAN',
        kamikaze: {
          type: 'Kamikadze',
          desc: 'Uzoq masofali (1000 km) strategik nishonlarni yoʻq qilish tizimi.'
        },
        vtol: {
          type: 'Koʻp maqsadli',
          desc: 'Vertikal koʻtarilish va qoʻnish xususiyatiga ega zamonaviy zarbdor dron.'
        },
        recon: {
          type: 'Razvedka',
          desc: 'Ultra-yuqori aniqlikdagi kuzatuv va elektron razvedka tizimi.'
        }
      },
      map: {
        title: 'DIHA Xaritasi v3.4.5',
        activeMissions: 'FAOL MISSYA',
        satellite: 'SATELLIT ▾',
        mission: 'MISSYA',
        startNewMission: 'YANGI MISSYA BOSHLASH',
        activeSquadrons: 'AKTIV SQUADRONS',
        designatedTarget: 'BELGILANGAN NISHON'
      },
      views: {
        target: {
          title: 'NISHONLAR BOSHQARUVI',
          desc: 'Belgilangan va yoʻq qilingan barcha nishonlar arxivi.',
          clearArchive: 'ARXIVNI TOZALASH',
          id: 'ID',
          coords: 'KOORDINATALAR',
          placeName: 'JOY NOMI',
          status: 'HOLAT',
          time: 'VAQT',
          noTargets: 'Hozircha nishonlar belgilanmagan.',
          goToFlight: 'Flight sahifasiga o\'tib, kartani bosing.',
          destroyed: 'Yoʻq qilindi'
        },
        planner: {
          title: 'MISSYA REJALASHTIRISH',
          desc: 'Marshtrut nuqtalarini belgilash va avtonom parvoz parametrlarini sozlash.'
        },
        technical: {
          systemTitle: 'DIHA TIZIMI v4.0',
          connActive: 'ALOQA FAOL',
          sysOk: 'TIZIM: OK | GNSS: 12 SAT | SIG: -64 dBm',
          missionTime: 'MISSYA VAQTI: {{time}}s',
          autoMode: 'AVTONOM REJIM',
          powerManagement: 'QUVVAT BOSHQARUVI',
          voltage: 'KUCHLANISH',
          current: 'TOK KUCHI',
          power: 'QUVVAT',
          remain: 'QOLDIQ',
          flightController: 'PARVOZ NAZORATCHISI',
          cpuLoad: 'CPU YUKLAMASI',
          avionics: 'AVIONIKA VA SENSORLAR',
          imuMain: 'IMU-A (ASOSIY)',
          imuBackup: 'IMU-B (ZAXIRA)',
          barometer: 'BAROMETR',
          magnetometer: 'MAGNETOMETR',
          gpsAcc: 'GPS ANIQLIGI',
          tuning: 'SOZLANMOQDA',
          tacticalScheme: 'TAKTIK SXEMA',
          lat: 'KENGLIK',
          lng: 'UZUNLIK',
          yaw: 'YAW',
          engineSystem: 'DVIGATEL TIZIMI',
          engineRpm: 'DVIGATEL RPM',
          rpmUnit: 'AYL/MIN',
          thrust: 'TORTISH KUCHI',
          missionStatus: 'MISSIYA HOLATI',
          statusInFlight: 'PARVOZDA',
          statusWait: 'KUTISHDA',
          points: 'NUQTALAR',
          distance: 'MASOFA',
          timeEta: 'VAQT (ETA)',
          environment: 'ATROF-MUHIT',
          temperature: 'HARORAT',
          wind: 'SHAMOL',
          humidity: 'NAMLIK',
          pressure: 'BOSIM',
          commChannel: 'ALOQA KANALI',
          rebootAvionics: 'AVIONIKANI QAYTA YUKLASH',
          rtl: 'RTL (UYGA QAYTISH)',
          airspeed: 'HAVO TEZLIGI',
          altitudeMsl: 'BALANDLIK (MSL)',
          heading: 'YO\'NALISH (HEADING)',
          batteryPower: 'BATAREYA QUVVATI',
          gForce: 'G-KUCHI',
          uavCenter: 'UAV BOSHQARUV MARKAZI',
          safeComm: 'XAVFSIZ ALOQA v4.2'
        },
        health: {
          title: 'TIZIM HOLATI'
        },
        settings: {
          title: 'SOZLAMALAR',
          commPort: 'ALOQA PORTI',
          baudRate: 'BAUD RATE'
        },
        alerts: {
          title: 'XAVFSIZLIK VA OGOHLANTIRISHLAR'
        }
      }
    }
  },
  tr: {
    translation: {
      app: {
        unknownArea: 'Bilinmeyen bölge',
        detecting: 'Belirleniyor...',
        target: 'HEDEF',
        active: 'Aktif',
        errorNetwork: 'Hata (Ağ)',
        targetDestroyed: 'HEDEF İMHA EDİLDİ',
        dronesHit: '{{count}} drondan {{count}} tanesi hedefe ulaştı ve hedef başarıyla imha edildi.',
        confirmOk: 'ONAYLA (OK)',
        page: 'SAYFA',
        underConstruction: 'Bu sayfa şu anda geliştirilmektedir...'
      },
      topbar: {
        alt: 'İRT',
        spd: 'HIZ',
        sys: 'SİST',
        gnss: 'GNSS',
        sign: 'SİNY',
        com: 'İLET',
        eng: 'MOT',
        aux: 'YRD',
        loc: 'KON',
        man: 'MAN',
        autonomous: 'OTONOM',
        routeTracking: 'ROTA TAKİBİ',
        circle: 'DAİRE'
      },
      footer: {
        missionControl: 'GÖREV YÖNETİMİ',
        danger: 'TEHLİKE',
        path: 'YOL',
        orbit: 'YÖRÜNGE',
        pist: 'PİST',
        msn: 'MSN',
        home: 'EVE',
        flar: 'FLAR',
        pass: 'GEÇİŞ',
        appr: 'APPR',
        quick: 'HIZLI',
        engine: 'MOTOR',
        throttle: 'GAZ',
        temp: 'SICAK',
        pressure: 'BASINÇ',
        env: 'ÇEVRE',
        kmh: 'KM/SAAT',
        humidity: 'NEM',
        visibility: 'GÖRÜŞ',
        airspeed: 'HIZ',
        roll: 'YATIŞ',
        pitch: 'YUNUSLAMA',
        altitude: 'İRTİFA',
        commEnergy: 'İLETİŞİM VE ENERJİ',
        power: 'GÜÇ',
        signalQuality: 'SİNYAL KALİTESİ',
        nav: 'NAVİGASYON',
        north: 'K',
        northeast: 'KD',
        south: 'G',
        west: 'B',
        status: 'DURUM',
        vspeed: 'D.HIZ',
        server: 'SUNUCU',
        unauthorizedTracking: 'İZİNSİZ İZLEME'
      },
      warehouse: {
        title: 'DRON DEPOSU',
        stock: 'STOK',
        selectedCount: '{{count}} ADET SEÇİLDİ',
        selected: 'SEÇİLİ',
        select: 'SEÇ',
        missionPlan: 'GÖREV PLANLAMASI',
        selectTargetCoord: 'Haritadan hedef koordinatını belirleyin',
        droneCount_one: '{{count}} ADET DRON',
        droneCount_other: '{{count}} ADET DRON',
        launchDrones_one: '{{count}} ADET DRONU FIRLAT',
        launchDrones_other: '{{count}} ADET DRONU FIRLAT',
        noDroneSelected: 'DRON SEÇİLMEDİ',
        kamikaze: {
          type: 'Kamikaze',
          desc: 'Uzun menzilli (1000 km) stratejik hedefleri yok etme sistemi.'
        },
        vtol: {
          type: 'Çok Amaçlı',
          desc: 'Dikey kalkış ve iniş yeteneğine sahip modern taarruz dronu.'
        },
        recon: {
          type: 'Keşif',
          desc: 'Ultra yüksek çözünürlüklü gözetleme ve elektronik keşif sistemi.'
        }
      },
      map: {
        title: 'İHA Haritası v3.4.5',
        activeMissions: 'AKTİF GÖREV',
        satellite: 'UYDU ▾',
        mission: 'GÖREV',
        startNewMission: 'YENİ GÖREV BAŞLAT',
        activeSquadrons: 'AKTİF FİLO',
        designatedTarget: 'BELİRLENEN HEDEF'
      },
      views: {
        target: {
          title: 'HEDEFLER YÖNETİMİ',
          desc: 'Belirlenen ve yok edilen tüm hedeflerin arşivi.',
          clearArchive: 'ARŞİVİ TEMİZLE',
          id: 'ID',
          coords: 'KOORDİNATLAR',
          placeName: 'YER ADI',
          status: 'DURUM',
          time: 'ZAMAN',
          noTargets: 'Henüz hedefler belirlenmedi.',
          goToFlight: 'Flight sayfasına geçip haritaya tıklayın.',
          destroyed: 'İmha edildi'
        },
        planner: {
          title: 'GÖREV PLANLAMA',
          desc: 'Rota noktalarını belirleme ve otonom uçuş parametrelerini ayarlama.'
        },
        technical: {
          systemTitle: 'İHA SİSTEMİ v4.0',
          connActive: 'BAĞLANTI AKTİF',
          sysOk: 'SİSTEM: OK | GNSS: 12 SAT | SIG: -64 dBm',
          missionTime: 'GÖREV SÜRESİ: {{time}}s',
          autoMode: 'OTONOM MOD',
          powerManagement: 'GÜÇ YÖNETİMİ',
          voltage: 'VOLTAJ',
          current: 'AKIM',
          power: 'GÜÇ',
          remain: 'KALAN',
          flightController: 'UÇUŞ KONTROLCÜSÜ',
          cpuLoad: 'CPU YÜKÜ',
          avionics: 'AVİYONİK VE SENSÖRLER',
          imuMain: 'IMU-A (ANA)',
          imuBackup: 'IMU-B (YEDEK)',
          barometer: 'BAROMETRE',
          magnetometer: 'MANYETOMETRE',
          gpsAcc: 'GPS HASSASİYETİ',
          tuning: 'AYARLANIYOR',
          tacticalScheme: 'TAKTİK ŞEMA',
          lat: 'ENLEM',
          lng: 'BOYLAM',
          yaw: 'YAW',
          engineSystem: 'MOTOR SİSTEMİ',
          engineRpm: 'MOTOR RPM',
          rpmUnit: 'DEV/DAK',
          thrust: 'İTİŞ GÜCÜ',
          missionStatus: 'GÖREV DURUMU',
          statusInFlight: 'UÇUŞTA',
          statusWait: 'BEKLEMEDE',
          points: 'NOKTALAR',
          distance: 'MESAFE',
          timeEta: 'ZAMAN (ETA)',
          environment: 'ÇEVRE',
          temperature: 'SICAKLIK',
          wind: 'RÜZGAR',
          humidity: 'NEM',
          pressure: 'BASINÇ',
          commChannel: 'İLETİŞİM KANALI',
          rebootAvionics: 'AVİYONİĞİ YENİDEN BAŞLAT',
          rtl: 'RTL (EVE DÖN)',
          airspeed: 'HAVA HIZI',
          altitudeMsl: 'İRTİFA (MSL)',
          heading: 'YÖN (HEADING)',
          batteryPower: 'BATARYA GÜCÜ',
          gForce: 'G KUVVETİ',
          uavCenter: 'İHA KONTROL MERKEZİ',
          safeComm: 'GÜVENLİ İLETİŞİM v4.2'
        },
        health: {
          title: 'SİSTEM DURUMU'
        },
        settings: {
          title: 'AYARLAR',
          commPort: 'İLETİŞİM PORTU',
          baudRate: 'BAUD RATE'
        },
        alerts: {
          title: 'GÜVENLİK VE UYARILAR'
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'uz', // default language
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
