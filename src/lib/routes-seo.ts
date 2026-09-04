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
      },
      {
        question: 'Quel aéroport d\'arrivée à Londres ?',
        answer: 'Principalement London Heathrow (LHR) et London Gatwick (LGW).'
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
