export interface FlightRouteSEO {
  slug: string;
  originCode: string;
  originCity: string;
  originCountry: string;
  destCode: string;
  destCity: string;
  destCountry: string;
  avgPriceFCFA: number;
  typicalDuration: string;
  popularAirlines: string[];
  bestMonths: string;
  description: string;
  faqs: { question: string; answer: string }[];
}

export const SEO_FLIGHT_ROUTES: FlightRouteSEO[] = [
  {
    slug: 'abidjan-paris',
    originCode: 'ABJ',
    originCity: 'Abidjan',
    originCountry: 'Côte d\'Ivoire',
    destCode: 'CDG',
    destCity: 'Paris',
    destCountry: 'France',
    avgPriceFCFA: 530000,
    typicalDuration: '6h 30min (vol direct)',
    popularAirlines: ['Air France', 'Corsair', 'Royal Air Maroc', 'Brussels Airlines', 'Tunisair'],
    bestMonths: 'Mai, Septembre, Octobre et Novembre',
    description: 'Trouvez un billet d\'avion Abidjan Paris moins cher au meilleur prix garanti. Vols directs et avec escale depuis l\'aéroport international Félix Houphouët-Boigny vers Paris Charles de Gaulle ou Orly.',
    faqs: [
      {
        question: 'Quel est le prix le plus bas pour un vol Abidjan Paris ?',
        answer: 'Sur Unique Voyage, les tarifs promotionnels pour un vol Abidjan - Paris démarrent régulièrement dès 230 000 FCFA à 350 000 FCFA selon la saison et les erreurs tarifaires détectées, contre plus de 530 000 FCFA au tarif standard.'
      },
      {
        question: 'Quelles compagnies aériennes effectuent des vols directs Abidjan Paris ?',
        answer: 'Air France et Corsair assurent des vols directs quotidiens sans escale reliant Abidjan (ABJ) à Paris (CDG et ORY) en environ 6h30.'
      },
      {
        question: 'Puis-je payer mon billet d\'avion Abidjan Paris avec Wave ou Mobile Money ?',
        answer: 'Oui, Unique Voyage accepte les paiements en FCFA par Wave, Orange Money, MTN MoMo, Moov Money ainsi que par carte bancaire Visa et Mastercard.'
      },
      {
        question: 'Quand faut-il réserver pour obtenir le billet le moins cher vers Paris ?',
        answer: 'Il est conseillé de réserver entre 3 et 8 semaines à l\'avance, ou de profiter instantanément des alertes bons plans publiées sur notre plateforme.'
      }
    ]
  },
  {
    slug: 'abidjan-dubai',
    originCode: 'ABJ',
    originCity: 'Abidjan',
    originCountry: 'Côte d\'Ivoire',
    destCode: 'DXB',
    destCity: 'Dubaï',
    destCountry: 'Émirats Arabes Unis',
    avgPriceFCFA: 650000,
    typicalDuration: '9h 30min (avec escale)',
    popularAirlines: ['Emirates', 'Ethiopian Airlines', 'Turkish Airlines', 'Qatar Airways', 'EgyptAir'],
    bestMonths: 'Octobre à Avril',
    description: 'Billet d\'avion Abidjan Dubaï pas cher. Réservez votre vol vers Dubaï au tarif le plus bas avec Emirates ou Ethiopian Airlines et profitez des merveilles des Émirats.',
    faqs: [
      {
        question: 'Combien coûte un vol Abidjan Dubaï moins cher ?',
        answer: 'Les offres détectées sur Unique Voyage permettent de réserver un vol Abidjan - Dubaï dès 380 000 FCFA à 490 000 FCFA aller-retour, soit une économie moyenne de 30% par rapport au tarif habituel de 650 000 FCFA.'
      },
      {
        question: 'Quelles sont les meilleures compagnies pour voyager vers Dubaï depuis Abidjan ?',
        answer: 'Emirates (via Accra), Ethiopian Airlines (via Addis-Abeba), Turkish Airlines (via Istanbul) et Qatar Airways offrent les meilleures connexions et services de bord.'
      },
      {
        question: 'Le visa pour Dubaï est-il nécessaire pour les résidents de Côte d\'Ivoire ?',
        answer: 'Oui, les ressortissants ivoiriens doivent obtenir un visa de tourisme pour entrer aux Émirats Arabes Unis. Notre équipe de conciergerie peut vous guider lors de votre réservation.'
      },
      {
        question: 'Comment régler mon vol Abidjan Dubaï en toute sécurité ?',
        answer: 'Vous pouvez valider votre billet directement via notre service WhatsApp avec un règlement sécurisé par Wave ou Mobile Money.'
      }
    ]
  },
  {
    slug: 'abidjan-dakar',
    originCode: 'ABJ',
    originCity: 'Abidjan',
    originCountry: 'Côte d\'Ivoire',
    destCode: 'DSS',
    destCity: 'Dakar',
    destCountry: 'Sénégal',
    avgPriceFCFA: 260000,
    typicalDuration: '2h 45min (vol direct)',
    popularAirlines: ['Air Côte d\'Ivoire', 'Air Senegal', 'Air Peace', 'ASKY Airlines'],
    bestMonths: 'Novembre à Mai',
    description: 'Billet d\'avion Abidjan Dakar moins cher. Vols directs et quotidiens entre Abidjan (ABJ) et Dakar Blaise Diagne (DSS). Tarifs négociés au prix le plus bas.',
    faqs: [
      {
        question: 'Quel est le prix moyen d\'un billet d\'avion Abidjan Dakar ?',
        answer: 'Le prix moyen se situe autour de 260 000 FCFA. Sur Unique Voyage, les promos flash permettent de trouver des billets dès 195 000 FCFA à 240 000 FCFA.'
      },
      {
        question: 'Quelles compagnies proposent des vols directs entre Abidjan et Dakar ?',
        answer: 'Air Côte d\'Ivoire et Air Senegal opèrent des vols directs réguliers de moins de 3 heures entre les deux capitales ouest-africaines.'
      },
      {
        question: 'Quels documents pour voyager de Côte d\'Ivoire au Sénégal ?',
        answer: 'Un passeport valide ou une carte nationale d\'identité CEDEAO en cours de validité suffit pour les citoyens ivoiriens sans besoin de visa.'
      },
      {
        question: 'Paiement Wave possible pour Abidjan Dakar ?',
        answer: 'Oui, le paiement par Wave, Orange Money ou MTN Mobile Money est accepté et confirmé en quelques minutes.'
      }
    ]
  },
  {
    slug: 'abidjan-casablanca',
    originCode: 'ABJ',
    originCity: 'Abidjan',
    originCountry: 'Côte d\'Ivoire',
    destCode: 'CMN',
    destCity: 'Casablanca',
    destCountry: 'Maroc',
    avgPriceFCFA: 390000,
    typicalDuration: '4h 30min (vol direct)',
    popularAirlines: ['Royal Air Maroc', 'Air Côte d\'Ivoire'],
    bestMonths: 'Toute l\'année',
    description: 'Vol pas cher Abidjan Casablanca au Maroc. Billet d\'avion direct à tarif discount pour vos séjours d\'affaires ou vacances à Casablanca, Marrakech et Rabat.',
    faqs: [
      {
        question: 'Combien de temps dure le vol direct Abidjan Casablanca ?',
        answer: 'Le vol direct sans escale dure environ 4 heures et 30 minutes au départ d\'Abidjan (ABJ).'
      },
      {
        question: 'Quel est le meilleur prix pour Abidjan Casablanca ?',
        answer: 'Des offres promotionnelles sont fréquemment détectées dès 260 000 FCFA aller-retour avec Royal Air Maroc.'
      },
      {
        question: 'Faut-il un visa pour les Ivoiriens partant au Maroc ?',
        answer: 'Les ressortissants ivoiriens bénéficient d\'une exemption de visa pour les séjours touristiques de moins de 90 jours (sous réserve de l\'autorisation électronique de voyage AVEM).'
      },
      {
        question: 'Comment réserver ce vol avec Unique Voyage ?',
        answer: 'Cliquez sur le bouton de réservation pour initier immédiatement votre demande avec notre conseiller sur WhatsApp.'
      }
    ]
  },
  {
    slug: 'abidjan-montreal',
    originCode: 'ABJ',
    originCity: 'Abidjan',
    originCountry: 'Côte d\'Ivoire',
    destCode: 'YUL',
    destCity: 'Montréal',
    destCountry: 'Canada',
    avgPriceFCFA: 880000,
    typicalDuration: '13h 30min (avec escale)',
    popularAirlines: ['Air France', 'Royal Air Maroc', 'Air Canada', 'Corsair'],
    bestMonths: 'Mai à Octobre',
    description: 'Billet d\'avion Abidjan Montréal pas cher pour étudiants, familles et professionnels. Comparez et réservez au tarif le plus avantageux du marché vers le Canada.',
    faqs: [
      {
        question: 'Quel est le prix le plus bas pour un billet Abidjan Montréal ?',
        answer: 'Les vols Abidjan Montréal peuvent atteindre plus de 1 000 000 FCFA en haute saison. Grâce à nos alertes, nous trouvons des billets dès 650 000 FCFA à 780 000 FCFA.'
      },
      {
        question: 'Quelles sont les meilleures escales entre Abidjan et Montréal ?',
        answer: 'Les escales les plus fluides se font via Paris (CDG) avec Air France ou via Casablanca (CMN) avec Royal Air Maroc.'
      },
      {
        question: 'Existe-t-il des tarifs spéciaux pour les étudiants se rendant au Canada ?',
        answer: 'Oui, nous recherchons régulièrement des billets incluant 2 bagages de 23kg en soute adaptés aux étudiants.'
      },
      {
        question: 'Quels sont les modes de paiement autorisés ?',
        answer: 'Paiement Wave, Mobile Money, virement bancaire ou carte bancaire internationale.'
      }
    ]
  },
  {
    slug: 'abidjan-new-york',
    originCode: 'ABJ',
    originCity: 'Abidjan',
    originCountry: 'Côte d\'Ivoire',
    destCode: 'JFK',
    destCity: 'New York',
    destCountry: 'États-Unis',
    avgPriceFCFA: 850000,
    typicalDuration: '11h 00min',
    popularAirlines: ['Ethiopian Airlines', 'Air Côte d\'Ivoire', 'Air France', 'Delta Air Lines'],
    bestMonths: 'Avril à Juin et Septembre à Novembre',
    description: 'Vol pas cher Abidjan New York (JFK/Newark). Tarifs imbattables pour vos voyages aux États-Unis avec les meilleures compagnies régulières.',
    faqs: [
      {
        question: 'Quel est le tarif le moins cher pour un vol Abidjan New York ?',
        answer: 'Sur Unique Voyage, des billets sont régulièrement proposés dès 590 000 FCFA aller-retour.'
      },
      {
        question: 'Existe-t-il un vol direct entre Abidjan et New York ?',
        answer: 'Ethiopian Airlines propose des liaisons très rapides avec un stop technique réduit, ainsi que des correspondances via Paris avec Air France et Delta.'
      },
      {
        question: 'Quelle est la franchise bagages standard ?',
        answer: 'Généralement 2 bagages de 23 kg chacun en classe économique sur la majorité des vols transatlantiques.'
      },
      {
        question: 'Comment être averti d\'une baisse de prix sur New York ?',
        answer: 'Inscrivez-vous sur notre site ou contactez notre conciergerie WhatsApp pour être alerté en priorité.'
      }
    ]
  },
  {
    slug: 'abidjan-bruxelles',
    originCode: 'ABJ',
    originCity: 'Abidjan',
    originCountry: 'Côte d\'Ivoire',
    destCode: 'BRU',
    destCity: 'Bruxelles',
    destCountry: 'Belgique',
    avgPriceFCFA: 540000,
    typicalDuration: '6h 45min (vol direct)',
    popularAirlines: ['Brussels Airlines', 'Air France', 'Royal Air Maroc'],
    bestMonths: 'Avril à Octobre',
    description: 'Billet d\'avion Abidjan Bruxelles moins cher. Vols directs réguliers Brussels Airlines reliant la Côte d\'Ivoire à la Belgique et toute l\'Europe.',
    faqs: [
      {
        question: 'Combien coûte un vol direct Abidjan Bruxelles ?',
        answer: 'Les tarifs promotionnels commencent dès 320 000 FCFA avec Brussels Airlines sur nos offres sélectionnées.'
      },
      {
        question: 'Quels sont les jours de vol direct ?',
        answer: 'Brussels Airlines assure plusieurs rotations directes par semaine entre l\'aéroport d\'Abidjan et Brussels Airport (Zaventem).'
      },
      {
        question: 'Peut-on payer par Wave pour la Belgique ?',
        answer: 'Oui, le paiement local en FCFA par Wave et Mobile Money est 100% opérationnel.'
      },
      {
        question: 'Quelle est la durée de vol ?',
        answer: 'Le vol direct dure environ 6h45.'
      }
    ]
  },
  {
    slug: 'abidjan-istanbul',
    originCode: 'ABJ',
    originCity: 'Abidjan',
    originCountry: 'Côte d\'Ivoire',
    destCode: 'IST',
    destCity: 'Istanbul',
    destCountry: 'Turquie',
    avgPriceFCFA: 450000,
    typicalDuration: '7h 15min',
    popularAirlines: ['Turkish Airlines', 'EgyptAir', 'Royal Air Maroc'],
    bestMonths: 'Mars à Mai et Septembre à Novembre',
    description: 'Vol pas cher Abidjan Istanbul direct avec Turkish Airlines. Idéal pour le shopping, le tourisme et les affaires en Turquie.',
    faqs: [
      {
        question: 'Existe-t-il un vol direct Abidjan Istanbul ?',
        answer: 'Oui, Turkish Airlines relie directement Abidjan à Istanbul plusieurs fois par semaine.'
      },
      {
        question: 'Quel est le prix le plus bas trouvé pour Istanbul ?',
        answer: 'Nos deals affichent régulièrement des billets dès 310 000 FCFA aller-retour.'
      },
      {
        question: 'Le visa turc est-il facile à obtenir ?',
        answer: 'Les personnes disposant d\'un visa Schengen ou USA valide peuvent obtenir le e-Visa en ligne en quelques minutes.'
      },
      {
        question: 'Combien de bagages sont autorisés ?',
        answer: 'Turkish Airlines offre généralement 2 pièces de 23kg sur cette route.'
      }
    ]
  },
  {
    slug: 'abidjan-jeddah',
    originCode: 'ABJ',
    originCity: 'Abidjan',
    originCountry: 'Côte d\'Ivoire',
    destCode: 'JED',
    destCity: 'Jeddah / La Mecque',
    destCountry: 'Arabie Saoudite',
    avgPriceFCFA: 650000,
    typicalDuration: '8h 30min',
    popularAirlines: ['Ethiopian Airlines', 'EgyptAir', 'Saudia', 'Turkish Airlines'],
    bestMonths: 'Périodes de Omra et toute l\'année',
    description: 'Billet d\'avion Abidjan Jeddah (La Mecque) au meilleur prix pour vos pèlerinages de la Omra et séjours en Arabie Saoudite.',
    faqs: [
      {
        question: 'Quel est le prix d\'un vol Abidjan Jeddah pour la Omra ?',
        answer: 'Unique Voyage propose des billets dès 540 000 FCFA à 620 000 FCFA avec les meilleures compagnies du Golfe et d\'Afrique.'
      },
      {
        question: 'Quelles compagnies desservent Jeddah depuis Abidjan ?',
        answer: 'Ethiopian Airlines, EgyptAir et Turkish Airlines offrent d\'excellentes correspondances adaptées aux pèlerins.'
      },
      {
        question: 'Puis-je emporter de l\'eau de Zamzam au retour ?',
        answer: 'La plupart des compagnies autorisent un bidon de 5L de Zamzam gratuitement en supplément des bagages enregistrés.'
      },
      {
        question: 'Comment réserver mon groupe pour la Omra ?',
        answer: 'Contactez notre conciergerie sur WhatsApp pour un devis groupe immédiat.'
      }
    ]
  },
  {
    slug: 'abidjan-accra',
    originCode: 'ABJ',
    originCity: 'Abidjan',
    originCountry: 'Côte d\'Ivoire',
    destCode: 'ACC',
    destCity: 'Accra',
    destCountry: 'Ghana',
    avgPriceFCFA: 180000,
    typicalDuration: '55min (vol direct)',
    popularAirlines: ['Africa World Airlines', 'Air Côte d\'Ivoire'],
    bestMonths: 'Toute l\'année',
    description: 'Vol direct Abidjan Accra en moins d\'une heure. Billets d\'avion au prix le plus bas garanti pour vos week-ends et voyages d\'affaires au Ghana.',
    faqs: [
      {
        question: 'Quel est le prix le plus bas pour Abidjan Accra ?',
        answer: 'Des billets dès 145 000 FCFA à 180 000 FCFA sont disponibles sur notre plateforme.'
      },
      {
        question: 'Combien de temps dure le vol ?',
        answer: 'Le vol direct sans escale dure seulement 50 à 55 minutes.'
      },
      {
        question: 'Faut-il un visa pour aller au Ghana depuis Abidjan ?',
        answer: 'Les citoyens ivoiriens et de l\'espace CEDEAO voyagent sans visa avec un passeport valide.'
      },
      {
        question: 'Paiement Wave accepté pour Accra ?',
        answer: 'Oui, réglez en quelques clics via Wave ou Mobile Money.'
      }
    ]
  },
  {
    slug: 'dakar-paris',
    originCode: 'DSS',
    originCity: 'Dakar',
    originCountry: 'Sénégal',
    destCode: 'CDG',
    destCity: 'Paris',
    destCountry: 'France',
    avgPriceFCFA: 480000,
    typicalDuration: '5h 45min (vol direct)',
    popularAirlines: ['Air France', 'Air Senegal', 'Corsair', 'Iberia', 'Royal Air Maroc'],
    bestMonths: 'Avril à Juin et Septembre à Novembre',
    description: 'Billet d\'avion Dakar Paris moins cher. Trouvez les meilleures promotions de vols directs depuis Dakar Blaise Diagne vers Paris.',
    faqs: [
      {
        question: 'Quel est le prix le plus bas pour un vol Dakar Paris ?',
        answer: 'Sur Unique Voyage, des billets promotionnels sont trouvés dès 235 000 FCFA à 340 000 FCFA aller-retour selon la période.'
      },
      {
        question: 'Quelles compagnies opèrent en vol direct Dakar Paris ?',
        answer: 'Air France, Air Senegal et Corsair effectuent des vols directs sans escale quotidiens.'
      },
      {
        question: 'Paiement Wave disponible au Sénégal ?',
        answer: 'Oui ! Vous pouvez payer votre billet directement par Wave Sénégal ou Orange Money.'
      },
      {
        question: 'Quelle est la durée du vol direct ?',
        answer: 'Le vol direct dure environ 5 heures et 45 minutes.'
      }
    ]
  },
  {
    slug: 'dakar-abidjan',
    originCode: 'DSS',
    originCity: 'Dakar',
    originCountry: 'Sénégal',
    destCode: 'ABJ',
    destCity: 'Abidjan',
    destCountry: 'Côte d\'Ivoire',
    avgPriceFCFA: 260000,
    typicalDuration: '2h 45min (vol direct)',
    popularAirlines: ['Air Senegal', 'Air Côte d\'Ivoire', 'Air Peace'],
    bestMonths: 'Toute l\'année',
    description: 'Vol direct Dakar Abidjan au meilleur tarif. Billet d\'avion pas cher entre le Sénégal et la Côte d\'Ivoire avec réservation instantanée.',
    faqs: [
      {
        question: 'Combien coûte un vol direct Dakar Abidjan ?',
        answer: 'Les tarifs démarrent régulièrement dès 195 000 FCFA avec nos alertes bons plans.'
      },
      {
        question: 'Quelles compagnies assurent cette liaison ?',
        answer: 'Air Senegal et Air Côte d\'Ivoire sont les principaux opérateurs directs.'
      },
      {
        question: 'Puis-je payer avec Wave Sénégal ?',
        answer: 'Oui, paiement Wave et Orange Money accepté avec délivrance rapide du billet électronique.'
      },
      {
        question: 'Quelles sont les formalités d\'entrée à Abidjan ?',
        answer: 'Passeport CEDEAO valide et carnet de vaccination à jour.'
      }
    ]
  },
  {
    slug: 'paris-abidjan',
    originCode: 'CDG',
    originCity: 'Paris',
    originCountry: 'France',
    destCode: 'ABJ',
    destCity: 'Abidjan',
    destCountry: 'Côte d\'Ivoire',
    avgPriceFCFA: 530000,
    typicalDuration: '6h 30min (vol direct)',
    popularAirlines: ['Air France', 'Corsair', 'Brussels Airlines', 'Royal Air Maroc'],
    bestMonths: 'Février, Mars, Mai, Octobre et Novembre',
    description: 'Billet d\'avion Paris Abidjan moins cher pour la diaspora et les voyageurs. Vols directs depuis Paris CDG et Orly au meilleur tarif garanti.',
    faqs: [
      {
        question: 'Quel est le prix le plus bas pour un vol Paris Abidjan ?',
        answer: 'Les tarifs démarrent dès 380€ à 490€ (250 000 FCFA à 320 000 FCFA) hors périodes de pointe de fin d\'année.'
      },
      {
        question: 'Comment payer depuis l\'Europe ?',
        answer: 'Vous pouvez payer par carte bancaire internationale en ligne ou par Wave pour les proches en Côte d\'Ivoire.'
      },
      {
        question: 'Quelles compagnies sont les plus recommandées ?',
        answer: 'Air France et Corsair pour les vols directs sans escale de 6h30.'
      },
      {
        question: 'Combien de bagages en soute ?',
        answer: 'Généralement 2 bagages de 23 kg inclus selon le type de billet réservé.'
      }
    ]
  },
  {
    slug: 'paris-dakar',
    originCode: 'CDG',
    originCity: 'Paris',
    originCountry: 'France',
    destCode: 'DSS',
    destCity: 'Dakar',
    destCountry: 'Sénégal',
    avgPriceFCFA: 480000,
    typicalDuration: '5h 45min (vol direct)',
    popularAirlines: ['Air France', 'Air Senegal', 'Corsair', 'Transavia'],
    bestMonths: 'Octobre à Mai',
    description: 'Vol Paris Dakar pas cher. Billets d\'avion au prix le plus bas pour vos vacances et visites familiales au Sénégal.',
    faqs: [
      {
        question: 'Quel est le tarif moyen pour un Paris Dakar ?',
        answer: 'Environ 480 000 FCFA (730€), mais nous détectons des offres dès 240 000 FCFA (365€).'
      },
      {
        question: 'Quelles sont les compagnies directes ?',
        answer: 'Air France, Corsair et Air Senegal assurent des liaisons directes quotidiennes.'
      },
      {
        question: 'Puis-je réserver via WhatsApp ?',
        answer: 'Oui, notre service client vous assiste de bout en bout.'
      },
      {
        question: 'Y a-t-il un décalage horaire ?',
        answer: 'Seulement 1 à 2 heures de décalage avec Paris selon la saison.'
      }
    ]
  },
  {
    slug: 'casablanca-abidjan',
    originCode: 'CMN',
    originCity: 'Casablanca',
    originCountry: 'Maroc',
    destCode: 'ABJ',
    destCity: 'Abidjan',
    destCountry: 'Côte d\'Ivoire',
    avgPriceFCFA: 390000,
    typicalDuration: '4h 30min (vol direct)',
    popularAirlines: ['Royal Air Maroc', 'Air Côte d\'Ivoire'],
    bestMonths: 'Toute l\'année',
    description: 'Vol Casablanca Abidjan pas cher. Billets d\'avion directs entre le Maroc et la Côte d\'Ivoire au prix le plus bas.',
    faqs: [
      {
        question: 'Quel est le prix le plus bas Casablanca Abidjan ?',
        answer: 'Dès 250 000 FCFA avec Royal Air Maroc lors des promos régulières.'
      },
      {
        question: 'Combien de temps dure le trajet direct ?',
        answer: '4h30 de vol sans escale.'
      },
      {
        question: 'Modes de paiement acceptés ?',
        answer: 'Wave, Mobile Money, virement bancaire et carte bancaire.'
      },
      {
        question: 'Comment réserver rapidement ?',
        answer: 'Un simple message WhatsApp pour bloquer votre tarif le plus bas.'
      }
    ]
  },
  {
    slug: 'accra-londres',
    originCode: 'ACC',
    originCity: 'Accra',
    originCountry: 'Ghana',
    destCode: 'LHR',
    destCity: 'Londres',
    destCountry: 'Royaume-Uni',
    avgPriceFCFA: 580000,
    typicalDuration: '6h 30min (vol direct)',
    popularAirlines: ['British Airways', 'Virgin Atlantic', 'KLM', 'Brussels Airlines'],
    bestMonths: 'Janvier à Mai et Septembre à Novembre',
    description: 'Billet d\'avion Accra Londres pas cher. Vols directs Kotoka vers London Heathrow et Gatwick au meilleur tarif.',
    faqs: [
      {
        question: 'Quel est le prix le plus bas pour Accra Londres ?',
        answer: 'Billets trouvés dès 390 000 FCFA aller-retour avec les meilleures compagnies.'
      },
      {
        question: 'Y a-t-il des vols directs ?',
        answer: 'British Airways assure des vols directs quotidiens de 6h30 entre Accra et Londres.'
      },
      {
        question: 'Paiement Mobile Money disponible ?',
        answer: 'Oui, MTN MoMo Ghana et Wave sont acceptés.'
      }
    ]
  },
  {
    slug: 'paris-bali',
    originCode: 'CDG',
    originCity: 'Paris',
    originCountry: 'France',
    destCode: 'DPS',
    destCity: 'Bali (Denpasar)',
    destCountry: 'Indonésie',
    avgPriceFCFA: 650000,
    typicalDuration: '16h 00min (avec escale)',
    popularAirlines: ['Qatar Airways', 'Singapore Airlines', 'Emirates', 'Turkish Airlines'],
    bestMonths: 'Mai à Octobre (saison sèche)',
    description: 'Billet d\'avion Paris Bali pas cher pour vos vacances de rêve en Indonésie. Plages, rizières et temples au meilleur prix garanti.',
    faqs: [
      {
        question: 'Quel est le prix le plus bas pour un vol Paris Bali ?',
        answer: 'Sur Unique Voyage, des billets pour Bali sont régulièrement trouvés dès 550€ à 680€ (360 000 FCFA à 445 000 FCFA) hors très haute saison.'
      },
      {
        question: 'Quelles sont les meilleures compagnies pour aller à Bali ?',
        answer: 'Singapore Airlines, Qatar Airways et Emirates offrent les meilleurs temps de vol avec escale courte et un confort optimal.'
      },
      {
        question: 'Quelle est la meilleure période pour partir à Bali ?',
        answer: 'La saison sèche de mai à octobre est idéale avec un ensoleillement maximal et une météo parfaite.'
      },
      {
        question: 'Comment réserver ses vacances à Bali sur Unique Voyage ?',
        answer: 'Cliquez sur le bouton de réservation WhatsApp pour bloquer votre tarif le plus bas en direct.'
      }
    ]
  },
  {
    slug: 'paris-bangkok',
    originCode: 'CDG',
    originCity: 'Paris',
    originCountry: 'France',
    destCode: 'BKK',
    destCity: 'Bangkok',
    destCountry: 'Thaïlande',
    avgPriceFCFA: 490000,
    typicalDuration: '11h 30min (vol direct)',
    popularAirlines: ['Thai Airways', 'Air France', 'Qatar Airways', 'Emirates'],
    bestMonths: 'Novembre à Mars',
    description: 'Vol Paris Bangkok moins cher. Voyagez en Thaïlande au meilleur prix garanti. Billets d\'avion directs et promos pour vos vacances au pays du sourire.',
    faqs: [
      {
        question: 'Combien coûte un billet d\'avion Paris Bangkok ?',
        answer: 'Les tarifs promotionnels démarrent régulièrement dès 450€ à 590€ (295 000 FCFA à 385 000 FCFA) aller-retour.'
      },
      {
        question: 'Existe-t-il des vols directs entre Paris et Bangkok ?',
        answer: 'Oui, Thai Airways et Air France opèrent des vols directs d\'environ 11h30 sans escale.'
      },
      {
        question: 'Faut-il un visa pour la Thaïlande ?',
        answer: 'Les ressortissants français et européens sont exemptés de visa pour les séjours touristiques jusqu\'à 60 jours.'
      },
      {
        question: 'Puis-je payer en plusieurs fois ou par Wave ?',
        answer: 'Paiement par carte bancaire internationale, virement ou Wave accepté.'
      }
    ]
  },
  {
    slug: 'paris-phuket',
    originCode: 'CDG',
    originCity: 'Paris',
    originCountry: 'France',
    destCode: 'HKT',
    destCity: 'Phuket',
    destCountry: 'Thaïlande',
    avgPriceFCFA: 520000,
    typicalDuration: '13h 00min (avec escale)',
    popularAirlines: ['Qatar Airways', 'Emirates', 'Singapore Airlines', 'Thai Airways'],
    bestMonths: 'Décembre à Avril',
    description: 'Vacances de rêve à Phuket : réservez votre vol Paris Phuket pas cher au prix le plus bas pour profiter des plus belles îles de la mer d\'Andaman.',
    faqs: [
      {
        question: 'Quel est le meilleur prix pour un vol Paris Phuket ?',
        answer: 'Des offres sont détectées dès 490€ (320 000 FCFA) aller-retour avec les meilleures compagnies du Golfe.'
      },
      {
        question: 'Quelles îles visiter depuis Phuket ?',
        answer: 'Phuket est le point de départ idéal pour les îles Phi Phi, James Bond Island et Koh Similan.'
      },
      {
        question: 'Comment réserver son billet d\'avion pour Phuket ?',
        answer: 'Réservez en un clic sur WhatsApp avec assistance personnalisée de notre conciergerie.'
      },
      {
        question: 'Combien de bagages sont inclus ?',
        answer: 'Au moins 25kg à 30kg de franchise bagages sur les compagnies régulières.'
      }
    ]
  },
  {
    slug: 'paris-maldives',
    originCode: 'CDG',
    originCity: 'Paris',
    originCountry: 'France',
    destCode: 'MLE',
    destCity: 'Maldives (Malé)',
    destCountry: 'Maldives',
    avgPriceFCFA: 580000,
    typicalDuration: '11h 30min (avec escale)',
    popularAirlines: ['Qatar Airways', 'Emirates', 'Etihad Airways', 'Air France'],
    bestMonths: 'Janvier à Avril',
    description: 'Séjour paradisiaque aux Maldives : billet d\'avion Paris Malé pas cher au meilleur tarif pour vos vacances de luxe, lunes de miel et bungalows sur pilotis.',
    faqs: [
      {
        question: 'Combien coûte un vol Paris Maldives ?',
        answer: 'Des offres débutent dès 550€ à 690€ (360 000 FCFA à 450 000 FCFA) selon les dates de voyage.'
      },
      {
        question: 'Comment rejoindre son hôtel atoll depuis l\'aéroport de Malé ?',
        answer: 'Les transferts se font en hydravion ou en hors-bord selon la distance de votre complexe hôtelier.'
      },
      {
        question: 'Quelle est la saison idéale pour les Maldives ?',
        answer: 'La période sèche de décembre à avril offre les eaux les plus limpides et un soleil permanent.'
      },
      {
        question: 'Le visa est-il délivré à l\'arrivée ?',
        answer: 'Oui, un visa touristique gratuit de 30 jours est accordé à l\'arrivée avec un passeport valide.'
      }
    ]
  },
  {
    slug: 'paris-maurice',
    originCode: 'CDG',
    originCity: 'Paris',
    originCountry: 'France',
    destCode: 'MRU',
    destCity: 'Île Maurice',
    destCountry: 'Maurice',
    avgPriceFCFA: 620000,
    typicalDuration: '11h 00min (vol direct)',
    popularAirlines: ['Air France', 'Air Mauritius', 'Corsair', 'Emirates'],
    bestMonths: 'Septembre à Décembre et Avril à Mai',
    description: 'Billet d\'avion Paris Île Maurice moins cher. Vols directs réguliers pour vos vacances soleil, plages de sable blanc et nature luxuriante.',
    faqs: [
      {
        question: 'Existe-t-il des vols directs Paris Maurice ?',
        answer: 'Oui, Air France, Corsair et Air Mauritius proposent des liaisons directes de nuit sans escale (environ 11h).'
      },
      {
        question: 'Quel est le prix le plus bas pour l\'Île Maurice ?',
        answer: 'Nos deals affichent régulièrement des billets dès 590€ (385 000 FCFA) aller-retour.'
      },
      {
        question: 'Faut-il un visa pour voyager à l\'Île Maurice ?',
        answer: 'Aucun visa n\'est requis pour les séjours touristiques de moins de 90 jours.'
      },
      {
        question: 'Comment payer mon vol Île Maurice ?',
        answer: 'Règlement par carte bancaire sécurisée ou via WhatsApp avec notre conciergerie.'
      }
    ]
  },
  {
    slug: 'paris-cancun',
    originCode: 'CDG',
    originCity: 'Paris',
    originCountry: 'France',
    destCode: 'CUN',
    destCity: 'Cancún',
    destCountry: 'Mexique',
    avgPriceFCFA: 490000,
    typicalDuration: '11h 00min (vol direct)',
    popularAirlines: ['Air France', 'Air Caraïbes', 'Iberia', 'Air Europa'],
    bestMonths: 'Novembre à Avril',
    description: 'Billet d\'avion Paris Cancún pas cher. Vacances tout compris sur la Riviera Maya au Mexique : cénotes, plages turquoise et sites mayas.',
    faqs: [
      {
        question: 'Quel est le tarif moyen d\'un vol Paris Cancún ?',
        answer: 'Les prix promotionnels commencent dès 450€ à 580€ (295 000 FCFA à 380 000 FCFA).'
      },
      {
        question: 'Y a-t-il des vols directs sans escale ?',
        answer: 'Air France assure des vols directs reliant Paris CDG à Cancún en 11h environ.'
      },
      {
        question: 'Faut-il un visa pour le Mexique ?',
        answer: 'Les citoyens français et de l\'Union Européenne n\'ont pas besoin de visa touristique.'
      },
      {
        question: 'Quelles sont les activités phares à Cancún ?',
        answer: 'Chichén Itzá, Tulum, les cénotes d\'eau douce et la vie nocturne animée.'
      }
    ]
  },
  {
    slug: 'paris-guadeloupe',
    originCode: 'ORY',
    originCity: 'Paris (Orly)',
    originCountry: 'France',
    destCode: 'PTP',
    destCity: 'Guadeloupe (Pointe-à-Pitre)',
    destCountry: 'France (Antilles)',
    avgPriceFCFA: 380000,
    typicalDuration: '8h 30min (vol direct)',
    popularAirlines: ['Air Caraïbes', 'Corsair', 'Air France'],
    bestMonths: 'Décembre à Mai',
    description: 'Billet d\'avion Paris Guadeloupe pas cher. Vols directs quotidiens vers Pointe-à-Pitre au meilleur prix garanti avec Corsair et Air Caraïbes.',
    faqs: [
      {
        question: 'Quel est le prix le plus bas pour un Paris Guadeloupe ?',
        answer: 'Des promotions flash sont fréquemment disponibles dès 330€ à 450€ (215 000 FCFA à 295 000 FCFA) aller-retour.'
      },
      {
        question: 'De quel aéroport parisien partent les vols vers les Antilles ?',
        answer: 'La quasi-totalité des vols vers la Guadeloupe décollent de l\'aéroport de Paris-Orly (ORY).'
      },
      {
        question: 'Une carte d\'identité suffit-elle pour voyager en Guadeloupe ?',
        answer: 'Oui, pour les ressortissants français et européens, la carte d\'identité en cours de validité suffit.'
      },
      {
        question: 'Comment réserver rapidement ?',
        answer: 'Contactez directement notre conseiller sur WhatsApp pour bloquer les dates les moins chères.'
      }
    ]
  },
  {
    slug: 'paris-martinique',
    originCode: 'ORY',
    originCity: 'Paris (Orly)',
    originCountry: 'France',
    destCode: 'FDF',
    destCity: 'Martinique (Fort-de-France)',
    destCountry: 'France (Antilles)',
    avgPriceFCFA: 380000,
    typicalDuration: '8h 30min (vol direct)',
    popularAirlines: ['Air France', 'Corsair', 'Air Caraïbes'],
    bestMonths: 'Décembre à Mai',
    description: 'Billet d\'avion Paris Martinique pas cher. Découvrez l\'île aux fleurs au meilleur tarif pour vos vacances au soleil des Caraïbes.',
    faqs: [
      {
        question: 'Combien coûte un vol direct Paris Martinique ?',
        answer: 'Des offres débutent dès 340€ (220 000 FCFA) aller-retour hors vacances scolaires.'
      },
      {
        question: 'Quelles compagnies opèrent en vol direct ?',
        answer: 'Air France, Corsair et Air Caraïbes proposent plusieurs vols directs quotidiens depuis Paris Orly.'
      },
      {
        question: 'Bagages inclus pour la Martinique ?',
        answer: 'La plupart des tarifs réguliers incluent un bagage cabine et un bagage en soute de 23kg.'
      },
      {
        question: 'Quel est le décalage horaire ?',
        answer: '5 à 6 heures de décalage en moins par rapport à Paris.'
      }
    ]
  },
  {
    slug: 'paris-punta-cana',
    originCode: 'CDG',
    originCity: 'Paris',
    originCountry: 'France',
    destCode: 'PUJ',
    destCity: 'Punta Cana',
    destCountry: 'République Dominicaine',
    avgPriceFCFA: 490000,
    typicalDuration: '9h 15min (vol direct)',
    popularAirlines: ['Air France', 'Air Caraïbes', 'Iberia'],
    bestMonths: 'Décembre à Avril',
    description: 'Vacances à Punta Cana au meilleur prix : réservez votre vol Paris Punta Cana pas cher pour profiter des plages de cocotiers et resorts tout compris.',
    faqs: [
      {
        question: 'Quel est le meilleur tarif pour Punta Cana ?',
        answer: 'Tarifs promotionnels dès 480€ à 620€ (315 000 FCFA à 405 000 FCFA) aller-retour.'
      },
      {
        question: 'Y a-t-il des vols directs pour Punta Cana ?',
        answer: 'Oui, Air France et Air Caraïbes assurent des liaisons directes régulières.'
      },
      {
        question: 'Faut-il une carte de tourisme ?',
        answer: 'La taxe touristique est généralement incluse directement dans le prix de votre billet d\'avion.'
      },
      {
        question: 'Réservation par WhatsApp disponible ?',
        answer: 'Oui, notre équipe bloque votre place instantanément.'
      }
    ]
  },
  {
    slug: 'paris-marrakech',
    originCode: 'ORY',
    originCity: 'Paris',
    originCountry: 'France',
    destCode: 'RAK',
    destCity: 'Marrakech',
    destCountry: 'Maroc',
    avgPriceFCFA: 160000,
    typicalDuration: '3h 15min (vol direct)',
    popularAirlines: ['Royal Air Maroc', 'Transavia', 'Air France', 'EasyJet', 'Ryanair'],
    bestMonths: 'Mars à Mai et Septembre à Novembre',
    description: 'Week-end et vacances à Marrakech : billet d\'avion Paris Marrakech pas cher au prix le plus bas garanti. Soleil, riads et souks en 3h de vol.',
    faqs: [
      {
        question: 'Quel est le prix le plus bas pour un vol Paris Marrakech ?',
        answer: 'Dès 70€ à 130€ (45 000 FCFA à 85 000 FCFA) aller-retour selon les promotions détectées en direct.'
      },
      {
        question: 'Combien de temps de vol pour Marrakech ?',
        answer: 'Seulement 3 heures et 15 minutes en vol direct.'
      },
      {
        question: 'Faut-il un passeport pour le Maroc ?',
        answer: 'Un passeport valide est obligatoire pour tous les voyageurs se rendant au Maroc.'
      },
      {
        question: 'Paiement sécurisé en ligne ?',
        answer: 'Oui, réglez par carte bancaire ou Wave en quelques secondes.'
      }
    ]
  },
  {
    slug: 'paris-tokyo',
    originCode: 'CDG',
    originCity: 'Paris',
    originCountry: 'France',
    destCode: 'HND',
    destCity: 'Tokyo',
    destCountry: 'Japon',
    avgPriceFCFA: 650000,
    typicalDuration: '14h 00min (vol direct)',
    popularAirlines: ['Air France', 'ANA (All Nippon Airways)', 'Japan Airlines', 'Qatar Airways'],
    bestMonths: 'Mars à Mai (cerisiers) et Octobre à Novembre',
    description: 'Voyage au Japon : billet d\'avion Paris Tokyo pas cher. Vols directs et avec escale vers Tokyo Haneda et Narita au meilleur tarif garanti.',
    faqs: [
      {
        question: 'Combien coûte un vol Paris Tokyo au tarif le plus bas ?',
        answer: 'Sur Unique Voyage, des billets sont trouvés dès 620€ à 790€ (405 000 FCFA à 518 000 FCFA) aller-retour.'
      },
      {
        question: 'Quelles compagnies proposent des vols directs Paris Tokyo ?',
        answer: 'Air France, ANA et Japan Airlines assurent des vols directs quotidiens sans escale.'
      },
      {
        question: 'Faut-il un visa pour un voyage touristique au Japon ?',
        answer: 'Les ressortissants français et européens sont exemptés de visa pour les séjours jusqu\'à 90 jours.'
      },
      {
        question: 'Quel est le meilleur moment pour réserver ?',
        answer: 'Pour la saison des cerisiers en fleurs (Sakura), il est conseillé de réserver 4 à 6 mois à l\'avance.'
      }
    ]
  },
  {
    slug: 'paris-new-york',
    originCode: 'CDG',
    originCity: 'Paris',
    originCountry: 'France',
    destCode: 'JFK',
    destCity: 'New York',
    destCountry: 'États-Unis',
    avgPriceFCFA: 320000,
    typicalDuration: '8h 15min (vol direct)',
    popularAirlines: ['Air France', 'Delta Air Lines', 'French Bee', 'Norse Atlantic', 'United Airlines'],
    bestMonths: 'Avril à Juin et Septembre à Décembre',
    description: 'Billet d\'avion Paris New York pas cher. Vols directs quotidiens vers JFK et Newark au meilleur prix pour vos vacances et séjours à Manhattan.',
    faqs: [
      {
        question: 'Quel est le prix le plus bas pour un Paris New York ?',
        answer: 'Des offres sont régulièrement proposées dès 280€ à 390€ (185 000 FCFA à 255 000 FCFA) aller-retour.'
      },
      {
        question: 'Quelle autorisation pour entrer aux États-Unis ?',
        answer: 'L\'autorisation électronique ESTA est obligatoire avant le départ pour les voyageurs éligibles.'
      },
      {
        question: 'Quelles compagnies opèrent en vol direct ?',
        answer: 'Air France, Delta, United, French Bee et Norse Atlantic assurent des liaisons directes régulières.'
      },
      {
        question: 'Comment réserver son vol sur Unique Voyage ?',
        answer: 'Cliquez sur le bouton de réservation pour bloquer instantanément votre tarif.'
      }
    ]
  },
  {
    slug: 'paris-montreal',
    originCode: 'CDG',
    originCity: 'Paris',
    originCountry: 'France',
    destCode: 'YUL',
    destCity: 'Montréal',
    destCountry: 'Canada',
    avgPriceFCFA: 310000,
    typicalDuration: '7h 45min (vol direct)',
    popularAirlines: ['Air France', 'Air Canada', 'Air Transat', 'Corsair'],
    bestMonths: 'Mai à Octobre',
    description: 'Vol Paris Montréal pas cher. Billets d\'avion directs vers le Québec au meilleur prix garanti pour vacances, étudiants et familles.',
    faqs: [
      {
        question: 'Quel est le prix le plus bas pour Paris Montréal ?',
        answer: 'Dès 290€ à 380€ (190 000 FCFA à 250 000 FCFA) aller-retour avec les meilleures compagnies régulières.'
      },
      {
        question: 'Quel document est requis pour le Canada ?',
        answer: 'L\'Autorisation de Voyage Électronique (AVE) est demandée pour les citoyens français et européens.'
      },
      {
        question: 'Quelles compagnies proposent des vols directs ?',
        answer: 'Air France, Air Canada, Air Transat et Corsair assurent des vols directs quotidiens.'
      },
      {
        question: 'Modes de paiement disponibles ?',
        answer: 'Carte bancaire internationale, virement ou Wave accepté.'
      }
    ]
  },
  {
    slug: 'paris-miami',
    originCode: 'CDG',
    originCity: 'Paris',
    originCountry: 'France',
    destCode: 'MIA',
    destCity: 'Miami',
    destCountry: 'États-Unis',
    avgPriceFCFA: 360000,
    typicalDuration: '9h 45min (vol direct)',
    popularAirlines: ['Air France', 'American Airlines', 'French Bee'],
    bestMonths: 'Novembre à Mai',
    description: 'Billet d\'avion Paris Miami moins cher pour vos vacances en Floride : South Beach, les Everglades et les Keys au tarif le plus bas.',
    faqs: [
      {
        question: 'Combien coûte un vol direct Paris Miami ?',
        answer: 'Tarifs promotionnels détectés dès 350€ (230 000 FCFA) aller-retour.'
      },
      {
        question: 'Quelles compagnies relient directement Paris à Miami ?',
        answer: 'Air France et American Airlines assurent des vols directs quotidiens de moins de 10h.'
      },
      {
        question: 'Quelle météo à Miami ?',
        answer: 'Climat tropical ensoleillé toute l\'année, particulièrement agréable de novembre à avril.'
      },
      {
        question: 'Comment réserver sur WhatsApp ?',
        answer: 'Cliquez sur réserver pour que notre conseiller finalise votre réservation.'
      }
    ]
  },
  {
    slug: 'paris-rome',
    originCode: 'CDG',
    originCity: 'Paris',
    originCountry: 'France',
    destCode: 'FCO',
    destCity: 'Rome',
    destCountry: 'Italie',
    avgPriceFCFA: 120000,
    typicalDuration: '2h 05min (vol direct)',
    popularAirlines: ['Air France', 'ITA Airways', 'EasyJet', 'Transavia', 'Ryanair'],
    bestMonths: 'Mars à Juin et Septembre à Novembre',
    description: 'City-break et vacances à Rome : billet d\'avion Paris Rome pas cher. Colisée, Vatican et dolce vita en 2h de vol au meilleur tarif.',
    faqs: [
      {
        question: 'Quel est le prix le plus bas pour un Paris Rome ?',
        answer: 'Dès 50€ à 95€ (32 000 FCFA à 62 000 FCFA) aller-retour.'
      },
      {
        question: 'Combien de temps de vol entre Paris et Rome ?',
        answer: 'Seulement 2 heures de vol direct.'
      },
      {
        question: 'Une carte d\'identité suffit-elle ?',
        answer: 'Oui, pour les ressortissants européens, la carte d\'identité nationale suffit.'
      },
      {
        question: 'Comment réserver immédiatement ?',
        answer: 'Validation rapide en quelques clics via notre service billetterie.'
      }
    ]
  },
  {
    slug: 'paris-barcelone',
    originCode: 'CDG',
    originCity: 'Paris',
    originCountry: 'France',
    destCode: 'BCN',
    destCity: 'Barcelone',
    destCountry: 'Espagne',
    avgPriceFCFA: 110000,
    typicalDuration: '1h 45min (vol direct)',
    popularAirlines: ['Vueling', 'Air France', 'Transavia', 'EasyJet', 'Ryanair'],
    bestMonths: 'Avril à Octobre',
    description: 'Billet d\'avion Paris Barcelone pas cher. Week-ends, plages et tapas en Catalogne au prix le plus bas garanti.',
    faqs: [
      {
        question: 'Quel est le tarif moyen pour un vol Paris Barcelone ?',
        answer: 'Dès 45€ à 80€ (30 000 FCFA à 52 000 FCFA) aller-retour.'
      },
      {
        question: 'Quelle est la durée du vol ?',
        answer: 'Moins de 1 heure et 45 minutes.'
      },
      {
        question: 'Comment rejoindre le centre-ville depuis l\'aéroport El Prat ?',
        answer: 'L\'Aérobus, le métro L9 ou le train relient le centre en 25 minutes.'
      },
      {
        question: 'Paiement sécurisé disponible ?',
        answer: 'Règlement sécurisé par carte bancaire ou Wave.'
      }
    ]
  },
  {
    slug: 'paris-lisbonne',
    originCode: 'CDG',
    originCity: 'Paris',
    originCountry: 'France',
    destCode: 'LIS',
    destCity: 'Lisbonne',
    destCountry: 'Portugal',
    avgPriceFCFA: 125000,
    typicalDuration: '2h 30min (vol direct)',
    popularAirlines: ['TAP Air Portugal', 'Air France', 'Transavia', 'EasyJet'],
    bestMonths: 'Mars à Novembre',
    description: 'Vol Paris Lisbonne pas cher. Échappée ensoleillée au Portugal au meilleur tarif garanti : tramways historiques, Belém et gastronomie.',
    faqs: [
      {
        question: 'Combien coûte un vol Paris Lisbonne ?',
        answer: 'Dès 55€ à 110€ (36 000 FCFA à 72 000 FCFA) aller-retour selon la saison.'
      },
      {
        question: 'Combien de temps dure le vol direct ?',
        answer: 'Environ 2 heures et 30 minutes.'
      },
      {
        question: 'Faut-il un visa pour visiter Lisbonne ?',
        answer: 'Non, pour les résidents de l\'espace Schengen, la carte d\'identité suffit.'
      },
      {
        question: 'Comment réserver sur Unique Voyage ?',
        answer: 'Contactez notre conciergerie pour réserver aux meilleurs tarifs négociés.'
      }
    ]
  },
  {
    slug: 'bruxelles-bangkok',
    originCode: 'BRU',
    originCity: 'Bruxelles',
    originCountry: 'Belgique',
    destCode: 'BKK',
    destCity: 'Bangkok',
    destCountry: 'Thaïlande',
    avgPriceFCFA: 510000,
    typicalDuration: '11h 45min (vol direct)',
    popularAirlines: ['Thai Airways', 'Qatar Airways', 'Emirates', 'Etihad Airways'],
    bestMonths: 'Novembre à Mars',
    description: 'Billet d\'avion Bruxelles Bangkok pas cher. Vols directs et avec escale depuis Brussels Airport vers la Thaïlande au prix le plus bas.',
    faqs: [
      {
        question: 'Quel est le prix le plus bas Bruxelles Bangkok ?',
        answer: 'Des offres démarrent dès 490€ à 620€ (320 000 FCFA à 405 000 FCFA) aller-retour.'
      },
      {
        question: 'Existe-t-il un vol direct sans escale ?',
        answer: 'Thai Airways assure des liaisons directes régulières au départ de Bruxelles.'
      },
      {
        question: 'Paiement sécurisé possible ?',
        answer: 'Oui, paiement en ligne par carte bancaire ou virement.'
      },
      {
        question: 'Quelle est la durée du séjour sans visa ?',
        answer: 'Jusqu\'à 60 jours sans visa pour les citoyens belges et européens.'
      }
    ]
  },
  {
    slug: 'bruxelles-new-york',
    originCode: 'BRU',
    originCity: 'Bruxelles',
    originCountry: 'Belgique',
    destCode: 'JFK',
    destCity: 'New York',
    destCountry: 'États-Unis',
    avgPriceFCFA: 340000,
    typicalDuration: '8h 30min (vol direct)',
    popularAirlines: ['Brussels Airlines', 'United Airlines', 'Delta Air Lines'],
    bestMonths: 'Avril à Décembre',
    description: 'Vol direct Bruxelles New York pas cher. Voyagez vers New York depuis la Belgique avec Brussels Airlines et United au meilleur tarif garanti.',
    faqs: [
      {
        question: 'Quel est le prix le plus bas Bruxelles New York ?',
        answer: 'Dès 320€ à 420€ (210 000 FCFA à 275 000 FCFA) aller-retour.'
      },
      {
        question: 'Quelles compagnies opèrent en direct ?',
        answer: 'Brussels Airlines et United Airlines effectuent des vols directs quotidiens.'
      },
      {
        question: 'Formalité pour les États-Unis ?',
        answer: 'Autorisation ESTA obligatoire avant le départ.'
      },
      {
        question: 'Comment réserver ce vol ?',
        answer: 'Réservation assistée par notre service client sur WhatsApp.'
      }
    ]
  },
  {
    slug: 'montreal-paris',
    originCode: 'YUL',
    originCity: 'Montréal',
    originCountry: 'Canada',
    destCode: 'CDG',
    destCity: 'Paris',
    destCountry: 'France',
    avgPriceFCFA: 310000,
    typicalDuration: '7h 15min (vol direct)',
    popularAirlines: ['Air France', 'Air Canada', 'Air Transat', 'Corsair'],
    bestMonths: 'Février à Juin et Septembre à Novembre',
    description: 'Billet d\'avion Montréal Paris pas cher. Vols directs quotidiens reliant le Québec à la France au prix le plus compétitif du marché.',
    faqs: [
      {
        question: 'Quel est le prix le plus bas pour Montréal Paris ?',
        answer: 'Des offres sont régulièrement proposées dès 450 $CAD à 590 $CAD (195 000 FCFA à 255 000 FCFA).'
      },
      {
        question: 'Combien de temps de vol entre Montréal et Paris ?',
        answer: 'Le vol direct sans escale dure environ 7h15.'
      },
      {
        question: 'Paiement en ligne accepté ?',
        answer: 'Oui, règlement en dollars canadiens, euros ou FCFA selon votre convenance.'
      },
      {
        question: 'Combien de bagages en soute ?',
        answer: 'Généralement 1 à 2 bagages de 23kg selon la classe choisie.'
      }
    ]
  },
  {
    slug: 'new-york-paris',
    originCode: 'JFK',
    originCity: 'New York',
    originCountry: 'États-Unis',
    destCode: 'CDG',
    destCity: 'Paris',
    destCountry: 'France',
    avgPriceFCFA: 320000,
    typicalDuration: '7h 30min (vol direct)',
    popularAirlines: ['Air France', 'Delta Air Lines', 'French Bee', 'Norse Atlantic'],
    bestMonths: 'Janvier à Mai et Septembre à Novembre',
    description: 'Vol pas cher New York Paris. Billets d\'avion directs JFK/Newark vers Paris Charles de Gaulle et Orly au meilleur prix garanti.',
    faqs: [
      {
        question: 'Quel est le prix moyen d\'un vol New York Paris ?',
        answer: 'Billets trouvés dès 350 $USD à 480 $USD (210 000 FCFA à 290 000 FCFA) aller-retour.'
      },
      {
        question: 'Quelles compagnies opèrent en vol direct ?',
        answer: 'Air France, Delta, Norse et French Bee proposent de multiples vols directs chaque jour.'
      },
      {
        question: 'Durée du trajet direct ?',
        answer: 'Environ 7h30 de vol sans escale.'
      },
      {
        question: 'Comment réserver son billet ?',
        answer: 'Réservation express et sécurisée via notre service de billetterie.'
      }
    ]
  }
];

export function getRouteBySlug(slug: string): FlightRouteSEO | undefined {
  return SEO_FLIGHT_ROUTES.find((r) => r.slug.toLowerCase() === slug.toLowerCase());
}

export function getAllRouteSlugs(): string[] {
  return SEO_FLIGHT_ROUTES.map((r) => r.slug);
}
